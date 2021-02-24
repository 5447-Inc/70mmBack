exports.errorHandler = (err, req, res, next) => {
    //res.status(err.statusCode)
    console.log(err.message)
    res.status(err.name).json(err.message)
}