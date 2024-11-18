//css
import styles from './FormularioReutilizable.module.css'

//react
import { useEffect } from 'react'

//componentes
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton';

//config
import {FETCH_STATUS} from '../../../config/config'

//logica
import fetchBackend from './fetch_backend/fetchBackend';


function FormularioReutilizable({
    fetchStatus,
    setFetchStatus,
    submitMessage,
    fetchURL,
    formInputs
}) {


    // Esto es para resetear el formulario
    useEffect(()=>{
        
        if (fetchStatus.status === FETCH_STATUS.SUCCESS) {
            document.getElementById('formularioReutilizable').reset()
        }

    }, [fetchStatus])


    return (



        <form
                    
            id="formularioReutilizable" 
            
            className={
                fetchStatus.status === FETCH_STATUS.SUBMIT ? 
                    `${styles.formContainer} ${styles.formularioLoading}`
                :
                    styles.formContainer
            }

            onSubmit={(e)=>{
                e.preventDefault();
                
                //al ser asíncrono, no hace falta cambiar el fetchStatus state a submit dentro de esta funcion

                fetchBackend(
                    fetchURL,
                    setFetchStatus,
                    Object.fromEntries(
                        new FormData(
                            document.getElementById('formularioReutilizable')
                        )
                    )
                );
                


                setFetchStatus({
                    status: FETCH_STATUS.SUBMIT,
                    submitMessage: submitMessage
                })
            }}
         >
        
            { formInputs }

            <FormSubmitButton 
                text='Enviar'
                fetchStatus={fetchStatus}
            />

        </form>
    )
}

export default FormularioReutilizable