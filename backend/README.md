# NoteMate Backend API

## Authentication Endpoints

### Base URL

```
http://localhost:5000/api
```

### 1. User Registration

**POST** `/auth/signup`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

### 2. User Login

**POST** `/auth/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "jwt_token_here"
}
```

### 3. Verify Token

**GET** `/auth/verify`

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 4. Get User Profile

**GET** `/auth/me`

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 5. Logout

**POST** `/auth/logout`

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Response:**

```json
{
  "message": "Logged out successfully"
}
```

## Error Responses

All endpoints return error responses in the following format:

```json
{
  "message": "Error description"
}
```

Common HTTP status codes:

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid credentials or missing token)
- `404` - Not Found (user not found)
- `500` - Internal Server Error

## Running the Server

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables (copy from env.example):

```bash
cp env.example .env
```

3. Start the development server:

```bash
npm run dev
```

4. Test the endpoints:

```bash
node test-auth.js
```

## Environment Variables

Create a `.env` file with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/notemate
JWT_SECRET=your_jwt_secret_here
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS enabled for cross-origin requests
- Input validation and sanitization
- Secure token storage recommendations
