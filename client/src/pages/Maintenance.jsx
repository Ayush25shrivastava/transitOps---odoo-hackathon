import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Plus, Filter, AlertCircle, CheckCircle } from 'lucide-react';

const mockMaintenance = [
  { id: 1, vehicle: 'TR-104', type: 'Oil Change', status: 'Pending', date: '2023-10-15', cost: '$120' },
  { id: 2, vehicle: 'VN-201', type: 'Tire Rotation', status: 'Completed', date: '2023-10-10', cost: '$80' },
  { id: 3, vehicle: 'TR-409', type: 'Engine Check', status: 'In Progress', date: '2023-10-14', cost: '$350' },
];

const Maintenance = () => {
  return (
    <div className="p-8 w-full min-h-screen bg-gray-900 text-gray-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Wrench className="w-8 h-8 mr-3 text-orange-400" />
            Maintenance
          </h1>
          <p className="text-gray-400 mt-2">Manage vehicle repairs and routine checks.</p>
        </div>
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Schedule Maintenance
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-800">
          <h2 className="text-xl font-semibold text-white">Maintenance Log</h2>
          <button className="p-2 bg-gray-900 border border-gray-700 rounded-lg hover:border-gray-500 transition-colors">
            <Filter className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900/50">
                <th className="p-4 font-semibold text-gray-400 border-b border-gray-700">Vehicle</th>
                <th className="p-4 font-semibold text-gray-400 border-b border-gray-700">Type</th>
                <th className="p-4 font-semibold text-gray-400 border-b border-gray-700">Status</th>
                <th className="p-4 font-semibold text-gray-400 border-b border-gray-700">Date</th>
                <th className="p-4 font-semibold text-gray-400 border-b border-gray-700">Est. Cost</th>
              </tr>
            </thead>
            <tbody>
              {mockMaintenance.map((record, idx) => (
                <motion.tr 
                  key={record.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-b border-gray-700 hover:bg-gray-750 transition-colors"
                >
                  <td className="p-4 font-medium text-white">{record.vehicle}</td>
                  <td className="p-4 text-gray-300">{record.type}</td>
                  <td className="p-4">
                    <span className={`flex items-center px-3 py-1 rounded-full text-xs font-medium w-fit ${
                      record.status === 'Completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                      record.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                    }`}>
                      {record.status === 'Pending' && <AlertCircle className="w-3 h-3 mr-1" />}
                      {record.status === 'Completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {record.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300">{record.date}</td>
                  <td className="p-4 font-medium text-gray-300">{record.cost}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
