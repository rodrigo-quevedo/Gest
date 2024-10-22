// en entorno de development: estoy usando un .env para esta variable
// en entorno production: cargo esta variable en el hosting
export const URL_EXPRESS_APP = process.env.REACT_APP_URL_EXPRESS_APP 

export const URL_LISTA_PRODUCTOS = URL_EXPRESS_APP + '/productos'


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