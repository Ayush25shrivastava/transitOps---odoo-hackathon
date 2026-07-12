require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
const Trip = require('../models/Trip');
const MaintenanceLog = require('../models/MaintenanceLog');
const FuelLog = require('../models/FuelLog');
const Expense = require('../models/Expense');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    await User.deleteMany({});
    await Vehicle.deleteMany({});
    await Driver.deleteMany({});
    await Trip.deleteMany({});
    await MaintenanceLog.deleteMany({});
    await FuelLog.deleteMany({});
    await Expense.deleteMany({});

    const passwordHash = await bcrypt.hash('Password@123', 12);

    const users = await User.insertMany([
      { name: 'Admin User', email: 'admin@transitops.com', password: passwordHash, role: 'fleet_manager' },
      { name: 'Safety Officer', email: 'safety@transitops.com', password: passwordHash, role: 'safety_officer' },
      { name: 'Finance Analyst', email: 'finance@transitops.com', password: passwordHash, role: 'financial_analyst' },
      { name: 'Driver One', email: 'driver1@transitops.com', password: passwordHash, role: 'driver' },
      { name: 'Driver Two', email: 'driver2@transitops.com', password: passwordHash, role: 'driver' }
    ]);

    const vehicles = await Vehicle.insertMany([
      { registrationNumber: 'TN01AB1234', name: 'Van-01', type: 'Van', maxLoadCapacity: 800, odometer: 12500, acquisitionCost: 800000, status: 'Available', region: 'North' },
      { registrationNumber: 'TN02CD5678', name: 'Truck-02', type: 'Truck', maxLoadCapacity: 5000, odometer: 45000, acquisitionCost: 2500000, status: 'On Trip', region: 'South', totalRevenue: 85000 },
      { registrationNumber: 'TN05EF9012', name: 'Van-05', type: 'Van', maxLoadCapacity: 500, odometer: 8000, acquisitionCost: 650000, status: 'Available', region: 'East' },
      { registrationNumber: 'TN03GH3456', name: 'Pickup-03', type: 'Pickup', maxLoadCapacity: 1200, odometer: 22000, acquisitionCost: 950000, status: 'In Shop', region: 'West' },
      { registrationNumber: 'TN04IJ7890', name: 'Truck-04', type: 'Truck', maxLoadCapacity: 8000, odometer: 98000, acquisitionCost: 3500000, status: 'Retired', region: 'North' }
    ]);

    const drivers = await Driver.insertMany([
      { name: 'Alex Kumar', licenseNumber: 'LIC001', licenseCategory: 'B', licenseExpiry: new Date('2026-12-31'), contact: '9876543210', safetyScore: 95, status: 'Available' },
      { name: 'John Smith', licenseNumber: 'LIC002', licenseCategory: 'C', licenseExpiry: new Date('2024-01-01'), contact: '9876543211', safetyScore: 80, status: 'Available' },
      { name: 'Sarah Lee', licenseNumber: 'LIC003', licenseCategory: 'B', licenseExpiry: new Date('2027-06-30'), contact: '9876543212', safetyScore: 92, status: 'On Trip' },
      { name: 'Mike Ross', licenseNumber: 'LIC004', licenseCategory: 'HMV', licenseExpiry: new Date('2026-09-15'), contact: '9876543213', safetyScore: 45, status: 'Suspended' },
      { name: 'Emma Davis', licenseNumber: 'LIC005', licenseCategory: 'B', licenseExpiry: new Date('2026-08-01'), contact: '9876543214', safetyScore: 88, status: 'Available' }
    ]);

    const trips = await Trip.insertMany([
      { source: 'Mumbai', destination: 'Pune', vehicle: vehicles[0]._id, driver: drivers[0]._id, cargoWeight: 400, plannedDistance: 150, status: 'Completed', actualDistance: 155, fuelConsumed: 18, revenue: 5000, createdBy: users[0]._id },
      { source: 'Delhi', destination: 'Agra', vehicle: vehicles[1]._id, driver: drivers[2]._id, cargoWeight: 2000, plannedDistance: 200, status: 'Dispatched', createdBy: users[0]._id },
      { source: 'Chennai', destination: 'Bangalore', vehicle: vehicles[2]._id, driver: drivers[0]._id, cargoWeight: 300, plannedDistance: 350, status: 'Draft', createdBy: users[0]._id }
    ]);

    await MaintenanceLog.insertMany([
      { vehicle: vehicles[3]._id, type: 'Oil Change', description: 'Regular oil change', cost: 2500, status: 'Active' },
      { vehicle: vehicles[0]._id, type: 'Tire Replacement', description: 'Front tires replaced', cost: 1800, status: 'Closed', endDate: new Date() }
    ]);

    await FuelLog.insertMany([
      { vehicle: vehicles[0]._id, trip: trips[0]._id, liters: 18, totalCost: 1800, date: new Date() },
      { vehicle: vehicles[1]._id, trip: trips[1]._id, liters: 45, totalCost: 5400, date: new Date() },
      { vehicle: vehicles[2]._id, liters: 10, totalCost: 1000, date: new Date() }
    ]);

    await Expense.insertMany([
      { vehicle: vehicles[0]._id, type: 'Toll', amount: 200, description: 'Highway toll', date: new Date() },
      { vehicle: vehicles[1]._id, type: 'Driver Allowance', amount: 500, date: new Date() },
      { vehicle: vehicles[0]._id, type: 'Other', amount: 300, description: 'Parking', date: new Date() }
    ]);

    console.log('Seed data inserted successfully!');
    console.log(`Users: ${users.length}`);
    console.log(`Vehicles: ${vehicles.length}`);
    console.log(`Drivers: ${drivers.length}`);
    console.log(`Trips: ${trips.length}`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
