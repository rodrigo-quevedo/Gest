import './Footer.module.css'

import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer (){
    return (
        <footer >
        <p>Inicio del proyecto: Septiembre de 2024.</p>
        <p>Última update: Septiembre de 2024</p>
        <p>Rodrigo Martín Quevedo - Programador Web</p>
        <nav>
            <a href="https://github.com/rodrigo-quevedo"><FaGithub /> GitHub</a>
            <a href="https://www.linkedin.com/in/martinquevedo"><FaLinkedin/> LinkedIn</a>
        </nav>
    </footer>
    )
}

export default Footer;