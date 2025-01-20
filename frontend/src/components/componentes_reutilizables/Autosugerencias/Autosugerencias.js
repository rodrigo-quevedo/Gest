import styles from './Autosugerencias.module.css'

import {useState, useEffect} from 'react'

import { SEARCHBOX_STATE } from '../../../config/config'


function buscar(busquedaString){
    document.getElementById('searchBoxInput').value = busquedaString
    document.getElementById('searchBoxForm').requestSubmit()
}

function Autosugerencias({
    listaProductos,
    busquedaString,

    searchBoxState
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
                        <li onMouseDown={()=>{buscar(prodObj.producto)}} >
                            {prodObj.producto}
                        </li>
                    )
                }
                
                if (prodObj.producto.toUpperCase().includes(busquedaString.toUpperCase())){
                    return (
                        <li onMouseDown={()=> {buscar(prodObj.producto)}} >
                            {prodObj.producto}
                        </li>
                    )
                }
            })}
        </ul>
    )
}

export default Autosugerencias