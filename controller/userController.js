const asyncWrapper = require("../middleware/asyncWrapper");
const users = require("../model/user.model");
const appError = require("../utils/appError");
const httpStatusText = require("../utils/httpsStatusText");

const getUser = asyncWrapper(async (req, res, next) => {
  try {
    const id = req.params.userId;

    const user = await users.findOne({ id: id });

    if (!user) {
      const err = appError.create("user not found", 400, httpStatusText.FAIL);
      return next(err);
    }

    return res.status(200).json({ succes: httpStatusText.SUCCESS, data: user });
  } catch (error) {
    const err = appError.create(
      "something went wrong",
      500,
      httpStatusText.ERROR
    );
    return next(err);
  }
});

module.exports = getUser;
