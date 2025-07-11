import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

/**
 * SOS Schema
 * @typedef {Object} Sos
 * @property {mongoose.ObjectId} user - Reference to the user
 * @property {Object} location - Location object with lat/lng
 * @property {String} message - SOS message
 * @property {String} status - Status of the SOS alert
 */
export const SosStatus = {
  ACTIVE: "active",
  RESOLVED: "resolved",
  CANCELLED: "cancelled", 
};

const SosSchema = new Schema(
  {
    user: { type: ObjectId, ref: "User" },
    location: {
      lat: Number,
      lng: Number,
    },
    message: String,
    status: {
      type: String,
      required: true,
      enum: [SosStatus.ACTIVE, SosStatus.CANCELLED, SosStatus.RESOLVED],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Sos", SosSchema);
