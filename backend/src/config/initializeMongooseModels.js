const UsuariosModel = require('../models/Authentication/Usuarios')
const Historial_ProducosModel = require('../models/Session/Historial_Productos')
const Historial_VentasModel = require('../models/Session/Historial_Ventas')
const Lista_ProductosModel = require('../models/Session/Lista_Productos')


const initializeMongooseModels = async () => {
    await UsuariosModel.init()
    await Historial_ProducosModel.init()
    await Historial_VentasModel.init()
    await Lista_ProductosModel.init()

    console.log('mongoose models inicializados')
}

module.exports = initializeMongooseModels