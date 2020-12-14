const User = require("../models/User")

exports.postAddProduct = (req,res,next) => {

    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const phone = req.body.phone

    const user = new User(name,email,password,phone)

    user.save()


}