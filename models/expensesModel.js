//  an amount, a date, and a description.

const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Expenses', expensesSchema);
