import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import asyncWrapper from "./asyncWrapper.js";
import httpStatusText from "../utils/httpsStatusText.js";
import appError from "../utils/appError.js";

const authMiddleware = asyncWrapper(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Fix: Correct property and method name
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ status: httpStatusText.FAIL, message: "unauthorized user" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decode.id);
    
    if (!user) {
      const err = appError.create("user not found", 404, httpStatusText.FAIL);
      return next(err);
    }

    req.user = user;
    next();
  } catch (error) {
    const err = appError.create("invalid token", 401, httpStatusText.ERROR);
    return next(err);
  }
});

export default authMiddleware;
