// css
import styles from '../SearchBox_resumen/SearchBox.module.css'

// react
import { useEffect } from 'react';

// icons
import { FaSearch } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";
import { AiOutlineEnter } from "react-icons/ai";
import { RiArrowGoBackFill } from "react-icons/ri";

// config
import {SEARCHBOX_STATE} from '../../../config/config'

// logica
import elegirSearchboxClass from './elegir_component_class/elegirSearchboxClass'
import fetchBackend from './fetch_backend/fetchBackend';


//Searchbox es un componente que va (preferentemente, pero no es obligatorio) en conjunto con una tabla, debido a que toma una URL, le hace un GET, y el resultado lo guarda en un state (con el parámetro 'setter'), el cual pertenece al parent component. Luego, en ese parent component, se puede pasar el state a un child component, por ejemplo una tabla, para cargar esos datos del GET.
//En resúmen: SearchBox -> GET -> setter(resultado_del_GET) -> el state del parent component ahora tiene resultado_del_GET -> parent component le pasa resultado_del_GET a otro child component, por ejemplo una tabla.
function SearchBox({
    // El state del SearchBox tiene que ir en el parent component para poder cambiar la className de la tabla dependiendo el state del searchbox:
    searchBoxState,
    setSearchBoxState,
    // La URL puede cambiar para mostrar otras cosas en la tabla:
    URL,
    // Tambien deberia cambiar el data handling, es decir, una vez el fetch tiene éxito, qué se hace con los datos obtenidos con el fetch
    setter
}) {

    // Esto se activa SOLO cuando el usuario hizo un submit. Funciona así:
        //1. usuario aprieta ENTER
        //2. se "cambia" (setea) el state de CLICKED a SUBMIT-> se triggerea solamente, NO SE ACTUALIZA, se actualiza recién en el paso 4, cuando hace el re-render

        //3. fetch() --> esto empieza a trabajar en segundo plano

        //4. re-render, acá el state está en SUBMIT, y cambian los estilos a la clase .searchBoxSubmitted, la searchbox aparece como loading
        //5. recordemos que se apretó ENTER en el input, pero ese input sigue estando "focus", es decir, se puede seguir escribiendo y seguir apretando ENTER, habilitando envío masivo de fetch. Otra desventaja es que se aplican los estilos del ONFOCUS. Inmediatamente en el re-render se activa el useEffect, y dentro hacemos el blur.
        //6. El blur 

        //x. después de un tiempo, el fetch tira success (.then() ) o error (.catch() ), sea lo que sea, la clase CSS se cambia en ambos casos, al cambiar un STATE (searchBoxState) de SUBMIT a FETCH_SUCCESS

    useEffect(()=>{
        if (searchBoxState === SEARCHBOX_STATE.SUBMIT) {
            document.getElementById('searchBoxInput').blur()
        }
    }, [searchBoxState])


    return (
        <div className={styles.searchBoxContainer}>
            <button
                onClick={()=>{
                    document.getElementById('searchBoxInput').value = ''

                    document.getElementById('searchBoxForm_ListaProductos').requestSubmit()
                }}
                className={styles.resetButton}
            >
                Lista completa <RiArrowGoBackFill/>
            </button>

            <form 
                id="searchBoxForm_ListaProductos"
                onSubmit={(e)=>{
                    e.preventDefault()

                    setSearchBoxState(SEARCHBOX_STATE.SUBMIT)

                    fetchBackend(
                        setSearchBoxState, 
                        URL, 
                        setter,
                        Object.fromEntries(
                            new FormData(
                                document.getElementById('searchBoxForm_ListaProductos')
                            )
                        )
                    )
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

                    //blur solo se activa cuando se pierde focus.
                    //focus solo se logra haciendo TAB o clickeando el searchbox.
                    onBlur={()=>{
                        //si el usuario clickeó el searchbox (CLICKED) y luego en otro lugar (blur), el searchbox vuelve a DEFAULT.
                        //pero cuando el searchbox empieza a hacer el fetch, cambia de CLICKED a SUBMIT, y eso activa el useEffect, el cual activa un blur, para que no se pueda seguir escribiendo en el searchbox mientras está en loading el fetch.
                        //por eso es necesario distinguir el blur cuando el searchbox está en SUBMIT, porque no queremos que el searchbox vuelva a su className default, sino que queremos que permanezca en su className de loading:
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
                        id="searchBoxInput"
                        name='searchBoxInput'
                        
                        type='text'
                        placeholder='Buscar producto'
                        
                        autoComplete='off'
                        //Puedo apretar ENTER y que me traiga todo, por lo que required='false', pero no hace falta ponerlo, ya que false es el defaut

                        //esto lo agregué para cuando el usuario hace tab en vez de clickear:
                        onFocus={()=>setSearchBoxState(SEARCHBOX_STATE.CLICKED)}

                        maxLength='50'
                        // Me conviene que pueda estar vacio para mandar {} y usarlo en el find()
                        pattern='^[a-zA-ZÀ-ÿñÑ0-9 ]{0,50}$'
                        title={"Solo son válidos: letras mayúsculas, letras minúsculas, números, y espacios. NO se aceptan caracteres especiales. Máximo 50 caracteres."}
                    />

                </div>


            </form>

            <button
                onClick={()=>{
                    document.getElementById('searchBoxForm_ListaProductos').requestSubmit()
                }}
                className={styles.submitButton}
            >
                <AiOutlineEnter/>
            </button>
        </div>
    )
}

export default SearchBox