const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim:true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim:true,
    unique:true,
    //match: [/^\+?\d{10,15}$/, "Please enter a valid phone number"],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
}, { timestamps: true });

module.exports = mongoose.model("contacts", contactsSchema);
