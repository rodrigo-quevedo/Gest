const arrCuentasDemo = [
    'Supermercado', 
    'Tienda de artículos de limpieza', 
    'Ferretería', 
    'Tienda de ropa'
]

const arrComprasSuper = require('./data/supermercado/compras')
const arrComprasArtLimpieza = require('./data/art_limpieza/compras')
const arrComprasFerreteria = require('./data/ferreteria/compras')
const arrComprasRopa = require('./data/ropa/compras')

const arrVentasSuper = require('./data/supermercado/ventas')
const arrVentasArtLimpieza = require('./data/art_limpieza/ventas')
const arrVentasFerreteria = require('./data/ferreteria/ventas')
const arrVentasRopa = require('./data/ropa/ventas')


const arrCompras = [
    //[0] supermercado
    arrComprasSuper,
    //[1] articulos limpieza
    arrComprasArtLimpieza,
    //[2] ferreteria
    arrComprasFerreteria,
    //[3] ropa
    arrComprasRopa
]

const arrVentas = [
    //[0] supermercado
    arrVentasSuper,
    //[1] articulos limpieza
    arrVentasArtLimpieza,
    //[2] ferreteria
    arrVentasFerreteria,
    //[3] ropa
    arrVentasRopa
]


module.exports = {
    arrCuentasDemo,
    arrCompras,
    arrVentas
}