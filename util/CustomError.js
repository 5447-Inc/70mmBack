class CustomError extends Error {

statusCode = 400;
data = null
    constructor(message) {
    super(message);
    this.statusCode = 400;
    
    }

    

}

module.exports = CustomError