const express = require('express')
const app = express()

const PORT = process.env.PORT || 3003

//request parser
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// routes


// db
const database = require('../config/database')




app.listen(PORT, ()=> {
    console.log(`Express app running on PORT: ${PORT}`)
})