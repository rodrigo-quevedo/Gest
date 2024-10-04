// en entorno de development: estoy usando un .env para esta variable
// en entorno production: cargo esta variable en el hosting
export const URL_EXPRESS_APP = process.env.REACT_APP_URL_EXPRESS_APP 


export const LOGIN_SCREENS = {
    LOGIN: 'LOGIN',
    REGISTRARSE: 'REGISTRARSE'
}

export const SESSION_SCREENS = {
    LISTA_PRODUCTOS: 'LISTA_PRODUCTOS',
    INGRESAR_PRODUCTOS: 'INGRESAR_PRODUCTOS',
    HISTORIAL_PRODUCTOS: 'HISTORIAL_PRODUCTOS',
    REGISTRAR_VENTAS: 'REGISTRAR_VENTAS', 
    HISTORIAL_VENTAS: 'HISTORIAL_VENTAS'
}

