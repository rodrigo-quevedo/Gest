// css
import styles from './Navbar.module.css'

//react
import { useEffect, useState } from 'react';

//icons
import { TbFileAnalytics } from "react-icons/tb";
import { FaClipboardList } from "react-icons/fa";
import { FaTruckLoading } from "react-icons/fa";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { FaCashRegister } from "react-icons/fa";
import { RiFileList3Line } from "react-icons/ri";

import { HiMiniBarsArrowUp } from "react-icons/hi2";
import { GiHamburgerMenu } from "react-icons/gi";


// config
import {SESSION_SCREENS } from '../../../../../config/config';
import  { SEARCHBOX_STATE} from '../../../../../config/config';



export default function Navbar (
    {
        sessionScreen,
        setSessionScreen,

        searchBoxState
    }
) {

    const [desplegado, setDesplegado] = useState(true);



    if (desplegado) return (
        <nav  
            role="navigation" 
            
            className={
                searchBoxState === SEARCHBOX_STATE.SUBMIT ? 
                `${styles.navContainer} ${styles.navContainerDisabled}`
                :   
                styles.navContainer
            }
            
            id="navContainer"
        >
            <button 

                className={
                    sessionScreen === SESSION_SCREENS.RESUMEN_PRODUCTO ?
                        styles.seleccionado 
                    : 
                        null
                }

                onClick={
                    //deshabilitar si el fetch esta cargando
                    searchBoxState === SEARCHBOX_STATE.SUBMIT ? null 
                    :
                    ()=>{
                        setSessionScreen(SESSION_SCREENS.RESUMEN_PRODUCTO)
                }}

                >
                Resumen de producto 
                <span className={styles.icon}>
                    <TbFileAnalytics/>
                </span>
            </button>

            <button 

                className={
                    sessionScreen === SESSION_SCREENS.HISTORIAL_PRODUCTOS ?
                        styles.seleccionado
                    : 
                        null
                }

                onClick={
                    //deshabilitar si el fetch esta cargando
                    searchBoxState === SEARCHBOX_STATE.SUBMIT ? null 
                    :
                    ()=>{
                        setSessionScreen(SESSION_SCREENS.HISTORIAL_PRODUCTOS)
                    }
                }

                >
                Historial de productos
                <span className={styles.icon}>
                    <HiClipboardDocumentList/>
                </span>
            </button>

            <button 

                className={
                    sessionScreen === SESSION_SCREENS.HISTORIAL_VENTAS ? 
                        styles.seleccionado 
                    : 
                        null
                }

                onClick={
                    //deshabilitar si el fetch esta cargando
                    searchBoxState === SEARCHBOX_STATE.SUBMIT ? null 
                    :
                    ()=>{
                        setSessionScreen(SESSION_SCREENS.HISTORIAL_VENTAS)
                }}

            >
                Historial de ventas
                <span className={styles.icon}>
                    <RiFileList3Line/>
                </span>
            </button>

            <button 
                className={styles.esconderButton}
                onClick={()=>{
                    setDesplegado(false)
                }}
            >
                Esconder menú
                <span className={styles.icon}>
                    <HiMiniBarsArrowUp/>
                </span>
            </button>
            

        </nav>
    )
    else return (
        <nav role="navigation" className={styles.dropDownNav}>
            <button
                
                onClick={()=>{setDesplegado(true)}}
            >
                Ver menú
                <span className={styles.icon}>
                    <GiHamburgerMenu/>
                </span>
            </button>
        </nav>
    )
    
}