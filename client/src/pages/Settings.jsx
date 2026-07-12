import React from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Shield, Database } from 'lucide-react';

const Settings = () => {
  return (
    <div className="p-8 w-full min-h-screen bg-gray-900 text-gray-100">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <SettingsIcon className="w-8 h-8 mr-3 text-gray-400" />
          Settings
        </h1>
        <p className="text-gray-400 mt-2">Manage your preferences and application settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-2">
          <button className="w-full text-left px-4 py-3 bg-gray-800 text-white rounded-lg font-medium border border-gray-700">General</button>
          <button className="w-full text-left px-4 py-3 text-gray-400 hover:bg-gray-800/50 rounded-lg font-medium transition-colors">Notifications</button>
          <button className="w-full text-left px-4 py-3 text-gray-400 hover:bg-gray-800/50 rounded-lg font-medium transition-colors">Security</button>
          <button className="w-full text-left px-4 py-3 text-gray-400 hover:bg-gray-800/50 rounded-lg font-medium transition-colors">Integrations</button>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-3 space-y-6"
        >
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-400" />
              Profile Details
            </h2>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Company Name</label>
                <input type="text" className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" defaultValue="TransitOps Inc." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Admin Email</label>
                <input type="email" className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500" defaultValue="admin@transitops.com" />
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">Save Changes</button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Database className="w-5 h-5 mr-2 text-emerald-400" />
              System Data
            </h2>
            <p className="text-gray-400 mb-4">Export your system data or manage storage limits.</p>
            <div className="flex space-x-4">
              <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">Export CSV</button>
              <button className="px-4 py-2 border border-red-900/50 text-red-400 bg-red-900/10 rounded-lg hover:bg-red-900/20 transition-colors">Clear Cache</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
