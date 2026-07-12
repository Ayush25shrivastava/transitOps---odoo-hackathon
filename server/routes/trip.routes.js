const router = require('express').Router();
const {
  createTrip,
  getTrips,
  getTripById,
  dispatchTrip,
  completeTrip,
  cancelTrip
} = require('../controllers/trip.controller');
const { protect } = require('../middleware/auth');

router.get('/', protect, getTrips);
router.post('/', protect, createTrip);
router.get('/:id', protect, getTripById);
router.put('/:id/dispatch', protect, dispatchTrip);
router.put('/:id/complete', protect, completeTrip);
router.put('/:id/cancel', protect, cancelTrip);

module.exports = router;
