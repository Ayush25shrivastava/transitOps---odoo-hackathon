const mongoose = require("mongoose");

const fuelLogSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: [true, "Vehicle is required"],
    },
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      default: null,
    },
    liters: {
      type: Number,
      required: [true, "Fuel amount in liters is required"],
      min: [0.1, "Fuel amount must be greater than 0"],
    },
    costPerLiter: {
      type: Number,
      min: [0, "Cost per liter must be non-negative"],
    },
    totalCost: {
      type: Number,
      required: [true, "Total fuel cost is required"],
      min: [0, "Cost must be non-negative"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now,
    },
    odometerReading: {
      type: Number,
      min: [0, "Odometer must be non-negative"],
    },
    fuelStation: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ─── Pre-save: Compute costPerLiter if not provided ───────────────────────────
fuelLogSchema.pre("save", function (next) {
  if (this.liters && this.totalCost && !this.costPerLiter) {
    this.costPerLiter = parseFloat((this.totalCost / this.liters).toFixed(4));
  }
  next();
});

// ─── Indexes ──────────────────────────────────────────────────────────────────
fuelLogSchema.index({ vehicle: 1 });
fuelLogSchema.index({ date: -1 });
fuelLogSchema.index({ trip: 1 });

const FuelLog = mongoose.model("FuelLog", fuelLogSchema);
module.exports = FuelLog;
