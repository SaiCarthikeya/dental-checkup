import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const storedRole = localStorage.getItem('role');

  if (!token || (role && storedRole !== role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
