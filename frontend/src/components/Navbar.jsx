import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    if (token && userRole) setRole(userRole);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="bg-teal-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">OralVis</h1>
      <div className="flex gap-4 items-center">
        {role === 'user' && <Link to="/dentists">Dentists</Link>}
        {role === 'user' && <Link to="/results">My Results</Link>}
        {role === 'dentist' && <Link to="/requests">Checkup Requests</Link>}
        {!role && <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>}
        {role && <button onClick={handleLogout} className="bg-white text-teal-600 px-3 py-1 rounded">Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;
