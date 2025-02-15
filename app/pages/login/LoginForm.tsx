"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ReactFormState } from "react-dom/client";

export default function LoginForm () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const credentials = btoa(`${username}:${password}`);
            const res = await fetch('/api/login', {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${credentials}`,
                    "Content-Type": "application/json"
                }
            });

            if (res.ok) {
                router.push("/pages/home");
            } else {
            const data = await res.json();
                setError(data.error || "Error al iniciar sesión");
            }
        } catch (err) {
            console.error("Error durante la solicitud:", err);
            setError("Error en la conexión al servidor");
        }
    };

    return(
        <div className="flex min-h-screen items-center justify-center bg-gray-200">
            <div className="bg-gray-400 p-8 shadow-md rounded-md w-96">
                <h2 className="text-black text-center text-2xl font-bold mb-2">Iniciar sesion</h2>
                {error && <p> {error}</p>}
            
                <form 
                onSubmit={handleSubmit}
                className="flex flex-col">
                
                    <input 
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border p-2 mb-4 rounded-md text-black" 
                    />
                    <input 
                        type="text"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 mb-4 rounded-md text-black" 
                    />
                    <button 
                        type="submit"
                        className="bg-blue-500 text-white py-2 font-bold rounded-md">
                        Iniciar sesion
                    </button>
                </form>
            </div>
        </div>
    )

}


