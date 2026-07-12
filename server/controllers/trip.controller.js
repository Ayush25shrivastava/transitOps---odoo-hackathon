const mongoose = require('mongoose');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const { NotFoundError, BusinessRuleError, BadRequestError } = require('../utils/apiErrors');
const Trip = require('../models/Trip');
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
const FuelLog = require('../models/FuelLog');

// ─── Create Trip (Draft) ──────────────────────────────────────────────────────
exports.createTrip = asyncHandler(async (req, res) => {
  const trip = await Trip.create({
    ...req.body,
    status: 'Draft',
    createdBy: req.user._id,
  });

  return ApiResponse.created(res, { trip }, 'Trip created successfully');
});

// ─── Get All Trips ────────────────────────────────────────────────────────────
exports.getTrips = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;

  const filter = {};
  if (status) filter.status = status;

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const [trips, total] = await Promise.all([
    Trip.find(filter)
      .populate('vehicle', 'registrationNumber name')
      .populate('driver', 'name licenseNumber')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    Trip.countDocuments(filter),
  ]);

  return ApiResponse.paginated(res, trips, total, pageNum, limitNum, 'Trips fetched successfully');
});

// ─── Get Trip By ID ───────────────────────────────────────────────────────────
exports.getTripById = asyncHandler(async (req, res) => {
  const trip = await Trip.findById(req.params.id)
    .populate('vehicle', 'registrationNumber name type maxLoadCapacity')
    .populate('driver', 'name licenseNumber licenseCategory safetyScore')
    .populate('createdBy', 'name email');

  if (!trip) {
    throw new NotFoundError('Trip not found');
  }

  return ApiResponse.success(res, { trip }, 'Trip fetched successfully');
});

// ─── Dispatch Trip ────────────────────────────────────────────────────────────
exports.dispatchTrip = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const trip = await Trip.findById(req.params.id).session(session);
    if (!trip) throw new NotFoundError('Trip not found');
    if (trip.status !== 'Draft') {
      throw new BusinessRuleError(`Trip cannot be dispatched — current status is "${trip.status}"`);
    }

    const vehicle = await Vehicle.findById(trip.vehicle).session(session);
    if (!vehicle) throw new NotFoundError('Vehicle associated with trip not found');
    if (vehicle.status !== 'Available') {
      throw new BusinessRuleError(`Vehicle "${vehicle.name}" is not available (status: ${vehicle.status})`);
    }

    const driver = await Driver.findById(trip.driver).session(session);
    if (!driver) throw new NotFoundError('Driver associated with trip not found');
    if (driver.status !== 'Available') {
      throw new BusinessRuleError(`Driver "${driver.name}" is not available (status: ${driver.status})`);
    }
    if (driver.status === 'Suspended') {
      throw new BusinessRuleError(`Driver "${driver.name}" is suspended and cannot be dispatched`);
    }
    if (driver.licenseExpiry <= new Date()) {
      throw new BusinessRuleError(`Driver "${driver.name}" has an expired license`);
    }

    if (trip.cargoWeight > vehicle.maxLoadCapacity) {
      throw new BusinessRuleError(
        `Cargo weight (${trip.cargoWeight} kg) exceeds vehicle max load capacity (${vehicle.maxLoadCapacity} kg)`
      );
    }

    // Update trip
    trip.status = 'Dispatched';
    trip.dispatchedAt = new Date();
    trip.startOdometer = vehicle.odometer;
    await trip.save({ session });

    // Update vehicle
    vehicle.status = 'On Trip';
    await vehicle.save({ session });

    // Update driver
    driver.status = 'On Trip';
    await driver.save({ session });

    await session.commitTransaction();
    return ApiResponse.success(res, { trip }, 'Trip dispatched successfully');
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
});

// ─── Complete Trip ────────────────────────────────────────────────────────────
exports.completeTrip = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { actualDistance, fuelConsumed, endOdometer, revenue = 0 } = req.body;

    if (actualDistance === undefined || fuelConsumed === undefined || endOdometer === undefined) {
      throw new BadRequestError('actualDistance, fuelConsumed, and endOdometer are required');
    }

    const trip = await Trip.findById(req.params.id).session(session);
    if (!trip) throw new NotFoundError('Trip not found');
    if (trip.status !== 'Dispatched') {
      throw new BusinessRuleError(`Trip cannot be completed — current status is "${trip.status}"`);
    }

    const vehicle = await Vehicle.findById(trip.vehicle).session(session);
    if (!vehicle) throw new NotFoundError('Vehicle not found');

    const driver = await Driver.findById(trip.driver).session(session);
    if (!driver) throw new NotFoundError('Driver not found');

    // Update trip
    trip.status = 'Completed';
    trip.completedAt = new Date();
    trip.actualDistance = actualDistance;
    trip.fuelConsumed = fuelConsumed;
    trip.endOdometer = endOdometer;
    trip.revenue = revenue;
    await trip.save({ session });

    // Update vehicle
    vehicle.status = 'Available';
    vehicle.odometer = endOdometer;
    vehicle.totalRevenue = (vehicle.totalRevenue || 0) + Number(revenue);
    await vehicle.save({ session });

    // Update driver
    driver.status = 'Available';
    driver.totalTrips = (driver.totalTrips || 0) + 1;
    driver.totalDistance = (driver.totalDistance || 0) + Number(actualDistance);
    await driver.save({ session });

    // Create fuel log if fuel was consumed
    if (Number(fuelConsumed) > 0) {
      await FuelLog.create(
        [
          {
            vehicle: trip.vehicle,
            trip: trip._id,
            liters: fuelConsumed,
            totalCost: 0,
            date: new Date(),
            createdBy: req.user._id,
          },
        ],
        { session }
      );
    }

    await session.commitTransaction();
    return ApiResponse.success(res, { trip }, 'Trip completed successfully');
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
});

// ─── Cancel Trip ──────────────────────────────────────────────────────────────
exports.cancelTrip = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const trip = await Trip.findById(req.params.id).session(session);
    if (!trip) throw new NotFoundError('Trip not found');

    if (!['Dispatched', 'Draft'].includes(trip.status)) {
      throw new BusinessRuleError(`Trip cannot be cancelled — current status is "${trip.status}"`);
    }

    if (trip.status === 'Dispatched') {
      const vehicle = await Vehicle.findById(trip.vehicle).session(session);
      if (vehicle) {
        vehicle.status = 'Available';
        await vehicle.save({ session });
      }

      const driver = await Driver.findById(trip.driver).session(session);
      if (driver) {
        driver.status = 'Available';
        await driver.save({ session });
      }
    }

    trip.status = 'Cancelled';
    trip.cancelledAt = new Date();
    trip.cancelReason = req.body.reason || '';
    await trip.save({ session });

    await session.commitTransaction();
    return ApiResponse.success(res, { trip }, 'Trip cancelled successfully');
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
});
