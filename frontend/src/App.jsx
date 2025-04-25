import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import DentistList from './pages/user/DentistList';
import MyCheckups from './pages/user/MyCheckups';

import CheckupRequests from './pages/dentist/CheckupRequests';
import UploadResult from './pages/dentist/UploadResult';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dentists"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <DentistList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/results"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <MyCheckups />
            </ProtectedRoute>
          }
        />

        {/* Dentist Routes */}
        <Route
          path="/checkup-requests"
          element={
            <ProtectedRoute allowedRoles={['dentist']}>
              <CheckupRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload/:userId"
          element={
            <ProtectedRoute allowedRoles={['dentist']}>
              <UploadResult />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
