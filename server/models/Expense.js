const mongoose = require("mongoose");

const EXPENSE_TYPES = ["Fuel", "Toll", "Maintenance", "Driver Allowance", "Permit", "Insurance", "Repair", "Other"];

const expenseSchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: { values: EXPENSE_TYPES, message: "Invalid expense type" },
      required: [true, "Expense type is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount must be non-negative"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now,
    },
    description: {
      type: String,
      trim: true,
    },
    receiptRef: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────
expenseSchema.index({ vehicle: 1 });
expenseSchema.index({ type: 1 });
expenseSchema.index({ date: -1 });
expenseSchema.index({ trip: 1 });

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
