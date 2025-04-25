import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register({ name, email, password });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-50">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-teal-600 text-center">Register</h2>

        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500" required />

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500" required />

        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500" required />

        <p className={`text-sm text-red-500 ${!error && 'invisible'}`}>{error || 'placeholder'}</p>

        <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700">
          Register
        </button>
      </form>
    </div>
  );
}
