//css
import styles from './FormularioReutilizable.module.css'
import stylesVertical from './FormularioReutilizableVertical.module.css'

//react
import { useEffect } from 'react'

//componentes
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton';

//config
import {FETCH_STATUS} from '../../../config/config'
import { FORM_STYLE_TYPE } from '../../../config/config';

//logica
import fetchBackend from './fetch_backend/fetchBackend';


function FormularioReutilizable({
    styleType,
    fetchStatus,
    setFetchStatus,
    submitMessage,
    fetchURL,
    formInputs
}) {

    //para cambiar de estilos, simplemente hay que crear una variable que tenga adentro el estilo. Despues se puede poner un if() que evalúe un parámetro y elija.
    let stylesSelected = styles;

    if (styleType === FORM_STYLE_TYPE.VERTICAL) stylesSelected = stylesVertical

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
                    `${stylesSelected.formContainer} ${stylesSelected.formularioLoading}`
                :
                stylesSelected.formContainer
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