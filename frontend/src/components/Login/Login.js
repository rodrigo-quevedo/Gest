import {useState} from 'react'

import styles from './Login.module.css'
import website_icon from '../../media/website_icon.png'

import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


import LoginForm from './LoginForm/LoginForm'
import Registrarse from './Registrarse/Registrarse'

import Footer from '../Footer/Footer'

const MENUS_LOGIN = ['LOGIN', 'REGISTRARSE']

function elegirMenu (menuLoginArg, setWebpageTitleArg) {
    switch(menuLoginArg) {
        case MENUS_LOGIN[0] : {
            return <LoginForm setWebpageTitle={setWebpageTitleArg}/>
        }
        
        case MENUS_LOGIN[1] : {
            return <Registrarse setWebpageTitle={setWebpageTitleArg}/>
        }
        
    }
}



function Login ({setWebpageTitle}) {
    const [menuLogin, setMenuLogin] = useState(MENUS_LOGIN[0])

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.websiteBanner}>
                    <img src={website_icon} alt="Gest - Gestor de inventario"/>
                    <h1>Gestor de inventario</h1>
                </div>

                <nav className={styles.navbar}>
                    <button 
                    className={menuLogin === MENUS_LOGIN[0]? `${styles.headerButton} ${styles.seleccionado}` : styles.headerButton}
                    onClick={()=> {setMenuLogin(MENUS_LOGIN[0])}}>Ingresar</button>
                    <button 
                    className={menuLogin === MENUS_LOGIN[1]? `${styles.headerButton} ${styles.seleccionado}` : styles.headerButton}
                    onClick={()=> {setMenuLogin(MENUS_LOGIN[1])}}>Registrarse</button>
                </nav>
            </header>
            <main>
                {elegirMenu(menuLogin, setWebpageTitle)}
            </main>

            <Footer />
        </div>
    )

}

export default Login;