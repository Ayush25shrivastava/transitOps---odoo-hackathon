import { useLocation } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/vehicles': 'Vehicles',
  '/drivers': 'Drivers',
  '/trips': 'Trips',
  '/trips/new': 'New Trip',
  '/maintenance': 'Maintenance',
  '/fuel-expenses': 'Fuel & Expenses',
  '/reports': 'Reports',
  '/settings': 'Settings',
};

export default function Navbar() {
  const { toggleSidebar } = useApp();
  const { user } = useAuth();
  const location = useLocation();

  const title = pageTitles[location.pathname] || 'TransitOps';

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#111827] border-b border-[#374151] flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937] transition-colors"
        >
          <Menu size={20} />
        </button>
        <h2 className="text-lg font-semibold text-[#F9FAFB]">{title}</h2>
      </div>

      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <div className="relative">
          <button className="p-2 rounded-lg text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937] transition-colors">
            <Bell size={20} />
          </button>
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#F59E0B] rounded-full text-[10px] font-bold text-black flex items-center justify-center">
            3
          </span>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center">
            <span className="text-black font-bold text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-[#F9FAFB] leading-none">{user?.name || 'User'}</p>
            <p className="text-xs text-[#9CA3AF] capitalize leading-none mt-0.5">
              {user?.role?.replace('_', ' ') || 'user'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
