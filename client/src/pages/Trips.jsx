import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const TripDispatcher = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.4 }}
      className="w-full h-full max-w-7xl mx-auto flex flex-col gap-10"
    >
      
      {/* Trip Lifecycle Stepper */}
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="w-full px-4 mb-2">
        <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-6">Trip Lifecycle Overview</h2>
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 w-full h-0.5 bg-slate-200 -z-10"></div>
          
          <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center gap-2 bg-bg-base px-3 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-primary text-white shadow-md shadow-primary/30 flex items-center justify-center font-bold text-sm">1</div>
            <span className="text-xs font-semibold text-text-primary">Request</span>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center gap-2 bg-bg-base px-3 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-primary text-white shadow-md shadow-primary/30 flex items-center justify-center font-bold text-sm">2</div>
            <span className="text-xs font-semibold text-text-primary">Schedule</span>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center gap-2 bg-bg-base px-3 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-primary-light text-primary border-2 border-primary flex items-center justify-center font-bold text-sm">3</div>
            <span className="text-xs font-semibold text-primary">Dispatch</span>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center gap-2 bg-bg-base px-3 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-sm">4</div>
            <span className="text-xs font-medium text-text-secondary">In-Transit</span>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center gap-2 bg-bg-base px-3 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-sm">5</div>
            <span className="text-xs font-medium text-text-secondary">Completed</span>
          </motion.div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* CREATE TRIP Column */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">Create Trip</h2>
          <Card>
            <CardContent className="p-8 space-y-8">
              
              <div className="space-y-5">
                <h3 className="text-sm font-semibold text-primary border-b border-border pb-2 uppercase tracking-wide">Trip Details</h3>
                <div className="grid grid-cols-2 gap-5">
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-text-secondary mb-1">Customer / Project</label>
                    <Input placeholder="Enter customer name..." className="bg-slate-50 border-slate-200" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">Pickup Location</label>
                    <Input placeholder="Origin" className="bg-slate-50 border-slate-200" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">Drop Location</label>
                    <Input placeholder="Destination" className="bg-slate-50 border-slate-200" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">Date & Time</label>
                    <Input type="datetime-local" className="bg-slate-50 border-slate-200 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">Cargo Details / Weight</label>
                    <Input placeholder="e.g. 500kg Electronics" className="bg-slate-50 border-slate-200" />
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <h3 className="text-sm font-semibold text-primary border-b border-border pb-2 uppercase tracking-wide">Assignment</h3>
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">Assign Vehicle (Auto-filtered)</label>
                    <Select className="bg-slate-50 border-slate-200">
                      <option>Select available vehicle...</option>
                      <option>VAN-05 (GJ01AB4521)</option>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">Assign Driver (Auto-filtered)</label>
                    <Select className="bg-slate-50 border-slate-200">
                      <option>Select available driver...</option>
                      <option>Alex (DL-88213)</option>
                    </Select>
                  </div>
                </div>
              </div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="w-full py-3 mt-4 bg-primary hover:bg-primary-dark text-white font-medium text-sm rounded-lg shadow-md shadow-primary/20 transition-all">
                  Create & Dispatch Trip
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* LIVE BOARD Column */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">Live Board</h2>
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-5">
            
            {/* Trip Card 1 */}
            <motion.div variants={itemVariants} whileHover={{ y: -4 }}>
              <Card className="border-l-4 border-info shadow-sm hover:shadow-md transition-all cursor-pointer bg-gradient-to-r from-white to-slate-50">
                <CardContent className="p-5 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-text-primary text-lg">TRP-001 <span className="text-text-secondary font-medium text-sm ml-2">Acme Corp</span></span>
                    <StatusBadge status="Dispatched" />
                  </div>
                  <div className="flex items-center text-sm font-medium text-text-primary">
                    <span className="w-2.5 h-2.5 rounded-full bg-info mr-3"></span>
                    Warehouse A <span className="text-slate-300 mx-3">→</span> Site B
                  </div>
                  <div className="flex justify-between text-xs font-medium text-text-secondary bg-white border border-slate-100 shadow-sm p-3 rounded-lg">
                    <span>Veh: <span className="text-text-primary">TRUCK-11</span></span>
                    <span>Driver: <span className="text-text-primary">John</span></span>
                    <span className="text-info-dark">ETA: 2h 15m</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Trip Card 2 */}
            <motion.div variants={itemVariants} whileHover={{ y: -4 }}>
              <Card className="border-l-4 border-warning shadow-sm hover:shadow-md transition-all cursor-pointer bg-gradient-to-r from-white to-slate-50">
                <CardContent className="p-5 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-text-primary text-lg">TRP-002 <span className="text-text-secondary font-medium text-sm ml-2">BuildIt Inc</span></span>
                    <StatusBadge status="Delayed" />
                  </div>
                  <div className="flex items-center text-sm font-medium text-text-primary">
                    <span className="w-2.5 h-2.5 rounded-full bg-warning mr-3"></span>
                    Port <span className="text-slate-300 mx-3">→</span> Factory 1
                  </div>
                  <div className="flex justify-between text-xs font-medium text-text-secondary bg-white border border-slate-100 shadow-sm p-3 rounded-lg">
                    <span>Veh: <span className="text-text-primary">VAN-05</span></span>
                    <span>Driver: <span className="text-text-primary">Priya</span></span>
                    <span className="text-danger flex items-center"><span className="mr-1">⚠️</span> Traffic</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
          </motion.div>
        </motion.div>
        
      </div>
    </motion.div>
  );
};

export default TripDispatcher;
