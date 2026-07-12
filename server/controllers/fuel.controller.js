const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const { NotFoundError } = require('../utils/apiErrors');
const FuelLog = require('../models/FuelLog');

// ─── Create Fuel Log ──────────────────────────────────────────────────────────
exports.createFuelLog = asyncHandler(async (req, res) => {
  const log = await FuelLog.create({
    ...req.body,
    createdBy: req.user._id,
  });

  return ApiResponse.created(res, { log }, 'Fuel log created successfully');
});

// ─── Get All Fuel Logs ────────────────────────────────────────────────────────
exports.getFuelLogs = asyncHandler(async (req, res) => {
  const { vehicle, dateFrom, dateTo, page = 1, limit = 10 } = req.query;

  const filter = {};
  if (vehicle) filter.vehicle = vehicle;
  if (dateFrom || dateTo) {
    filter.date = {};
    if (dateFrom) filter.date.$gte = new Date(dateFrom);
    if (dateTo) filter.date.$lte = new Date(dateTo);
  }

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const [logs, total] = await Promise.all([
    FuelLog.find(filter)
      .populate('vehicle', 'name registrationNumber')
      .sort({ date: -1 })
      .skip(skip)
      .limit(limitNum),
    FuelLog.countDocuments(filter),
  ]);

  return ApiResponse.paginated(res, logs, total, pageNum, limitNum, 'Fuel logs fetched successfully');
});

// ─── Get Fuel Log By ID ───────────────────────────────────────────────────────
exports.getFuelLogById = asyncHandler(async (req, res) => {
  const log = await FuelLog.findById(req.params.id)
    .populate('vehicle', 'name registrationNumber')
    .populate('trip', 'tripNumber source destination');

  if (!log) throw new NotFoundError('Fuel log not found');
  return ApiResponse.success(res, { log }, 'Fuel log fetched successfully');
});

// ─── Delete Fuel Log ──────────────────────────────────────────────────────────
exports.deleteFuelLog = asyncHandler(async (req, res) => {
  const log = await FuelLog.findById(req.params.id);
  if (!log) throw new NotFoundError('Fuel log not found');

  await log.deleteOne();
  return ApiResponse.noContent(res);
});
