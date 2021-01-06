// WHEN USING MONGOOSE WE DONT NEED TO WORRY ABOUT THE CONNECTION CODE ITS DONE BY THE MONGOOSE LIBRARY ITSELF

// const MongoClient = require('mongodb').MongoClient;

// let _db;

// // replace the uri string with your connection string.
// const uri = "mongodb+srv://90mmUser:5447@cluster.rcddm.mongodb.net/?retryWrites=true&w=majority"

// const dbConnect = (cb) => {
//     MongoClient.connect(uri).then(client => {
//         _db = client.db()
//         cb()

//     }).catch(
//         err => {
//             console.log(err)
//             throw err
//         }
//     )
// }

// const getDB = () => {
//     if(_db){
//         return _db
//     }
//     throw "No database found"
// }


// exports.dbConnect = dbConnect
// exports.getDB = getDB 
