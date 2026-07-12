import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, Truck, AlertTriangle, TrendingUp, BarChart2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', trips: 40, revenue: 2400 },
  { name: 'Tue', trips: 30, revenue: 1398 },
  { name: 'Wed', trips: 20, revenue: 9800 },
  { name: 'Thu', trips: 27, revenue: 3908 },
  { name: 'Fri', trips: 18, revenue: 4800 },
  { name: 'Sat', trips: 23, revenue: 3800 },
  { name: 'Sun', trips: 34, revenue: 4300 },
];

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors"
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold text-white mt-2">{value}</h3>
      </div>
      <div className="p-3 bg-gray-700/50 rounded-lg">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
    </div>
    <div className="mt-4 flex items-center">
      <TrendingUp className="w-4 h-4 text-emerald-400 mr-2" />
      <span className="text-emerald-400 text-sm font-medium">{trend}</span>
      <span className="text-gray-500 text-sm ml-2">vs last week</span>
    </div>
  </motion.div>
);

const Dashboard = () => {
  return (
    <div className="p-8 w-full min-h-screen bg-gray-900 text-gray-100">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-400 mt-2">Welcome back to TransitOps. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Active Trips" value="124" icon={Activity} trend="+12.5%" />
        <StatCard title="Available Vehicles" value="45" icon={Truck} trend="+5.2%" />
        <StatCard title="Active Drivers" value="118" icon={Users} trend="+2.4%" />
        <StatCard title="Maintenance Alerts" value="3" icon={AlertTriangle} trend="-1.5%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-gray-800 p-6 rounded-xl border border-gray-700"
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <BarChart2 className="w-5 h-5 mr-2 text-blue-400" />
            Revenue & Trips Overview
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '0.5rem' }}
                  itemStyle={{ color: '#e5e7eb' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 p-6 rounded-xl border border-gray-700"
        >
          <h2 className="text-xl font-semibold mb-6 text-white">Recent Activity</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 mr-4"></div>
                <div>
                  <p className="text-sm text-gray-300">Vehicle TR-409 completed trip.</p>
                  <p className="text-xs text-gray-500 mt-1">{i * 2} hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
