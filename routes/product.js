const express = require('express');
const fetchController = require('../controllers/productsController')

const router = express.Router()

router.get("/getProducts",fetchController.fetchProducts)

router.post("/addProduct",fetchController.addProduct)


module.exports = router 