import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import Drivers from './pages/Drivers';
import Trips from './pages/Trips';
import TripNew from './pages/TripNew';
import Maintenance from './pages/Maintenance';
import FuelExpenses from './pages/FuelExpenses';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

export default function App() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={token ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/trips/new" element={<TripNew />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/fuel-expenses" element={<FuelExpenses />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
