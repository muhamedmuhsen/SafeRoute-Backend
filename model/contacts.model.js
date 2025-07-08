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
    unquie:true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    //match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
}, { timestamps: true });

module.exports = mongoose.model("contacts", contactsModel);
