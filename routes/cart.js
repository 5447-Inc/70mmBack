const express = require('express');
const cartController = require("../controllers/cartController")
const router = express.Router()
const passport = require('passport');


router.get("/getCart",passport.authenticate('jwt', { session: false }),cartController.fetchCart)

router.post("/addItem",passport.authenticate('jwt', { session: false }),cartController.addToCart)

router.get("/removeItem",passport.authenticate('jwt', { session: false }),cartController.deleteFromCart)


module.exports = router 