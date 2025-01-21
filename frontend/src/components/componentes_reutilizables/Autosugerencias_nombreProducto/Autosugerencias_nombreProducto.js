import styles from './Autosugerencias.module.css'

import {useState, useEffect} from 'react'

import { SEARCHBOX_STATE } from '../../../config/config'


function buscar(busquedaString, inputId, formId){
    document.getElementById(inputId).value = busquedaString
    document.getElementById(formId).requestSubmit()
}

function Autosugerencias_nombreProducto({
    listaProductos,
    busquedaString,

    searchBoxState,

    inputId, formId
}){


    return (
        <ul 
            className={
                searchBoxState === SEARCHBOX_STATE.CLICKED ?
                styles.autosugerenciasContainer
                :
                `${styles.autosugerenciasContainer} ${styles.hide} `
            
            }

        >
            {listaProductos?.map((prodObj)=>{

                if (prodObj.producto === ''){
                    return (
                        <li onMouseDown={()=>{buscar(prodObj.producto, inputId, formId)}} >
                            {prodObj.producto}
                        </li>
                    )
                }
                
                if (prodObj.producto.toUpperCase().includes(busquedaString.toUpperCase())){
                    return (
                        <li onMouseDown={()=> {buscar(prodObj.producto, inputId, formId)}} >
                            {prodObj.producto}
                        </li>
                    )
                }
            })}
        </ul>
    )
}

export default Autosugerencias_nombreProducto