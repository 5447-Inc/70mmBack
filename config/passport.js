//passport
const passport = require('passport');
const User = require('../models/User');
var ObjectId = require('mongodb').ObjectID;
var secret = require("../secret/secret")
var JwtStrategy = require('passport-jwt').Strategy,
GoogleStrategy = require('passport-google-oauth20').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}



opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret.secret;

// JWT
// decodes the token
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log("In Jwt",jwt_payload.data._id)
    User.findOne({"_id" :ObjectId(jwt_payload.data._id)}, function(err, user) {
        if (err) {
            console.log("In Jwt err")
            return done(err, false, { message: 'An error occurred ' });
        }
        else if (user) {
            return done(null, user);
        } 
        else {
            console.log("In Jwt no user")
            return done(null, false, { message: 'User not found' } );
            // or you could create a new account
        }
    });

}));

// Google 
var GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.serializeUser(function(user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//     console.log(user)
//     done(null, user);
// });
// decodes the data from google 
passport.use(new GoogleStrategy({
    clientID: secret.GOOGLE_CLIENT_ID,
    clientSecret: secret.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://shopping-app-akj.herokuapp.com/auth/google/callback"
},
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ name: profile.displayName, email: profile._json.email }, 
        function (err, user){
        return done(err, user);
        });
    }
));