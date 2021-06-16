const Cart = require("../models/Cart")
const Item = require("../models/Cart")
const addToCart = require("../models/Cart").addToCart
const getCart = require("../models/Cart").getCart
const deleteItemFromCart = require("../models/Cart").deleteItemFromCart
const {ObjectId} = require('mongodb');
const CustomError = require('../util/CustomError')

// Include fs module
let fs = require('fs')


exports.fetchCart = (req,res,next) => {
    const userID = req.user._id
    getCart(userID,(cart)=>{
        res.json(cart)
    })
    
}

exports.addToCart = (req,res,next) => {

    const productId = req.body.productId
    const quantity =  req.body.quantity
    const userID = req.user._id



    const item = {productId: productId, quantity: quantity}

    addToCart({item : item, userID: userID},(cart) => {
        res.json(cart)
    })

}

exports.deleteFromCart = (req,res,next) => {

    const itemID =  req.query.itemID
    const userID = req.user._id
    
    
    deleteItemFromCart({itemID:itemID,userID:userID},(cart) => {
        if(!cart){
            const error = new CustomError("Delete was not Possible")
            error.statusCode = 401
            throw error
        }
        res.json(cart)
    })

}

