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

    price: {
        type: Number,
        required: true
    },

    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    description: {
        type : String
    },
    category : {
        type: String,
        required: true
    },
    imageName : {
        type: String,
        required: true
    }

})
// the model name is the name of the tables you use in the DB (DB is written in the URL code we have in server.js)
const Product = module.exports = mongoose.model('Products', productSchema)