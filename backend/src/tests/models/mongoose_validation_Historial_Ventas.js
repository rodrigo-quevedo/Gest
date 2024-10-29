const Historial_VentasModel = require('../../models/Session/Historial_Ventas')

const testValidation = async () => {
    try {

        const usuarioCreado = await Historial_VentasModel.create({
            producto: 'aslfjalsdfk',
            cantidad: 100,
            precio_unitario: 1203912039.10293019230129301,
            marca: 'asdlfjlsdsdf88',
            proveedor: 'aslfjasfdjsdlafjk',
            fechaHora: new Date()
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