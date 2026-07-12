import api from './axios';

export const getFuelEfficiency = () => api.get('/reports/fuel-efficiency');
export const getFleetUtilization = () => api.get('/reports/fleet-utilization');
export const getOperationalCost = () => api.get('/reports/operational-cost');
export const getVehicleROI = () => api.get('/reports/vehicle-roi');
export const exportCSV = (type) => api.get(`/reports/export/${type}`, { responseType: 'blob' });
