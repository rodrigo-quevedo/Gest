const Lista_ProductosModel = require('../../models/Session/Lista_Productos')

const testValidation = async () => {
    try {

        const productoCreado = await Lista_ProductosModel.create({
            producto: 'aslfjalsdfk',
            cantidad: 110,
            precio_unitario: 1203239.10293019230129301,
            marca: 'asdlfjlsdsdf88',
            proveedor: 'aslfjasfdjsdlafjk'
        })

        console.log(
            productoCreado ? 
                `Creado: ${productoCreado}` 
            : 
                `Error al agregar a la DB: ${productoCreado}`
        )
        
        return productoCreado;//retorno la promise para poder usar await al llamar esta función
    }
    catch (err) {
        console.log('MongoDB error:', err)
    }
}

module.exports = testValidation