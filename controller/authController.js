const asyncWrapper = require("../middleware/asyncWrapper");
const htttpStatusText = require("../utils/httpsStatusText");
const appError = require("../utils/appError");
const user = require("../model/user.model");
const httpStatusText = require("../utils/httpsStatusText");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const register = asyncWrapper(async (req, res, next) => {
  const {
    name,
    phoneNumber,
    email,
    password,
    profilePicture,
    address,
    firstSosContact,
    secondSosContact,
  } = req.body;

  const oldUser = await user.findOne({ email: email });

  if (oldUser) {
    const err = appError.create(
      "user already exists",
      400,
      httpStatusText.FAIL
    );
    return next(err);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new user({
    name,
    phoneNumber,
    email,
    password: hashedPassword,
    profilePicture,
    address,
    firstSosContact,
    secondSosContact,
  });

  const token = generateToken({ email: email, id: newUser._id });

  await newUser.save();

  // Remove password before sending response
  const userObj = newUser.toObject();
  delete userObj.password;

  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { user: userObj, token } });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const err = appError.create(
      "Email and password are requierd",
      400,
      htttpStatusText.FAIL
    );
    return next(err);
  }

  const searchUser = await user.findOne({ email: email });

  if (!searchUser) {
    const err = appError.create("Email not fonud", 400, htttpStatusText.FAIL);
    return next(err);
  }

  const matchedPassword = await bcrypt.compare(password, searchUser.password);

  if (!(searchUser && matchedPassword)) {
    const err = appError.create(
      "something went wrong",
      500,
      httpStatusText.ERROR
    );
    next(err);
  }

  // generate token
  const token = generateToken({ email: email, id: searchUser._id });

  res.status(200).json({ status: htttpStatusText.SUCCESS, data: { token } });
});

module.exports = {
  register,
  login
};
