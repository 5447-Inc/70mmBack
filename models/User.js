const mongoose = require('mongoose')

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
module.exports = mongoose.model('User', userSchema)

// class User {

//     constructor(name,email,password,phoneNumber){
//         this.name = name
//         this.email = email
//         this.password = password
//         this.phoneNumber = phoneNumber
        
//     }

//     save(cb){
//         const db = getDB();
//         db.collection('collection').insertOne(this).then(
//             (data) => {
//                 console.log("SAve")
//                 console.log(data)
//                 cb()
//             }
//         ).catch( (error) => {
//             console.log("SAve error")
//             console.log(error)
//         })
//     }

//     static getUsers(){

//     }

// }

// module.exports = User