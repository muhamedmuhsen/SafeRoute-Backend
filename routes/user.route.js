/**
 * User Routes
 * @route /user
 */
import { Router } from "express";
import { getUser, getUserLocation } from "../controller/user.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/location", authMiddleware, getUserLocation);
router.get("/:id", authMiddleware, getUser);

export default router;
