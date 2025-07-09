import { Router } from "express";
import { getUser } from "../controller/userController.js";

const router = Router();

router.route("/:id").get(getUser);

export default router;
