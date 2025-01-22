//css
import styles from './IngresarProductos.module.css'

//react
import {useEffect, useState} from 'react'

//components
import FormularioReutilizable from '../../../../../../componentes_reutilizables/FormularioReutilizable/FormularioReutilizable';
import FormInput from '../../../../../../componentes_reutilizables/FormInput/FormInput';
import PrecioInput from '../../../../../../componentes_reutilizables/PrecioInput/PrecioInput';
import FetchStatusText from '../../../../../../componentes_reutilizables/FetchStatusText/FetchStatusText';

//icons
import { RiArrowGoBackFill } from "react-icons/ri";

//config
import {FETCH_STATUS} from '../../../../../../../config/config'
import { URL_INGRESAR_PRODUCTOS } from "../../../../../../../config/config"
import {SESSION_SCREENS} from "../../../../../../../config/config"

//logica interna
import useCalcularPrecioTotal from '../../../../../../../hooks/calcularPrecioTotal/useCalcularPrecoTotal';
import useActivarAutosugerencia from '../../../../../../../hooks/activarAutosugerencia/useActivarAutosugerencia';


//autosugerencias
import Autosugerencias_productoFormulario from '../../../../../../componentes_reutilizables/Autosugerencias_productoFormulario/Autosugerencias_productoFormulario';



function IngresarProductos ({
    setSessionScreen,

    productoAIngresar,

    compraFetchStatus,
    setCompraFetchStatus,

    setPopupSessionExpired,

    setHacerFetch,

    listaProductos, historialProductos
}) {
    document.querySelector('title').innerText = 'Ingresar producto';

    //volver a Resumen Producto una vez se realizó el fetch con éxito:
    useEffect(()=>{
        if (compraFetchStatus.status === FETCH_STATUS.SUCCESS){
            setSessionScreen(SESSION_SCREENS.RESUMEN_PRODUCTO)

            setHacerFetch(true)
        }
    },[compraFetchStatus])


    // cambiar entre precio unitario / precio total
    const [hayPrecioUnitario, setHayPrecioUnitario] = useState(true)
    const [total, setTotal] = useState(0)

    // hook para calcular el precio   
    useCalcularPrecioTotal(hayPrecioUnitario, setTotal, 'cantidad', 'inputPrecioUnitarioCompra')
    
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
    useActivarAutosugerencia('inputPrecioUnitarioCompra', setPrecioSearchString, setPrecioInputActivo)

    const [proveedorSearchString, setProveedorSearchString] = useState('')
    const [proveedorInputActivo, setProveedorInputActivo] = useState(false)
    useActivarAutosugerencia('proveedor', setProveedorSearchString, setProveedorInputActivo)



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

                <h2> Total de gasto: $ {total} </h2>

                <FormularioReutilizable 
                    hayPrecioUnitario={hayPrecioUnitario}

                    setPopupSessionExpired={setPopupSessionExpired}

                    fetchStatus={compraFetchStatus}
                    setFetchStatus={setCompraFetchStatus}
                    submitMessage={"Ingresando producto..."}
                    fetchURL={URL_INGRESAR_PRODUCTOS}
                    formInputs={
                        <>
                            <div className={styles.completeInputContainer}>
                                <FormInput 
                                    idInput='producto'
                                    type='text'
                                    texto='Nombre del producto'

                                    required='true'
                                    value={productoAIngresar?.producto}
                                />
                                <Autosugerencias_productoFormulario 
                                    productoSearchString={productoSearchString}
                                    setProductoSearchString={setProductoSearchString}

                                    productoInputActivo={productoInputActivo}
                                    setProductoInputActivo={setProductoInputActivo}

                                    listaProductos={listaProductos}
                                />
                        
                            </div>

                            <div>    
                                <FormInput 
                                    idInput='marca'
                                    type='text'
                                    texto='Marca'
                                    
                                    required='true'
                                    
                                    value={productoAIngresar?.marca}
                                />
                            </div>

                            <div>
                                <FormInput 
                                    idInput='cantidad'
                                    type='number'
                                    texto='Cantidad'

                                    min='1'
                                    max='9999'
                                    esPrecio='false'

                                    required='true'
                                />
                            </div>

                            <div>
                                <PrecioInput
                                    required='true'

                                    idInputPrecioUnitario='inputPrecioUnitarioCompra'
                                    name='precio_unitario'
                                    
                                    min='0.01'
                                    max='999999999'

                                    //para calcular precio unitario/total
                                    hayPrecioUnitario={hayPrecioUnitario} 
                                    setHayPrecioUnitario={setHayPrecioUnitario}
                                />
                            </div>

                            <div>
                                <FormInput 
                                    idInput='proveedor'
                                    type='text'
                                    texto='Proveedor'

                                    required='true'
                                />
                            </div>
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