//css
import styles from './IngresarProductos.module.css'

//react
import {useState} from 'react'

//components
import FormularioReutilizable from '../../../../../../componentes_reutilizables/FormularioReutilizable/FormularioReutilizable';
import FormInput from '../../../../../../componentes_reutilizables/FormInput/FormInput';
import FetchStatusText from '../../../../../../componentes_reutilizables/FetchStatusText/FetchStatusText';

//config
import {FETCH_STATUS} from '../../../../../../../config/config'
import { URL_INGRESAR_PRODUCTOS } from "../../../../../../../config/config"




function IngresarProductos () {
    document.querySelector('title').innerText = 'Ingresar producto';

    // Esto va cambiando según lo que pase en el fetch:
    const [fetchStatus, setFetchStatus] = useState({
        status: FETCH_STATUS.DEFAULT
    })



    return (
        <section className={styles.container}>

                <h1>Nuevo producto</h1>

                <FormularioReutilizable 
                    fetchStatus={fetchStatus}
                    setFetchStatus={setFetchStatus}
                    submitMessage={"Ingresando producto..."}
                    fetchURL={URL_INGRESAR_PRODUCTOS}
                    formInputs={
                        <>
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
                        </>
                    }
                />

                <FetchStatusText 
                    fetchStatus={fetchStatus}
                />

        </section>
    )


}


export default IngresarProductos