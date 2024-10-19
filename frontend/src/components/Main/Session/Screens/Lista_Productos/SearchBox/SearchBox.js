// css
import styles from './SearchBox.module.css'
// icons
import { FaSearch } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";
// config
import {SEARCHBOX_STATE} from '../../../../../../config/config'
// logica
import elegirSearchboxClass from './elegir_component_class/elegirSearchboxClass'
import fetchBackend from '../fetch_backend/fetchBackend';



function SearchBox({
    // El state del SearchBox es cross-fetch, osea: no importa la URL, las clases se aplican de igual manera
    searchBoxState,
    setSearchBoxState,
    // La URL si que puede cambiar
    URL_LISTA_PRODUCTOS,
    // Tambien deberia cambiar el data handling, es decir, una vez el fetch tiene éxito, qué se hace con los datos obtenidos con el fetch
    setListaProductos
}) {
    return (
        <form 
        id="searchBoxForm_ListaProductos"
        onSubmit={(e)=>{
            e.preventDefault()

            setSearchBoxState(SEARCHBOX_STATE.SUBMIT)

            // Necesito: URL, Lista, StateEstilos
            // fetchBackend(setSearchBoxState, URL_LISTA_PRODUCTOS, setListaProductos)
            
            //fetch de prueba
            fetchBackend(setSearchBoxState, 'https://jsonplaceholder.typicode.com/users', setListaProductos)
        }}
    >
            <div 
                className={ 
                    elegirSearchboxClass(searchBoxState, styles, SEARCHBOX_STATE)
                }

                onClick={()=> {
                    if (searchBoxState === SEARCHBOX_STATE.DEFAULT){
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
                {/* SearchBox Icon */}
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
                    autoComplete='false'
                    onFocus={()=>setSearchBoxState(SEARCHBOX_STATE.CLICKED)}
                />

            </div>


        </form>
    )
}

export default SearchBox