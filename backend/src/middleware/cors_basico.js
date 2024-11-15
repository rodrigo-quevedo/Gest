
const cors_basico = (req, res, next) => {
    //CORS
    res.header({
        "Access-Control-Allow-Origin" : process.env.URL_REACT_CLIENT,
        //cookie cors
        "Access-Control-Allow-Credentials": "true"
    })

    next()
}

module.exports = cors_basico