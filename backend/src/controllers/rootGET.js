const get = (req, res)=> {
    console.log('GET request received on "/" at:'
        + new Date(Date.now()).toDateString())

    console.log(req.body)
    res.send('request recibida OK')
}

module.exports = get