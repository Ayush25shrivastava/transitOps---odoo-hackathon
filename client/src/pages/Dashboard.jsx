import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Select } from '../components/ui/Select';
import { Card, CardContent } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { StatusBadge } from '../components/ui/StatusBadge';

const chartData = [
  { name: 'Mon', revenue: 4000, trips: 24 },
  { name: 'Tue', revenue: 3000, trips: 18 },
  { name: 'Wed', revenue: 5000, trips: 32 },
  { name: 'Thu', revenue: 4500, trips: 28 },
  { name: 'Fri', revenue: 6000, trips: 40 },
  { name: 'Sat', revenue: 7000, trips: 48 },
  { name: 'Sun', revenue: 5500, trips: 36 },
];

const StatCard = ({ title, value, borderClass }) => (
  <motion.div 
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="h-full"
  >
    <Card className={`border-l-4 ${borderClass} h-full bg-[var(--color-bg-card)]`}>
      <CardContent className="p-5 flex flex-col justify-between h-full">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">{title}</p>
        <h3 className="text-3xl font-light text-text-primary tracking-tight">{value}</h3>
      </CardContent>
    </Card>
  </motion.div>
);

const Dashboard = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.4 }}
      className="w-full h-full space-y-8"
    >
      
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-2">
        <div className="w-48">
          <Select className="shadow-sm">
            <option>Vehicle Type: All</option>
            <option>Van</option>
            <option>Truck</option>
          </Select>
        </div>
        <div className="w-48">
          <Select className="shadow-sm">
            <option>Status: All</option>
            <option>Available</option>
            <option>On Trip</option>
          </Select>
        </div>
        <div className="w-48">
          <Select className="shadow-sm">
            <option>Region: All</option>
            <option>North</option>
            <option>South</option>
          </Select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5">
        <StatCard title="Active Vehicles" value="53" borderClass="border-primary" />
        <StatCard title="Available Vehicles" value="42" borderClass="border-success" />
        <StatCard title="In Maintenance" value="05" borderClass="border-warning" />
        <StatCard title="Active Trips" value="18" borderClass="border-info" />
        <StatCard title="Pending Trips" value="09" borderClass="border-info-light" />
        <StatCard title="Drivers on Duty" value="26" borderClass="border-primary" />
        <StatCard title="Fleet Utilization" value="81%" borderClass="border-success" />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chart & Table Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Performance Chart */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">Performance Overview</h3>
            <Card className="p-6">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    <Area yAxisId="right" type="monotone" dataKey="trips" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorTrips)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </motion.div>

          {/* Recent Trips Table */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">Recent Trips</h3>
            <Card className="overflow-hidden">
              <Table>
                <TableHeader className="bg-[var(--color-bg-base)]">
                  <TableRow>
                    <TableHead>Trip</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>ETA</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-[var(--color-bg-base)] transition-colors hover-scale">
                    <TableCell className="font-medium text-primary">TR001</TableCell>
                    <TableCell>VAN-05</TableCell>
                    <TableCell>Alex</TableCell>
                    <TableCell><StatusBadge status="On Trip" /></TableCell>
                    <TableCell>45 min</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-[var(--color-bg-base)] transition-colors hover-scale">
                    <TableCell className="font-medium text-primary">TR002</TableCell>
                    <TableCell>TRK-12</TableCell>
                    <TableCell>John</TableCell>
                    <TableCell><StatusBadge status="Completed" /></TableCell>
                    <TableCell className="text-text-secondary">—</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-[var(--color-bg-base)] transition-colors hover-scale">
                    <TableCell className="font-medium text-primary">TR003</TableCell>
                    <TableCell>MINI-08</TableCell>
                    <TableCell>Priya</TableCell>
                    <TableCell><StatusBadge status="Dispatched" /></TableCell>
                    <TableCell>1h 10m</TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-[var(--color-bg-base)] transition-colors hover-scale">
                    <TableCell className="font-medium text-text-secondary">TR004</TableCell>
                    <TableCell className="text-text-secondary">—</TableCell>
                    <TableCell className="text-text-secondary">—</TableCell>
                    <TableCell><StatusBadge status="Draft" /></TableCell>
                    <TableCell className="text-text-secondary text-xs">Awaiting vehicle</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </motion.div>
        </div>

        {/* Vehicle Status Summary */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="space-y-4">
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">Fleet Status</h3>
          <Card>
            <CardContent className="p-8 space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-text-primary">Available</span>
                  <span className="text-sm font-bold text-success">42</span>
                </div>
                <div className="w-full bg-[var(--color-border)] rounded-full h-3">
                  <motion.div initial={{ width: 0 }} animate={{ width: '75%' }} transition={{ duration: 1, delay: 0.5 }} className="bg-success h-3 rounded-full"></motion.div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-text-primary">On Trip</span>
                  <span className="text-sm font-bold text-info">18</span>
                </div>
                <div className="w-full bg-[var(--color-border)] rounded-full h-3">
                  <motion.div initial={{ width: 0 }} animate={{ width: '30%' }} transition={{ duration: 1, delay: 0.6 }} className="bg-info h-3 rounded-full"></motion.div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-text-primary">In Shop</span>
                  <span className="text-sm font-bold text-warning">5</span>
                </div>
                <div className="w-full bg-[var(--color-border)] rounded-full h-3">
                  <motion.div initial={{ width: 0 }} animate={{ width: '10%' }} transition={{ duration: 1, delay: 0.7 }} className="bg-warning h-3 rounded-full"></motion.div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-text-primary">Retired</span>
                  <span className="text-sm font-bold text-danger">2</span>
                </div>
                <div className="w-full bg-[var(--color-border)] rounded-full h-3">
                  <motion.div initial={{ width: 0 }} animate={{ width: '5%' }} transition={{ duration: 1, delay: 0.8 }} className="bg-danger h-3 rounded-full"></motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
      </div>
    </motion.div>
  );
};

export default Dashboard;
