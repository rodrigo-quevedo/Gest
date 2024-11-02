const UsuariosModel = require('../../../models/Authentication/Usuarios')

const POST =  async (req, res) => {

    try {
        const usuarioCreado = await UsuariosModel.create({
            usuario: req.body.usuario,
            password: req.body.password,
            isDemo: false
        })

        if (usuarioCreado) {
            res.send('Server: Usuario creado con exito.')
        }
        else {
            console.log('Server: Error al crear el usuario')
        }

    }
    catch (err){
        console.log(err)
        res.send(err)
    }
}

module.exports = POST