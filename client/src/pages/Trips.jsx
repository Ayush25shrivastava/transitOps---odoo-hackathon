import React from 'react';
import { motion } from 'framer-motion';
import { Map, Plus, Filter, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockTrips = [
  { id: 'TRP-1042', origin: 'Chicago, IL', destination: 'Detroit, MI', driver: 'John Doe', vehicle: 'TR-104', status: 'In Transit' },
  { id: 'TRP-1043', origin: 'New York, NY', destination: 'Boston, MA', driver: 'Sarah S.', vehicle: 'VN-201', status: 'Scheduled' },
  { id: 'TRP-1044', origin: 'Austin, TX', destination: 'Dallas, TX', driver: 'Mike J.', vehicle: 'TR-409', status: 'Completed' },
];

const Trips = () => {
  return (
    <div className="p-8 w-full min-h-screen bg-gray-900 text-gray-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Map className="w-8 h-8 mr-3 text-blue-400" />
            Active Trips
          </h1>
          <p className="text-gray-400 mt-2">Monitor all ongoing and scheduled routes.</p>
        </div>
        <Link to="/trips/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Create Trip
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {mockTrips.map((trip, idx) => (
          <motion.div 
            key={trip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-bold text-gray-400">{trip.id}</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                trip.status === 'In Transit' ? 'bg-blue-500/10 text-blue-400' :
                trip.status === 'Completed' ? 'bg-green-500/10 text-green-400' :
                'bg-gray-500/10 text-gray-400'
              }`}>
                {trip.status}
              </span>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="h-px bg-gray-700 flex-1 mx-2"></div>
              <div className="w-2 h-2 rounded-full border-2 border-blue-500 bg-transparent"></div>
            </div>
            
            <div className="flex justify-between text-sm mb-6">
              <span className="text-white">{trip.origin}</span>
              <span className="text-white">{trip.destination}</span>
            </div>
            
            <div className="bg-gray-900/50 p-3 rounded-lg flex justify-between text-sm">
              <div>
                <p className="text-gray-500 text-xs">Driver</p>
                <p className="text-gray-300 font-medium">{trip.driver}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-xs">Vehicle</p>
                <p className="text-gray-300 font-medium">{trip.vehicle}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Trips;
