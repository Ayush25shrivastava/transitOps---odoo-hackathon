const mongoose = require("mongoose");

const TRIP_STATUSES = ["Draft", "Dispatched", "Completed", "Cancelled"];

const tripSchema = new mongoose.Schema(
  {
    tripNumber: {
      type: String,
      unique: true,
    },
    source: {
      type: String,
      required: [true, "Source location is required"],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, "Destination location is required"],
      trim: true,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: [true, "Vehicle is required"],
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: [true, "Driver is required"],
    },
    cargoWeight: {
      type: Number,
      required: [true, "Cargo weight (kg) is required"],
      min: [0, "Cargo weight must be non-negative"],
    },
    cargoDescription: {
      type: String,
      trim: true,
    },
    plannedDistance: {
      type: Number,
      required: [true, "Planned distance (km) is required"],
      min: [0, "Distance must be non-negative"],
    },
    actualDistance: {
      type: Number,
      min: [0, "Distance must be non-negative"],
    },
    startOdometer: {
      type: Number,
      min: [0, "Odometer reading must be non-negative"],
    },
    endOdometer: {
      type: Number,
      min: [0, "Odometer reading must be non-negative"],
    },
    fuelConsumed: {
      type: Number, // litres
      min: [0, "Fuel consumed must be non-negative"],
    },
    revenue: {
      type: Number,
      default: 0,
      min: [0, "Revenue must be non-negative"],
    },
    status: {
      type: String,
      enum: { values: TRIP_STATUSES, message: "Invalid trip status" },
      default: "Draft",
    },
    dispatchedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    cancelledAt: {
      type: Date,
    },
    cancelReason: {
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

tripSchema.virtual("fuelEfficiency").get(function () {
  if (this.fuelConsumed && this.fuelConsumed > 0 && this.actualDistance) {
    return parseFloat((this.actualDistance / this.fuelConsumed).toFixed(2));
  }
  return null;
});

tripSchema.pre("save", async function (next) {
  if (!this.tripNumber) {
    const count = await mongoose.model("Trip").countDocuments();
    this.tripNumber = `TRP-${String(count + 1).padStart(5, "0")}`;
  }
  next();
});

tripSchema.index({ status: 1 });
tripSchema.index({ vehicle: 1 });
tripSchema.index({ driver: 1 });
tripSchema.index({ createdAt: -1 });
tripSchema.index({ tripNumber: 1 });

const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;
