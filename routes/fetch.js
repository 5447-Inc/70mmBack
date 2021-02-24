const express = require('express');
const fetchController = require('../controllers/fetchController')

const router = express.Router()

router.get("/products",fetchController.fetchProducts)

router.post("/addProduct",fetchController.addProduct)


module.exports = router 