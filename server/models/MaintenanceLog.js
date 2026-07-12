const mongoose = require("mongoose");

const MAINTENANCE_TYPES = [
  "Oil Change",
  "Tire Replacement",
  "Brake Service",
  "Engine Repair",
  "Transmission Service",
  "Electrical Repair",
  "Body Work",
  "Inspection",
  "Other",
];

const MAINTENANCE_STATUSES = ["Active", "Closed"];

const maintenanceLogSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: [true, "Vehicle is required"],
    },
    type: {
      type: String,
      enum: { values: MAINTENANCE_TYPES, message: "Invalid maintenance type" },
      required: [true, "Maintenance type is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    cost: {
      type: Number,
      default: 0,
      min: [0, "Cost must be non-negative"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: { values: MAINTENANCE_STATUSES, message: "Invalid status" },
      default: "Active",
    },
    technician: {
      type: String,
      trim: true,
    },
    garage: {
      type: String,
      trim: true,
    },
    odometerAtService: {
      type: Number,
      min: [0, "Odometer must be non-negative"],
    },
    partsReplaced: {
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
      maxlength: [1000, "Notes cannot exceed 1000 characters"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ─── Virtual: Duration in days ────────────────────────────────────────────────
maintenanceLogSchema.virtual("durationDays").get(function () {
  if (this.endDate) {
    const diff = this.endDate - this.startDate;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
  return null;
});

// ─── Indexes ──────────────────────────────────────────────────────────────────
maintenanceLogSchema.index({ vehicle: 1 });
maintenanceLogSchema.index({ status: 1 });
maintenanceLogSchema.index({ startDate: -1 });

const MaintenanceLog = mongoose.model("MaintenanceLog", maintenanceLogSchema);
module.exports = MaintenanceLog;
