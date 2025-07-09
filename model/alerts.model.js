import mongoose from "mongoose";
import { trim } from "validator";

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

export default mongoose.model("alerts", alertsSchema);
