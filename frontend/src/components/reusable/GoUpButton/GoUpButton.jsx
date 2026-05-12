//css
import styles from './GoUpButton.module.css'

//icons
import { FaAngleDoubleUp } from "react-icons/fa";


function GoUpButon () {


    return (
        <button
            className={styles.goUpButton}
            onClick={()=>{window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })}}
        >
            <span className={styles.icon}>
                <FaAngleDoubleUp/>
            </span>
            Ir arriba
        </button>
    )
}

export default GoUpButon;