//css
import styles from './IngresarProductos.module.css'

//components
import FormInput from '../../../../../../componentes_reutilizables/FormInput/FormInput';
import FormSubmitButton from '../../../../../../componentes_reutilizables/FormSubmitButton/FormSubmitButton';
import FetchStatusText from '../../../../../../componentes_reutilizables/FetchStatusText/FetchStatusText';

//config
import {FETCH_STATUS} from '../../../../../../../config/config'

// logica
import {useState, useEffect} from 'react'
import fetchBackend from '../fetch_backend/fetchBackend';


function IngresarProductos () {
    document.querySelector('title').innerText = 'Ingresar producto';

    // Esto va cambiando según lo que pase en el fetch:
    const [fetchStatus, setFetchStatus] = useState({
        status: FETCH_STATUS.SUCCESS,
        successMessage: 'Producto ingresado con éxito',
        errorMessage: 'Error: No se pudo ingresar el producto'
    })

    // // Esto es para resetear el formulario
    // useEffect(()=>{

    // }, [fetchStatus])

    return (
        <section className={styles.container}>

                <h1>Nuevo producto</h1>

                <form 
                    
                    id="formIngresarProductos" 
                    
                    className={
                        fetchStatus.status === FETCH_STATUS.SUBMIT ? 
                            styles.formularioLoading
                        :
                            null
                    }

                    onSubmit={(e)=>{
                        e.preventDefault();

                        //al ser asíncrono, no hace falta cambiar el fetchStatus state a submit dentro de esta funcion
                        fetchBackend(
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
                    
                    <FormInput 
                        idInput='producto'
                        type='text'
                        texto='Nombre del producto'

                        required='true'
                    />

                    <FormInput 
                        idInput='cantidad'
                        type='number'
                        texto='Cantidad'

                        min='0'
                        max='9999'
                        esPrecio='false'

                        required='true'
                    />

                    <FormInput 
                        idInput='precio_unitario'
                        type='number'
                        texto='Precio unitario'

                        min='0'
                        max='999999999'
                        esPrecio='true'

                        required='true'
                    />

                    <FormInput 
                        idInput='marca'
                        type='text'
                        texto='Marca'

                        required='true'
                    />

                    <FormInput 
                        idInput='proveedor'
                        type='text'
                        texto='Proveedor'

                        required='true'
                    />


                    <FormSubmitButton 
                        text='Enviar'
                        fetchStatus={fetchStatus}
                    />

                </form>

                <FetchStatusText 
                    fetchStatus={fetchStatus}
                />

        </section>
    )


}


export default IngresarProductos