/**
 * SOS Routes
 * @route /sos
 */
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { triggerSOSAlert, getSOSHistory } from "../controller/sos.controller.js";

const router = Router();

router.post("/", authMiddleware, triggerSOSAlert);
router.get("/history", authMiddleware, getSOSHistory);

export default router;
