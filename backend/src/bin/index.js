const express = require('express')
const app = express()

const PORT = process.env.PORT || 3003

//request parser
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// routes
const useRouters = require('../config/useRouters')
useRouters(app);

// db
const database = require('../config/database')

//resetear collections para luego testear
const handleBackups = require('../tests/models/collections_backup_model')
handleBackups('testing backup')

const resetCollections = require('../tests/models/reset_collections')
resetCollections()

//test de las validation mongoose
const testValidationUsuarios = require('../tests/models/mongoose_validation_Usuarios')
testValidationUsuarios();

const testValidationHistorial_Productos = require('../tests/models/mongoose_validation_Historial_Productos')
testValidationHistorial_Productos()

const testValidationHistorial_Ventas = require('../tests/models/mongoose_validation_Historial_Ventas')
testValidationHistorial_Ventas() 

const testValidationLista_Productos = require('../tests/models/mongoose_validation_Lista_Productos')
testValidationLista_Productos() 




app.listen(PORT, async ()=> {
    console.log(`Express app running on PORT: ${PORT}`)

})