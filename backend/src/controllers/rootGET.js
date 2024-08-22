const get = (req, res)=> {
    console.log('GET request received on "/" at:'
        + new Date(Date.now()).toDateString())
    res.send('ok controller')
}

module.exports = get