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

                //aca tengo que setear el body de lo que voy a enviar al POST en /sessions
                //esto es opcional, cuando obtengo el body por afuera del formulario:
                if (fetchBody.usuario && fetchBody.password){
                    fetchBackend(
                        fetchURL,
                        setFetchStatus,
                        fetchBody
                    );
                }
                
                else {
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
                }


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