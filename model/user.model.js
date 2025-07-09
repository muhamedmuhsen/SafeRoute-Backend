const mongoose = require("mongoose");

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
      //match: [/^\+?\d{10,15}$/, "Please enter a valid phone number"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      //match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
      trim: true,
      // Optionally, add a URL validator here
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

module.exports = mongoose.model("users", userSchema);
