import api from './axios';

export const getMaintenance = (params) => api.get('/maintenance', { params });
export const getMaintenanceById = (id) => api.get(`/maintenance/${id}`);
export const createMaintenance = (data) => api.post('/maintenance', data);
export const updateMaintenance = (id, data) => api.put(`/maintenance/${id}`, data);
export const closeMaintenance = (id) => api.patch(`/maintenance/${id}/close`);
export const deleteMaintenance = (id) => api.delete(`/maintenance/${id}`);
