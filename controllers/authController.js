const User = require("../models/User")

exports.postSignup = (req,res,next) => {

    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const phone = req.body.phone

    const user = new User({name:name,email:email,password:password,phone:phone})
        
    user.save().then(result => {
        console.log("User created")
        res.json({"message":"The user was created"})    
})




}