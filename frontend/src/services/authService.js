import api from './api';

export const login = async (email, password, role) => {
  const endpoint = role === 'dentist' ? '/dentists/login' : '/users/login';
  const res = await api.post(endpoint, { email, password });
  return res.data;
};

export const register = async (userData) => {
  const res = await api.post('/users/register', userData);
  return res.data;
};
