"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function RegisterForm (){
    const [username, setUsername] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, nombre, apellido, email, password})
            });

            if (res.ok){
                const data = await res.json();
            }else{
                const data = await res.json();
                setError(data.error || "Error al registrar usuario");
            }
        } catch (err) {
            console.error("Error: ", err);
            setError("Error de conexion con el servidor");
        }
    };

    return(
        <div className="flex min-h-screen items-center justify-center bg-gray-200">
            <div className="bg-gray-400 p-8 shadow-md rounded-md w-96">
                <h2 className="text-black text-center text-2xl font-bold mb-2">Registrarse</h2>
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
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="border p-2 mb-4 rounded-md text-black" 
                    />

                    <input 
                        type="text"
                        placeholder="Apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        className="border p-2 mb-4 rounded-md text-black"
                    />

                    <input 
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 mb-4 rounded-md text-black"
                    />

                    <input 
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 mb-4 rounded-md text-black"
                    />

                    <button 
                        type="submit"
                        className="bg-blue-500 text-white py-2 font-bold rounded-md">
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    )
}