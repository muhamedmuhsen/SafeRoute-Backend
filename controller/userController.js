import asyncWrapper from "../middleware/asyncWrapper.js";
import appError from "../utils/appError.js";
import users from "../model/user.model.js";
import httpStatusText from "../utils/httpsStatusText.js";

const getUser = asyncWrapper(async (req, res, next) => {
  try {
    const id = req.params.userId;

    const user = await users.findById(id);

    if (!user) {
      const err = appError.create("user not found", 400, httpStatusText.FAIL);
      return next(err);
    }

    const obj = user.toObject();
    delete obj.password;

    return res.status(200).json({ succes: httpStatusText.SUCCESS, data: obj });
  } catch (error) {
    const err = appError.create(
      "something went wrong",
      500,
      httpStatusText.ERROR
    );
    return next(err);
  }
});

export { getUser };
