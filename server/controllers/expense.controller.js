const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const { NotFoundError } = require('../utils/apiErrors');
const Expense = require('../models/Expense');

// ─── Create Expense ───────────────────────────────────────────────────────────
exports.createExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.create({
    ...req.body,
    createdBy: req.user._id,
  });

  return ApiResponse.created(res, { expense }, 'Expense created successfully');
});

// ─── Get All Expenses ─────────────────────────────────────────────────────────
exports.getExpenses = asyncHandler(async (req, res) => {
  const { vehicle, type, dateFrom, dateTo, page = 1, limit = 10 } = req.query;

  const filter = {};
  if (vehicle) filter.vehicle = vehicle;
  if (type) filter.type = type;
  if (dateFrom || dateTo) {
    filter.date = {};
    if (dateFrom) filter.date.$gte = new Date(dateFrom);
    if (dateTo) filter.date.$lte = new Date(dateTo);
  }

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const [expenses, total] = await Promise.all([
    Expense.find(filter)
      .populate('vehicle', 'name registrationNumber')
      .sort({ date: -1 })
      .skip(skip)
      .limit(limitNum),
    Expense.countDocuments(filter),
  ]);

  return ApiResponse.paginated(res, expenses, total, pageNum, limitNum, 'Expenses fetched successfully');
});

// ─── Get Expense By ID ────────────────────────────────────────────────────────
exports.getExpenseById = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id)
    .populate('vehicle', 'name registrationNumber')
    .populate('trip', 'tripNumber source destination');

  if (!expense) throw new NotFoundError('Expense not found');
  return ApiResponse.success(res, { expense }, 'Expense fetched successfully');
});

// ─── Delete Expense ───────────────────────────────────────────────────────────
exports.deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (!expense) throw new NotFoundError('Expense not found');

  await expense.deleteOne();
  return ApiResponse.noContent(res);
});
