import api from './api';

export const getDentists = async () => {
  const res = await api.get('/dentists');
  return res.data;
};

export const requestCheckup = async (dentistId) => {
  const res = await api.post('/checkups/request', { dentistId });
  return res.data;
};

export const getUserCheckups = async () => {
  const res = await api.get('/checkups/user');
  return res.data;
};

export const getDentistRequests = async () => {
  const res = await api.get('/checkups/requests');
  return res.data;
};

export const uploadCheckupResult = async (checkupId, formData) => {
  const res = await api.post(`/checkups/${checkupId}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};
