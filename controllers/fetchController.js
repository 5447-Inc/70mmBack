const Product = require("../models/Product")

exports.fetchProducts = (req,res,next) => {

    res.json({"message":"In fetch products"})
}

exports.addProduct =  (req,res,next) => {

    const name = req.body.name
    const quantity = req.body.quantity
    const description = req.body.description
    const seller = req.body.seller

    const product = new Product({name:name,quantity:quantity,description:description,seller:seller})

    product.save().then(() => res.json({"message" : "Product Created"})).catch(err => console.log(err))


}