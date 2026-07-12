const router = require('express').Router();
const { getKPIs, getRecentTrips, getVehicleStatusSummary } = require('../controllers/dashboard.controller');
const { protect } = require('../middleware/auth');

router.get('/kpis', protect, getKPIs);
router.get('/recent-trips', protect, getRecentTrips);
router.get('/vehicle-status', protect, getVehicleStatusSummary);

module.exports = router;
