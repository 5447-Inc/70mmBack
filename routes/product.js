const express = require('express');
const fetchController = require('../controllers/productsController')
const upload = require("../util/GridUtils").upload
const router = express.Router()
const passport = require('passport');

router.get("/getProducts",fetchController.fetchProducts)

router.post("/addProduct",passport.authenticate('jwt', { session: false }),upload.single('image'),fetchController.addProduct)

router.get("/getProduct",fetchController.fetchProduct)

router.get("/getCategory",fetchController.getCategory)

router.post("/addImage",passport.authenticate('jwt', { session: false }),fetchController.addImage)

router.get("/getImage/:imageName",fetchController.getImage)



module.exports = router 