import mongoose from "mongoose";

/**
 * Contact Schema
 * @typedef {Object} Contact
 * @property {String} name - Name of the contact
 * @property {String} phone - Phone number of the contact
 * @property {mongoose.ObjectId} user - Reference to the user
 */
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Contact", contactSchema);
