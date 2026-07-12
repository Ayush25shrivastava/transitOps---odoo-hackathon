const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const { NotFoundError, BusinessRuleError } = require('../utils/apiErrors');
const Vehicle = require('../models/Vehicle');

// ─── Create Vehicle ───────────────────────────────────────────────────────────
exports.createVehicle = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (data.registrationNumber) {
    data.registrationNumber = data.registrationNumber.toUpperCase();
  }

  const vehicle = await Vehicle.create(data);
  return ApiResponse.created(res, { vehicle }, 'Vehicle created successfully');
});

// ─── Get All Vehicles ─────────────────────────────────────────────────────────
exports.getVehicles = asyncHandler(async (req, res) => {
  const { status, type, region, search, page = 1, limit = 10 } = req.query;

  const filter = {};
  if (status) filter.status = status;
  if (type) filter.type = type;
  if (region) filter.region = region;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { registrationNumber: { $regex: search, $options: 'i' } },
    ];
  }

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const [vehicles, total] = await Promise.all([
    Vehicle.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    Vehicle.countDocuments(filter),
  ]);

  return ApiResponse.paginated(res, vehicles, total, pageNum, limitNum, 'Vehicles fetched successfully');
});

// ─── Get Available Vehicles ───────────────────────────────────────────────────
exports.getAvailableVehicles = asyncHandler(async (req, res) => {
  const vehicles = await Vehicle.find({ status: 'Available' }).sort({ name: 1 });
  return ApiResponse.success(res, { vehicles }, 'Available vehicles fetched successfully');
});

// ─── Get Vehicle By ID ────────────────────────────────────────────────────────
exports.getVehicleById = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle) {
    throw new NotFoundError('Vehicle not found');
  }
  return ApiResponse.success(res, { vehicle }, 'Vehicle fetched successfully');
});

// ─── Update Vehicle ───────────────────────────────────────────────────────────
exports.updateVehicle = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (data.registrationNumber) {
    data.registrationNumber = data.registrationNumber.toUpperCase();
  }

  const vehicle = await Vehicle.findByIdAndUpdate(
    req.params.id,
    data,
    { new: true, runValidators: true }
  );

  if (!vehicle) {
    throw new NotFoundError('Vehicle not found');
  }

  return ApiResponse.success(res, { vehicle }, 'Vehicle updated successfully');
});

// ─── Delete Vehicle ───────────────────────────────────────────────────────────
exports.deleteVehicle = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle) {
    throw new NotFoundError('Vehicle not found');
  }

  if (vehicle.status === 'On Trip') {
    throw new BusinessRuleError('Cannot delete a vehicle that is currently on a trip');
  }

  await vehicle.deleteOne();
  return ApiResponse.noContent(res);
});
