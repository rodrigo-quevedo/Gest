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
require('../config/initializeMongooseModels') ()
require('../utils/db_backup/schedule_collections_backup') ()







//backup de las collections para resetearlas (solo testing)
// const do_collections_backup = require('../tests/models/do_collections_backup')
// do_collections_backup('another backup') 

//resetear collections para luego testear
// const resetCollections = require('../tests/models/reset_collections')
// resetCollections()


//test de las validation mongoose

// const testValidationUsuarios = require('../tests/models/mongoose_validation_Usuarios')
// testValidationUsuarios();

// const testValidationHistorial_Productos = require('../tests/models/mongoose_validation_Historial_Productos')
// testValidationHistorial_Productos()

// const testValidationHistorial_Ventas = require('../tests/models/mongoose_validation_Historial_Ventas')
// testValidationHistorial_Ventas() 

// const testValidationLista_Productos = require('../tests/models/mongoose_validation_Lista_Productos')
// testValidationLista_Productos()



app.listen(PORT, async ()=> {
    console.log(`Express app running on PORT: ${PORT}`)

})