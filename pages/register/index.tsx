import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      
      const res = await axios.post('/api/signup', { email, password, name, role });
      alert('User registered successfully');
      
      if (res.status === 200){
        console.log("Enviado");
      }
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
    
    }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <select value={role} onChange={(e)=> setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
