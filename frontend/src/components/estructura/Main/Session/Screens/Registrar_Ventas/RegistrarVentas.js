//css
import styles from  './RegistrarVentas.module.css'

//react
import {useEffect, useState} from 'react'

//components
import FormularioReutilizable from '../../../../../componentes_reutilizables/FormularioReutilizable/FormularioReutilizable';
import FormInput from '../../../../../componentes_reutilizables/FormInput/FormInput';
import PrecioInput from '../../../../../componentes_reutilizables/PrecioInput/PrecioInput';
import FetchStatusText from '../../../../../componentes_reutilizables/FetchStatusText/FetchStatusText';

//icons
import { RiArrowGoBackFill } from "react-icons/ri";

//config
import {FETCH_STATUS} from '../../../../../../config/config'
import { URL_REGISTRAR_VENTAS } from "../../../../../../config/config"
import {SESSION_SCREENS} from "../../../../../../config/config"

//logica interna
import ListaPreciosCompra from './ListaPreciosCompra/ListaPreciosCompra';
import useCalcularPrecioTotal from '../../../../../../hooks/calcularPrecioTotal/useCalcularPrecoTotal';


function RegistrarVentas ({
    setSessionScreen,
    
    productoAVender,
    
    ventaFetchStatus,
    setVentaFetchStatus,

    historialProductos,
    listaProductos,

    setPopupSessionExpired
}) {
    document.querySelector('title').innerText = 'Registrar venta';


    // Cambiar de screen cuando se complete el fetch (success)
    useEffect(()=>{
        if (ventaFetchStatus.status === FETCH_STATUS.SUCCESS){
            setSessionScreen(SESSION_SCREENS.RESUMEN_PRODUCTO)
        }
    }, [ventaFetchStatus])


    // cambiar entre precio unitario / precio total
    const [hayPrecioUnitario, setHayPrecioUnitario] = useState(true)
    const [total, setTotal] = useState(0)

    // hook para calcular el precio   
    useCalcularPrecioTotal(hayPrecioUnitario, setTotal, 'cantidad', 'inputPrecioUnitarioVenta')

    // extraer cantidad actual
    let cantidadActual = listaProductos.find((productoObj)=>{
        return (
            productoAVender.producto.toUpperCase() === productoObj.producto.toUpperCase()
            &&
            productoAVender.marca.toUpperCase() === productoObj.marca.toUpperCase()
        )
    })
    cantidadActual = cantidadActual?.cantidad;


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
      
            

            <ListaPreciosCompra 
                productoAVender={productoAVender}
                historialProductos={historialProductos}
                listaProductos={listaProductos}
            />

            <p><span>Cantidad disponible:</span> {cantidadActual}</p>
            <h2> Total de venta: $ {total} </h2>

            <FormularioReutilizable 
                    hayPrecioUnitario={hayPrecioUnitario}

                    setPopupSessionExpired={setPopupSessionExpired}

                    fetchStatus={ventaFetchStatus}
                    setFetchStatus={setVentaFetchStatus}
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
                                idInput='marca'
                                type='text'
                                texto='Marca'

                                required='true'

                                value={productoAVender?.marca}
                            />

                            <FormInput 
                                idInput='cantidad'
                                type='number'
                                texto='Cantidad'

                                min='1'
                                max={`${cantidadActual}`}
                                esPrecio='false'

                                required='true'

                                
                            />

                            <PrecioInput
                                required='true'

                                idInputPrecioUnitario='inputPrecioUnitarioVenta'
                                name='precio_unitario'
                                
                                min='0.01'
                                max='999999999'

                                //para calcular precio unitario/total
                                hayPrecioUnitario={hayPrecioUnitario}
                                setHayPrecioUnitario={setHayPrecioUnitario}
                            />
                        </>
                    }
                />

                <FetchStatusText 
                    fetchStatus={ventaFetchStatus}
                />
              
        </section>

    )

    
}

export default RegistrarVentas