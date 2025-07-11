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
    message: "Contacts fetched successfully"
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
    return next(appError.create(
      "User not authenticated",
      400,
      httpStatusText.FAIL
    ));
  }
  if (!contact.name || !contact.phone) {
    return next(appError.create(
      "Contact name and phone are required",
      400,
      httpStatusText.FAIL
    ));
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
    message: "Contact added successfully"
  });
});

export { getTrustedContacts, addTrustedContact };
