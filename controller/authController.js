const asynWrapper = require("../middleware/asyncWrapper");
const htttpStatusText = require("../utils/httpsStatusText");
const appError = require("../utils/appError");
const user = require("../model/user.model");
const httpStatusText = require("../utils/httpsStatusText");
const bcrypt = require("bcryptjs");

const reqister = asynWrapper(async (req, res, next) => {
  const {
    name,
    phoneNumber,
    email,
    profilePicture,
    address,
    firstSosContact,
    secondSosContact,
  } = req.body;

  const oldUser = user.findOne({ email: email });

  if (oldUser) {
    const err = appError.create("user already exits", 400, httpStatusText.FAIL);
    next(err);
  }

  const hasedPassword = bcrypt.hash(user.password, 10);

  const newUser = new user({
    name,
    phoneNumber,
    email,
    profilePicture,
    address,
    firstSosContact,
    secondSosContact,
  });
  // generate token JWT
  
  await newUser.save();
  res.status(201).json({ status: httpStatusText.SUCCESS, data: newUser });
});

const login = asynWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && !password) {
    const err = appError.create(
      "Email and password are requierd",
      400,
      htttpStatusText.FAIL
    );
    return next(err);
  }

  const user = await user.findOne({ email: email });

  if (!user) {
    const err = appError.create("Email not fonud", 400, htttpStatusText.FAIL);
    return next(err);
  }

  const matchedPassword = bcrypt.compare(password, user.password);

  if (!(user && matchedPassword)) {
    const err = appError.create(
      "something went wrong",
      500,
      httpStatusText.ERROR
    );
    next(err)
  }

  // generate token

  res.status(200).json({status:htttpStatusText.SUCCESS, data:{//token}})
});

module.exports = {
  getAllUsers,
  reqister,
  login,
};
