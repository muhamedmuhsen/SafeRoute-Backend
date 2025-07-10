import asyncWrapper from "../middleware/asyncWrapper.js";
import appError from "../utils/appError.js";
import contacts from "../model/contacts.model.js";
import httpStatusText from "../utils/httpsStatusText.js";

// Get all contacts
const getAllContacts = asyncWrapper(async (req, res, next) => {
  const allContacts = await contacts.find();
  res.status(200).json({ success: httpStatusText.SUCCESS, data: allContacts });
});

// Get a contact by ID
const getContactById = asyncWrapper(async (req, res, next) => {
  const contact = await contacts.findById(req.params.id);
  if (!contact) {
    return next(appError.create("Contact not found", 404, httpStatusText.FAIL));
  }
  res.status(200).json({ success: httpStatusText.SUCCESS, data: contact });
});

// Add a new contact
const addContact = asyncWrapper(async (req, res, next) => {
  const newContact = await contacts.create(req.body);
  res.status(201).json({ success: httpStatusText.SUCCESS, data: newContact });
});

// Update a contact
const updateContact = asyncWrapper(async (req, res, next) => {
  const updatedContact = await contacts.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!updatedContact) {
    return next(appError.create("Contact not found", 404, httpStatusText.FAIL));
  }
  res
    .status(200)
    .json({ success: httpStatusText.SUCCESS, data: updatedContact });
});

// Delete a contact
const deleteContact = asyncWrapper(async (req, res, next) => {
  const deletedContact = await contacts.findByIdAndDelete(req.params.id);
  if (!deletedContact) {
    return next(appError.create("Contact not found", 404, httpStatusText.FAIL));
  }
  res
    .status(200)
    .json({ success: httpStatusText.SUCCESS, data: deletedContact });
});

export {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
};
