const express = require('express');
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');
const User = require('../models/User')
const passport = require('passport');
const router = express.Router()

router.post("/signup",
  
  // using express validator for validation
  // username must be an email 
body('email').isEmail().withMessage("Please enter valid email").custom((input,{req}) => {

    return User.findOne({email : input}).then(user => {
        if (user) {
        return Promise.reject('E-mail already in use');
        }
    });

}),
  // password must be at least 5 chars long
body('password').isLength({ min: 5 }).withMessage("Password must contain at least 5 characters"),

authController.postSignup)

//sign In
router.post("/signIn", authController.SignIn)

// get profile of user does this on first render of site
router.get('/profile', passport.authenticate('jwt', { session: false }), authController.getProfile);


module.exports = router 