require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");
const uploadRoutes = require("./routes/upload");

const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/files", express.static("uploads"));

// Mount routes under /api prefix to match frontend expectations
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
