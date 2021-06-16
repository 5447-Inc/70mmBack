const Product = require("../models/Product")
const User = require("../models/User")
// const GridFSStorage = require('multer-gridfs-storage');
// const storage = require('../util/GridUtils').storage

//form data
var multiparty = require('multiparty');

// GridFS
var Grid = require('gridfs-stream');
var mongoose = require("mongoose");
let gfs;
const conn = mongoose.connection

conn.once('open', () => {
  // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('productPhotos');
});

exports.fetchProducts = (req,res,next) => {
    Product.find({},(products, err) => {
        if(err){
            return res.json(err)
        }
    
        res.json(products)
        
    })
    
}

exports.fetchProduct = (req,res,next) => {
    Product.findOne({_id:req.query.id},(product, err) => {
        if(err){
            return res.json(err)
        }
        User.findById({_id: product.seller_id},(user,err) => {
            console.log("In here")
            return  res.json({...product,seller_name:user.name})

        })
        
        return;
        
    })
    
}

exports.getCategory = (req,res,next) => {
    Product.find({category : req.query.category },(products, err) => {
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
    const seller = req.user._id
    const price = req.body.price
    const category = req.body.category
    const imageName = req.file.filename;
    //console.log("Image Name ",imageName);
    const product = new Product({name:name,quantity:quantity,description:description,seller_id:seller,price:price,category:category,imageName : imageName})

    product.save().then(() => res.json({"message" : "Product Added"})).catch((err) => {console.log(err)
                                                                                        res.json(err)})


}

exports.addImage = (req,res,next) => {
    const {file} = req;
    res.json(file)

}

exports.getImage = (req,res,next) => {

    gfs.files.findOne({ filename: req.params.imageName }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
            err: 'No file exists'
        });
        }
    
        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
          // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
        } else {
        res.status(404).json({
            err: 'Not an image'
        });
        }
    });

}