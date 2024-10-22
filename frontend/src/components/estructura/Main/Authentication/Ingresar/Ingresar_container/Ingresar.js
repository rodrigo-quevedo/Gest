//css
import styles from './Ingresar.module.css'

//componentes
import Lista_Cuentas_Demo from '../Lista_Cuentas_Demo/Lista_Cuentas_Demo'
import FormInput from '../../../../../componentes_reutilizables/FormInput/FormInput';
import FormSubmitButton from '../../../../../componentes_reutilizables/FormSubmitButton/FormSubmitButton';
import FetchStatusText from '../../../../../componentes_reutilizables/FetchStatusText/FetchStatusText';

//config
import { FETCH_STATUS } from '../../../../../../config/config';

//logica
import { useState } from 'react';


const handleSubmit = (e, setIsAuth) => {
    e.preventDefault();
    setIsAuth(true);
}

function Ingresar (
    {setIsAuth}
) {
    document.querySelector('title').innerText = 'Ingresar';

    // Esto va cambiando según lo que pase en el fetch:
    const [fetchStatus, setFetchStatus] = useState({
        status: FETCH_STATUS.ERROR,
        //En este caso no necesito success message, porque paso directamente a las Screens
        // successMessage: 'Credenciales correctas',
        errorMessage: 'Credenciales inválidas'
    })


    return (
        <div className={styles.container}>

            <section className={styles.ingresarSection}>

                <h1>Ingresar</h1>

                <form 
                    id="ingresarForm" 
                    className={styles.form}
                    onSubmit={(e)=>handleSubmit(e, setIsAuth)}
                >

                    <FormInput 
                        idInput='usario'
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


                    <FormSubmitButton 
                        texto='Ingresar'
                        fetchStatus={fetchStatus}
                    />

                </form>

                <FetchStatusText 
                    fetchStatus={fetchStatus}
                />

            </section>
            

            <Lista_Cuentas_Demo />
            
        </div>
    )
}

export default Ingresar