const express = require('express')
const app = express()

const PORT = process.env.PORT || 3003

const rootRoute = require('../routes/root')
app.use('/', rootRoute)


app.listen(PORT, ()=> {
    console.log(`Express app running on PORT: ${PORT}`)
})