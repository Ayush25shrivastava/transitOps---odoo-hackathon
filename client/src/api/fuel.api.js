import api from './axios';

export const getFuelLogs = (params) => api.get('/fuel', { params });
export const createFuelLog = (data) => api.post('/fuel', data);
export const deleteFuelLog = (id) => api.delete(`/fuel/${id}`);
export const getFuelSummary = () => api.get('/fuel/summary');
