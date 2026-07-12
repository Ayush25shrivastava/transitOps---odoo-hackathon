import api from './axios';

export const getDashboardStats = () => api.get('/dashboard/stats');
export const getDashboardTrips = () => api.get('/dashboard/recent-trips');
export const getDashboardVehicleStatus = () => api.get('/dashboard/vehicle-status');
export const getDashboardCharts = () => api.get('/dashboard/charts');
