const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { generateToken } = require('../utils/tokenUtils');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create user
  const user = await User.create({
    name,
    username,
    email,
    password
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      subscription: user.subscription,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email }).select('+password');

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      subscription: user.subscription,
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      subscription: user.subscription
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      subscription: updatedUser.subscription,
      token: generateToken(updatedUser._id)
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Social login (Google, Facebook)
// @route   POST /api/auth/social
// @access  Public
const socialLogin = asyncHandler(async (req, res) => {
  const { provider, id, token, name, email } = req.body;

  // Check if user exists
  let user = await User.findOne({ email });

  if (!user) {
    // Create new user if doesn't exist
    const username = email.split('@')[0] + Math.floor(Math.random() * 1000);
    user = await User.create({
      name,
      username,
      email,
      password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8),
      [`socialAuth.${provider}.id`]: id,
      [`socialAuth.${provider}.token`]: token
    });
  } else {
    // Update social auth info
    user[`socialAuth.${provider}.id`] = id;
    user[`socialAuth.${provider}.token`] = token;
    await user.save();
  }

  res.json({
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
    subscription: user.subscription,
    token: generateToken(user._id)
  });
});

// @desc    Create demo user
// @route   GET /api/auth/demo
// @access  Public
const createDemoUser = asyncHandler(async (req, res) => {
  if (process.env.DEMO_ENABLED !== 'true') {
    res.status(404);
    throw new Error('Demo mode is not enabled');
  }

  const email = process.env.DEMO_ACCOUNT_EMAIL || 'demo@tikshoppro.com';
  const password = process.env.DEMO_ACCOUNT_PASSWORD || 'demopassword123';

  // Check if demo user exists
  let user = await User.findOne({ email });

  if (!user) {
    // Create demo user
    user = await User.create({
      name: 'Demo User',
      username: 'demouser',
      email,
      password,
      role: 'user',
      subscription: {
        plan: 'pro',
        status: 'active',
        renewalDate: new Date(new Date().setDate(new Date().getDate() + 30))
      }
    });
  }

  res.json({
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
    subscription: user.subscription,
    token: generateToken(user._id)
  });
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  socialLogin,
  createDemoUser
};
