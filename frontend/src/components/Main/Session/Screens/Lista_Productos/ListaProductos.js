import {useState} from 'react'

import styles from './ListaProductos.module.css'

import { FaSearch } from "react-icons/fa";

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

    }
}


function ListaProductos () {
    document.querySelector('title').innerText = 'Lista de productos';
    // const [productos, setProductos] = useState([])
    // const [cargarLista, setCargarLista] = useState(true)

    // const URL_EXPRESS_APP = process.env.REACT_APP_URL_EXPRESS_APP 
    // const URL_LISTA_PRODUCTOS = URL_EXPRESS_APP + '/productos'

    const [searchBoxState, setSearchBoxState] = useState(SEARCHBOX_STATE.DEFAULT)

    return (

        <section className={styles.container}>

            <h1>Lista de productos</h1>


            {/* SearchBox: */}
            <form 
                id="searchBoxForm_ListaProductos"
                onSubmit={(e)=>{
                    e.preventDefault();

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
                        document.getElementById('searchBoxInput').focus();
                        setSearchBoxState(SEARCHBOX_STATE.CLICKED)
                    }}
                    onBlur={()=>setSearchBoxState(SEARCHBOX_STATE.DEFAULT)}
                >

                    <span>
                        <FaSearch />    
                    </span>

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
                className={searchBoxState === SEARCHBOX_STATE.CLICKED ? 
                    `${styles.tableContainer} ${styles.tableContainerOff}`
                    :
                    styles.tableContainer}
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
                        <tr>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    </tbody>

                </table>

            </div>
            

        </section>
        
    )
}

export default ListaProductos