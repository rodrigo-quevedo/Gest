//css
import styles from './FormularioReutilizable.module.css'

//react
import { useState, useEffect } from 'react'

//componentes
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton';

//config
import {FETCH_STATUS} from '../../../config/config'

//logica
import fetchBackend from './fetch_backend/fetchBackend';


function FormularioReutilizable({
    fetchStatus,
    setFetchStatus,
    fetchURL,
    fetchBody,//opcional
    formInputs
}) {


    // Esto es para resetear el formulario
    useEffect(()=>{
        
        if (fetchStatus.status === FETCH_STATUS.SUCCESS) {
            document.getElementById('formIngresarProductos').reset()
        }

    }, [fetchStatus])


    return (



        <form
                    
            id="formIngresarProductos" 
            
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
                            document.getElementById('formIngresarProductos')
                        )
                    )
                );
                


                setFetchStatus({
                    status: FETCH_STATUS.SUBMIT,
                    successMessage: null,
                    errorMessage: null
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