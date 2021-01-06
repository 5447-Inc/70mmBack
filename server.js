const express = require('express');
const bodyParser = require('body-parser');
const db = require('./util/database').getDB
const authRoute = require('./routes/auth') 
// create express app
const mongoose = require('mongoose')
const app = express();
//const dbConnect = require('./util/database').dbConnect;
const { connect } = require('mongodb');
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// commented the following two lines for testing

app.use("/auth",authRoute)

app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

mongoose.connect("mongodb+srv://90mmUser:5447@cluster.rcddm.mongodb.net/70mmDB?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true}).then(result => {
    app.listen(3000)
}).catch( err => console.log(err))




