const UsuariosModel = require('../../../models/Authentication/Usuarios')

const bcrypt = require('bcrypt')

const GET =  async (req, res) => {

    //LOGS
    console.log(`Se recibio GET en /cuentas_demo: ${new Date()}`)
    console.log(`body de la request:`, req.body)

    //CORS
    res.header({
        "Access-Control-Allow-Origin" : process.env.URL_REACT_CLIENT,
        "Access-Control-Allow-Credentials": "true"
    })

    //respuesta del servidor
    try {
        const cuentasDemo = await UsuariosModel.find({
            isDemo: true
        })

        if (cuentasDemo.length > 0) {
            //LOG
            console.log(`Cuentas demo: ${cuentasDemo}`)

            let usersAndPasswords = cuentasDemo.map(
                (cuentaDemoObj)=> {
                    //chequear password
                    if (bcrypt.compareSync(process.env.CUENTAS_DEMO_PASSWORD, cuentaDemoObj.password)){
                        return {
                            usuario: cuentaDemoObj.usuario, 
                            password: process.env.CUENTAS_DEMO_PASSWORD
                        }
                    }
                    else {
                        throw new Error('Las passwords de las cuentas demo están mal configuradas.')
                    }

                }
            )

            //server response
            res.status(200).json({
                success: true,
                message: `Lista de cuentas demo obtenida con éxito`,
                cuentasDemo: usersAndPasswords
            })
            return;
        }

        else {
            console.log('No hay cuentas demo.')

            res.status(500).json({
                success: false,
                message: `No hay cuentas demo disponibles.`
            })
            return;
        }
    }

    catch (err){
        console.log(err)

        res.status(500).json({
            success: false,
            message: `Hubo un error al obtener la lista de cuentas demo. ${err}`
        })

        return;
    }
}

module.exports = GET