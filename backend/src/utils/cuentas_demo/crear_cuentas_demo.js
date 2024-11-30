const UsuariosModel = require('../../models/Authentication/Usuarios')

const Lista_ProductosModel = require('../../models/Session/Lista_Productos')
const Historial_ProductosModel = require('../../models/Session/Historial_Productos')
const Historial_VentasModel = require('../../models/Session/Historial_Ventas')

const {arrCuentasDemo, arrCompras, arrVentas} = require('./data')


const bcrypt = require('bcrypt')
async function crear_cuentas_demo  () {

    //conexion usando mongodb driver para agregar fechas arbitrarias (por fuera del POST a /historial_productos)
    const {MongoClient} = require('mongodb')
    const connection = await MongoClient.connect(process.env.DB_URL)


    
    for (let cuentaDemo of arrCuentasDemo){
        let nombreUsuario = cuentaDemo

        let usuarioExistente = await UsuariosModel.find({usuario: nombreUsuario}).exec()

        console.log('usuarioExistente:',usuarioExistente)
        usuarioExistente = usuarioExistente[0]

        if (usuarioExistente?.usuario) {
            console.log(`El usuario ${usuarioExistente} ya existe`)
            continue
        }

        //si no existe, entonces empezar a crear el usuario:
        try {

            //crear lista productos, historial productos, historial ventas para un nuevo usuario
            
            const listaProductosCreada = await Lista_ProductosModel.create({
                listaProductos: []
            })
            const historialProductosCreado = await Historial_ProductosModel.create({
                historialProductos: []
            })
            const historialVentasCreado = await Historial_VentasModel.create({
                historialVentas: []
            })
            
            //llenar historial_productos

            //llenar historial_ventas

            //calcular lista_productos


            //crear usuario
            const usuarioCreado = await UsuariosModel.create({
                usuario: nombreUsuario,
                password: bcrypt.hashSync(process.env.CUENTAS_DEMO_PASSWORD, 10),//password encriptada
                isDemo: true,
                idListaProductos: listaProductosCreada._id,
                idHistorialProductos: historialProductosCreado._id,
                idHistorialVentas: historialVentasCreado._id
            })
    
            if (usuarioCreado) {
                //LOG
                console.log('Usuario creado antes de agregar en la DB:', usuarioCreado)
                console.log(`Usuario creado luego de buscarlo en la DB: ${await UsuariosModel.findById(usuarioCreado._id)}`)

        
            }
        }
        catch (err){
            console.log(err)

            if (err.name === "ValidationError") {
                let errors = {};
            
                Object.keys(err.errors).forEach((key) => {
                    if (err.errors[key].name === "CastError") {
                        errors[key] = `Tipo de dato incorrecto: ${err.errors[key].message}`;    
                    }
                    else {
                        errors[key] = err.errors[key].message;
                    }
                });

                
            }
            
            
            //error "unique" para usuarios repetidos:
            if (err.errorResponse?.code === 11000){
                console.log(`El usuario ${cuentaDemo} ya existe.`)
                
            }
        }

    }


}

module.exports = crear_cuentas_demo