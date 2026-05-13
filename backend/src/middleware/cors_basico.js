
const { getCorsOrigin } = require('../utils/cors/getAllowedOrigins');

const cors_basico = (req, res, next) => {
    //CORS
    const origin = req.headers.origin;
    const allowedOrigin = getCorsOrigin(origin, process.env.URL_REACT_CLIENT);
    
    if (allowedOrigin) {
        res.header({
            "Access-Control-Allow-Origin": allowedOrigin,
            //cookie cors
            "Access-Control-Allow-Credentials": "true"
        });
    }

    next()
}

module.exports = cors_basico