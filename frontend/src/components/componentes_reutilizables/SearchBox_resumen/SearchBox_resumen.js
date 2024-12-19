// css
import styles from './SearchBox.module.css'

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

function SearchBox_resumen({
    searchBoxState,
    setSearchBoxState,
    URL_lista,
    setter_lista,
    URL_historialProductos,
    setter_historialProductos,
    URL_historialVentas,
    setter_historialVentas
}) {

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


            <div className={styles.formAndButtonContainer}>
                <form 
                    id="searchBoxForm_ListaProductos"
                    onSubmit={(e)=>{
                        e.preventDefault()

                        setSearchBoxState(SEARCHBOX_STATE.SUBMIT)

                        fetchBackend(
                            setSearchBoxState, 
                            URL_lista, 
                            setter_lista,
                            Object.fromEntries(
                                new FormData(
                                    document.getElementById('searchBoxForm_ListaProductos')
                                )
                            )
                        )

                        fetchBackend(
                            setSearchBoxState, 
                            URL_historialProductos, 
                            setter_historialProductos,
                            Object.fromEntries(
                                new FormData(
                                    document.getElementById('searchBoxForm_ListaProductos')
                                )
                            )
                        )

                        fetchBackend(
                            setSearchBoxState, 
                            URL_historialVentas, 
                            setter_historialVentas,
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
                            placeholder='Filtrar productos'
                            
                            autoComplete='off'
                            //Puedo apretar ENTER y que me traiga todo, por lo que required='false', pero no hace falta ponerlo, ya que false es el defaut

                            //esto lo agregué para cuando el usuario hace tab en vez de clickear:
                            onFocus={()=>setSearchBoxState(SEARCHBOX_STATE.CLICKED)}

                            maxLength='50'
                            // Me conviene que pueda estar vacio para mandar {} y usarlo en el find()
                            pattern='^[a-zA-ZÀ-ÿñÑ0-9 .]{0,50}$'
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
        </div>
    )
}

export default SearchBox_resumen