import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Input } from '../components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Card, CardContent } from '../components/ui/Card';

const mockVehicles = [
  { regNo: 'GJ01AB4521', name: 'VAN-05', type: 'Van', capacity: '500 kg', odometer: '74,000', cost: '6,20,000', status: 'Available' },
  { regNo: 'GJ01AB9987', name: 'TRUCK-11', type: 'Truck', capacity: '5 Ton', odometer: '182,000', cost: '24,50,000', status: 'On Trip' },
  { regNo: 'GJ01AB1120', name: 'MINI-03', type: 'Mini', capacity: '1 Ton', odometer: '66,000', cost: '4,10,000', status: 'In Shop' },
  { regNo: 'GJ01AB0081', name: 'VAN-09', type: 'Van', capacity: '750 kg', odometer: '241,900', cost: '5,90,000', status: 'Retired' },
];

const Vehicles = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.4 }}
      className="w-full h-full max-w-7xl mx-auto space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Fleet Vehicles</h1>
          <p className="text-sm text-text-secondary mt-1">Manage and track your entire vehicle inventory.</p>
        </div>
        <Button className="flex items-center gap-2 font-medium">
          <Plus size={16} />
          Add Vehicle
        </Button>
      </div>
      
      {/* Action Bar */}
      <Card className="bg-[var(--color-bg-card)] border-none shadow-sm hover-scale transition-all duration-300">
        <CardContent className="p-4 flex gap-4">
          <div className="w-48">
            <Select>
              <option>Type: All</option>
              <option>Van</option>
              <option>Truck</option>
              <option>Mini</option>
            </Select>
          </div>
          <div className="w-48">
            <Select>
              <option>Status: All</option>
              <option>Available</option>
              <option>On Trip</option>
              <option>In Shop</option>
              <option>Retired</option>
            </Select>
          </div>
          <div className="w-64">
             <Input 
              type="text" 
              placeholder="Search reg. no..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-[var(--color-bg-base)] border-b border-border">
              <TableRow>
                <TableHead className="py-4 px-6 text-xs font-semibold text-text-secondary uppercase">Reg. No. (Unique)</TableHead>
                <TableHead className="py-4 px-6 text-xs font-semibold text-text-secondary uppercase">Name/Mode</TableHead>
                <TableHead className="py-4 px-6 text-xs font-semibold text-text-secondary uppercase">Type</TableHead>
                <TableHead className="py-4 px-6 text-xs font-semibold text-text-secondary uppercase">Capacity</TableHead>
                <TableHead className="py-4 px-6 text-xs font-semibold text-text-secondary uppercase">Odometer</TableHead>
                <TableHead className="py-4 px-6 text-xs font-semibold text-text-secondary uppercase">Acq. Cost</TableHead>
                <TableHead className="py-4 px-6 text-xs font-semibold text-text-secondary uppercase">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockVehicles.map((vehicle, idx) => (
                <TableRow key={vehicle.regNo} className="hover:bg-[var(--color-bg-base)] transition-colors border-b border-border last:border-0 hover-scale">
                  <TableCell className="font-medium text-primary py-4 px-6">{vehicle.regNo}</TableCell>
                  <TableCell className="py-4 px-6 text-text-primary">{vehicle.name}</TableCell>
                  <TableCell className="py-4 px-6 text-text-secondary">{vehicle.type}</TableCell>
                  <TableCell className="py-4 px-6 text-text-secondary">{vehicle.capacity}</TableCell>
                  <TableCell className="py-4 px-6 text-text-secondary">{vehicle.odometer} km</TableCell>
                  <TableCell className="py-4 px-6 text-text-secondary">₹ {vehicle.cost}</TableCell>
                  <TableCell className="py-4 px-6">
                    <StatusBadge status={vehicle.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </motion.div>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-xs text-warning font-medium flex items-center bg-warning-light/50 p-3 rounded-lg w-fit border border-warning/20">
        <span className="mr-2">ℹ️</span> Rule: Registration No. must be unique • Retired/In Shop vehicles are hidden from Trip Dispatcher
      </motion.div>

    </motion.div>
  );
};

export default Vehicles;
