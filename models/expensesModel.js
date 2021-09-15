//  an amount, a date, and a description.

const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema(
  {
    expense_id: {
      type: Number,
      unique: true,
      required: true,
      default: 0,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Expenses', expensesSchema);
