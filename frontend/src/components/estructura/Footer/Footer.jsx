import styles from './Footer.module.css'

import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function Footer (){
    return (
        <footer className={styles.footer}>
            <div className={styles.infoContainer}>
                <span className={styles.groupTitle}>Historial de Versiones</span>
                <div className={styles.versionRow}>
                    <span className={`${styles.versionBadge} ${styles.current}`}>v2</span>
                    <span className={styles.dateText}>
                        <span className={styles.dateLabel}>Ini:</span> 06 Dic 2025 
                        <span className={styles.separator}>•</span>
                        <span className={styles.dateLabel}>Act:</span> 07 Dic 2025
                    </span>
                </div>
                <div className={styles.versionRow}>
                    <span className={`${styles.versionBadge} ${styles.legacy}`}>v1</span>
                    <span className={styles.dateText}>
                        <span className={styles.dateLabel}>Ini:</span> 22 Ago 2024 
                        <span className={styles.separator}>•</span>
                        <span className={styles.dateLabel}>Act:</span> 28 Ene 2025
                    </span>
                </div>
            </div>

            <div className={styles.devContainer}>
                <p className={styles.devName}>Rodrigo Martín Quevedo</p>
                <span className={styles.devRole}>Desarrollador Fullstack</span>
            </div>

            <nav className={styles.socialNav}>
                <a href="https://github.com/rodrigo-quevedo" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    <FaGithub className={styles.icon} /> 
                    <span>Proyectos</span>
                </a>
                <a href="https://www.linkedin.com/in/martinquevedo" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                    <FaLinkedin className={styles.icon}/> 
                    <span>LinkedIn</span>
                </a>
            </nav>
        </footer>
    )
}

export default Footer;