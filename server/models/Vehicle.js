const mongoose = require("mongoose");

const VEHICLE_TYPES = ["Truck", "Van", "Pickup", "Tanker", "Trailer", "Bus", "Car", "Other"];
const VEHICLE_STATUSES = ["Available", "On Trip", "In Shop", "Retired"];

const vehicleSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: String,
      required: [true, "Registration number is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: [true, "Vehicle name/model is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: { values: VEHICLE_TYPES, message: "Invalid vehicle type" },
      required: [true, "Vehicle type is required"],
    },
    maxLoadCapacity: {
      type: Number,
      required: [true, "Maximum load capacity (kg) is required"],
      min: [0, "Capacity must be a positive number"],
    },
    odometer: {
      type: Number,
      default: 0,
      min: [0, "Odometer reading cannot be negative"],
    },
    acquisitionCost: {
      type: Number,
      required: [true, "Acquisition cost is required"],
      min: [0, "Cost must be a positive number"],
    },
    status: {
      type: String,
      enum: { values: VEHICLE_STATUSES, message: "Invalid vehicle status" },
      default: "Available",
    },
    region: {
      type: String,
      trim: true,
      default: "General",
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },
    totalRevenue: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

vehicleSchema.index({ registrationNumber: 1 });
vehicleSchema.index({ status: 1 });
vehicleSchema.index({ type: 1 });
vehicleSchema.index({ region: 1 });

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;
