const router = require('express').Router();
const {
  createFuelLog,
  getFuelLogs,
  getFuelLogById,
  deleteFuelLog
} = require('../controllers/fuel.controller');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, getFuelLogs);
router.post('/', protect, createFuelLog);
router.get('/:id', protect, getFuelLogById);
router.delete('/:id', protect, authorize('fleet_manager', 'financial_analyst'), deleteFuelLog);

module.exports = router;
