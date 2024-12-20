// css
import styles from './Navbar.module.css'

//react
import { useState } from 'react';

//icons
import { TbFileAnalytics } from "react-icons/tb";
import { FaClipboardList } from "react-icons/fa";
import { FaTruckLoading } from "react-icons/fa";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { FaCashRegister } from "react-icons/fa";
import { RiFileList3Line } from "react-icons/ri";

import { FaArrowLeft } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaAngleDoubleUp } from "react-icons/fa";

// config
import { SESSION_SCREENS } from '../../../../../config/config';


export default function Navbar (
    {
        sessionScreen,
        setSessionScreen
    }
) {

    const [desplegado, setDesplegado] = useState(true);


    return (

        <nav  role="navigation">
            {
                desplegado ? 
                <div className={styles.navContainer}>
                    <button 

                        className={
                            sessionScreen === SESSION_SCREENS.RESUMEN_PRODUCTO ?
                                styles.seleccionado 
                            : 
                                null
                        }

                        onClick={()=>{
                            setSessionScreen(SESSION_SCREENS.RESUMEN_PRODUCTO)
                            setDesplegado(false)
                        }}

                        >
                        Resumen de producto 
                        <span className={styles.icon}>
                            <TbFileAnalytics/>
                        </span>
                    </button>

                    <button 

                        className={
                            sessionScreen === SESSION_SCREENS.LISTA_PRODUCTOS ?
                                styles.seleccionado 
                            : 
                                null
                        }

                        onClick={()=>{
                            setSessionScreen(SESSION_SCREENS.LISTA_PRODUCTOS)
                            setDesplegado(false)
                        }}

                    >
                        Lista de productos 
                        <span className={styles.icon}>
                            <FaClipboardList/>
                        </span>
                    </button>

                    <button 

                        className={
                            sessionScreen === SESSION_SCREENS.INGRESAR_PRODUCTOS ? 
                                styles.seleccionado 
                            : 
                                null
                        }

                        onClick={()=>{
                            setSessionScreen(SESSION_SCREENS.INGRESAR_PRODUCTOS)
                            setDesplegado(false)
                        }}

                    >
                        Ingresar productos
                        <span className={styles.icon}>
                            <FaTruckLoading/>
                        </span>
                    </button>
                    
                    <button 

                        className={
                            sessionScreen === SESSION_SCREENS.HISTORIAL_PRODUCTOS ?
                                styles.seleccionado
                            : 
                                null
                        }

                        onClick={()=>{
                            setSessionScreen(SESSION_SCREENS.HISTORIAL_PRODUCTOS)
                            setDesplegado(false)
                        }}

                    >
                        Historial de productos
                        <span className={styles.icon}>
                            <HiClipboardDocumentList/>
                        </span>
                    </button>
                    
                    <button 

                        className={
                            sessionScreen === SESSION_SCREENS.REGISTRAR_VENTAS ?
                                styles.seleccionado 
                            : 
                                null
                        }

                        onClick={()=>{
                            setSessionScreen(SESSION_SCREENS.REGISTRAR_VENTAS)
                            setDesplegado(false)
                        }}

                    >
                        Registrar venta
                        <span className={styles.icon}>
                            <FaCashRegister/>
                        </span>
                    </button>
                    
                    <button 

                        className={
                            sessionScreen === SESSION_SCREENS.HISTORIAL_VENTAS ? 
                                styles.seleccionado 
                            : 
                                null
                        }

                        onClick={()=>{
                            setSessionScreen(SESSION_SCREENS.HISTORIAL_VENTAS)
                            setDesplegado(false)
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
                            <FaArrowLeft/>
                        </span>
                    </button>
                   

                </div>
                :
                <div className={styles.dropDownNav}>
                    <button
                        
                        onClick={()=>{setDesplegado(true)}}
                    >
                        Ver menú
                        <span className={styles.icon}>
                            <GiHamburgerMenu/>
                        </span>
                    </button>

                    <button
                        className={styles.goUpButton}
                        onClick={()=>{window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'smooth'
                          })}}
                    >
                        Ir arriba
                        <span className={styles.icon}>
                            <FaAngleDoubleUp/>
                        </span>
                    </button>
                </div>
            }
            

        </nav>
 
    )
}