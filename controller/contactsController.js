import asyncWrapper from "../middleware/asyncWrapper.js";
import appError from "../utils/appError.js";
import Contact from "../model/contacts.model.js";
import httpStatusText from "../utils/httpsStatusText.js";
import User from "../model/user.model.js";

const getTrustedContacts = asyncWrapper(async (req, res, next) => {
  try {

    const userId = req.user._id;

    const contacts = await Contact.find({ user: userId });
    console.log(contacts);
    
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

export {
  getTrustedContacts,
};
