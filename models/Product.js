const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        default: 1
    },

    seller: {
        type : String,
        required: true
    },

    description: {
        type : String
    }


})
// the model name is the name of the tables you use in the DB (DB is written in the URL code we have in server.js)
module.exports = mongoose.model('Products', productSchema)

