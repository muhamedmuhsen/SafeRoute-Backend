import asyncWrapper from "../middleware/asyncWrapper.js";
import appError from "../utils/appError.js";
import Contact from "../model/contacts.model.js";
import httpStatusText from "../utils/httpsStatusText.js";
import User from "../model/user.model.js";

/**
 * Get all trusted contacts for the authenticated user
 * @route GET /contacts
 */
const getTrustedContacts = asyncWrapper(async (req, res, next) => {
  const userId = req.user._id;
  const contacts = await Contact.find({ user: userId });
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { contacts },
    message: "Contacts fetched successfully",
  });
});

/**
 * Add a trusted contact for the authenticated user
 * @route POST /contacts
 */
const addTrustedContact = asyncWrapper(async (req, res, next) => {
  const user = req.user;
  const contact = req.body;
  if (!user) {
    return next(
      appError.create("User not authenticated", 400, httpStatusText.FAIL)
    );
  }
  if (!contact.name || !contact.phone) {
    return next(
      appError.create(
        "Contact name and phone are required",
        400,
        httpStatusText.FAIL
      )
    );
  }
  const addedContact = new Contact({
    name: contact.name,
    phone: contact.phone,
    user: user._id,
  });
  await addedContact.save();
  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { contact: addedContact },
    message: "Contact added successfully",
  });
});

const updateTrustedContact = asyncWrapper(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return next(
      appError.create("User not authenticated", 400, httpStatusText.FAIL)
    );
  }

  const updateData = req.body;

  if (!updateData.name || !updateData.phone) {
    return next(
      appError.create(
        "Contact name and phone are required",
        400,
        httpStatusText.FAIL
      )
    );
  }

  // Find the first contact for this user
  let existingContact = await Contact.findOne({ user: user._id });

  let updatedContact;

  if (existingContact) {
    // Update existing contact
    updatedContact = await Contact.findByIdAndUpdate(
      existingContact._id,
      { name: updateData.name, phone: updateData.phone },
      { new: true, runValidators: true }
    );
  } else {
    // Create new contact if none exists
    updatedContact = new Contact({
      name: updateData.name,
      phone: updateData.phone,
      user: user._id,
    });
    await updatedContact.save();
  }

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { contact: updatedContact },
    message: existingContact
      ? "Contact updated successfully"
      : "Contact created successfully",
  });
});

const deleteTrustedContact = asyncWrapper(async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return next(
      appError.create("User not authenticated", 400, httpStatusText.FAIL)
    );
  }

  const { phone } = req.body;

  if (!phone) {
    return next(
      appError.create("Contact phone is required", 400, httpStatusText.FAIL)
    );
  }

  // Find and delete the contact, ensuring it belongs to the authenticated user
  const deletedContact = await Contact.findOneAndDelete({
    phone: phone
  });

  if (!deletedContact) {
    return next(
      appError.create(
        "Contact not found or you don't have permission to delete it",
        404,
        httpStatusText.FAIL
      )
    );
  }

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { contact: deletedContact },
    message: "Contact deleted successfully",
  });
});

export {
  getTrustedContacts,
  addTrustedContact,
  updateTrustedContact,
  deleteTrustedContact,
};
