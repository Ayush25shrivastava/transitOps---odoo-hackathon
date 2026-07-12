const router = require('express').Router();
const {
  createExpense,
  getExpenses,
  getExpenseById,
  deleteExpense
} = require('../controllers/expense.controller');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, getExpenses);
router.post('/', protect, createExpense);
router.get('/:id', protect, getExpenseById);
router.delete('/:id', protect, authorize('fleet_manager', 'financial_analyst'), deleteExpense);

module.exports = router;
