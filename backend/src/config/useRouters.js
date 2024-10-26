function useRouters (app) {

    const registrarseRoute = require('../routes/Authentication/registrarse')
    app.use('/', registrarseRoute)
    const ingresarRoute = require('../routes/Authentication/ingresar')
    app.use('/', ingresarRoute)
    const cerrar_sesionRoute = require('../routes/Authentication/cerrar_sesion')
    app.use('/', cerrar_sesionRoute)

    const productosRoute = require('../routes/Session/productos')
    app.use('/', productosRoute)
    const historial_productosRoute = require('../routes/Session/historial_productos')
    app.use('/', historial_productosRoute)
    const historial_ventasRoute = require('../routes/Session/historial_ventas')
    app.use('/', historial_ventasRoute)

}

module.exports = useRouters