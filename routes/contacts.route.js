import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  getTrustedContacts,
  addTrustedContact,
} from "../controller/contactsController.js";

const router = express.Router();

router.route("/").get(authMiddleware, getTrustedContacts);
router.route("/").post(authMiddleware, addTrustedContact);

export default router;
