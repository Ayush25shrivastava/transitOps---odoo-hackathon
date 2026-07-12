import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, Plus, Filter, Search } from 'lucide-react';

const mockVehicles = [
  { id: 'TR-104', make: 'Freightliner', model: 'Cascadia', year: 2021, status: 'Active', mileage: '124,500' },
  { id: 'VN-201', make: 'Ford', model: 'Transit', year: 2022, status: 'In Shop', mileage: '45,200' },
  { id: 'TR-409', make: 'Volvo', model: 'VNL', year: 2020, status: 'Active', mileage: '210,000' },
];

const Vehicles = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-8 w-full min-h-screen bg-gray-900 text-gray-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Truck className="w-8 h-8 mr-3 text-emerald-400" />
            Fleet Vehicles
          </h1>
          <p className="text-gray-400 mt-2">Manage your trucks and vans inventory.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Add Vehicle
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-800">
          <div className="relative w-64">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search vehicles..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-emerald-500 transition-colors"
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
                <th className="p-4 font-semibold text-gray-400 border-b border-gray-700">Vehicle ID</th>
                <th className="p-4 font-semibold text-gray-400 border-b border-gray-700">Make / Model</th>
                <th className="p-4 font-semibold text-gray-400 border-b border-gray-700">Year</th>
                <th className="p-4 font-semibold text-gray-400 border-b border-gray-700">Status</th>
                <th className="p-4 font-semibold text-gray-400 border-b border-gray-700">Mileage</th>
              </tr>
            </thead>
            <tbody>
              {mockVehicles.map((vehicle, idx) => (
                <motion.tr 
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-b border-gray-700 hover:bg-gray-750 transition-colors"
                >
                  <td className="p-4 font-bold text-white">{vehicle.id}</td>
                  <td className="p-4 text-gray-300">{vehicle.make} {vehicle.model}</td>
                  <td className="p-4 text-gray-400">{vehicle.year}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      vehicle.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                    }`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300">{vehicle.mileage} mi</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
