const router = require("express").Router();
const userController = require("../controller/authController");

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);

module.exports = router;
