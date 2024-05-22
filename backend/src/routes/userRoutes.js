const express = require("express");
const router = express.Router();

const { fetchUsersLength } = require("../controllers/userController");

router.get("/users-length", fetchUsersLength);

module.exports = router;
