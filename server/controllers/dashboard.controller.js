const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
const Trip = require('../models/Trip');
const Driver2 = require('../models/Driver');

// ─── Get KPIs ─────────────────────────────────────────────────────────────────
exports.getKPIs = asyncHandler(async (req, res) => {
  const now = new Date();
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  // Start of today
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);

  const [vehicles, drivers, trips, expiringLicenses, todayTrips] = await Promise.all([
    Vehicle.find(),
    Driver.find(),
    Trip.find(),
    Driver.countDocuments({ licenseExpiry: { $gt: now, $lte: thirtyDaysFromNow } }),
    Trip.countDocuments({ createdAt: { $gte: todayStart, $lt: todayEnd } }),
  ]);

  // Vehicle stats
  const totalVehicles = vehicles.length;
  const availableVehicles = vehicles.filter((v) => v.status === 'Available').length;
  const onTripVehicles = vehicles.filter((v) => v.status === 'On Trip').length;
  const inShopVehicles = vehicles.filter((v) => v.status === 'In Shop').length;
  const retiredVehicles = vehicles.filter((v) => v.status === 'Retired').length;

  // Driver stats
  const totalDrivers = drivers.length;
  const availableDrivers = drivers.filter((d) => d.status === 'Available').length;
  const onTripDrivers = drivers.filter((d) => d.status === 'On Trip').length;
  const suspendedDrivers = drivers.filter((d) => d.status === 'Suspended').length;

  // Trip stats
  const totalTrips = trips.length;
  const activeTrips = trips.filter((t) => t.status === 'Dispatched').length;
  const pendingTrips = trips.filter((t) => t.status === 'Draft').length;
  const completedTrips = trips.filter((t) => t.status === 'Completed').length;
  const cancelledTrips = trips.filter((t) => t.status === 'Cancelled').length;

  // Fleet utilization = (On Trip vehicles / non-retired vehicles) * 100
  const activeFleet = totalVehicles - retiredVehicles;
  const fleetUtilization = activeFleet > 0 ? parseFloat(((onTripVehicles / activeFleet) * 100).toFixed(1)) : 0;

  return ApiResponse.success(
    res,
    {
      totalVehicles,
      availableVehicles,
      onTripVehicles,
      inShopVehicles,
      retiredVehicles,
      totalDrivers,
      availableDrivers,
      onTripDrivers,
      suspendedDrivers,
      totalTrips,
      activeTrips,
      pendingTrips,
      completedTrips,
      cancelledTrips,
      fleetUtilization,
      expiringLicenses,
      todayTrips,
    },
    'KPIs fetched successfully'
  );
});

// ─── Get Recent Trips ─────────────────────────────────────────────────────────
exports.getRecentTrips = asyncHandler(async (req, res) => {
  const trips = await Trip.find()
    .populate('vehicle', 'name registrationNumber')
    .populate('driver', 'name licenseNumber')
    .sort({ createdAt: -1 })
    .limit(10);

  return ApiResponse.success(res, { trips }, 'Recent trips fetched successfully');
});

// ─── Get Vehicle Status Summary ───────────────────────────────────────────────
exports.getVehicleStatusSummary = asyncHandler(async (req, res) => {
  const summary = await Vehicle.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        status: '$_id',
        count: 1,
      },
    },
    { $sort: { status: 1 } },
  ]);

  return ApiResponse.success(res, { summary }, 'Vehicle status summary fetched successfully');
});
