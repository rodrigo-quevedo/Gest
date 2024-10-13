import styles from './Login.module.css'

import Ingresar from '../Ingresar/Ingresar_container/Ingresar'
import Registrarse from '../Registrarse/Registrarse'

import {AUTHENTICATION_SCREENS} from '../../../../config/config'

function Authentication (
    {
        setIsAuth,
        authenticationScreen
    }
) {
    
    function elegirMain (menuLoginArg, setWebpageTitleArg) {
        switch(menuLoginArg) {
            case MENUS_LOGIN[0] : {
                return <LoginForm setWebpageTitle={setWebpageTitleArg}/>
            }
            
            case MENUS_LOGIN[1] : {
                return <Registrarse setWebpageTitle={setWebpageTitleArg}/>
            }
            
        }
    }
    

    const [menuLogin, setMenuLogin] = useState(MENUS_LOGIN[0])

    return (
        <div className={styles.container}>
            {elegirMain(menuLogin, setWebpageTitle)}
        </div>
    )

}

export default Authentication