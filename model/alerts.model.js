import mongoose from "mongoose";

/**
 * Alert Schema
 * @typedef {Object} Alert
 * @property {Date} time - The time of the alert
 * @property {String} description - Description of the alert
 * @property {String} icon - Icon representing the alert
 */
const alertSchema = new mongoose.Schema({
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

export default mongoose.model("Alert", alertSchema);
