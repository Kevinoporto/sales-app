import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const router = useRouter();
  const { token } = router.query;
  const [user, setUser] = useState({
    name: "user",
    role: "user"
  });

  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUser();
  }, [token]);

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Hola, {user.name}</h1>
      <h1>Tu rol es {user.role}</h1>
      {user.role==='admin' && <h1>HOliii</h1>}
    </div>
  );
};

export default HomePage;
