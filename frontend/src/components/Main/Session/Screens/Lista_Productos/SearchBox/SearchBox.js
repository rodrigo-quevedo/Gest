// css
import styles from './SearchBox.module.css'
// icons
import { FaSearch } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";
// config
import {SEARCHBOX_STATE} from '../../../../../../config/config'
// logica
import elegirSearchboxClass from './elegir_component_class/elegirSearchboxClass'




function SearchBox({
    searchBoxState,
    setSearchBoxState
}) {
    return (
        <form 
        id="searchBoxForm_ListaProductos"
        onSubmit={(e)=>{
            e.preventDefault()

            setSearchBoxState(SEARCHBOX_STATE.SUBMIT)
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