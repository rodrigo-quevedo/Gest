//css
import styles from './IngresarProductos.module.css'

//components
import FormInput from '../../../../../../componentes_reutilizables/FormInput/FormInput';
import FormSubmitButton from '../../../../../../componentes_reutilizables/FormSubmitButton/FormSubmitButton';
import FetchStatusText from '../../../../../../componentes_reutilizables/FetchStatusText/FetchStatusText';

//config
import {FETCH_STATUS} from '../../../../../../../config/config'

// logica
import {useState} from 'react'
import fetchBackend from '../fetch_backend/fetchBackend';


function IngresarProductos () {
    document.querySelector('title').innerText = 'Ingresar producto';

    // Esto va cambiando según lo que pase en el fetch:
    const [fetchStatus, setFetchStatus] = useState({
        status: FETCH_STATUS.SUCCESS,
        successMessage: 'Producto ingresado con éxito',
        errorMessage: 'Error: No se pudo ingresar el producto'
    })

    return (
        <section className={styles.container}>

                <h1>Nuevo producto</h1>

                <form 
                    id="formularioCompra" 
                    className={styles.formulario}
                >
                    
                    <FormInput 
                        idInput='producto'
                        type='texto'
                        texto='Nombre del producto'
                    />

                    <FormInput 
                        idInput='cantidad'
                        type='number'
                        texto='Cantidad'
                    />

                    <FormInput 
                        idInput='precio_unitario'
                        type='number'
                        texto='Precio unitario'
                    />

                    <FormInput 
                        idInput='marca'
                        type='text'
                        texto='Marca'
                    />

                    <FormInput 
                        idInput='proveedor'
                        type='text'
                        texto='Proveedor'
                    />


                    <FormSubmitButton 
                        text='Enviar'
                    />

                </form>

                <FetchStatusText 
                    fetchStatus={fetchStatus}
                />

        </section>
    )


}


export default IngresarProductos