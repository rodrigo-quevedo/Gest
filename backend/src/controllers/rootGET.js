const get = (req, res)=> {
    console.log('GET request received on "/" at:'
        + new Date(Date.now()).toDateString())

    console.log(req.query)
    res.send('request recibida OK')
}

module.exports = get