//css
import styles from './Registrarse.module.css'

//components
import FormInput from '../../../../componentes_reutilizables/FormInput/FormInput';
import FormSubmitButton from '../../../../componentes_reutilizables/FormSubmitButton/FormSubmitButton';
import FetchStatusText from '../../../../componentes_reutilizables/FetchStatusText/FetchStatusText';

//config
import { FETCH_STATUS } from '../../../../../config/config';

//logica
import { useState } from 'react';


function Registrarse (
) {
    document.querySelector('title').innerText = 'Registrarse';

    // Esto va cambiando según lo que pase en el fetch:
    const [fetchStatus, setFetchStatus] = useState({
        status: FETCH_STATUS.ERROR,
        successMessage: 'Se registró al usuario correctamente.',
        errorMessage: 'Credenciales inválidas'
    })

    return (

        <div className={styles.container}>

            <h1>Registrarse</h1>

            <form>

                <FormInput 
                    idInput='usuario'
                    type='text'
                    texto='Usuario'

                    required='true'

                    esUsuario='true'
                />

                <FormInput 
                    idInput='password'
                    type='password'
                    texto='Contraseña'

                    required='true'
                />

                <FormInput 
                    idInput='confirmPassword'
                    type='password'
                    texto='Repetir contraseña'

                    required='true'
                />

                <FormSubmitButton 
                    texto="Registrarse"
                    fetchStatus={fetchStatus}
                />

            </form>

            <FetchStatusText 
                fetchStatus={fetchStatus}
            />

        </div>

    )
}

export default Registrarse;