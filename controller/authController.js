import asyncWrapper from "../middleware/asyncWrapper.js";
import htttpStatusText from "../utils/httpsStatusText.js";
import appError from "../utils/appError.js";
import User from "../model/user.model.js";
import httpStatusText from "../utils/httpsStatusText.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const register = asyncWrapper(async (req, res, next) => {
  const user = req.body;

  // Check for required fields
  if (!user) {
    // check if trusted contacts will make error here ?
    const err = appError.create(
      "All fields are required",
      400,
      httpStatusText.FAIL
    );
    return next(err);
  }

  const oldUser = await User.findOne({ email: email });

  if (oldUser) {
    const err = appError.create(
      "user already exists",
      400,
      httpStatusText.FAIL
    );
    return next(err);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    phoneNumber,
    email,
    password: hashedPassword,
    profilePicture,
    address,
    firstSosContact,
    secondSosContact,
  });

  await newUser.save();

  const token = generateToken({ email: email, id: newUser._id });

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

  const searchUser = await User.findOne({ email: email });

  if (!searchUser) {
    const err = appError.create("Email not fonud", 400, htttpStatusText.FAIL);
    return next(err);
  }

  const matchedPassword = await bcrypt.compare(password, searchUser.password);

  if (!matchedPassword) {
    const err = appError.create(
      "Invalid credentials",
      400,
      httpStatusText.FAIL
    );
    return next(err);
  }

  // generate token
  const token = generateToken({ email: email, id: searchUser._id });

  res.status(200).json({ status: htttpStatusText.SUCCESS, data: { token } });
});

export { register, login };
