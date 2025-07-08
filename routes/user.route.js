const router = require("express").Router;

router.route("/").get(userController.getAllUsers);
router.route("/reqister").post(userController.reqister);
router.route("/login").post(userController.login);

module.exports = router;
