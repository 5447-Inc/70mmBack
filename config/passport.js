//passport
const passport = require('passport');
const User = require('../models/User');
var ObjectId = require('mongodb').ObjectID;
var secret = require("../secret/secret").secret
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log("In Jwt log")
    console.log(jwt_payload.data._id)
    //  
    User.findOne({"_id" :ObjectId(jwt_payload.data._id)}, function(err, user) {
        if (err) {
            console.log("In Jwt err")
            return done(err, false, { message: 'An error occurred ' });
        }
        else if (user) {
            console.log("In Jwt user")
            return done(null, user);
        } 
        else {
            console.log("In Jwt no user")
            return done(null, false, { message: 'User not found' } );
            // or you could create a new account
        }
    });

}));