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
const CookieParser = require('cookie-parser');
//cors 
var cors = require('cors')
// multer
const multer  = require('multer');
var upload = multer();
const GridFSStorage = require('multer-gridfs-storage');
const mongoUrl = "mongodb+srv://90mmUser:5447@cluster.rcddm.mongodb.net/70mmDB?retryWrites=true&w=majority"

var Grid = require('gridfs-stream');

const PORT = process.env.PORT || 3000

// this to check for tokens
require("./config/passport");

const app = express();

//const dbConnect = require('./util/database').dbConnect;
const { connect } = require('mongodb');

//cors initialize
//app.use(cors({ origin: 'http://localhost:3001', credentials: true }))


//Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://akj-shopping.herokuapp.com')

    // const allowedOrigins = [ 'https://akj-shopping.herokuapp.com','http://localhost:3000'];
    // const origin = req.headers.origin;
    // if (allowedOrigins.includes(origin)) {
    //     res.setHeader('Access-Control-Allow-Origin', origin);
    // }

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});



// global middleware for setting authorization header
app.use(CookieParser());
app.use((req, res, next) => {
    console.log("In cookie parser")
    const authHeader= req.cookies.token;
    //console.log("In the cookie",authHeader)
    if (authHeader) {
    req.headers.authorization = `Bearer ${authHeader}`;
    }
    next();
});
// passport initialize
app.use(passport.initialize());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json basically send requests in json format
app.use(bodyParser.json())

// for parsing multipart/form-data
// app.use(upload.array()); 
// app.use(express.static('public'));

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
const connection = mongoose.connect(mongoUrl,{useNewUrlParser: true, useUnifiedTopology: true});



// Init gfs

connection.then(result => {

    app.listen(PORT)

}).catch( err => console.log("In here",err))






