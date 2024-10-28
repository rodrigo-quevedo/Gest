const Historial_ProductosModel = require('../../models/Session/Historial_Productos')

const testValidation = async () => {
    try {

        const usuarioCreado = await Historial_ProductosModel.create({
            producto: 'aslfjalsdfk',
            cantidad: 100,
            precio_unitario: 1203912039.10293019230129301,
            marca: 'asdlfjlsdsdf88',
            proveedor: 'aslfjasfdjsdlafjk'
        })

        console.log(
            usuarioCreado ? 
                `Creado: ${usuarioCreado}` 
            : 
                `Error al agregar a la DB: ${usuarioCreado}`
        )
        
        return usuarioCreado;//retorno la promise para poder usar await al llamar esta función
    }
    catch (err) {
        console.log('MongoDB error:', err)
    }
}

module.exports = testValidation