//css
import styles from  './RegistrarVentas.module.css'

//react
import {useState} from 'react'

//components
import FormularioReutilizable from '../../../../../componentes_reutilizables/FormularioReutilizable/FormularioReutilizable';
import FormInput from '../../../../../componentes_reutilizables/FormInput/FormInput';
import FetchStatusText from '../../../../../componentes_reutilizables/FetchStatusText/FetchStatusText';

//icons
import { RiArrowGoBackFill } from "react-icons/ri";

//config
import {FETCH_STATUS} from '../../../../../../config/config'
import { URL_REGISTRAR_VENTAS } from "../../../../../../config/config"
import {SESSION_SCREENS} from "../../../../../../config/config"



function RegistrarVentas ({
    setSessionScreen,
    productoAVender
}) {
    document.querySelector('title').innerText = 'Registrar venta';

    // Esto va cambiando según lo que pase en el fetch:
    const [fetchStatus, setFetchStatus] = useState({
        status: FETCH_STATUS.DEFAULT
    })

    return (

        <section className={styles.container}>

            <button 
                className={styles.goBackButton}
                onClick = {()=> {
                    setSessionScreen(SESSION_SCREENS.RESUMEN_PRODUCTO)
                }}
            >
                Volver <RiArrowGoBackFill/>
            </button>

            <h1>Ingresar una venta</h1>
      

            <FormularioReutilizable 
                    fetchStatus={fetchStatus}
                    setFetchStatus={setFetchStatus}
                    submitMessage={"Ingresando venta..."}
                    fetchURL={URL_REGISTRAR_VENTAS}
                    formInputs={
                        <>
                            <FormInput 
                                idInput='producto'
                                type='text'
                                texto='Nombre del producto'

                                required='true'

                                value={productoAVender?.producto}
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

                                value={productoAVender?.marca}
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

export default RegistrarVentas