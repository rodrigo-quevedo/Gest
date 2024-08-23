const express = require('express')
const app = express()

const PORT = process.env.PORT || 3003

// routes
const rootRoute = require('../routes/root')
app.use('/', rootRoute)

// db
const runDB = require('../config/database')
runDB().catch(console.dir)


app.listen(PORT, ()=> {
    console.log(`Express app running on PORT: ${PORT}`)
})