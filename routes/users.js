const express = require('express');
const db = require('../util/database');
const userController = require('../controllers/userController')

const router = express.Router()

router.post("/addUser",userController.postAddProduct)

module.exports = router 