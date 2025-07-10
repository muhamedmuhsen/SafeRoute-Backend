import express from "express";
import {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact
} from "../controller/contactsController.js";

const router = express.Router();

// Get all contacts
router.get("/", getAllContacts);

// Get a contact by ID
router.get("/:id", getContactById);

// Add a new contact
router.post("/", addContact);

// Update a contact
router.put("/:id", updateContact);

// Delete a contact
router.delete("/:id", deleteContact);

export default router;
