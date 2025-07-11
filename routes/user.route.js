import { Router } from "express";
import { getUser, getUserLocation } from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.route("/location").get(authMiddleware, getUserLocation);
router.route("/:id").get(authMiddleware, getUser);


export default router;
