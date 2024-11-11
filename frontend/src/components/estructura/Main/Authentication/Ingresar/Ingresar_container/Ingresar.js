//css
import styles from './Ingresar.module.css'

//componentes
import Lista_Cuentas_Demo from '../Lista_Cuentas_Demo/Lista_Cuentas_Demo'
import FormInput from '../../../../../componentes_reutilizables/FormInput/FormInput';
import FormularioReutilizable from '../../../../../componentes_reutilizables/FormularioReutilizable/FormularioReutilizable';
import FetchStatusText from '../../../../../componentes_reutilizables/FetchStatusText/FetchStatusText';

//react
import { useState, useEffect } from 'react';

//config
import { FETCH_STATUS } from '../../../../../../config/config';
import { URL_INGRESAR } from '../../../../../../config/config';
// const test_URL_INGRESAR = 'https://httpbin.org/post'




function Ingresar (
    {setIsAuth}
) {
    document.querySelector('title').innerText = 'Ingresar';

    //body del fetch
    const [credenciales, setCredenciales] = useState({
        usuario: false,
        password: false
    })

    //este effect es para actualizar las credenciales y triggerear un submit
    useEffect(()=>{
        
        console.log('dentro del effect de credenciales')
        console.log(credenciales)

    }, [credenciales])

    // Esto va cambiando según lo que pase en el fetch:
    const [fetchStatus, setFetchStatus] = useState({
        status: FETCH_STATUS.DEFAULT,
        //En este caso no necesito success message, porque paso directamente a las Screens
        // successMessage: 'Credenciales correctas',
        errorMessage: 'Credenciales inválidas'
    })

    // Este effect es para pasar a Session
    useEffect(()=>{
    
        if (fetchStatus.status === FETCH_STATUS.SUCCESS) {
            setIsAuth(true);
        }

        console.log('dentro del effect de fetchStatus')
    }, [fetchStatus])


    return (
        <div className={styles.container}>

            <section className={styles.ingresarSection}>

                <h1>Ingresar</h1>


                <FormularioReutilizable 
                    fetchStatus={fetchStatus}
                    setFetchStatus={setFetchStatus}
                    fetchURL={URL_INGRESAR}
                    fetchBody={credenciales}
                    formInputs={
                        <>
                            <FormInput 
                                idInput='usuario'
                                type='text'
                                texto='Usuario'

                                required='true'

                                esUsuario='true'

                                value={credenciales.usuario?credenciales.usuario: null}
                            />

                            <FormInput 
                                idInput='password'
                                type='password'
                                texto='Contraseña'

                                required='true'

                                value={credenciales.password?credenciales.usuario:null}
                            />
                        </>
                    }
                />


                <FetchStatusText 
                    fetchStatus={fetchStatus}
                />

            </section>
            

            <Lista_Cuentas_Demo 
                setCredenciales={setCredenciales}
            />
            
        </div>
    )
}

export default Ingresar