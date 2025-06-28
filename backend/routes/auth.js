const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getMe,
  verify,
  logout,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);
router.get("/verify", authMiddleware, verify);
router.post("/logout", authMiddleware, logout);

module.exports = router;
