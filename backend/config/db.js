const mongoose = require("mongoose");

const connectDB = async () => {
  // Check if MONGO_URI is defined
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI environment variable is not defined");
    console.log("📝 Please create a .env file in the backend directory with:");
    console.log("MONGO_URI=mongodb://localhost:27017/notemate");
    console.log("Or for MongoDB Atlas:");
    console.log(
      "MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/notemate?retryWrites=true&w=majority"
    );
    process.exit(1);
  }

  console.log("🔗 Attempting to connect to MongoDB...");

  // Parse and validate connection string
  const connectionString = process.env.MONGO_URI;
  console.log("📍 Connection string format check:");

  if (connectionString.includes("mongodb+srv://")) {
    console.log("   ✅ Using MongoDB Atlas (cloud) connection");
    // Extract username from connection string for debugging
    const usernameMatch = connectionString.match(/mongodb\+srv:\/\/([^:]+):/);
    if (usernameMatch) {
      console.log(`   👤 Username: ${usernameMatch[1]}`);
    }
  } else if (connectionString.includes("mongodb://")) {
    console.log("   ✅ Using local MongoDB connection");
    if (connectionString.includes("@")) {
      console.log("   ⚠️  Local connection with authentication");
    } else {
      console.log("   ✅ Local connection without authentication");
    }
  } else {
    console.log("   ❌ Invalid connection string format");
  }

  // Hide credentials in logs
  const maskedConnection = connectionString.replace(
    /\/\/[^:]+:[^@]+@/,
    "//***:***@"
  );
  console.log("📍 Masked connection string:", maskedConnection);

  try {
    const conn = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);

    // Provide specific guidance based on error type
    if (error.code === "ENOTFOUND") {
      console.log("💡 This usually means:");
      console.log("   - Your MongoDB connection string is incorrect");
      console.log(
        "   - You're trying to connect to a non-existent MongoDB instance"
      );
      console.log("   - Network connectivity issues");
    } else if (error.code === "ECONNREFUSED") {
      console.log("💡 This usually means:");
      console.log("   - MongoDB server is not running");
      console.log("   - Wrong port number in connection string");
    } else if (
      error.message.includes("Authentication failed") ||
      error.message.includes("bad auth")
    ) {
      console.log("🔐 AUTHENTICATION ERROR DETECTED");
      console.log("💡 This usually means:");
      console.log("   - Wrong username/password in connection string");
      console.log("   - User doesn't have access to the database");
      console.log("   - User doesn't exist in the database");
      console.log("   - Database name is incorrect");

      console.log("\n🔍 Debugging steps for authentication:");

      if (connectionString.includes("mongodb+srv://")) {
        console.log("1. Check MongoDB Atlas credentials:");
        console.log("   - Go to MongoDB Atlas dashboard");
        console.log("   - Navigate to Database Access");
        console.log("   - Verify username and password");
        console.log("   - Reset password if needed");
        console.log("2. Check database name in connection string");
        console.log("3. Ensure user has proper permissions");
      } else {
        console.log("1. Check if MongoDB requires authentication:");
        console.log(
          "   - If not, remove username:password@ from connection string"
        );
        console.log("   - Use: mongodb://localhost:27017/notemate");
        console.log("2. If yes, verify username/password in MongoDB");
        console.log("3. Check if user exists in the database");
      }

      console.log("\n🔧 Quick fixes to try:");
      console.log("1. For local MongoDB without auth:");
      console.log("   MONGO_URI=mongodb://localhost:27017/notemate");
      console.log("2. For MongoDB Atlas, get fresh connection string:");
      console.log("   - Go to Atlas → Connect → Connect your application");
      console.log("   - Copy the new connection string");
      console.log("   - Replace <password> with actual password");
    }

    console.log("\n🔧 General troubleshooting steps:");
    console.log("1. Check your .env file exists in the backend directory");
    console.log("2. Verify your MONGO_URI is correct");
    console.log("3. Ensure MongoDB is running (if using local MongoDB)");
    console.log("4. Check network connectivity (if using MongoDB Atlas)");
    console.log("5. Try connecting with MongoDB Compass to test credentials");

    process.exit(1);
  }
};

module.exports = connectDB;
