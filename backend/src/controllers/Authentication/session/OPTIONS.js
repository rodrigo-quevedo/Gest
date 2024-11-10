const OPTIONS = (req, res) => {

    //logs
    console.log(`${new Date()}: OPTIONS request en '/session'`)
    console.log(`body de la request:`, req.body)

    //CORS
    res.header({
        "Access-Control-Allow-Origin" : process.env.URL_REACT_CLIENT,
        "Access-Control-Allow-Methods" : "POST, DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
        //cookie cors
        "Access-Control-Allow-Credentials" : "true"
    })
    
    //response
    res.json(JSON.stringify({
        respuesta: 'OPTIONS OK'
    }))

}

module.exports = OPTIONS