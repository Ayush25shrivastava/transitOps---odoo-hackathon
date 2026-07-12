const router = require('express').Router();
const {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  getAvailableVehicles,
} = require('../controllers/vehicle.controller');
const { protect, authorize } = require('../middleware/auth');

// GET /available — must come before /:id
router.get('/available', protect, getAvailableVehicles);

router.get('/', protect, getVehicles);
router.post('/', protect, authorize('fleet_manager'), createVehicle);

router.get('/:id', protect, getVehicleById);
router.put('/:id', protect, authorize('fleet_manager'), updateVehicle);
router.delete('/:id', protect, authorize('fleet_manager'), deleteVehicle);

module.exports = router;
