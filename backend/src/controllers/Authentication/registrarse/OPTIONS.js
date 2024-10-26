const OPTIONS = (req, res) => {

    //logs
    console.log(`${new Date()}: OPTIONS request en '/registrarse'`)
    console.log(`body de la request:`, req.body)

    //CORS
    res.header({
        "Access-Control-Allow-Origin" : process.env.URL_REACT_CLIENT,
        "Access-Control-Allow-Methods" : "POST",
        "Access-Control-Allow-Headers": "Content-Type"
    })
    
    //response
    res.json(JSON.stringify({
        respuesta: 'OPTIONS OK'
    }))

}

module.exports = OPTIONS