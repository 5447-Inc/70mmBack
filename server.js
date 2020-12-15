const express = require('express');
const bodyParser = require('body-parser');
const db = require('./util/database').getDB
const userRoute = require('./routes/users') 
// create express app
const app = express();
const dbConnect = require('./util/database').dbConnect;
const { connect } = require('mongodb');
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())



app.use(userRoute)

app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

dbConnect( () => 
        app.listen(3004)
)




