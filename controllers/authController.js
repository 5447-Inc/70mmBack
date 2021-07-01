const User = require("../models/User")
const {validationResult } = require('express-validator');
const CustomError = require('../util/CustomError')
const jwt = require('jsonwebtoken');
const secret = require("../secret/secret").secret

exports.postSignup = (req,res,next) => {


    const errors = validationResult(req)

    if(!errors.isEmpty()){
        //console.log("In signup errors",errors.array())
        const errorMessage = errors.array()[0].msg
        //console.log("In signup errors",errorMessage)
        res.status(401).json({message : errorMessage })
    }

    else{

        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const phone = req.body.phone
    
    
        const user = new User({name:name,email:email,password:password,phoneNumber:phone})
    
        User.addUser(user, (err, user) => {
            if (err) {
            console.log("In add user")
            res.json({ success: false, msg: 'Failed to register user' });
            } else {
                //console.log("User",user)
                const token = jwt.sign({ data: user }, secret , {
                    expiresIn: 86400 // 1 day
                });

            
                
                if(token){
                    console.log("In user signUp",token)
                    res.cookie('token', `${token}`, { httpOnly: true }).json({success: true, user: user, token : token})
                }
        
            
            }
        });

    }
            

}

exports.SignIn = (req,res,next) => {

    // console.log("Email",req.body.email)
    // console.log("Password",req.body.password)
    
    User.getUserByEmail(req.body.email,(user) => {

        if(user instanceof CustomError ){

            console.log(user.message)
            res.status(401).json({message : user.message})

        }
        else{
        User.comparePasswords(req.body.password, user.password, (isMatch) => {
            if(!isMatch){
                res.status(401).json({message : "Password is incorrect"})
                //throw new CustomError("Password is incorrect")
            }
            else{
            const token = jwt.sign({ data: user }, secret , {
                expiresIn: 86400 // 1 day
            });
            
            // setting cookie in browser
        
            if(token){
                console.log("In user signIN",token)
                res.cookie('token', `${token}`, { httpOnly: true }).json({success: true, user: user, token : token})

                // res.json({success: true, user: user})
                // /// test 
                // res.redirect("http://localhost:3001")
            }
        }
        })
        }
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
