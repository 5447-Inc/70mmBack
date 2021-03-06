const express = require('express');
const bodyParser = require('body-parser');
const db = require('./util/database').getDB
// routes
const authRoute = require('./routes/auth') 
const productRoutes = require('./routes/product')
const cartRoute = require('./routes/cart')
// error handler
const errorHandler = require('./util/errorHandler')
// create express app
const mongoose = require('mongoose')
const passport = require('passport');


// this to check for tokens
require("./config/passport");

const app = express();

//const dbConnect = require('./util/database').dbConnect;
const { connect } = require('mongodb');
// passport initialize
app.use(passport.initialize());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json basically send requests in json format
app.use(bodyParser.json())

// commented the following two lines for testing

app.use("/auth",authRoute)

app.use("/cart",cartRoute)

app.use("/product",productRoutes)

app.get('/',(req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.",
                });
});

app.use(function (err, req, res, next) {
    // logic
    const status = err.statusCode || 500
    const message = err.message
    const data = err.data
    res.status(status).json({
        message : message,
        data : data
    })
    
})

mongoose.connect("mongodb+srv://90mmUser:5447@cluster.rcddm.mongodb.net/70mmDB?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true}).then(result => {
    app.listen(3000)
}).catch( err => console.log(err))




