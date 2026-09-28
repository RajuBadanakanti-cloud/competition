

const gloablErrorHandler = (err, req, res, next) => {

    console.log(err.message)
    res.status(err.statusCode || 500).json({
        status:"fail",
        message: err.message || "Internal Server"
    })

}

export default gloablErrorHandler