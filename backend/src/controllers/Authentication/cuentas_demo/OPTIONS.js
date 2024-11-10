const OPTIONS = (req, res) => {

    //logs
    console.log(`OPTIONS request en /cuentas_demo: ${new Date()}`)
    console.log(`body de la request:`, req.body)

    //CORS
    res.header({
        "Access-Control-Allow-Origin" : process.env.URL_REACT_CLIENT,
        "Access-Control-Allow-Methods" : "POST",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Credentials": "true"
    })
    
    //response
    res.json(JSON.stringify({
        respuesta: 'OPTIONS OK'
    }))

}

module.exports = OPTIONS