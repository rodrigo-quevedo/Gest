const express = require('express')
const app = express()

const PORT = process.env.PORT || 3003

//request parser
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//cookie parsing: las cookies de la request van a ser accesibles con req.cookies, en vez de tener que parsear el header 'Cookies' a mano.
//Nota: La autenticación solo va a funcionar en clientes tipo Navegador Web.
//Nota 2: Express ya viene con res.cookie() para responder con un 'Set-Cookie'.
const cookieParser = require("cookie-parser")
app.use(cookieParser())


// routes
const useRouters = require('../config/useRouters')
useRouters(app);

// db
require('../config/database')

// inicializar modelos mongoose
require('../config/initializeMongooseModels') ()

// programar backups
require('../utils/db_backup/schedule_collections_backup') (0)

// sacar el autocast para el type String de mongoose
require('../config/disableAutoCast') ()

// crear cuentas demo
require('../utils/cuentas_demo/crear_cuentas_demo')()

// eliminar sesiones expiradas
require('../config/eliminateExpiredSessions') ()

//backup de las collections para resetearlas (solo testing)
//(ahora si funciona joya con el mongodb driver, ademas le agregué un check para que vea instanceof Array y length > 0)
// const do_collections_backup = require('../utils/db_backup/do_collections_backup')
// do_collections_backup('backup con mongodb driver') 

//resetear collections para luego testear
// const resetCollections = require('../utils/reset_db_collections/reset_collections')
// resetCollections()//NO USAR SIN PROBAR QUE FUNCIONA EL BACKUP


//test de las validation mongoose

// const testValidationUsuarios = require('../tests/models/mongoose_validation_Usuarios')
// testValidationUsuarios();

// const testValidationHistorial_Productos = require('../tests/models/mongoose_validation_Historial_Productos')
// testValidationHistorial_Productos()

// const testValidationHistorial_Ventas = require('../tests/models/mongoose_validation_Historial_Ventas')
// testValidationHistorial_Ventas() 

// const testValidationLista_Productos = require('../tests/models/mongoose_validation_Lista_Productos')
// testValidationLista_Productos()


if (process.env.NODE_ENV === 'development'){
    console.log('dev server...')
    const http = require('http')
    const https = require('https')
    const fs = require('fs');

    var key = fs.readFileSync('./src/config/certs/my-key.pem');
    var cert = fs.readFileSync('./src/config/certs/my-cert.pem');
    var options = {
        key: key,
        cert: cert
    };

    http.createServer(app).listen(PORT+1, ()=>{
        console.log("http server starting on port : " , (PORT+1))
    })
    https.createServer(options, app).listen(PORT, () => {
        console.log("httpS server starting on port : " + PORT)
    });

}


else if (process.env.NODE_ENV === 'production'){
    app.listen(PORT, async ()=> {
        console.log(`Express app running on PORT: ${PORT}`)
    
    })

}