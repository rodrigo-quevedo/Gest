import {useState} from 'react'

import styles from './Login.module.css'
import website_icon from '../../media/website_icon.png'

import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


import LoginForm from './LoginForm/LoginForm'
import Registrarse from './Registrarse/Registrarse'

const MENUS = ['LOGIN', 'REGISTRARSE']

function elegirMenu (menu, setMenuArg) {
    switch(menu) {
        case MENUS[0] : {
            return <LoginForm setMenu={setMenuArg}/>
        }
        
        case MENUS[1] : {
            return <Registrarse setMenu={setMenuArg}/>
        }
        
    }
}



function Login () {
    const [menu, setMenu] = useState(MENUS[0])

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.websiteBanner}>
                    <img src={website_icon} alt="Gest - Gestor de inventario"/>
                    <h1>Gestor de inventario</h1>
                </div>

                <nav className={styles.navbar}>
                    <button 
                    className={menu === MENUS[0]? `${styles.headerButton} ${styles.seleccionado}` : styles.headerButton}
                    onClick={()=> {setMenu(MENUS[0], setMenu)}}>Login</button>
                    <button 
                    className={menu === MENUS[1]? `${styles.headerButton} ${styles.seleccionado}` : styles.headerButton}
                    onClick={()=> {setMenu(MENUS[1], setMenu)}}>Registrarse</button>
                </nav>
            </header>
            <main>
                {elegirMenu(menu)}
            </main>
            <footer className={styles.footer}>
                <p>Inicio del proyecto: Septiembre de 2024.</p>
                <p>Última update: Septiembre de 2024</p>
                <p>Rodrigo Martín Quevedo - Programador Web</p>
                <nav className={styles.footerNavbar}>
                    <a href="https://github.com/rodrigo-quevedo"><FaGithub /> GitHub</a>
                    <a href="https://www.linkedin.com/in/martinquevedo"><FaLinkedin/> LinkedIn</a>
                </nav>
            </footer>
        </div>
    )

}

export default Login;