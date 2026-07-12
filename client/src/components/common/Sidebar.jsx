import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Truck, Users, MapPin, Wrench, Fuel, BarChart3, Settings, LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Vehicles', icon: Truck, path: '/vehicles' },
  { label: 'Drivers', icon: Users, path: '/drivers' },
  { label: 'Trips', icon: MapPin, path: '/trips' },
  { label: 'Maintenance', icon: Wrench, path: '/maintenance' },
  { label: 'Fuel & Expenses', icon: Fuel, path: '/fuel-expenses' },
  { label: 'Reports', icon: BarChart3, path: '/reports' },
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
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#111827] border-r border-[#374151] flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-[#374151]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#F59E0B] rounded-xl">
            <Truck size={20} className="text-black" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#F9FAFB]">TransitOps</h1>
            <p className="text-xs text-[#9CA3AF]">Fleet Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                isActive
                  ? 'bg-[#F59E0B]/10 text-[#F59E0B] border-l-2 border-[#F59E0B] pl-2.5'
                  : 'text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937]'
              }`
            }
          >
            <Icon size={18} />
            <span className="text-sm font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-[#374151]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-[#F59E0B] flex items-center justify-center flex-shrink-0">
            <span className="text-black font-bold text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#F9FAFB] truncate">{user?.name || 'User'}</p>
            <span className="text-xs px-1.5 py-0.5 rounded bg-[#F59E0B]/20 text-[#F59E0B] font-medium capitalize">
              {user?.role?.replace('_', ' ') || 'user'}
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#9CA3AF] hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 text-sm font-medium"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
