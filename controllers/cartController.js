const Cart = require("../models/Cart")
const Item = require("../models/Cart")
const addToCart = require("../models/Cart").addToCart
exports.fetchCart = (req,res,next) => {
    Cart.find({},(cart, err) => {
        if(err){
            return res.json(err)
        }
        
        res.json(cart)
        
    })
    
}

exports.addToCart = (req,res,next) => {

    const productId = req.body.productId
    const quantity =  req.body.quantity
    const userID = req.user._id



    const item = {productId: productId, quantity: quantity}



    addToCart({item : item, userID: userID},(msg) => {
        res.json({msg: msg})
    })

}