import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplet, Plus, Filter, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const expenseData = [
  { name: 'Week 1', cost: 4000, gallons: 1200 },
  { name: 'Week 2', cost: 3000, gallons: 900 },
  { name: 'Week 3', cost: 4500, gallons: 1350 },
  { name: 'Week 4', cost: 3800, gallons: 1100 },
];

const mockLogs = [
  { id: 1, date: '2023-10-01', vehicle: 'TR-104', driver: 'John Doe', gallons: 50, cost: '$180.50', location: 'Station A' },
  { id: 2, date: '2023-10-02', vehicle: 'VN-201', driver: 'Sarah S.', gallons: 20, cost: '$75.00', location: 'Station B' },
  { id: 3, date: '2023-10-03', vehicle: 'TR-409', driver: 'Mike J.', gallons: 60, cost: '$210.00', location: 'Station C' },
];

const FuelExpenses = () => {
  return (
    <div className="p-8 w-full min-h-screen bg-gray-900 text-gray-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Droplet className="w-8 h-8 mr-3 text-red-400" />
            Fuel Expenses
          </h1>
          <p className="text-gray-400 mt-2">Track fuel consumption and monitor costs.</p>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Add Log
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 p-6 rounded-xl border border-gray-700"
        >
          <p className="text-gray-400 text-sm font-medium">Total Spent (This Month)</p>
          <h3 className="text-3xl font-bold text-white mt-2">$15,300</h3>
          <div className="mt-4 flex items-center">
            <TrendingDown className="w-4 h-4 text-emerald-400 mr-2" />
            <span className="text-emerald-400 text-sm font-medium">-4.2%</span>
            <span className="text-gray-500 text-sm ml-2">vs last month</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-gray-800 p-6 rounded-xl border border-gray-700 h-64"
        >
           <ResponsiveContainer width="100%" height="100%">
            <BarChart data={expenseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem' }}
                itemStyle={{ color: '#e5e7eb' }}
              />
              <Bar dataKey="cost" fill="#f87171" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-800">
          <h2 className="text-xl font-semibold text-white">Recent Fuel Logs</h2>
          <button className="p-2 bg-gray-900 border border-gray-700 rounded-lg hover:border-gray-500 transition-colors">
            <Filter className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900/50">
                <th className="p-4 font-semibold text-gray-400 border-b border-gray-700">Date</th>
                <th className="p-4 font-semibold text-gray-400 border-b border-gray-700">Vehicle</th>
                <th className="p-4 font-semibold text-gray-400 border-b border-gray-700">Driver</th>
                <th className="p-4 font-semibold text-gray-400 border-b border-gray-700">Gallons</th>
                <th className="p-4 font-semibold text-gray-400 border-b border-gray-700">Cost</th>
                <th className="p-4 font-semibold text-gray-400 border-b border-gray-700">Location</th>
              </tr>
            </thead>
            <tbody>
              {mockLogs.map((log, idx) => (
                <motion.tr 
                  key={log.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-b border-gray-700 hover:bg-gray-750 transition-colors"
                >
                  <td className="p-4 text-gray-300">{log.date}</td>
                  <td className="p-4 font-medium text-white">{log.vehicle}</td>
                  <td className="p-4 text-gray-300">{log.driver}</td>
                  <td className="p-4 text-blue-400">{log.gallons} gal</td>
                  <td className="p-4 text-red-400 font-medium">{log.cost}</td>
                  <td className="p-4 text-gray-400">{log.location}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FuelExpenses;
