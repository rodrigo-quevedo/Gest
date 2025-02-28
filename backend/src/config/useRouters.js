function useRouters (app) {


    //authentication
    const registrarseRoute = require('../routes/Authentication/registrarse')
    app.use('/registrarse', registrarseRoute)
    const sessionRoute = require('../routes/Authentication/session')
    app.use('/session', sessionRoute)
    const cuentas_demoRoute = require('../routes/Authentication/cuentas_demo')
    app.use('/cuentas_demo', cuentas_demoRoute)


    //session
    const productosRoute = require('../routes/Session/productos')
    app.use('/productos', productosRoute)
    const historial_productosRoute = require('../routes/Session/historial_productos')
    app.use('/historial_productos', historial_productosRoute)
    const historial_ventasRoute = require('../routes/Session/historial_ventas')
    app.use('/historial_ventas', historial_ventasRoute)

}

module.exports = useRouters