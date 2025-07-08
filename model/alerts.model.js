const mongoose = require("mongoose");
const { trim } = require("validator");

const alertsSchema = new mongoose.Schema({
  time: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  icon: {
    type: String,
    required: true,
    trim: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("alerts", alertsSchema);
