import {useState, useEffect} from 'react'

import styles from './ListaProductos.module.css'

import { FaSearch } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";



import {SEARCHBOX_STATE} from '../../../../../config/config'


function elegirSearchboxClass(searchBoxState) {
    switch(searchBoxState) {
        
        case SEARCHBOX_STATE.DEFAULT : {
            return styles.searchBox
        }

        case SEARCHBOX_STATE.CLICKED : {
            return `${styles.searchBox} ${styles.searchBoxSelected}`
         }

        case SEARCHBOX_STATE.SUBMIT : {
            return `${styles.searchBox} ${styles.searchBoxSubmitted}`
        }

        case SEARCHBOX_STATE.FETCH_SUCCESS : {
            return `${styles.searchBox} ${styles.searchBoxFetchSuccess}`
        }
    }
}


function ListaProductos () {
    document.querySelector('title').innerText = 'Lista de productos';
    // const [productos, setProductos] = useState([])
    // const [cargarLista, setCargarLista] = useState(true)

    // const URL_EXPRESS_APP = process.env.REACT_APP_URL_EXPRESS_APP 
    // const URL_LISTA_PRODUCTOS = URL_EXPRESS_APP + '/productos'

    const [searchBoxState, setSearchBoxState] = useState(SEARCHBOX_STATE.DEFAULT)


    const [listaProductos, setListaProductos] = useState([{
        producto: '-',
        cantidad: '-',
        precio_unitario: '-',
        marca: '-',
        proveedor: '-'
    }])


    // SearchBox submit effect:
    useEffect(()=>{
        if (searchBoxState === SEARCHBOX_STATE.SUBMIT) {
            document.getElementById('searchBoxInput').blur()

            setTimeout(()=>{
                setSearchBoxState(SEARCHBOX_STATE.FETCH_SUCCESS)

                setListaProductos([
                    {
                        producto: 'Arroz Fino 1kg',
                        cantidad: 10,
                        precio_unitario: 2400.00,
                        marca: 'Doscientos hermanos',
                        proveedor: 'Almacén Distribuidora'
                    },
                    {
                        producto: 'Arroz Fino 1kg',
                        cantidad: 20,
                        precio_unitario: 2000.00,
                        marca: 'Sovimandi',
                        proveedor: 'Almacén Distribuidora'
                    },
                    {
                        producto: 'Arroz Integral 1kg',
                        cantidad: 8,
                        precio_unitario: 3000.00,
                        marca: 'Doscientos hermanos',
                        proveedor: 'Pritiado Distribuidora'
                    },
                ])
            
            }, 3000)
        }
    }, [searchBoxState])



    return (

        <section className={styles.container}>

            <h1>Lista de productos</h1>


            {/* SearchBox: */}
            <form 
                id="searchBoxForm_ListaProductos"
                onSubmit={(e)=>{
                    e.preventDefault()

                    setSearchBoxState(SEARCHBOX_STATE.SUBMIT)
                }}
            >
                <div 
                    className={ 
                        // searchBoxState === SEARCHBOX_STATE.CLICKED ?
                        //     `${styles.searchBox} ${styles.searchBoxSelected}`    
                        // :
                        //     styles.searchBox
                        elegirSearchboxClass(searchBoxState)
                    }
                    onClick={()=>{
                        if (searchBoxState === SEARCHBOX_STATE.SUBMIT) {
                            
                        }
                        else if (searchBoxState === SEARCHBOX_STATE.DEFAULT){
                            document.getElementById('searchBoxInput').focus();
                            setSearchBoxState(SEARCHBOX_STATE.CLICKED)
                        }
                    }}
                    onBlur={()=>{
                        if (searchBoxState !== SEARCHBOX_STATE.SUBMIT) {
                            setSearchBoxState(SEARCHBOX_STATE.DEFAULT)
                        }
                    }}
                >

                    {
                        searchBoxState === SEARCHBOX_STATE.SUBMIT ?
                                <span className={styles.loadingIcon}>
                                    <VscLoading/>
                                </span>
                            :
                                <span className={styles.searchBoxIcon}>
                                    <FaSearch />
                                </span>
                    }
                       

                    <input 
                        type='text'
                        placeholder='Buscar producto'
                        id="searchBoxInput"
                        onFocus={()=>setSearchBoxState(SEARCHBOX_STATE.CLICKED)}
                    />

                </div>


            </form>



            {/* Lista de productos: */}
            <div 
                className={searchBoxState === SEARCHBOX_STATE.FETCH_SUCCESS ? 
                        `${styles.tableContainer} ${styles.tableContainerLoaded}`
                    :
                        styles.tableContainer
                }
                id="tableContainer"
            >

                <table >

                    <thead>

                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Marca</th>
                            <th>Proveedor</th>
                        </tr>

                    </thead>

                    <tbody>
                        {
                            listaProductos.map(productoObj => {
                                return (
                                    <tr>
                                        <td>{productoObj.producto}</td>
                                        <td>{productoObj.cantidad}</td>
                                        <td>{productoObj.precio_unitario}</td>
                                        <td>{productoObj.marca}</td>
                                        <td>{productoObj.proveedor}</td>
                                    </tr>
                                )
                            })
                        }
                        {/* <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr> */}
                    </tbody>

                </table>

            </div>
            

        </section>
        
    )
}

export default ListaProductos