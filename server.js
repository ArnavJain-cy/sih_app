const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://ar24eeb0b22_db_user:o7Ca9eKBDRo5KABo@cluster0.94xuwz2.mongodb.net/evolvia?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB successfully');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: null
  },
  profile: {
    firstName: String,
    lastName: String,
    bio: String,
    skills: [String],
    interests: [String],
    careerGoals: String
  },
  progress: {
    completedAssessments: [String],
    currentCourses: [String],
    completedCourses: [String],
    badges: [String],
    points: {
      type: Number,
      default: 0
    }
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

// JWT Secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: 'Evolvia API Server is running!',
    version: '1.0.0',
    status: 'healthy'
  });
});

// Sign up route
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ 
        error: 'Username, email, and password are required' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        error: 'Password must be at least 6 characters long' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({ 
        error: 'User with this email or username already exists' 
      });
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: newUser._id, 
        username: newUser.username,
        email: newUser.email 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data (without password)
    const userResponse = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt,
      profile: newUser.profile,
      progress: newUser.progress
    };

    res.status(201).json({
      message: 'User created successfully',
      user: userResponse,
      token
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      error: 'Internal server error during signup' 
    });
  }
});

// Login route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        username: user.username,
        email: user.email 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user data (without password)
    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
      profile: user.profile,
      progress: user.progress
    };

    res.json({
      message: 'Login successful',
      user: userResponse,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Internal server error during login' 
    });
  }
});

// Guest login route
app.post('/api/auth/guest', async (req, res) => {
  try {
    // Generate a temporary guest user
    const guestUser = {
      id: 'guest_' + Date.now(),
      username: 'Guest User',
      email: 'guest@evolvia.com',
      isGuest: true
    };

    // Generate temporary token
    const token = jwt.sign(
      { 
        userId: guestUser.id, 
        username: guestUser.username,
        email: guestUser.email,
        isGuest: true
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Guest login successful',
      user: guestUser,
      token
    });

  } catch (error) {
    console.error('Guest login error:', error);
    res.status(500).json({ 
      error: 'Internal server error during guest login' 
    });
  }
});

// Get user profile
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
app.put('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const { profile, progress } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { 
        $set: { 
          'profile': profile,
          'progress': progress 
        } 
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ 
      message: 'Profile updated successfully',
      user 
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify token
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ 
    valid: true, 
    user: req.user 
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ 
    error: 'Internal server error' 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found' 
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Evolvia API Server running on port ${PORT}`);
  console.log(`📊 MongoDB connected successfully`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}`);
  console.log(`📱 Mobile API URL: http://192.168.137.1:${PORT}`);
});

module.exports = app;
