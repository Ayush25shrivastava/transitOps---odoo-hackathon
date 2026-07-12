const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const { ConflictError, BadRequestError } = require('../utils/apiErrors');
const User = require('../models/User');

// ─── Register ─────────────────────────────────────────────────────────────────
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const existing = await User.findOne({ email: email.toLowerCase().trim() });
  if (existing) {
    throw new ConflictError('An account with this email already exists');
  }

  const user = await User.create({ name, email, password, role });

  const token = user.generateJWT();

  // Return user without password
  const userObj = user.toObject();
  delete userObj.password;

  return ApiResponse.created(res, { token, user: userObj }, 'Account registered successfully');
});

// ─── Login ────────────────────────────────────────────────────────────────────
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Email and password are required');
  }

  // select +password because it's excluded by default
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
  if (!user) {
    throw new BadRequestError('Invalid email or password');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new BadRequestError('Invalid email or password');
  }

  if (!user.isActive) {
    throw new BadRequestError('Your account has been deactivated. Contact an administrator.');
  }

  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  const token = user.generateJWT();

  const userObj = user.toObject();
  delete userObj.password;

  return ApiResponse.success(res, { token, user: userObj }, 'Login successful');
});

// ─── Get Me ───────────────────────────────────────────────────────────────────
exports.getMe = asyncHandler(async (req, res) => {
  return ApiResponse.success(res, { user: req.user }, 'User fetched successfully');
});
