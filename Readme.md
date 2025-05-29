# Language Learning Social Platform - Backend

A Node.js backend API for a language learning social platform that connects language learners worldwide. Users can register, find language exchange partners, send friend requests, and chat with each other.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **User Onboarding**: Profile setup with language preferences and bio
- **Friend System**: Send, accept, and manage friend requests
- **Chat Integration**: Real-time messaging powered by Stream Chat
- **User Discovery**: Find recommended language exchange partners
- **Profile Management**: Complete user profiles with language preferences
- **Security**: Password hashing, JWT authentication, and secure cookies

## 🛠️ Technologies Used

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Real-time Chat**: Stream Chat SDK
- **Environment Management**: dotenv
- **Development**: nodemon for auto-restart

## 📁 Project Structure

```
backend/
├── controllers/           # Request handlers
│   ├── auth.controller.js    # Authentication logic
│   ├── chat.controller.js    # Chat functionality
│   └── user.controller.js    # User management
├── lib/                  # Utility libraries
│   ├── db.js                # Database connection
│   └── stream.js            # Stream Chat configuration
├── middlewares/          # Custom middleware
│   └── auth.middleware.js   # Authentication middleware
├── MODELS/               # Database models
│   ├── FriendRequest.js     # Friend request schema
│   └── User.js              # User schema
├── routes/               # API routes
│   ├── auth.route.js        # Authentication routes
│   ├── chat.route.js        # Chat routes
│   └── user.routes.js       # User routes
├── index.js              # Application entry point
└── package.json          # Dependencies and scripts
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- Stream Chat account (for chat functionality)

### 1. Clone the repository

```bash
git clone <repository-url>
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=8080
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/language-learning-app

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# Stream Chat (Get from Stream Dashboard)
STREAM_API_KEY=your-stream-api-key
STREAM_API_SECRET=your-stream-api-secret

# Cloudinary (Get from Cloudinary Dashboard)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### 4. Start the server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:8080`

## 📚 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Logout User
```http
POST /auth/logout
```

#### Complete Onboarding
```http
PUT /auth/onboarding
Authorization: Bearer <token>
Content-Type: application/json

{
  "fullName": "John Doe",
  "bio": "Language enthusiast from New York",
  "nativeLanguage": "English",
  "learningLanguage": "Spanish",
  "location": "New York, USA"
}
```

### User Management Endpoints

#### Get Recommended Users
```http
GET /users/recommended
Authorization: Bearer <token>
```

#### Get My Friends
```http
GET /users/friends
Authorization: Bearer <token>
```

#### Send Friend Request
```http
POST /users/friend-request/:userId
Authorization: Bearer <token>
```

#### Accept Friend Request
```http
PUT /users/friend-request/:requestId/accept
Authorization: Bearer <token>
```

#### Get Friend Requests
```http
GET /users/friend-requests
Authorization: Bearer <token>
```

#### Get Outgoing Friend Requests
```http
GET /users/outgoing-friend-requests
Authorization: Bearer <token>
```

### Profile Image Management Endpoints

#### Upload Profile Image
```http
POST /users/upload-profile-picture
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
- profilePic: [image file] (required)
  - Supported formats: JPEG, PNG, GIF, WebP, BMP
  - Maximum file size: 5MB
  - Field name must be "profilePic"
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Profile picture updated successfully",
  "user": {
    "_id": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "profilePic": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/profile-pictures/abc123.jpg",
    "bio": "Language enthusiast",
    "nativeLanguage": "English",
    "learningLanguage": "Spanish",
    "location": "New York, USA",
    "isOnboarded": true
  },
  "imageUrl": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/profile-pictures/abc123.jpg"
}
```

**Error Responses:**
```json
// File too large
{
  "message": "File too large. Maximum size is 5MB."
}

// Invalid file type
{
  "message": "Only image files are allowed!"
}

// No file provided
{
  "message": "No file uploaded"
}

// Upload failed
{
  "message": "Failed to upload image: [error details]"
}

// Authentication error
{
  "message": "Unauthorized - No token provided"
}
```

#### Remove Profile Image
```http
DELETE /users/remove-profile-picture
Authorization: Bearer <token>
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Profile picture removed successfully",
  "user": {
    "_id": "user_id",
    "fullName": "John Doe",
    "email": "john@example.com",
    "profilePic": "https://avatar.iran.liara.run/public/42.png",
    "bio": "Language enthusiast",
    "nativeLanguage": "English",
    "learningLanguage": "Spanish",
    "location": "New York, USA",
    "isOnboarded": true
  }
}
```

### Chat Endpoints

#### Get Stream Chat Token
```http
GET /chat/token
Authorization: Bearer <token>
```

## 🖼️ Cloudinary Integration

The application uses Cloudinary for image storage and optimization:

### Features
- **Automatic Optimization**: Images are automatically optimized for web delivery
- **Transformation**: Profile images are resized to 400x400 pixels with face detection
- **Secure Storage**: Images stored securely in the cloud
- **CDN Delivery**: Fast global content delivery
- **Smart Cropping**: Automatic cropping with gravity focus on faces

### Image Processing Pipeline
1. **Upload**: Image received via multipart/form-data
2. **Validation**: File type and size validation
3. **Memory Storage**: Temporarily stored in server memory
4. **Cloudinary Upload**: Streamed to Cloudinary with transformations
5. **Database Update**: User profile updated with new image URL
6. **Old Image Cleanup**: Previous Cloudinary image deleted (if exists)
7. **Stream Sync**: Profile image synced with Stream Chat service

### Transformations Applied
- **Resize**: 400x400 pixels
- **Crop**: Fill with face gravity detection
- **Quality**: Auto-optimized for best performance
- **Format**: Auto-optimized format selection

## 🧪 Testing the API

You can test the API using tools like:

- **Postman**: Import the endpoints and test manually
- **Thunder Client**: VS Code extension for API testing
- **cURL**: Command-line testing

### Example cURL Request
```bash
# Register a new user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 🔄 Development Workflow

1. **Start Development Server**: `npm run dev`
2. **Make Changes**: Code changes trigger automatic restart
3. **Test Endpoints**: Use Postman or similar tools
4. **Check Logs**: Monitor console for errors and debugging info

## 📝 Scripts

- `npm start`: Start production server
- `npm run dev`: Start development server with nodemon
- `npm test`: Run tests (placeholder)

## 🐛 Error Handling

The API includes comprehensive error handling:

- **Validation Errors**: Input validation with descriptive messages
- **Authentication Errors**: Proper HTTP status codes for auth failures
- **Database Errors**: Graceful handling of MongoDB connection issues
- **Stream Chat Errors**: Fallback for chat service failures

## 🚀 Deployment

### Environment Setup
1. Set `NODE_ENV=production`
2. Use production MongoDB URI
3. Set secure JWT secret
4. Configure Stream Chat production keys

### Deployment Platforms
- **Heroku**: Easy deployment with Git integration
- **Railway**: Modern deployment platform
- **DigitalOcean**: VPS deployment
- **AWS/Azure**: Cloud platform deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

ISC License

## 👨‍💻 Author

**MD SHAZAN MAHMUD ARPON**

---

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation for common solutions

## 🔗 Related Projects

- Frontend Application (React/Next.js)
- Mobile Application (React Native)
- Admin Dashboard

---

*This README provides comprehensive documentation for the Language Learning Social Platform backend. For frontend integration details, please refer to the frontend repository documentation.*