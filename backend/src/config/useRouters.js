function useRouters (app) {

    const registrarseRoute = require('../routes/Authentication/registrarse')
    app.use('/registrarse', registrarseRoute)
    const ingresarRoute = require('../routes/Authentication/ingresar')
    app.use('/ingresar', ingresarRoute)
    const cerrar_sesionRoute = require('../routes/Authentication/cerrar_sesion')
    app.use('/cerrar_sesion', cerrar_sesionRoute)

    const productosRoute = require('../routes/Session/productos')
    app.use('/productos', productosRoute)
    const historial_productosRoute = require('../routes/Session/historial_productos')
    app.use('/historial_productos', historial_productosRoute)
    const historial_ventasRoute = require('../routes/Session/historial_ventas')
    app.use('/historial_ventas', historial_ventasRoute)

}

module.exports = useRouters