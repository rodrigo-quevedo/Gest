const isAuthenticated = require('./isAuthenticated')

const ingresar_con_jwt_cookie = (req, res, next) => {
    
    if (req.cookies.jwt) {
        isAuthenticated(req, res, next)
    }
    else {
        next()
    }
}

module.exports = ingresar_con_jwt_cookie