import './Registrarse.module.css'

function Registrarse (
) {
    document.querySelector('title').innerText = 'Registrarse';

    return (
        <div>
            <h1>Registrarse</h1>

            <form>
                <div>
                    <label for="usuario">Usuario</label>
                    <input type="text" id="usuario"/>
                </div>

                <div>
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" />
                </div>

                <div>
                    <label for="confirmPassword">Repetir contraseña</label>
                    <input type="password" id="confirmPassword" />
                </div>

                <input type='submit' value='Enviar'/>
            </form>
        </div>
    )
}

export default Registrarse;