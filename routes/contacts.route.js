import express from "express";
import authMiddleware from '../middleware/authMiddleware.js'

import {
  getTrustedContacts,
} from "../controller/contactsController.js";

const router = express.Router();

router.route('/').get(authMiddleware, getTrustedContacts)

export default router;
