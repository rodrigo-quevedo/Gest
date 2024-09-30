import styles from './Navbar.module.css'

import { MENUS } from '../../App_Despues_De_Login'

//icons
import { FaClipboardList } from "react-icons/fa";
import { FaTruckLoading } from "react-icons/fa";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { FaCashRegister } from "react-icons/fa";
import { RiFileList3Line } from "react-icons/ri";


export default function Navbar ({setMenu, menu}) {
    return (
        <nav className={styles.navContainer} role="navigation">
            <button className={menu === 'LISTA_PRODUCTOS' ? styles.seleccionado : null}
            onClick={()=>setMenu(MENUS[0])}
            >Lista de productos 
            <span className={styles.icon}><FaClipboardList/></span>
            </button>

            <button className={menu === 'COMPRA' ? styles.seleccionado : null}
            onClick={()=>setMenu(MENUS[1])}
            >Ingresar nuevos productos
            <span className={styles.icon}><FaTruckLoading/></span>
            </button>
            
            <button className={menu === 'LISTA_COMPRAS' ? styles.seleccionado : null}
            onClick={()=>setMenu(MENUS[2])}
            >Historial de productos ingresados
            <span className={styles.icon}><HiClipboardDocumentList/></span>
            </button>
            
            <button className={menu === 'VENTA' ? styles.seleccionado : null}
            onClick={()=>setMenu(MENUS[3])}
            >Registrar venta
            <span className={styles.icon}><FaCashRegister/></span>
            </button>
            
            <button className={menu === 'LISTA_VENTAS' ? styles.seleccionado : null}
            onClick={()=>setMenu(MENUS[4])}
            >Historial de ventas
            <span className={styles.icon}><RiFileList3Line/></span>
            </button>
        </nav>
    )
}