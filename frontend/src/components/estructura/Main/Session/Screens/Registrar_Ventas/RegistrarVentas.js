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
import useActivarAutosugerencia from '../../../../../../hooks/activarAutosugerencia/useActivarAutosugerencia';

//autosugerencias
import Autosugerencias_productoFormulario from '../../../../../componentes_reutilizables/AutosugerenciasFormulario/Autosugerencias_productoFormulario/Autosugerencias_productoFormulario';
import Autosugerencias_marcaFormulario from '../../../../../componentes_reutilizables/AutosugerenciasFormulario/Autosugerencias_marcaFormulario/Autosugerencias_marcaFormulario';
import Autosugerencias_cantidadFormulario from '../../../../../componentes_reutilizables/AutosugerenciasFormulario/Autosugerencias_cantidadFormulario/Autosugerencias_cantidadFormulario';
import Autosugerencias_precioFormulario from '../../../../../componentes_reutilizables/AutosugerenciasFormulario/Autosugerencias_precioFormulario/Autosugerencias_precioFormulario';


function RegistrarVentas ({
    setSessionScreen,
    
    productoAVender,
    
    ventaFetchStatus,
    setVentaFetchStatus,

    historialVentas,
    listaProductos,

    setPopupSessionExpired,

    setHacerFetch
}) {
    document.querySelector('title').innerText = 'Registrar venta';

    // Mover la pantalla al formulario
    useEffect(()=>{
        document.getElementById('cantidad').focus();
        
    }, [])

    // Cambiar de screen cuando se complete el fetch (success)
    useEffect(()=>{
        if (ventaFetchStatus.status === FETCH_STATUS.SUCCESS){
            setSessionScreen(SESSION_SCREENS.RESUMEN_PRODUCTO)

            setHacerFetch(true)
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

     //logica autosugerencias
     const [productoSearchString, setProductoSearchString] = useState('')
     const [productoInputActivo, setProductoInputActivo] = useState(false)
     useActivarAutosugerencia('producto', setProductoSearchString, setProductoInputActivo)
     
     const [marcaSearchString, setMarcaSearchString] = useState('')
     const [marcaInputActivo, setMarcaInputActivo] = useState(false)
     useActivarAutosugerencia('marca', setMarcaSearchString, setMarcaInputActivo)

     const [cantidadSearchString, setCantidadSearchString] = useState('')
     const [cantidadInputActivo, setCantidadInputActivo] = useState(false)
     useActivarAutosugerencia('cantidad', setCantidadSearchString, setCantidadInputActivo)
 
     const [precioSearchString, setPrecioSearchString] = useState('')
     const [precioInputActivo, setPrecioInputActivo] = useState(false)
     useActivarAutosugerencia('inputPrecioUnitarioVenta', setPrecioSearchString, setPrecioInputActivo)


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
      



            <div className={styles.formularioVentaContainer}>
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

                                <div className={styles.completeInputContainer} >
                                    <FormInput 
                                        idInput='cantidad'
                                        type='number'
                                        texto='Cantidad'
                                        
                                        min='1'
                                        max={`${cantidadActual}`}
                                        esPrecio='false'
                                        
                                        required='true'    
                                    />
                                    <Autosugerencias_cantidadFormulario 
                                        productoSearchString={productoSearchString}

                                        cantidadInputActivo={cantidadInputActivo}
                                        setCantidadInputActivo={setCantidadInputActivo}

                                        cantidadSearchString={cantidadSearchString}
                                        setCantidadSearchString={setCantidadInputActivo}

                                        listaProductos={listaProductos}
                                        historialProductos={historialVentas}
                                    />
                                </div>
                                
                                <div className={styles.completeInputContainer} >
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
                                    <Autosugerencias_precioFormulario 
                                        productoSearchString={productoSearchString}

                                        precioInputActivo={precioInputActivo}
                                        setPrecioInputActivo={setPrecioInputActivo}

                                        precioSearchString={precioSearchString}
                                        setPrecioSearchString={setPrecioInputActivo}

                                        listaProductos={listaProductos}
                                        historialProductos={historialVentas}

                                        inputId='inputPrecioUnitarioVenta'
                                    />
                                </div>
                            </>
                        }
                    />

                    <FetchStatusText 
                        fetchStatus={ventaFetchStatus}
                    />

                                

                {/* <ListaPreciosCompra 
                    productoAVender={productoAVender}
                    historialProductos={historialProductos}
                    listaProductos={listaProductos}
                /> */}
              
              </div>
        </section>

    )

    
}

export default RegistrarVentas