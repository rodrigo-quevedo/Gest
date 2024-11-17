const UsuariosModel = require('../../models/Authentication/Usuarios')

const Lista_ProductosModel = require('../../models/Session/Lista_Productos')
const Historial_ProductosModel = require('../../models/Session/Historial_Productos')
const Historial_VentasModel = require('../../models/Session/Historial_Ventas')

const bcrypt = require('bcrypt')
async function crear_cuentas_demo  () {
    let numeroUsuario = 0;

    
    for (let i=0; i<4; i++){
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

            //crear usuario
            const usuarioCreado = await UsuariosModel.create({
                usuario: `UsuarioDemo${numeroUsuario++}`,
                password: bcrypt.hashSync(process.env.CUENTAS_DEMO_PASSWORD, 10),//password encriptada
                isDemo: true,
                idListaProductos: listaProductosCreada._id,
                idHistorialProductos: historialProductosCreado._id,
                idHistorialVentas: historialVentasCreado._id
            })
    
            if (usuarioCreado) {
                //LOG
                console.log('Usuario creado:', usuarioCreado)
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
                console.log(`El usuario '${`UsuarioDemo${numeroUsuario-1}`}' ya existe.`)
                
            }
        }

    }


}

module.exports = crear_cuentas_demo