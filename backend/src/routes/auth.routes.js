const express = require("express");
const authController = require("../controllers/auth.controller");
const { signupvalidation } = require("../Middlewares/authvalidation");
const { loginvalidation } = require("../Middlewares/authvalidation");
const ensureAuthentication = require("../Middlewares/authmiddleware");
const router = express.Router();

router.post("/signup", signupvalidation, authController.signup);

router.post("/login", loginvalidation, authController.login);

// Protected Route
router.get("/profile", ensureAuthentication, (req, res) => {
  res.status(200).json([
    {
      name: "mobile",
      price: 10000,
    },
    {
      name: "tv",
      price: 18200,
    },
  ]);
});

module.exports = router;
