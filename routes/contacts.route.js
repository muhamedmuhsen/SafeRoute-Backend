/**
 * Contacts Routes
 * @route /contacts
 */
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getTrustedContacts,
  addTrustedContact,
  updateTrustedContact,
  deleteTrustedContact
} from "../controller/contacts.controller.js";

const router = Router();

router.get("/", authMiddleware, getTrustedContacts);
router.post("/", authMiddleware, addTrustedContact);
router.put("/", authMiddleware, updateTrustedContact);
router.delete("/", authMiddleware, deleteTrustedContact);

export default router;
