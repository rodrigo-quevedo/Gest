// en entorno de development: estoy usando un .env para esta variable
// en entorno production: cargo esta variable en el hosting
export const URL_EXPRESS_APP = process.env.REACT_APP_URL_EXPRESS_APP 

//session URL
export const URL_LISTA_PRODUCTOS = URL_EXPRESS_APP + '/productos' //GET
export const URL_INGRESAR_PRODUCTOS = URL_EXPRESS_APP + '/historial_productos' //POST
export const URL_HISTORIAL_PRODUCTOS = URL_EXPRESS_APP + '/historial_productos' //GET
export const URL_REGISTRAR_VENTAS = URL_EXPRESS_APP + '/historial_ventas' //POST
export const URL_HISTORIAL_VENTAS = URL_EXPRESS_APP + '/historial_ventas' //GET

//auth URL
export const URL_REGISTRARSE = URL_EXPRESS_APP + '/registrarse' //POST
export const URL_INGRESAR = URL_EXPRESS_APP + '/session' //POST
export const URL_CERRAR_SESION = URL_EXPRESS_APP + '/session' //DELETE



export const AUTHENTICATION_SCREENS = {
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

export const SEARCHBOX_STATE = {
    DEFAULT: 'DEFAULT',
    CLICKED: 'CLICKED',
    SUBMIT: 'SUBMIT',
    FETCH_SUCCESS: 'FETCH_SUCCESS'
}

export const FETCH_STATUS = {
    DEFAULT: 'DEFAULT',
    SUBMIT: 'SUBMIT',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
}