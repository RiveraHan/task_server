const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist' });
    }

    const passwordValid = await bcryptjs.compare(password, User.password);
    if (!passwordValid) {
      return res.status(400).json({ msg: 'Password no valid' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '30 days',
      },
      (error, token) => {
        if (error) throw error;

        res.json({ token });
      }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

exports.authenticatedUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(500).json({ msg: 'There was a mistake' });
  }
};
