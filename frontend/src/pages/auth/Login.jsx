import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { saveToken } from '../../utils/tokenUtils';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login(email, password, role);
      saveToken(res.token, role);
      console.log(role)
      navigate(role === 'dentist' ? '/dentist/checkup-requests' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-50">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-teal-600 text-center">Login</h2>

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500" required />

        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500" required />

        <select value={role} onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500">
          <option value="user">Patient</option>
          <option value="dentist">Dentist</option>
        </select>

        <p className={`text-sm text-red-500 ${!error && 'invisible'}`}>{error || 'placeholder'}</p>

        <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700">
          Login
        </button>
      </form>
    </div>
  );
}
