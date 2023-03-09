const express = require('express');

const router = express.Router();
const { check } = require('express-validator');
const userController = require('../controllers/userController');

router.post(
  '/',
  [
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'The password should is minim 6 characters').isLength({
      min: 6,
    }),
  ],
  userController.createUser
);

module.exports = router;
