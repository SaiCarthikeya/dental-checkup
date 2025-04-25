import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTokenPayload } from '../utils/tokenUtils';

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const payload = getTokenPayload();
    if (payload?.role === 'user') {
      setUser(payload);
    } else {
      navigate('/login');
    }
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-teal-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-lg p-10 rounded-md max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-teal-600">Welcome, {user.name || 'Patient'} 👋</h1>
        <p className="text-gray-600">Manage your dental checkups easily and securely.</p>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/dentists')}
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
          >
            Request a Checkup
          </button>
          <button
            onClick={() => navigate('/results')}
            className="w-full border border-teal-600 text-teal-600 py-2 rounded hover:bg-teal-100 transition"
          >
            View My Results
          </button>
        </div>
      </div>
    </div>
  );
}
