const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const { NotFoundError, BusinessRuleError } = require('../utils/apiErrors');
const Driver = require('../models/Driver');

// ─── Create Driver ────────────────────────────────────────────────────────────
exports.createDriver = asyncHandler(async (req, res) => {
  const driver = await Driver.create(req.body);
  return ApiResponse.created(res, { driver }, 'Driver created successfully');
});

// ─── Get All Drivers ──────────────────────────────────────────────────────────
exports.getDrivers = asyncHandler(async (req, res) => {
  const { status, licenseCategory, search, page = 1, limit = 10 } = req.query;

  const filter = {};
  if (status) filter.status = status;
  if (licenseCategory) filter.licenseCategory = licenseCategory;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { licenseNumber: { $regex: search, $options: 'i' } },
    ];
  }

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const [drivers, total] = await Promise.all([
    Driver.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    Driver.countDocuments(filter),
  ]);

  return ApiResponse.paginated(res, drivers, total, pageNum, limitNum, 'Drivers fetched successfully');
});

// ─── Get Available Drivers ────────────────────────────────────────────────────
exports.getAvailableDrivers = asyncHandler(async (req, res) => {
  const drivers = await Driver.find({
    status: 'Available',
    licenseExpiry: { $gt: new Date() },
  }).sort({ name: 1 });

  return ApiResponse.success(res, { drivers }, 'Available drivers fetched successfully');
});

// ─── Get Expiring Licenses (within next 30 days) ──────────────────────────────
exports.getExpiringLicenses = asyncHandler(async (req, res) => {
  const now = new Date();
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const drivers = await Driver.find({
    licenseExpiry: { $gt: now, $lte: thirtyDaysFromNow },
  }).sort({ licenseExpiry: 1 });

  return ApiResponse.success(res, { drivers }, 'Expiring licenses fetched successfully');
});

// ─── Get Driver By ID ─────────────────────────────────────────────────────────
exports.getDriverById = asyncHandler(async (req, res) => {
  const driver = await Driver.findById(req.params.id);
  if (!driver) {
    throw new NotFoundError('Driver not found');
  }
  return ApiResponse.success(res, { driver }, 'Driver fetched successfully');
});

// ─── Update Driver ────────────────────────────────────────────────────────────
exports.updateDriver = asyncHandler(async (req, res) => {
  const driver = await Driver.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!driver) {
    throw new NotFoundError('Driver not found');
  }

  return ApiResponse.success(res, { driver }, 'Driver updated successfully');
});

// ─── Delete Driver ────────────────────────────────────────────────────────────
exports.deleteDriver = asyncHandler(async (req, res) => {
  const driver = await Driver.findById(req.params.id);
  if (!driver) {
    throw new NotFoundError('Driver not found');
  }

  if (driver.status === 'On Trip') {
    throw new BusinessRuleError('Cannot delete a driver who is currently on a trip');
  }

  await driver.deleteOne();
  return ApiResponse.noContent(res);
});
