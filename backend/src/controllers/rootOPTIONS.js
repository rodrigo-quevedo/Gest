module.exports = (req, res) => {
    console.log(`${new Date()}: OPTIONS request en '/'`)
    console.log(`body de la request:`, req.body)

    res.header({
        "Access-Control-Allow-Origin" : process.env.URL_REACT_CLIENT,
        "Access-Control-Allow-Headers": "Content-Type"
    })
    res.json(JSON.stringify({respuesta: 'OPTIONS OK'}))
}