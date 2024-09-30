import styles from './LoginForm.module.css'

import Lista_Cuentas_Demo from './Lista_Cuentas_Demo/Lista_Cuentas_Demo'

function LoginForm ({setMenu}) {
    return (
        <div>
            <section>
                <h1>Login</h1>

                <form>
                    <div>
                        <label for="usuario">Usuario</label>
                        <input type="text" id="usuario"/>
                    </div>

                    <div>
                        <label for="password">Contraseña</label>
                        <input type="password" id="password" />
                    </div>

                    <input type='submit' value='Enviar'/>
                </form>
            </section>
            

            <Lista_Cuentas_Demo />
            
        </div>
    )
}

export default LoginForm