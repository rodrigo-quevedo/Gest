const mongoose = require('mongoose')
const {MongoClient} = require('mongodb')

const get_last_backup_number = require('./collections_backup_model')

//collections a las que hacerles backup:
const UsuariosModel = require('../../models/Authentication/Usuarios')
const SessionsModel = require('../../models/Authentication/Sessions')
const Historial_ProductosModel = require('../../models/Session/Historial_Productos')
const Historial_VentasModel = require('../../models/Session/Historial_Ventas')
const Lista_ProductosModel = require('../../models/Session/Lista_Productos')


const do_backup = async (description) => {

    try {
        let last_backup_number = await get_last_backup_number(description)
        
        const backup_URL = `${process.env.DB_URL}_backup_${last_backup_number}`
        
        const backup_connection = new MongoClient(backup_URL)
    
    
        console.log('creando collections...')
        const Usuarios = await UsuariosModel.find({});
        if (Usuarios instanceof Array && Usuarios.length > 0) {
            const usuarios_en_backup = await backup_connection.db().collection('Usuarios').insertMany(Usuarios);
            if (usuarios_en_backup) console.log('backup con exito:', usuarios_en_backup)
        }
        
        const Sessions = await SessionsModel.find({});
        if (Sessions instanceof Array && Sessions.length > 0) {
            const sessions_en_backup = await backup_connection.db().collection('Sessions').insertMany(Sessions);
            if(sessions_en_backup) console.log('backup con exito:', sessions_en_backup)
        }
        
        const Historial_Productos = await Historial_ProductosModel.find({});
        if (Historial_Productos instanceof Array && Historial_Productos.length > 0) {
            const historial_productos_en_backup = await backup_connection.db().collection('Historial_Productos').insertMany(Historial_Productos);
            if(historial_productos_en_backup) console.log('backup con exito:', historial_productos_en_backup)
        }
        
        const Historial_Ventas = await Historial_VentasModel.find({});
        if (Historial_Ventas instanceof Array && Historial_Ventas.length > 0) {
            const historial_ventas_en_backup = await backup_connection.db().collection('Historial_Ventas').insertMany(Historial_Ventas);
            if(historial_ventas_en_backup) console.log('backup con exito:', historial_ventas_en_backup)
        }
        
        const Lista_Productos = await Lista_ProductosModel.find({});
        if (Lista_Productos instanceof Array && Lista_Productos.length > 0) {
            const lista_productos_en_backup = await backup_connection.db().collection('Lista_Productos').insertMany(Lista_Productos);
            if (lista_productos_en_backup) console.log('backup con exito:', lista_productos_en_backup)
        }

    }
    catch(err){
        console.log(err)
    }


}

module.exports = do_backup

