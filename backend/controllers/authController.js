const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    // Return user data without password
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    res.status(201).json({
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup failed" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    // Return user data without password
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    res.json({
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    console.error("GetMe error:", error);
    res.status(500).json({ message: "Failed to get profile" });
  }
};

// Verify token endpoint
exports.verify = async (req, res) => {
  try {
    // The authMiddleware has already verified the token and set req.user
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    res.json({ user: userResponse });
  } catch (error) {
    console.error("Verify error:", error);
    res.status(500).json({ message: "Token verification failed" });
  }
};

// Logout endpoint
exports.logout = async (req, res) => {
  try {
    // Since JWT is stateless, we can't invalidate it on the server
    // But we can implement a blacklist or use refresh tokens for better security
    // For now, we'll just return a success response
    // The client should delete the token from storage

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Logout failed" });
  }
};
