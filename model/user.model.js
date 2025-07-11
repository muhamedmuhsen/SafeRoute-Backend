import mongoose from "mongoose";

/**
 * User Schema
 * @typedef {Object} User
 * @property {String} name - Name of the user
 * @property {String} phoneNumber - Phone number of the user
 * @property {String} email - Email address of the user
 * @property {String} password - Hashed password
 * @property {String} profilePicture - URL to profile picture
 * @property {String} address - Address of the user
 * @property {String} firstSosContact - First SOS contact
 * @property {String} secondSosContact - Second SOS contact
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    firstSosContact: {
      type: String,
      required: true,
      trim: true,
    },
    secondSosContact: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
