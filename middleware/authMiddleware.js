import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import asyncWrapper from "./asyncWrapper.js";
import httpStatusText from "../utils/httpsStatusText.js";
import appError from "../utils/appError.js";

/**
 * Authentication middleware to verify JWT and attach user to request
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const authMiddleware = asyncWrapper(async (req, res, next) => {
  const { authorization: authHeader } = req.headers;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(appError.create("Unauthorized user", 401, httpStatusText.FAIL));
  }
  try {
    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.id);
    if (!user) {
      return next(appError.create("User not found", 404, httpStatusText.FAIL));
    }
    req.user = user;
    next();
  } catch (error) {
    return next(appError.create("Invalid token", 401, httpStatusText.ERROR));
  }
});

export default authMiddleware;
