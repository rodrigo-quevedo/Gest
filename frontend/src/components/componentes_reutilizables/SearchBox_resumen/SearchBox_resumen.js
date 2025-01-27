// css
import styles from './SearchBox.module.css'

// react
import { useState, useEffect } from 'react';

// icons
import { FaSearch } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";
import { AiOutlineEnter } from "react-icons/ai";
import { RiArrowGoBackFill } from "react-icons/ri";

// config
import {SEARCHBOX_STATE} from '../../../config/config'

// logica
import elegirSearchboxClass from './elegir_component_class/elegirSearchboxClass'
import busqueda_local from '../../../utils/busqueda_local/busqueda_local';

//subcomponentes
import Autosugerencias_nombreProducto from '../Autosugerencias_nombreProducto/Autosugerencias_nombreProducto';


function SearchBox_resumen({
    searchBoxState,
    setSearchBoxState,

    listaProductos,
    historialProductos,
    historialVentas,

    setListaProductosResult,
    setHistorialProductosResult,
    setHistorialVentasResult,

    marcaSelected, setMarcaSelected
}) {

    useEffect(()=>{
        if (searchBoxState === SEARCHBOX_STATE.SUBMIT) {
            document.getElementById('searchBoxInput').blur()
        }
    }, [searchBoxState])

    // logica autosugerencia 
    const [busquedaString, setBusquedaString] = useState('')
    useEffect(()=>{
        document.getElementById('searchBoxInput').addEventListener('input', ()=>{
            setBusquedaString(document.getElementById('searchBoxInput').value)

            setSearchBoxState(SEARCHBOX_STATE.CLICKED)
        })

        document.getElementById('searchBoxInput').addEventListener('keydown', (e)=>{
            if (e.code === 'Escape'){
                console.log('ESC activado')
                e.currentTarget.blur();
            }
        })
    }, [])




    return (
        <div className={styles.searchBoxContainer}>
            <button
                onClick={()=>{
                    setBusquedaString('')

                    document.getElementById('searchBoxInput').value = ''
                    document.getElementById('searchBoxInputMarca').value = ''

                    document.getElementById('searchBoxForm').requestSubmit()

                    setMarcaSelected(null)
                }}
                className={styles.resetButton}
                id="searchBoxListaCompletaButton"
            >
                Lista completa <RiArrowGoBackFill/>
            </button>


            <div 
                className={
                    marcaSelected ?
                    `${styles.formAndButtonContainer} ${styles.desactivar}`
                    :
                    styles.formAndButtonContainer
                }

            >
                <form 
                    id="searchBoxForm"
                    
                    onSubmit={(e)=>{
                        e.preventDefault()

                        setSearchBoxState(SEARCHBOX_STATE.SUBMIT)

                        if (document.getElementById('searchBoxInput').value === ''){
                            setMarcaSelected(null)
                        }

                        // lista productos
                        busqueda_local (
                            setSearchBoxState,
                            listaProductos,
                            setListaProductosResult,
                            document.getElementById('searchBoxInput').value,
                            document.getElementById('searchBoxInputMarca').value
                        )

                        // historial productos
                        busqueda_local (
                            setSearchBoxState,
                            historialProductos,
                            setHistorialProductosResult,
                            document.getElementById('searchBoxInput').value,
                            document.getElementById('searchBoxInputMarca').value
                        )

                        // historial ventas
                        busqueda_local (
                            setSearchBoxState,
                            historialVentas,
                            setHistorialVentasResult,
                            document.getElementById('searchBoxInput').value,
                            document.getElementById('searchBoxInputMarca').value
                        )

                    }}
                >
                    <div 
                        id='blurDiv'

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
                        {/* Autosugerencias */}
                        <Autosugerencias_nombreProducto 
                            listaProductos={listaProductos}
                            busquedaString={busquedaString}

                            searchBoxState={searchBoxState}

                            inputId={'searchBoxInput'}
                            formId={'searchBoxForm'}
                        />
                    


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
                            onFocus={()=>{
                                setSearchBoxState(SEARCHBOX_STATE.CLICKED);
                            }
                            }

                            maxLength='50'
                            // Me conviene que pueda estar vacio para mandar {} y usarlo en el find()
                            pattern='^[a-zA-ZÀ-ÿñÑ0-9 .]{0,50}$'
                            title={"Solo son válidos: letras mayúsculas, letras minúsculas, números, y espacios. NO se aceptan caracteres especiales. Máximo 50 caracteres."}
                        />

                    </div>

                     {/* Fix para buscar por marca: */}
                    <input                 
                            id="searchBoxInputMarca"
                            type='text'
                    />


                </form>
                <button
                    onClick={()=>{
                        document.getElementById('searchBoxForm').requestSubmit()
                    }}
                    className={
                        marcaSelected ?
                        `${styles.desactivar} ${styles.submitButton}`
                        :
                        styles.submitButton
                    }
                >
                    <AiOutlineEnter/>
                </button>


            </div>
        </div>
    )
}

export default SearchBox_resumen