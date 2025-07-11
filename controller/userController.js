import asyncWrapper from "../middleware/asyncWrapper.js";
import appError from "../utils/appError.js";
import User from "../model/user.model.js";
import httpStatusText from "../utils/httpsStatusText.js";
import ip from "ip";
import geoip from "geoip-lite";

const getUser = asyncWrapper(async (req, res, next) => {
  try {
    
    const id = req.params.id;

    const user = await User.findById(id);
    //console.log(req.user);

    if (!user) {
      const err = appError.create("user not found", 400, httpStatusText.FAIL);
      return next(err);
    }

    const obj = user.toObject();
    delete obj.password;

    return res.status(200).json({ succes: httpStatusText.SUCCESS, data: obj });
  } catch (error) {
    const err = appError.create(
      "couldn't get the user",
      500,
      httpStatusText.ERROR
    );
    return next(err);
  }
});

const getUserLocation = asyncWrapper(async (req, res, next) => {
  try {

    const user = req.user;
    
    if (!user) {
      return res.status(404).json({ success: httpStatusText.FAIL, message: "User not found" });
    }

    // Get the client's IP address ' the location will be null because the ipAdrr will be local host and GeoIP databases do not provide location data for private or local addresses like 127.0.0.1 or ::1.'
    const ipAddr = req.headers["x-forwarded-for"] || req.ip;
    const location = geoip.lookup(ipAddr);
    console.log(`ip address: `+ipAddr,`location: `+ location);

    //for testing 
    // const ipAddr = "8.8.8.8"; // Google's public DNS, for example
    // const location = geoip.lookup(ipAddr);
    
    if (location) {
      return res.status(200).json({ success: httpStatusText.SUCCESS, data: location });
    } else {
      const range = geoip.range(ipAddr);
      if (range) {
        return res.status(200).json({ success: httpStatusText.SUCCESS, data: range });
      } else {
        return res.status(404).json({ success: httpStatusText.FAIL, message: "Location not found" });
      }
    }
  } catch (error) {
    return res.status(500).json({ success: httpStatusText.ERROR, message: "Error looking up location" });
  }
});

export { getUser, getUserLocation };
