const mongoose = require('mongoose');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const { NotFoundError, BusinessRuleError } = require('../utils/apiErrors');
const MaintenanceLog = require('../models/MaintenanceLog');
const Vehicle = require('../models/Vehicle');

// ─── Create Maintenance Log ───────────────────────────────────────────────────
exports.createMaintenance = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const vehicle = await Vehicle.findById(req.body.vehicle).session(session);
    if (!vehicle) throw new NotFoundError('Vehicle not found');

    const [log] = await MaintenanceLog.create(
      [
        {
          ...req.body,
          status: 'Active',
          createdBy: req.user._id,
        },
      ],
      { session }
    );

    vehicle.status = 'In Shop';
    await vehicle.save({ session });

    await session.commitTransaction();
    return ApiResponse.created(res, { log }, 'Maintenance log created successfully');
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
});

// ─── Close Maintenance Log ────────────────────────────────────────────────────
exports.closeMaintenance = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const log = await MaintenanceLog.findById(req.params.id).session(session);
    if (!log) throw new NotFoundError('Maintenance log not found');
    if (log.status !== 'Active') {
      throw new BusinessRuleError('This maintenance log is already closed');
    }

    log.status = 'Closed';
    log.endDate = new Date();
    await log.save({ session });

    const vehicle = await Vehicle.findById(log.vehicle).session(session);
    if (vehicle && vehicle.status !== 'Retired') {
      vehicle.status = 'Available';
      await vehicle.save({ session });
    }

    await session.commitTransaction();
    return ApiResponse.success(res, { log }, 'Maintenance log closed successfully');
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
});

// ─── Get All Maintenance Logs ─────────────────────────────────────────────────
exports.getMaintenanceLogs = asyncHandler(async (req, res) => {
  const { status, vehicle, page = 1, limit = 10 } = req.query;

  const filter = {};
  if (status) filter.status = status;
  if (vehicle) filter.vehicle = vehicle;

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const [logs, total] = await Promise.all([
    MaintenanceLog.find(filter)
      .populate('vehicle', 'name registrationNumber')
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    MaintenanceLog.countDocuments(filter),
  ]);

  return ApiResponse.paginated(res, logs, total, pageNum, limitNum, 'Maintenance logs fetched successfully');
});

// ─── Get Maintenance Log By ID ────────────────────────────────────────────────
exports.getMaintenanceById = asyncHandler(async (req, res) => {
  const log = await MaintenanceLog.findById(req.params.id)
    .populate('vehicle', 'name registrationNumber type')
    .populate('createdBy', 'name email');

  if (!log) throw new NotFoundError('Maintenance log not found');
  return ApiResponse.success(res, { log }, 'Maintenance log fetched successfully');
});

// ─── Update Maintenance Log ───────────────────────────────────────────────────
exports.updateMaintenance = asyncHandler(async (req, res) => {
  const log = await MaintenanceLog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).populate('vehicle', 'name registrationNumber');

  if (!log) throw new NotFoundError('Maintenance log not found');
  return ApiResponse.success(res, { log }, 'Maintenance log updated successfully');
});
