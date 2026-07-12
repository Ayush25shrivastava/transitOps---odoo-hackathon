import { useLocation } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../ui/Input';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/vehicles': 'Fleet',
  '/drivers': 'Drivers',
  '/trips': 'Trips',
  '/trips/new': 'New Trip',
  '/maintenance': 'Maintenance',
  '/fuel-expenses': 'Fuel & Expenses',
  '/reports': 'Analytics',
  '/settings': 'Settings',
};

export default function Navbar() {
  const { toggleSidebar } = useApp();
  const { user } = useAuth();
  const location = useLocation();

  const title = pageTitles[location.pathname] || 'TransitOps';

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors md:hidden"
        >
          <Menu size={20} />
        </button>
        <div className="hidden md:block w-96">
          <Input placeholder="Search..." className="bg-gray-50 border-transparent focus:border-primary focus:bg-white transition-colors" />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2.5">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-text-primary leading-none">{user?.name || 'Raven K.'}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
            <span className="text-primary font-bold text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || 'R'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center">
            <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200 shadow-sm flex items-center gap-1.5">
                Dispatcher
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">RK</span>
            </span>
        </div>
      </div>
    </header>
  );
}
