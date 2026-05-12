//css
import styles from '../FetchStatusText.module.css'

//config
import { FETCH_STATUS } from "../../../../config/config"

function elegirClass(fetchStatus) {
    switch (fetchStatus.status) {
        
        case FETCH_STATUS.DEFAULT : {
            return null
        }

        case FETCH_STATUS.SUBMIT : {
            return `${styles.texto} ${styles.submit}`
        }

        case FETCH_STATUS.SUCCESS : {
            return `${styles.texto} ${styles.success}`
        }

        case FETCH_STATUS.ERROR: {
            return `${styles.texto} ${styles.error}`
        }

    }
}

export default elegirClass