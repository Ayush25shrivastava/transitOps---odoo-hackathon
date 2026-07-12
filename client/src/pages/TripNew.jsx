import React from 'react';
import { motion } from 'framer-motion';
import { Map, ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

const TripNew = () => {
  return (
    <div className="p-8 w-full min-h-screen bg-gray-900 text-gray-100">
      <div className="mb-8 flex items-center">
        <Link to="/trips" className="p-2 mr-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700">
          <ArrowLeft className="w-5 h-5 text-gray-400" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Map className="w-8 h-8 mr-3 text-blue-400" />
            Create New Trip
          </h1>
          <p className="text-gray-400 mt-2">Assign a vehicle and driver to a new route.</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl bg-gray-800 rounded-xl border border-gray-700 p-8"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Origin</label>
              <input type="text" placeholder="Starting Location" className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Destination</label>
              <input type="text" placeholder="Ending Location" className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Select Vehicle</label>
              <select className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors">
                <option value="">Choose a vehicle...</option>
                <option value="TR-104">TR-104 (Freightliner)</option>
                <option value="VN-201">VN-201 (Ford Transit)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Select Driver</label>
              <select className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors">
                <option value="">Choose a driver...</option>
                <option value="1">John Doe</option>
                <option value="2">Sarah Smith</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Expected Departure</label>
            <input type="datetime-local" className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors" />
          </div>

          <div className="pt-4 flex justify-end">
            <button type="button" className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg mr-4 hover:bg-gray-700 transition-colors">Cancel</button>
            <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center transition-colors">
              <Save className="w-5 h-5 mr-2" />
              Save Trip
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default TripNew;
