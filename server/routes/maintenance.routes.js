const router = require('express').Router();
const {
  createMaintenance,
  closeMaintenance,
  getMaintenanceLogs,
  getMaintenanceById,
  updateMaintenance
} = require('../controllers/maintenance.controller');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, getMaintenanceLogs);
router.post('/', protect, authorize('fleet_manager'), createMaintenance);
router.get('/:id', protect, getMaintenanceById);
router.put('/:id', protect, authorize('fleet_manager'), updateMaintenance);
router.put('/:id/close', protect, authorize('fleet_manager'), closeMaintenance);

module.exports = router;
