//css
import styles from './Registrarse.module.css'

//components
import FormInput from '../../../../componentes_reutilizables/FormInput/FormInput';
import FormularioReutilizable from '../../../../componentes_reutilizables/FormularioReutilizable/FormularioReutilizable';
import FetchStatusText from '../../../../componentes_reutilizables/FetchStatusText/FetchStatusText';

//react
import { useState } from 'react';

//config
import { FETCH_STATUS } from '../../../../../config/config';
import { URL_REGISTRARSE } from '../../../../../config/config';
// const test_URL_REGISTRARSE = 'https://httpbin.org/post'



function Registrarse (
) {
    document.querySelector('title').innerText = 'Registrarse';

    // Esto va cambiando según lo que pase en el fetch:
    const [fetchStatus, setFetchStatus] = useState({
        status: FETCH_STATUS.DEFAULT,
        successMessage: null,
        errorMessage: null
    })

    return (

        <div className={styles.container}>

            <h1>Registrarse</h1>


            <FormularioReutilizable 
                fetchStatus={fetchStatus}
                setFetchStatus={setFetchStatus}
                fetchURL={URL_REGISTRARSE}
                formInputs={
                    <>
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
                    </>
                }
            />

            <FetchStatusText 
                fetchStatus={fetchStatus}
            />

        </div>

    )
}

export default Registrarse;