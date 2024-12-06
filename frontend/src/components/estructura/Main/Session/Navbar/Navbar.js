// css
import styles from './Navbar.module.css'

//icons
import { TbFileAnalytics } from "react-icons/tb";
import { FaClipboardList } from "react-icons/fa";
import { FaTruckLoading } from "react-icons/fa";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { FaCashRegister } from "react-icons/fa";
import { RiFileList3Line } from "react-icons/ri";

// config
import { SESSION_SCREENS } from '../../../../../config/config';


export default function Navbar (
    {
        sessionScreen,
        setSessionScreen
    }
) {

    return (

        <nav className={styles.navContainer} role="navigation">

            <button 

                className={
                    sessionScreen === SESSION_SCREENS.RESUMEN_PRODUCTO ?
                        styles.seleccionado 
                    : 
                        null
                }

                onClick={()=>setSessionScreen(SESSION_SCREENS.RESUMEN_PRODUCTO)}

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

                onClick={()=>setSessionScreen(SESSION_SCREENS.LISTA_PRODUCTOS)}

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

                onClick={()=>setSessionScreen(SESSION_SCREENS.INGRESAR_PRODUCTOS)}

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

                onClick={()=>setSessionScreen(SESSION_SCREENS.HISTORIAL_PRODUCTOS)}

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

                onClick={()=>setSessionScreen(SESSION_SCREENS.REGISTRAR_VENTAS)}

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

                onClick={()=>setSessionScreen(SESSION_SCREENS.HISTORIAL_VENTAS)}

            >
                Historial de ventas
                <span className={styles.icon}>
                    <RiFileList3Line/>
                </span>
            </button>

        </nav>
 
    )
}