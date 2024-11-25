import styles from './FormInput.module.css'

function FormInput ({
    idInput,
    type,
    texto,
    min,
    max,
    esPrecio,
    esUsuario,
    required,
    value
}) {

    switch(type) {

        case 'text' : {
            // Validación de usuario
            if (esUsuario === 'true') {
                return (
                    <div className={styles.inputContainer}>
                        <label htmlFor={idInput}>{texto}</label>
                        <input 
                            autoComplete='off'
                            required={required}
                            value={value?value: null}
    
                            type={type} 
                            id={idInput}
                            name={idInput}
    
                            minLength='6'
                            maxLength='20'
                            pattern='^[a-zA-ZÀ-ÿñÑ0-9]{6,20}$'
                            title={"Solo son válidos: letras mayúsculas, letras minúsculas y números. NO se aceptan caracteres especiales. Mínimo 6 y máximo 20 caracteres."}
                        />
                    </div>
                )
            }

            // Texto que no necesita validación de autenticación (ej: producto, marca, proveedor)
            return (
                <div className={styles.inputContainer}>
                    <label htmlFor={idInput}>{texto}</label>
                    <input 
                        autoComplete='off'
                        required={required}
                        value={value?value: null}

                        type={type} 
                        id={idInput}
                        name={idInput}

                        minLength='6'
                        maxLength='50'
                        pattern='^[a-zA-ZÀ-ÿñÑ0-9 .]{6,50}$'
                        title={"Solo son válidos: letras mayúsculas, letras minúsculas, números, el punto (.) y los espacios. NO se aceptan caracteres especiales. Mínimo 6 y máximo 50 caracteres."}
                    />
                </div>
            )
        }

        // Validación de contraseña
        case 'password' : {
    
            return (
                <div className={styles.inputContainer}>
                    <label htmlFor={idInput}>{texto}</label>
                    <input 
                        autoComplete='off'
                        required={required}
                        value={value?value: null}

                        type={type} 
                        id={idInput}
                        name={idInput}

                        minLength='10'
                        maxLength='30'
                        pattern='^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*[0-9])[a-zA-Z0-9ñÑ]{10,30}$'
                        title={"Caracteres válidos: letras mayúsculas, letras minúsculas y números. NO se aceptan caracteres especiales, tampoco acentos o tildes. Debe tener entre 10 y 30 caracteres. Al menos 1 mayúscula, 1 minúscula y 1 número."}
                    />
                </div>
            )
        }
        

        case 'number': {

            // Floats
            if (esPrecio === 'true') {
                return (
                    <div className={styles.inputContainer}>
                        <label htmlFor={idInput}>{texto}</label>
                        <input 
                            autoComplete='off'
                            required={required}
                            value={value?value: null}

                            type={type} 
                            id={idInput}
                            name={idInput}

                            step="0.01"
                            min={min}
                            max={max}
                        />
                    </div>
                )
            }

            // Números enteros
            else {
                return (
                    <div className={styles.inputContainer}>
                        <label htmlFor={idInput}>{texto}</label>
                        <input 
                            autoComplete='off'
                            required={required}
                            value={value?value: null}

                            type={type} 
                            id={idInput}
                            name={idInput}
                            
                            min={min}
                            max={max}
                        />
                    </div>
                )
            }
        }

    }

}

export default FormInput