import asyncWrapper from "../middleware/asyncWrapper.js";
import appError from "../utils/appError.js";
import User from "../model/user.model.js";
import httpStatusText from "../utils/httpsStatusText.js";
import getlocation from "../utils/getLocation.js";

/**
 * Get a user by ID
 * @route GET /user/:id
 */
const getUser = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return next(appError.create("User not found", 404, httpStatusText.FAIL));
  }
  const obj = user.toObject();
  delete obj.password;
  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: obj,
    message: "User fetched successfully",
  });
});

/**
 * Get the location of the user by IP address
 * @route GET /user/location
 */
const getUserLocation = asyncWrapper(async (req, res, next) => {
  const ipAddr = req.headers["x-forwarded-for"] || req.ip;
  try {
    const location = getlocation(ipAddr);
    res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: { location },
      message: "Location fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: httpStatusText.ERROR,
      message: "Error looking up location",
    });
  }
});

export { getUser, getUserLocation };
