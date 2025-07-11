import asyncWrapper from "../middleware/asyncWrapper.js";
import htttpStatusText from "../utils/httpsStatusText.js";
import appError from "../utils/appError.js";
import User from "../model/user.model.js";
import httpStatusText from "../utils/httpsStatusText.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

/**
 * Register a new user
 * @route POST /auth/register
 */
const register = asyncWrapper(async (req, res, next) => {
  const user = req.body;
  if (!user) {
    return next(appError.create(
      "All fields are required",
      400,
      httpStatusText.FAIL
    ));
  }
  const oldUser = await User.findOne({ email: user.email });
  if (oldUser) {
    return next(appError.create(
      "User already exists",
      400,
      httpStatusText.FAIL
    ));
  }
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = new User({ ...user, password: hashedPassword });
  await newUser.save();
  const token = generateToken({ email: newUser.email, id: newUser._id });
  const userObj = newUser.toObject();
  delete userObj.password;
  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { user: userObj, token },
    message: "User registered successfully"
  });
});

/**
 * Login a user
 * @route POST /auth/login
 */
const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(appError.create(
      "Email and password are required",
      400,
      httpStatusText.FAIL
    ));
  }
  const searchUser = await User.findOne({ email });
  if (!searchUser) {
    return next(appError.create(
      "Email not found",
      400,
      httpStatusText.FAIL
    ));
  }
  const matchedPassword = await bcrypt.compare(password, searchUser.password);
  if (!matchedPassword) {
    return next(appError.create(
      "Invalid credentials",
      400,
      httpStatusText.FAIL
    ));
  }
  const token = generateToken({ email, id: searchUser._id });
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { token },
    message: "Login successful"
  });
});

export { register, login };
