const User = require("../models/User")

exports.postAddProduct = (req,res,next) => {

    const name = req.
    const email = req.body.email
    const password = req.body.password
    const phone = req.body.phone

    console.log("NAme",name)

    const user = new User(name,email,password,phone)
        
    user.save(() => {
        res.json({"message":"done"})
    })




}