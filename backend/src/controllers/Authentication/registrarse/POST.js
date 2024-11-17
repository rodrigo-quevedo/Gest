const UsuariosModel = require('../../../models/Authentication/Usuarios')

const Lista_ProductosModel = require('../../../models/Session/Lista_Productos')
const Historial_ProductosModel = require('../../../models/Session/Historial_Productos')
const Historial_VentasModel = require('../../../models/Session/Historial_Ventas')

const bcrypt = require('bcrypt')

const POST =  async (req, res) => {

    //LOGS
    console.log(`Se recibio POST en /registrarse: ${new Date()}`)
    console.log(`body de la request:`, req.body)

    //CORS
    res.header({
        "Access-Control-Allow-Origin" : process.env.URL_REACT_CLIENT,
        "Access-Control-Allow-Credentials": "true"
    })

    //validacion


    if (req.body.password === undefined) {
        res.status(400).json({
            success: false,
            message: 'password: El campo es obligatorio.'
        })

        return;
    }

    if (req.body.confirmPassword === undefined){
        res.status(400).json({
            success: false,
            message: 'confirmPassword: El campo es obligatorio.'
        })

        return;
    }

    if (req.body.password !== req.body.confirmPassword
    ) {
        res.status(400).json({
            success: false,
            message: 'Las contraseñas no coinciden. Intente nuevamente.'
        })

        return;
    }

    
    //hago la validacion aca en vez de en el schema para poder meter la password encriptada en el schema de 'password' 
    //(la password encriptada va a tener otro formato)
    if (/^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*[0-9])[a-zA-Z0-9ñÑ]{10,30}$/.test(req.body.password) === false) {
        res.status(400).json({
            success: false,
            message: "password: Los caracteres válidos son letras mayúsculas, letras minúsculas y números. NO se aceptan caracteres especiales, tampoco acentos o tildes. Debe tener entre 10 y 30 caracteres. Al menos 1 mayúscula, 1 minúscula y 1 número."
        })

        return;
    }

    if (/^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*[0-9])[a-zA-Z0-9ñÑ]{10,30}$/.test(req.body.confirmPassword) === false) {
        res.status(400).json({
            success: false,
            message: "password: Los caracteres válidos son letras mayúsculas, letras minúsculas y números. NO se aceptan caracteres especiales, tampoco acentos o tildes. Debe tener entre 10 y 30 caracteres. Al menos 1 mayúscula, 1 minúscula y 1 número."
        })

        return;
    }

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

        const usuarioCreado = await UsuariosModel.create({
            usuario: req.body.usuario,
            password: bcrypt.hashSync(req.body.password, 10),//password encriptada
            isDemo: false,
            idListaProductos: listaProductosCreada._id,
            idHistorialProductos: historialProductosCreado._id,
            idHistorialVentas: historialVentasCreado._id
        })

        if (usuarioCreado) {
            //LOG
            console.log(`Usuario creado: ${await UsuariosModel.findById(usuarioCreado._id)}`)

            //server response
            res.status(200).json({
                success: true,
                message: `Usuario creado con exito!. Usuario: ${usuarioCreado.usuario}`
            })
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
      
            res.status(400).json({
                success: false,
                message: errors
            });

            return
        }
        
        
        //error "unique" para usuarios repetidos:
        if (err.errorResponse?.code === 11000){
            res.status(500).json({
                success: false,
                message: `El usuario '${req.body.usuario}' ya existe.`
            });
        }


    }
}

module.exports = POST