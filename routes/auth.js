const express = require('express');
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');
const User = require('../models/User')
const passport = require('passport');
const { route } = require('./fetch');
const jwt = require('jsonwebtoken');
const router = express.Router()
const secret = require("../secret/secret").secret

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


// GOOGLE Auth
router.get('/google',passport.authenticate('google',{ scope: ['profile', 'email'] }));

router.get('/google/callback',passport.authenticate('google', { failureRedirect: '/auth/error',session: false }),
  function(req, res) {
    //console.log(req.user)

    const token = jwt.sign({ data: req.user }, secret , {
      expiresIn: 86400 // 1 day
    });
    res.cookie('token', `Bearer ${token}`, { httpOnly: true });

    res.json({
      success: true,
      token: `Bearer ${token}`,
      user: {
      id: req.user._id,
      email: req.user.email, 
      phoneNumber : req.user.phoneNumber
      }
  });
  }

);

//Error route
router.get('/error',(req,res) => {
  res.json({message : 'Authentication error occured'} )
})

module.exports = router 