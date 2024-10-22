//css
import styles from '../FormSubmitButton.module.css'

//config
import { FETCH_STATUS } from "../../../../config/config"


function elegirClass(fetchStatus) {

    switch(fetchStatus) {

        case FETCH_STATUS.SUBMIT : {
            return `${styles.submitButton} ${styles.loading}`
        }

        default : {
            return styles.submitButton
        }
    }
}

export default elegirClass