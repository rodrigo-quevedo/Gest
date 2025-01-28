import styles from './Footer.module.css'

import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer (){
    return (
        <footer className={styles.footer}>
        <p>Inicio del proyecto: 22 de Agosto de 2024.</p>
        <p>Última update: 27 de Enero de 2025</p>
        <p>Rodrigo Martín Quevedo - Desarrollador Fullstack</p>
        <nav className={styles.footerNavbar}>
            <a href="https://github.com/rodrigo-quevedo"><FaGithub /> Mira mis otros proyectos</a>
            <a href="https://www.linkedin.com/in/martinquevedo"><FaLinkedin/> Agregame a LinkedIn</a>
        </nav>
    </footer>
    )
}

export default Footer;