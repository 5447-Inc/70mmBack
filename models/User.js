const getDB = require('../util/database').getDB

class User {

    constructor(name,email,password,phoneNumber){
        this.name = name
        this.email = email
        this.password = password
        this.phoneNumber = phoneNumber
        
    }

    save(){
        const db = getDB();
        db.collection('collection').insertOne(this).then(
            (data) => {
                console.log("SAve")
                console.log(data)
            }
        ).catch( (error) => {
            console.log("SAve error")
            console.log(error)
        })
    }


    static getUsers(){
        
    }

}

module.exports = User