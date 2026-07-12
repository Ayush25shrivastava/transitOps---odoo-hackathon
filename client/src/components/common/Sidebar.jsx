import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Truck, Users, MapPin, Wrench, Fuel, BarChart3, Settings, LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Fleet', icon: Truck, path: '/vehicles' },
  { label: 'Drivers', icon: Users, path: '/drivers' },
  { label: 'Trips', icon: MapPin, path: '/trips' },
  { label: 'Maintenance', icon: Wrench, path: '/maintenance' },
  { label: 'Fuel & Expenses', icon: Fuel, path: '/fuel-expenses' },
  { label: 'Analytics', icon: BarChart3, path: '/reports' },
  { label: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { sidebarOpen } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!sidebarOpen) return null;

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-color-bg-sidebar border-r border-border flex flex-col z-40">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-xl font-medium tracking-tight text-text-primary">TransitOps</h1>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                isActive
                  ? 'bg-transparent text-primary border border-primary/20'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white'
              }`
            }
          >
            <span className="text-sm font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-border bg-white mt-auto">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">{user?.name || 'User'}</p>
            <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium capitalize">
              {user?.role?.replace('_', ' ') || 'user'}
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:text-danger hover:bg-danger/10 transition-all duration-200 text-sm font-medium"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
