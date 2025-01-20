
//Documentación: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#custom_error_types
class InputValidationError extends Error {
    constructor(...params) {
        // Qué puede ir en ...params / signatures del constructor Error:
        // new Error()
        // new Error(message)
        // new Error(message, options)
        // new Error(message, fileName)
        // new Error(message, fileName, lineNumber)
        super(...params);
        //docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error
  
      //Este stacktrace solo funciona con V8, pero no hay problema, porque este código se va a ejecutar en NodeJS (que usa V8):
      if (Error.captureStackTrace) Error.captureStackTrace(this, InputValidationError);
  
      this.name = "InputValidationError";
    }
  }
  
module.exports = InputValidationError