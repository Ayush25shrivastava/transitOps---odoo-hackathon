import api from './axios';

export const getTrips = (params) => api.get('/trips', { params });
export const getTrip = (id) => api.get(`/trips/${id}`);
export const createTrip = (data) => api.post('/trips', data);
export const updateTrip = (id, data) => api.put(`/trips/${id}`, data);
export const deleteTrip = (id) => api.delete(`/trips/${id}`);
export const dispatchTrip = (id) => api.patch(`/trips/${id}/dispatch`);
export const completeTrip = (id, data) => api.patch(`/trips/${id}/complete`, data);
export const cancelTrip = (id, data) => api.patch(`/trips/${id}/cancel`, data);
