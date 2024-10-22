//config
import { FETCH_STATUS } from "../../../../config/config"

function elegirTexto (fetchStatus) {
    switch (fetchStatus.status) {
        
        case FETCH_STATUS.DEFAULT : {
            return null
        }

        case FETCH_STATUS.SUBMIT : {
            return 'Cargando datos enviados...'
        }

        case FETCH_STATUS.SUCCESS : {
            return fetchStatus.successMessage
        }

        case FETCH_STATUS.ERROR: {
            return fetchStatus.errorMessage
        }

    }
    
}

export default elegirTexto