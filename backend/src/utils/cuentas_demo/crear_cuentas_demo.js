const UsuariosModel = require('../../models/Authentication/Usuarios')

const Lista_ProductosModel = require('../../models/Session/Lista_Productos')
const Historial_ProductosModel = require('../../models/Session/Historial_Productos')
const Historial_VentasModel = require('../../models/Session/Historial_Ventas')

const {arrCuentasDemo, arrCompras, arrVentas} = require('./data')


const bcrypt = require('bcrypt')
async function crear_cuentas_demo  () {

    for (let cuentaDemoIndex in arrCuentasDemo){
        let nombreUsuario = arrCuentasDemo[cuentaDemoIndex]

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
            
            //funcion para armar listaProductos
            let actualizarListaProductos = (listaProductos, element, operation)=>{
                if (operation === 'compra') {
                    let i = listaProductos.findIndex(el=> {
                        el.producto === element.producto
                        &&
                        el.marca === element.marca
                        &&
                        el.proveedor === element.proveedor
                    })
                    
                    if (i === -1) {
                        listaProductos.push(element)
                        return;
                    }

                    listaProductos[i].cantidad += element.cantidad 
                    return
                }

                if (operation === 'venta') {
                    let i = listaProductos.findIndex(el=> {
                        el.producto === element.producto
                        &&
                        el.marca === element.marca
                        &&
                        el.proveedor === element.proveedor
                    })
                    
                    if (i === -1) return;

                    listaProductos[i].cantidad -= element.cantidad 
                    return
                }
            }

            //llenar historial_productos y actualizar lista_productos
            arrCompras[cuentaDemoIndex].forEach(el => {
                historialProductosCreado.historialProductos.push(el)
                actualizarListaProductos(listaProductosCreada.listaProductos, el, 'compra')    
            })

            const updatedHistorialProductos = await historialProductosCreado.save()
            console.log('updatedHistorialProductos:', updatedHistorialProductos)
            const updatedListaProductos_1 = await listaProductosCreada.save()
            console.log('updatedListaProductos_1:', updatedListaProductos_1)
            

            //llenar historial_ventas y actualizar lista_productos
            arrVentas[cuentaDemoIndex].forEach(el => {
                historialVentasCreado.historialVentas.push(el)
                actualizarListaProductos(listaProductosCreada.listaProductos, el, 'venta') 
            })
            const updatedHistorialVentas = await historialVentasCreado.save()
            console.log('updatedHistorialVentas:', updatedHistorialVentas)
            const updatedListaProductos_2 = await listaProductosCreada.save()
            console.log('updatedListaProductos_2', updatedListaProductos_2)

            

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