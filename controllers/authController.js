const User = require("../models/User")
const {validationResult } = require('express-validator');
const CustomError = require('../util/CustomError')
const jwt = require('jsonwebtoken');
const secret = require("../secret/secret").secret

exports.postSignup = (req,res,next) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const err = new CustomError("Failed to create new user")
        err.statusCode = 401
        err.data = errors.array()
        throw err
    }

        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const phone = req.body.phone
    
    
        const user = new User({name:name,email:email,password:password,phoneNumber:phone})
    
        User.addUser(user, (err, user) => {
            if (err) {
            res.json({ success: false, msg: 'Failed to register user' });
            } else {
            res.json({ success: true, msg: 'User registered' });
            }
        });
            

}

exports.SignIn = (req,res,next) => {
    User.getUserByEmail(req.body.email,(user) => {
        
        User.comparePasswords(req.body.password, user.password, (isMatch) => {
            if(!isMatch){
                throw new CustomError("Password is incorrect")
            }
            
            const token = jwt.sign({ data: user }, secret , {
                expiresIn: 86400 // 1 day
            });

            // setting cookie in browser
            res.cookie('token', `Bearer ${token}`, { httpOnly: true });

            // we don't want to send the user password in the json
            res.json({
                success: true,
                token: `Bearer ${token}`,
                user: {
                id: user._id,
                email: user.email, 
                phoneNumber : user.phoneNumber
                }
            });

        })
    })

}

exports.getProfile = (req, res, next) => {
    if(req.user){

        res.json({
            user: {
                _id: req.user._id,
                name: req.user.name,
                username: req.user.username,
                email: req.user.email,
            }
            });

    }

    else if(req.err){
        const error = new CustomError("Error occurred")
        error.statusCode = 401
        error.data = req.err
        throw error
    }

    else{
        const err = new CustomError("Invalid cookie")
        err.statusCode = 401
        throw err
    }

}
