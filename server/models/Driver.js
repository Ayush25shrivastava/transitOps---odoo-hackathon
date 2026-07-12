const mongoose = require("mongoose");

const LICENSE_CATEGORIES = ["A", "B", "C", "D", "E", "EC", "HMV", "LMV", "Other"];
const DRIVER_STATUSES = ["Available", "On Trip", "Off Duty", "Suspended"];

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Driver name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    licenseNumber: {
      type: String,
      required: [true, "License number is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    licenseCategory: {
      type: String,
      enum: { values: LICENSE_CATEGORIES, message: "Invalid license category" },
      required: [true, "License category is required"],
    },
    licenseExpiry: {
      type: Date,
      required: [true, "License expiry date is required"],
    },
    contact: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
      match: [/^\+?[\d\s\-()]{7,20}$/, "Please enter a valid contact number"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    safetyScore: {
      type: Number,
      default: 100,
      min: [0, "Safety score cannot be less than 0"],
      max: [100, "Safety score cannot exceed 100"],
    },
    status: {
      type: String,
      enum: { values: DRIVER_STATUSES, message: "Invalid driver status" },
      default: "Available",
    },
    address: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },
    // Aggregate stats
    totalTrips: {
      type: Number,
      default: 0,
    },
    totalDistance: {
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

// ─── Virtual: Is license expired ──────────────────────────────────────────────
driverSchema.virtual("isLicenseExpired").get(function () {
  return this.licenseExpiry < new Date();
});

// ─── Virtual: Is eligible for dispatch ───────────────────────────────────────
driverSchema.virtual("isEligibleForDispatch").get(function () {
  return (
    this.status === "Available" &&
    this.licenseExpiry >= new Date() &&
    this.status !== "Suspended"
  );
});

// ─── Indexes ──────────────────────────────────────────────────────────────────
driverSchema.index({ licenseNumber: 1 });
driverSchema.index({ status: 1 });
driverSchema.index({ licenseExpiry: 1 });

const Driver = mongoose.model("Driver", driverSchema);
module.exports = Driver;
