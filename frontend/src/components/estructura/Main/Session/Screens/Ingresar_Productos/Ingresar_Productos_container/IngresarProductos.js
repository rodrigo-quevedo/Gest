//css
import styles from './IngresarProductos.module.css'

//react
import {useEffect, useState} from 'react'

//components
import FormularioReutilizable from '../../../../../../componentes_reutilizables/FormularioReutilizable/FormularioReutilizable';
import FormInput from '../../../../../../componentes_reutilizables/FormInput/FormInput';
import FetchStatusText from '../../../../../../componentes_reutilizables/FetchStatusText/FetchStatusText';

//icons
import { RiArrowGoBackFill } from "react-icons/ri";

//config
import {FETCH_STATUS} from '../../../../../../../config/config'
import { URL_INGRESAR_PRODUCTOS } from "../../../../../../../config/config"
import {SESSION_SCREENS} from "../../../../../../../config/config"



function IngresarProductos ({
    setSessionScreen,

    productoAIngresar,

    compraFetchStatus,
    setCompraFetchStatus
}) {
    document.querySelector('title').innerText = 'Ingresar producto';

    //volver a Resumen Producto una vez se realizó el fetch con éxito:
    useEffect(()=>{
        if (compraFetchStatus.status === FETCH_STATUS.SUCCESS){
            setSessionScreen(SESSION_SCREENS.RESUMEN_PRODUCTO)
        }
    },[compraFetchStatus])


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

                <h1>Nuevo producto</h1>

                <FormularioReutilizable 
                    fetchStatus={compraFetchStatus}
                    setFetchStatus={setCompraFetchStatus}
                    submitMessage={"Ingresando producto..."}
                    fetchURL={URL_INGRESAR_PRODUCTOS}
                    formInputs={
                        <>
                            <FormInput 
                                idInput='producto'
                                type='text'
                                texto='Nombre del producto'

                                required='true'
                                value={productoAIngresar?.producto}
                            />

                            <FormInput 
                                idInput='cantidad'
                                type='number'
                                texto='Cantidad'

                                min='1'
                                max='9999'
                                esPrecio='false'

                                required='true'
                            />

                            <FormInput 
                                idInput='precio_unitario'
                                type='number'
                                texto='Precio unitario'

                                min='0.01'
                                max='999999999.99'
                                esPrecio='true'

                                required='true'
                            />

                            <FormInput 
                                idInput='marca'
                                type='text'
                                texto='Marca'

                                required='true'

                                value={productoAIngresar?.marca}
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
                    fetchStatus={compraFetchStatus}
                />

        </section>
    )


}


export default IngresarProductos