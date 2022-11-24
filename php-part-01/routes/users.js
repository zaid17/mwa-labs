const express = require("express");
const usersController = require("../controller/users");
const router = express.Router();

router.route("/").post(usersController.addOne);

module.exports = router;