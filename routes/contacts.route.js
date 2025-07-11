/**
 * Contacts Routes
 * @route /contacts
 */
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getTrustedContacts, addTrustedContact } from "../controller/contacts.controller.js";

const router = Router();

router.get("/", authMiddleware, getTrustedContacts);
router.post("/", authMiddleware, addTrustedContact);

export default router;
