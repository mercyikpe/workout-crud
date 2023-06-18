const express = require("express");
const { loginUser, signupUser } = require("../controllers/userController");

const router = express.Router();

// GET - login a user
router.post("/login", loginUser);

// POST - signup a new user
router.post("/signup", signupUser);

module.exports = router;
