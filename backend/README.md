# NoteMate Backend API

A robust REST API backend for the NoteMate mobile application, built with Node.js, Express, and MongoDB. This server provides secure authentication, note management, and file upload capabilities for the full-stack note-taking platform.

## Overview

This backend serves as the API layer for the NoteMate React Native mobile app, handling user authentication, note CRUD operations, and image file management. Built with modern Node.js practices, it features JWT-based authentication, MongoDB integration, and comprehensive error handling.

## Tech Stack

- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer middleware
- **Security**: bcrypt for password hashing, CORS enabled
- **Validation**: Input sanitization and request validation

## Features

### Authentication System

- User registration and login with secure password hashing
- JWT token-based authentication with automatic validation
- Token verification and user profile management
- Secure logout functionality

### Note Management

- Full CRUD operations for user notes
- Pagination support for efficient data retrieval
- User-specific note isolation and security
- Real-time data synchronization capabilities

### File Management

- Image upload and storage system
- Secure file serving with proper access controls
- File validation and size restrictions
- Organized file structure for scalability

## API Endpoints

### Authentication Routes

- `POST /api/auth/signup` - User registration (returns user object and JWT token)
- `POST /api/auth/login` - User login (returns user object and JWT token)
- `GET /api/auth/verify` - Token verification (returns user object)
- `GET /api/auth/me` - Get user profile (returns user object)
- `POST /api/auth/logout` - User logout (returns success message)

### Notes Routes

- `GET /api/notes` - Get user notes with pagination
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update existing note
- `DELETE /api/notes/:id` - Delete note

### File Upload Routes

- `POST /api/upload` - Upload image files
- `GET /api/uploads/:filename` - Serve uploaded files

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- MongoDB instance
- npm or yarn package manager

### Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp env.example .env

# Start development server
npm run dev
```

### Testing

You can test the endpoints using Postman, curl, or any API testing tool.

## Environment Variables

Create a `.env` file with the following configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/notemate
JWT_SECRET=your_jwt_secret_here
```

## Security Features

- **Password Security**: bcrypt hashing with salt rounds
- **Authentication**: JWT tokens with configurable expiration
- **CORS**: Cross-origin resource sharing enabled
- **Input Validation**: Request sanitization and validation
- **Error Handling**: Comprehensive error responses without data leakage

## Project Structure

```
backend/
├── config/
│   └── db.js          # Database configuration
├── controllers/
│   ├── authController.js  # Authentication logic
│   └── noteController.js  # Note management logic
├── middleware/
│   └── authMiddleware.js  # JWT verification middleware
├── models/
│   ├── User.js        # User data model
│   └── Note.js        # Note data model
├── routes/
│   ├── auth.js        # Authentication routes
│   ├── notes.js       # Note management routes
│   └── upload.js      # File upload routes
└── server.js          # Main application entry point
```

## Key Technical Achievements

- **Scalable Architecture**: Modular design with clear separation of concerns
- **Security Implementation**: Comprehensive authentication and authorization
- **Database Design**: Efficient MongoDB schemas with proper indexing
- **API Design**: RESTful endpoints with consistent response formats
- **Error Handling**: Robust error management with meaningful responses
- **File Management**: Secure file upload and serving system

---

**Note:** This backend demonstrates modern Node.js development practices, secure API design, and scalable architecture suitable for production deployment.
