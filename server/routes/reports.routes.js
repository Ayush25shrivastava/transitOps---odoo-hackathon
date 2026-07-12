const router = require('express').Router();
const {
  getFuelEfficiency,
  getFleetUtilization,
  getOperationalCost,
  getVehicleROI,
  exportCSV
} = require('../controllers/reports.controller');
const { protect } = require('../middleware/auth');

router.get('/fuel-efficiency', protect, getFuelEfficiency);
router.get('/fleet-utilization', protect, getFleetUtilization);
router.get('/operational-cost', protect, getOperationalCost);
router.get('/vehicle-roi', protect, getVehicleROI);
router.get('/export/csv', protect, exportCSV);

module.exports = router;
