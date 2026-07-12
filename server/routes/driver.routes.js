const router = require('express').Router();
const {
  createDriver,
  getDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
  getAvailableDrivers,
  getExpiringLicenses
} = require('../controllers/driver.controller');
const { protect, authorize } = require('../middleware/auth');

router.get('/available', protect, getAvailableDrivers);
router.get('/expiring', protect, getExpiringLicenses);

router.get('/', protect, getDrivers);
router.post('/', protect, authorize('fleet_manager', 'safety_officer'), createDriver);
router.get('/:id', protect, getDriverById);
router.put('/:id', protect, authorize('fleet_manager', 'safety_officer'), updateDriver);
router.delete('/:id', protect, authorize('fleet_manager'), deleteDriver);

module.exports = router;
