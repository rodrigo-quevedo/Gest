const { getCorsOrigin } = require('../../../utils/cors/getAllowedOrigins');

const OPTIONS = (req, res) => {

    //logs
    console.log(`OPTIONS request en '/productos': ${new Date()}`)
    console.log(`body de la request:`, req.body)

    //CORS
    const origin = req.headers.origin;
    const allowedOrigin = getCorsOrigin(origin, process.env.URL_REACT_CLIENT);
    
    if (allowedOrigin) {
        res.header({
            "Access-Control-Allow-Origin": allowedOrigin,
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Credentials": "true"
        });
    }
    
    //response
    res.json(JSON.stringify({
        respuesta: 'OPTIONS OK'
    }))

}

module.exports = OPTIONS