const mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')
const Product = require('../models/Product')
const Schema = mongoose.Schema;
const ItemSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
    subTotal: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
})

const CartSchema = new Schema({
    user_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [ItemSchema],
    totalItems : {
        type: Number,
        default: 0
    }, 
    totalPrice:{
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
})


CartSchema.plugin(findOrCreate);
const Cart = module.exports = mongoose.model('Cart', CartSchema);  
// exporting Item Schema
const Item = module.exports = mongoose.model('Item', ItemSchema);

// send in an object with the userID(same as the id of the user which is in the token) and item
module.exports.addToCart = function({item,userID},cb){
    

    Cart.findOrCreate({user_id: userID}).then((cart,err) => {
    

    Product.findById(item.productId).then((product) => {

    // getting index of cart item if the product exists in the array
    const index = cart.doc.items.findIndex(loopedItem => loopedItem.productId == item.productId)

    const subTotal = product.price * item.quantity

    if(index !== -1){
        // if the product already exists in the item Array
        
        cart.doc.items[index].quantity +=  item.quantity
        cart.doc.items[index].subTotal += subTotal
    }
    else{
        // if product does not exist in item array
        // had to save this instead of cart.save()
        item.subTotal = subTotal
        cart.doc.items.push(item)
        cart.doc.totalItems = cart.doc.items.length
        
    }

    // total Price

    cart.doc.totalPrice += subTotal

    cart.doc.save().then((success, err) => {
        if(err){
            return cb(err)
        }
        cb("Cart Updated")
    })
    })
    })


}



