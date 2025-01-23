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

    // Hacer lista productos sin repeticiones:
    let listaProductosSinRepetir = [];
    let listaProductosRepetidos = listaProductos.map((prodObj)=> {return prodObj.producto});
    listaProductosRepetidos.forEach((producto, index)=>{
        if (listaProductosRepetidos.indexOf(producto) === index){
            listaProductosSinRepetir.push(producto)
        }
    })
    //

    // Ordenar en orden alfabetico
    listaProductosSinRepetir.sort();

    return (
        <ul 
            className={
                searchBoxState === SEARCHBOX_STATE.CLICKED ?
                styles.autosugerenciasContainer
                :
                `${styles.autosugerenciasContainer} ${styles.hide} `
            
            }

        >
            {listaProductosSinRepetir?.map((producto)=>{

                if (producto === ''){
                    return (
                        <li onMouseDown={()=>{buscar(producto, inputId, formId)}} >
                            {producto}
                        </li>
                    )
                }
                
                if (producto.toUpperCase().includes(busquedaString.toUpperCase())){
                    return (
                        <li onMouseDown={()=> {buscar(producto, inputId, formId)}} >
                            {producto}
                        </li>
                    )
                }
            })}
        </ul>
    )
}

export default Autosugerencias_nombreProducto