import asyncWrapper from "../middleware/asyncWrapper.js";
import appError from "../utils/appError.js";
import Contact from "../model/contacts.model.js";
import httpStatusText from "../utils/httpsStatusText.js";
import User from "../model/user.model.js";

const getTrustedContacts = asyncWrapper(async (req, res, next) => {
  try {
    const userId = req.user._id;

    const contacts = await Contact.find({ user: userId });


    res
      .status(200)
      .json({ success: httpStatusText.SUCCESS, data: { contacts } });
  } catch (error) {
    const err = appError.create(
      "Error fetching contacts",
      500,
      httpStatusText.ERROR
    );
    return next(err);
  }
});

const addTrustedContact = asyncWrapper(async (req, res, next) => {
  try {
    const user = req.user;
    const contact = req.body;

    if (!user) {
      const err = appError.create(
        "error while getting the user",
        400,
        httpStatusText.FAIL
      );
      return next(err);
    }

    if (!contact.name || !contact.phone) {
      const err = appError.create(
        "Contact name and phone are required",
        400,
        httpStatusText.FAIL
      );
      return next(err);
    }

    const addedContact = new Contact({
      name: contact.name,
      phone: contact.phone,
      user: user._id,
    });

    await addedContact.save();

    res.status(201).json({ status: httpStatusText.SUCCESS, data: addedContact });
  } catch (error) {
    const err = appError.create(
      "Error while adding contacts",
      500,
      httpStatusText.ERROR
    );
    return next(err);
  }
});

export { getTrustedContacts, addTrustedContact };
