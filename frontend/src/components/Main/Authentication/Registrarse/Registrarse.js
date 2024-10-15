import styles from './Registrarse.module.css'

function Registrarse (
) {
    document.querySelector('title').innerText = 'Registrarse';

    return (
        <div className={styles.container}>
            <h1>Registrarse</h1>

            <form>
                <div className={styles.inputContainer}>
                    <label for="usuario">Usuario</label>
                    <input type="text" id="usuario"/>
                </div>

                <div className={styles.inputContainer}>
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" />
                </div>

                <div className={styles.inputContainer}>
                    <label for="confirmPassword">Repetir contraseña</label>
                    <input type="password" id="confirmPassword" />
                </div>

                <input 
                    type='submit' 
                    value='Registrarse'
                    className={styles.submitButton}
                />
            </form>
        </div>
    )
}

export default Registrarse;