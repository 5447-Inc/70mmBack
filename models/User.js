const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const CustomError = require("../util/CustomError")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: false
    },
    cart: {
        items: [
            {
                productId: {type: Schema.Types.ObjectId, required: true},
                quantity: {type: Number, required: true}
            }
        ]
    }


})
// the model name is the name of the tables you use in the DB (DB is written in the URL code we have in server.js)
// this User constant is defined so that it can be uesd in the functions below
const User = module.exports = mongoose.model('User', userSchema)


module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
        newUser.password = hash;
        newUser.save(callback);
    });
    });
}

module.exports.getUserByEmail = (userName,cb) => {

    User.findOne({email : userName}).then(user => {
        if (user) {
            cb(user)
        }
        else{
            throw new CustomError("This user does not exist");
        }
    });

}

module.exports.comparePasswords = (password,hash,cb) => {

    bcrypt.compare(password, hash, (err, isMatch) => {
        if(err) throw err;
        cb(isMatch);
    });
    
}