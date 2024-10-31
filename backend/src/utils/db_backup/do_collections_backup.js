const mongoose = require('mongoose')

const get_last_backup_number = require('./collections_backup_model')

//collections a las que hacerles backup:
const UsuariosModel = require('../../models/Authentication/Usuarios')
const Historial_ProductosModel = require('../../models/Session/Historial_Productos')
const Historial_VentasModel = require('../../models/Session/Historial_Ventas')
const Lista_ProductosModel = require('../../models/Session/Lista_Productos')


const do_backup = async (description) => {

    let last_backup_number = await get_last_backup_number(description)
    
    const backup_URL = `${process.env.DB_URL}_backup_${last_backup_number}`
    
    const backup_connection = mongoose.createConnection(backup_URL)

    
    console.log('creando collections...')
    const Usuarios = await UsuariosModel.find({});
    // console.log('collection Usuarios:',Usuarios)
    console.log( await backup_connection.collection('Usuarios').insertMany(Usuarios) )
    
    const Historial_Productos = await Historial_ProductosModel.find({});
    console.log( await backup_connection.collection('Historial_Productos').insertMany(Historial_Productos) )
    
    const Historial_Ventas = await Historial_VentasModel.find({});
    console.log( await backup_connection.collection('Historial_Ventas').insertMany(Historial_Ventas) )
    
    const Lista_Productos = await Lista_ProductosModel.find({});
    console.log( await backup_connection.collection('Lista_Productos').insertMany(Lista_Productos) )

}

module.exports = do_backup

