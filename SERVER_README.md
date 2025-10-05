# Evolvia Server Setup

## Installation

1. Install server dependencies:
```bash
npm install express mongoose cors bcryptjs jsonwebtoken dotenv
npm install -D nodemon
```

## Environment Variables

Create a `.env` file in the MyApp directory with:

```env
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-change-in-production
MONGODB_URI=mongodb+srv://ar24eeb0b22_db_user:o7Ca9eKBDRo5KABo@cluster0.94xuwz2.mongodb.net/evolvia?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=development
```

## Running the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/guest` - Guest login
- `GET /api/auth/verify` - Verify JWT token

### User Profile
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

## Database Schema

### User Model
```javascript
{
  username: String (unique, required)
  email: String (unique, required)
  password: String (hashed, required)
  createdAt: Date
  lastLogin: Date
  profile: {
    firstName: String
    lastName: String
    bio: String
    skills: [String]
    interests: [String]
    careerGoals: String
  }
  progress: {
    completedAssessments: [String]
    currentCourses: [String]
    completedCourses: [String]
    badges: [String]
    points: Number
  }
}
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS enabled
- Input validation
- Error handling

## MongoDB Connection

The server connects to your MongoDB Atlas cluster automatically using the provided connection string.
