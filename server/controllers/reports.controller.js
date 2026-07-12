const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const { BadRequestError } = require('../utils/apiErrors');
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
const Trip = require('../models/Trip');
const FuelLog = require('../models/FuelLog');
const MaintenanceLog = require('../models/MaintenanceLog');
const Expense = require('../models/Expense');
const { exportToCSV } = require('../utils/csvExport');

// ─── Fuel Efficiency Report ───────────────────────────────────────────────────
exports.getFuelEfficiency = asyncHandler(async (req, res) => {
  const fuelByVehicle = await FuelLog.aggregate([
    {
      $group: {
        _id: '$vehicle',
        totalLiters: { $sum: '$liters' },
        totalFuelCost: { $sum: '$totalCost' },
        fuelEntries: { $sum: 1 },
      },
    },
  ]);

  const distanceByVehicle = await Trip.aggregate([
    { $match: { status: 'Completed', actualDistance: { $exists: true, $gt: 0 } } },
    {
      $group: {
        _id: '$vehicle',
        totalDistance: { $sum: '$actualDistance' },
        tripCount: { $sum: 1 },
      },
    },
  ]);

  const distanceMap = {};
  distanceByVehicle.forEach((d) => {
    distanceMap[d._id.toString()] = { totalDistance: d.totalDistance, tripCount: d.tripCount };
  });

  const vehicleIds = fuelByVehicle.map((f) => f._id);
  const vehicles = await Vehicle.find({ _id: { $in: vehicleIds } }).select('name registrationNumber type');
  const vehicleMap = {};
  vehicles.forEach((v) => { vehicleMap[v._id.toString()] = v; });

  const result = fuelByVehicle.map((f) => {
    const vehicleId = f._id.toString();
    const vehicle = vehicleMap[vehicleId] || {};
    const distInfo = distanceMap[vehicleId] || { totalDistance: 0, tripCount: 0 };
    const kmPerLiter =
      f.totalLiters > 0 && distInfo.totalDistance > 0
        ? parseFloat((distInfo.totalDistance / f.totalLiters).toFixed(2))
        : null;

    return {
      vehicleId,
      vehicleName: vehicle.name || 'Unknown',
      registrationNumber: vehicle.registrationNumber || 'Unknown',
      type: vehicle.type || 'Unknown',
      totalLiters: f.totalLiters,
      totalFuelCost: f.totalFuelCost,
      totalDistance: distInfo.totalDistance,
      tripCount: distInfo.tripCount,
      kmPerLiter,
    };
  });

  return ApiResponse.success(res, { fuelEfficiency: result }, 'Fuel efficiency report generated');
});

// ─── Fleet Utilization (last 6 months) ───────────────────────────────────────
exports.getFleetUtilization = asyncHandler(async (req, res) => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const monthly = await Trip.aggregate([
    { $match: { createdAt: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        totalTrips: { $sum: 1 },
        completedTrips: {
          $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] },
        },
        cancelledTrips: {
          $sum: { $cond: [{ $eq: ['$status', 'Cancelled'] }, 1, 0] },
        },
        totalRevenue: { $sum: { $ifNull: ['$revenue', 0] } },
        totalDistance: { $sum: { $ifNull: ['$actualDistance', 0] } },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
    {
      $project: {
        _id: 0,
        year: '$_id.year',
        month: '$_id.month',
        totalTrips: 1,
        completedTrips: 1,
        cancelledTrips: 1,
        totalRevenue: 1,
        totalDistance: 1,
      },
    },
  ]);

  return ApiResponse.success(res, { monthly }, 'Fleet utilization report generated');
});

// ─── Operational Cost per Vehicle ─────────────────────────────────────────────
exports.getOperationalCost = asyncHandler(async (req, res) => {
  const [fuelCosts, maintenanceCosts, expenseCosts, vehicles] = await Promise.all([
    FuelLog.aggregate([
      { $group: { _id: '$vehicle', totalFuelCost: { $sum: '$totalCost' } } },
    ]),
    MaintenanceLog.aggregate([
      { $group: { _id: '$vehicle', totalMaintenanceCost: { $sum: '$cost' } } },
    ]),
    Expense.aggregate([
      { $group: { _id: '$vehicle', totalExpenseCost: { $sum: '$amount' } } },
    ]),
    Vehicle.find().select('name registrationNumber type acquisitionCost totalRevenue'),
  ]);

  const fuelMap = {};
  fuelCosts.forEach((f) => { fuelMap[f._id.toString()] = f.totalFuelCost; });

  const maintenanceMap = {};
  maintenanceCosts.forEach((m) => { maintenanceMap[m._id.toString()] = m.totalMaintenanceCost; });

  const expenseMap = {};
  expenseCosts.forEach((e) => { expenseMap[e._id.toString()] = e.totalExpenseCost; });

  const result = vehicles.map((v) => {
    const id = v._id.toString();
    const fuelCost = fuelMap[id] || 0;
    const maintenanceCost = maintenanceMap[id] || 0;
    const expenseCost = expenseMap[id] || 0;
    const totalOperationalCost = fuelCost + maintenanceCost + expenseCost;

    return {
      vehicleId: id,
      vehicleName: v.name,
      registrationNumber: v.registrationNumber,
      type: v.type,
      fuelCost,
      maintenanceCost,
      expenseCost,
      totalOperationalCost,
      totalRevenue: v.totalRevenue || 0,
    };
  });

  return ApiResponse.success(res, { operationalCosts: result }, 'Operational cost report generated');
});

// ─── Vehicle ROI ──────────────────────────────────────────────────────────────
exports.getVehicleROI = asyncHandler(async (req, res) => {
  const [fuelCosts, maintenanceCosts, expenseCosts, vehicles] = await Promise.all([
    FuelLog.aggregate([
      { $group: { _id: '$vehicle', totalFuelCost: { $sum: '$totalCost' } } },
    ]),
    MaintenanceLog.aggregate([
      { $group: { _id: '$vehicle', totalMaintenanceCost: { $sum: '$cost' } } },
    ]),
    Expense.aggregate([
      { $group: { _id: '$vehicle', totalExpenseCost: { $sum: '$amount' } } },
    ]),
    Vehicle.find().select('name registrationNumber type acquisitionCost totalRevenue'),
  ]);

  const fuelMap = {};
  fuelCosts.forEach((f) => { fuelMap[f._id.toString()] = f.totalFuelCost; });

  const maintenanceMap = {};
  maintenanceCosts.forEach((m) => { maintenanceMap[m._id.toString()] = m.totalMaintenanceCost; });

  const expenseMap = {};
  expenseCosts.forEach((e) => { expenseMap[e._id.toString()] = e.totalExpenseCost; });

  const result = vehicles.map((v) => {
    const id = v._id.toString();
    const fuelCost = fuelMap[id] || 0;
    const maintenanceCost = maintenanceMap[id] || 0;
    const expenseCost = expenseMap[id] || 0;
    const totalCosts = fuelCost + maintenanceCost + expenseCost;
    const totalRevenue = v.totalRevenue || 0;
    const acquisitionCost = v.acquisitionCost || 0;

    const roi =
      acquisitionCost > 0
        ? parseFloat((((totalRevenue - totalCosts) / acquisitionCost) * 100).toFixed(2))
        : null;

    return {
      vehicleId: id,
      vehicleName: v.name,
      registrationNumber: v.registrationNumber,
      type: v.type,
      acquisitionCost,
      totalRevenue,
      totalCosts,
      netProfit: totalRevenue - totalCosts,
      roi,
    };
  });

  return ApiResponse.success(res, { vehicleROI: result }, 'Vehicle ROI report generated');
});

// ─── Export CSV ───────────────────────────────────────────────────────────────
exports.exportCSV = asyncHandler(async (req, res) => {
  const { type } = req.query;

  let data = [];
  let fields = [];
  let filename = 'export';

  switch (type) {
    case 'vehicles': {
      data = await Vehicle.find().lean();
      fields = ['registrationNumber', 'name', 'type', 'maxLoadCapacity', 'odometer', 'acquisitionCost', 'status', 'region', 'totalRevenue'];
      filename = 'vehicles';
      break;
    }
    case 'drivers': {
      data = await Driver.find().lean();
      fields = ['name', 'licenseNumber', 'licenseCategory', 'licenseExpiry', 'contact', 'email', 'safetyScore', 'status', 'totalTrips', 'totalDistance'];
      filename = 'drivers';
      break;
    }
    case 'trips': {
      data = await Trip.find()
        .populate('vehicle', 'registrationNumber name')
        .populate('driver', 'name licenseNumber')
        .lean();
      // Flatten populated fields
      data = data.map((t) => ({
        ...t,
        vehicleName: t.vehicle ? t.vehicle.name : '',
        vehicleReg: t.vehicle ? t.vehicle.registrationNumber : '',
        driverName: t.driver ? t.driver.name : '',
        driverLicense: t.driver ? t.driver.licenseNumber : '',
      }));
      fields = ['tripNumber', 'source', 'destination', 'vehicleName', 'vehicleReg', 'driverName', 'driverLicense', 'cargoWeight', 'plannedDistance', 'actualDistance', 'fuelConsumed', 'revenue', 'status'];
      filename = 'trips';
      break;
    }
    case 'fuel': {
      data = await FuelLog.find()
        .populate('vehicle', 'registrationNumber name')
        .lean();
      data = data.map((f) => ({
        ...f,
        vehicleName: f.vehicle ? f.vehicle.name : '',
        vehicleReg: f.vehicle ? f.vehicle.registrationNumber : '',
      }));
      fields = ['vehicleName', 'vehicleReg', 'liters', 'costPerLiter', 'totalCost', 'date', 'fuelStation', 'odometerReading'];
      filename = 'fuel_logs';
      break;
    }
    case 'expenses': {
      data = await Expense.find()
        .populate('vehicle', 'registrationNumber name')
        .lean();
      data = data.map((e) => ({
        ...e,
        vehicleName: e.vehicle ? e.vehicle.name : '',
        vehicleReg: e.vehicle ? e.vehicle.registrationNumber : '',
      }));
      fields = ['vehicleName', 'vehicleReg', 'type', 'amount', 'date', 'description'];
      filename = 'expenses';
      break;
    }
    default:
      throw new BadRequestError('type query param must be one of: vehicles, drivers, trips, fuel, expenses');
  }

  const csv = exportToCSV(data, fields);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}.csv"`);
  return res.status(200).send(csv);
});
