const router = require("express").Router();
const getUser = require("../controller/userController");

// router.route("/:usedId").get(userController.getAllUsers);
router.route("/:userId").get(getUser);

module.exports = router;
