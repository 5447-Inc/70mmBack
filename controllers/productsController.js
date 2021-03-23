const Product = require("../models/Product")

exports.fetchProducts = (req,res,next) => {
    Product.find({},(products, err) => {
        if(err){
            return res.json(err)
        }
    
        res.json(products)
        
    })
    
}

exports.addProduct =  (req,res,next) => {

    const name = req.body.name
    const quantity = req.body.quantity
    const description = req.body.description
    const seller = req.body.seller_id
    const price = req.body.price
    const category = req.body.category
    const product = new Product({name:name,quantity:quantity,description:description,seller_id:seller,price:price,category:category})

    product.save().then(() => res.json({"message" : "Product Added"})).catch(err => console.log(err))


}