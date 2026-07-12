import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter, MoreVertical, Plus } from 'lucide-react';

const mockDrivers = [
  { id: 1, name: 'John Doe', license: 'DL-93810', status: 'Active', experience: '5 Years', performance: '98%' },
  { id: 2, name: 'Sarah Smith', license: 'DL-84729', status: 'On Trip', experience: '3 Years', performance: '95%' },
  { id: 3, name: 'Mike Johnson', license: 'DL-72940', status: 'Off Duty', experience: '7 Years', performance: '99%' },
];

const Drivers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-8 w-full min-h-screen bg-gray-900 text-gray-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Users className="w-8 h-8 mr-3 text-blue-400" />
            Drivers Management
          </h1>
          <p className="text-gray-400 mt-2">Manage your fleet drivers and view performance.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Add Driver
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-800">
          <div className="relative w-64">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search drivers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button className="p-2 bg-gray-900 border border-gray-700 rounded-lg hover:border-gray-500 transition-colors">
            <Filter className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900/50">
                <th className="p-4 font-semibold text-gray-400 border-b border-gray-700">Name</th>
                <th className="p-4 font-semibold text-gray-400 border-b border-gray-700">License</th>
                <th className="p-4 font-semibold text-gray-400 border-b border-gray-700">Status</th>
                <th className="p-4 font-semibold text-gray-400 border-b border-gray-700">Experience</th>
                <th className="p-4 font-semibold text-gray-400 border-b border-gray-700">Performance</th>
                <th className="p-4 font-semibold text-gray-400 border-b border-gray-700 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockDrivers.map((driver, idx) => (
                <motion.tr 
                  key={driver.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-b border-gray-700 hover:bg-gray-750 transition-colors"
                >
                  <td className="p-4 font-medium text-white">{driver.name}</td>
                  <td className="p-4 text-gray-300">{driver.license}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      driver.status === 'Active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                      driver.status === 'On Trip' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                    }`}>
                      {driver.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300">{driver.experience}</td>
                  <td className="p-4 text-green-400">{driver.performance}</td>
                  <td className="p-4 text-center">
                    <button className="p-1 hover:bg-gray-700 rounded transition-colors text-gray-400 hover:text-white">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Drivers;
