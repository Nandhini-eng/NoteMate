const axios = require("axios");

const BASE_URL = "http://localhost:5000/api";

// Test data
const testUser = {
  name: "Test User",
  email: "test@example.com",
  password: "password123",
};

let authToken = "";

async function testAuthEndpoints() {
  console.log("🧪 Testing Authentication Endpoints...\n");

  try {
    // Test 1: Signup
    console.log("1. Testing Signup...");
    const signupResponse = await axios.post(
      `${BASE_URL}/auth/signup`,
      testUser
    );
    console.log("✅ Signup successful:", signupResponse.data);
    authToken = signupResponse.data.token;
    console.log("");

    // Test 2: Login
    console.log("2. Testing Login...");
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password,
    });
    console.log("✅ Login successful:", loginResponse.data);
    console.log("");

    // Test 3: Verify Token
    console.log("3. Testing Token Verification...");
    const verifyResponse = await axios.get(`${BASE_URL}/auth/verify`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log("✅ Token verification successful:", verifyResponse.data);
    console.log("");

    // Test 4: Get Me
    console.log("4. Testing Get Me...");
    const getMeResponse = await axios.get(`${BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log("✅ Get Me successful:", getMeResponse.data);
    console.log("");

    // Test 5: Logout
    console.log("5. Testing Logout...");
    const logoutResponse = await axios.post(
      `${BASE_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log("✅ Logout successful:", logoutResponse.data);
    console.log("");

    console.log("🎉 All tests passed!");
  } catch (error) {
    console.error("❌ Test failed:", error.response?.data || error.message);
  }
}

// Run the tests
testAuthEndpoints();
