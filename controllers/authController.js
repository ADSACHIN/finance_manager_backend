const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ $or: [{ username }, { email }] });

    if (userExists) {
      const errors = {};

      if (userExists.username === username) {
        errors.username = 'Username already taken';
      }

      if (userExists.email === email) {
        errors.email = 'Email already taken';
      }

      return res.status(400).json({ errors });
    }

    const user = await User.create({ username, email, password });
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  };
  
  module.exports = { registerUser, loginUser, getUserProfile };
  
