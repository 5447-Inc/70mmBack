const express = require('express');
const cartController = require("../controllers/cartController")
const router = express.Router()
const passport = require('passport');


router.get("/getCart",cartController.fetchCart)

router.post("/addItem",passport.authenticate('jwt', { session: false }),cartController.addToCart)


module.exports = router 