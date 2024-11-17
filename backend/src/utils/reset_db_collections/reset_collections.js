const mongoose = require('mongoose')

const UsuariosModel = require('../../models/Authentication/Usuarios')
const SessionsModel = require('../../models/Authentication/Sessions')
const Historial_ProductosModel = require('../../models/Session/Historial_Productos')
const Historial_VentasModel = require('../../models/Session/Historial_Ventas')
const Lista_ProductosModel = require('../../models/Session/Lista_Productos')

const resetAllCollections = async () => {
    
    console.log(await UsuariosModel.collection.drop());
    console.log(await SessionsModel.collection.drop());
    console.log(await Historial_ProductosModel.collection.drop());
    console.log(await Historial_VentasModel.collection.drop());
    console.log(await Lista_ProductosModel.collection.drop());


}



module.exports = resetAllCollections