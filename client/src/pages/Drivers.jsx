import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Card } from '../components/ui/Card';

const mockDrivers = [
  { id: 1, name: 'Alex', license: 'DL-88213', category: 'LMV', expiry: '12/2028', contact: '98765xxxxx', tripCompl: '96%', safety: 'Available', status: 'Available' },
  { id: 2, name: 'John', license: 'DL-44120', category: 'HMV', expiry: '03/2025 EXPIRE', contact: '98220xxxxx', tripCompl: '81%', safety: 'Suspended', status: 'Suspended' },
  { id: 3, name: 'Priya', license: 'DL-77031', category: 'LMV', expiry: '08/2026', contact: '99110xxxxx', tripCompl: '99%', safety: 'On Trip', status: 'On Trip' },
  { id: 4, name: 'Suresh', license: 'DL-90045', category: 'HMV', expiry: '01/2027', contact: '97440xxxxx', tripCompl: '88%', safety: 'Available', status: 'Off Duty' },
];

const Drivers = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.4 }}
      className="w-full h-full max-w-7xl mx-auto space-y-6"
    >
      {/* Action Bar */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Drivers Management</h1>
          <p className="text-sm text-text-secondary mt-1">Monitor driver statuses, licenses, and performance.</p>
        </div>
        <Button className="flex items-center gap-2 font-medium">
          <Plus size={16} />
          Add Driver
        </Button>
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-slate-50 border-b border-border">
              <TableRow>
                <TableHead className="py-4 px-6 text-xs font-semibold text-text-secondary uppercase">Driver</TableHead>
                <TableHead className="py-4 px-6 text-xs font-semibold text-text-secondary uppercase">License No.</TableHead>
                <TableHead className="py-4 px-6 text-xs font-semibold text-text-secondary uppercase">Category</TableHead>
                <TableHead className="py-4 px-6 text-xs font-semibold text-text-secondary uppercase">Expiry</TableHead>
                <TableHead className="py-4 px-6 text-xs font-semibold text-text-secondary uppercase">Contact</TableHead>
                <TableHead className="py-4 px-6 text-xs font-semibold text-text-secondary uppercase">Trip Compl.</TableHead>
                <TableHead className="py-4 px-6 text-xs font-semibold text-text-secondary uppercase">Safety</TableHead>
                <TableHead className="py-4 px-6 text-xs font-semibold text-text-secondary uppercase">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDrivers.map((driver) => (
                <TableRow key={driver.id} className="hover:bg-slate-50 transition-colors border-b border-border last:border-0">
                  <TableCell className="font-medium text-primary py-4 px-6">{driver.name}</TableCell>
                  <TableCell className="py-4 px-6 text-text-primary">{driver.license}</TableCell>
                  <TableCell className="py-4 px-6 text-text-secondary">{driver.category}</TableCell>
                  <TableCell className={`py-4 px-6 font-medium ${driver.expiry.includes('EXPIRE') ? 'text-danger' : 'text-text-secondary'}`}>{driver.expiry}</TableCell>
                  <TableCell className="py-4 px-6 text-text-secondary">{driver.contact}</TableCell>
                  <TableCell className="py-4 px-6 text-text-secondary">{driver.tripCompl}</TableCell>
                  <TableCell className="py-4 px-6"><StatusBadge status={driver.safety} /></TableCell>
                  <TableCell className="py-4 px-6"><StatusBadge status={driver.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </motion.div>
      
      {/* Toggle Filters at bottom */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 mb-4">
        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Quick Filters</p>
        <div className="flex gap-3">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-5 py-2 rounded-full text-sm font-medium bg-success-light text-success-dark border border-success/20 hover:bg-success hover:text-white transition-colors">Available</motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-5 py-2 rounded-full text-sm font-medium bg-info-light text-info-dark border border-info/20 hover:bg-info hover:text-white transition-colors">On Trip</motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-5 py-2 rounded-full text-sm font-medium bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-600 hover:text-white transition-colors">Off Duty</motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-5 py-2 rounded-full text-sm font-medium bg-warning-light text-warning-dark border border-warning/20 hover:bg-warning hover:text-white transition-colors">Suspended</motion.button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-xs text-warning font-medium flex items-center bg-warning-light/50 p-3 rounded-lg w-fit border border-warning/20">
        <span className="mr-2">ℹ️</span> Rule: Expired license or Suspended status → blocked from trip assignment
      </motion.div>
    </motion.div>
  );
};

export default Drivers;
