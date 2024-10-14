import styles from './Authentication.module.css'

import Ingresar from '../Ingresar/Ingresar_container/Ingresar'
import Registrarse from '../Registrarse/Registrarse'

import {AUTHENTICATION_SCREENS} from '../../../../config/config'

function Authentication (
    {
        setIsAuth,
        authenticationScreen
    }
) {
    
    function elegirScreen (authenticationScreenArg) {

        switch(authenticationScreenArg) {

            case AUTHENTICATION_SCREENS.LOGIN : {
                return (

                    <Ingresar 
                        setIsAuth={setIsAuth}
                    />

                )
            }
            
            case AUTHENTICATION_SCREENS.REGISTRARSE : {
                return <Registrarse/>
            }
            
        }

    }
    

    return (

        <div className={styles.container}>
            {
                elegirScreen(authenticationScreen)
            }
        </div>

    )

}

export default Authentication