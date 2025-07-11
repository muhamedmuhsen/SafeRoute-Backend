import asyncWrapper from "../middleware/asyncWrapper.js";
import appError from "../utils/appError.js";
import User from "../model/user.model.js";
import SOS from "../model/sos.model.js";
import httpStatusText from "../utils/httpsStatusText.js";
import geoip from "geoip-lite";

/**
 * Trigger an SOS alert and return location if available
 * @route POST /sos/trigger
 */
const triggerSOSAlert = asyncWrapper(async (req, res, next) => {
  const ipAddr = req.headers["x-forwarded-for"] || req.ip;
  // this ip for testing
  //const ip = '8.8.8.8'
  const location = geoip.lookup(ip);
  if (location) {
    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: {
        location: {
          lat: location.ll[0],
          lng: location.ll[1],
        },
      },
      message: "Emergency assistance needed"
    });
  } else {
    return next(appError.create("Couldn't trigger alert", 400, httpStatusText.FAIL));
  }
});

/**
 * Get SOS alert history for the authenticated user
 * @route GET /sos/history
 */
const getSOSHistory = asyncWrapper(async (req, res, next) => {
  const user = req.user;
  const allSOS = await SOS.find({ user: user._id });
  if (!allSOS) {
    return next(appError.create("Couldn't get SOS alert", 404, httpStatusText.FAIL));
  }
  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { sos: allSOS },
    message: "SOS history fetched successfully"
  });
});

export { triggerSOSAlert, getSOSHistory };
