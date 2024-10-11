import {useState} from 'react'

import Header from '../Header/Header_container/Header'
// import Main from '../Main/Main_container/Main'
import CerrarSesion from '../Main/Cerrar_Sesion/CerrarSesion'
import Footer from '../Footer/Footer'

import {LOGIN_SCREENS, SESSION_SCREENS} from '../../config/config'

function App() {
    const [isAuth, setIsAuth] = useState(true);

    const [loginScreen, setLoginScreen] = useState(LOGIN_SCREENS.LOGIN)
    const [sessionScreen, setSessionScreen] = useState(SESSION_SCREENS.LISTA_PRODUCTOS)

    const [popupCerrarSesion, setPopupCerrarSesion] = useState(true)


    return (
        <>
            <Header 
                isAuth={isAuth}
                loginScreen={loginScreen}
                setLoginScreen={setLoginScreen}
                sessionScreen={sessionScreen}
                setSessionScreen={setSessionScreen}
                setPopupCerrarSesion={setPopupCerrarSesion}
            />

            {popupCerrarSesion ? 
               
                <CerrarSesion
                setIsAuth={setIsAuth}
                setPopupCerrarSesion={setPopupCerrarSesion}
            />
            :
               // <Main 
                //     isAuth={isAuth}
                //     setIsAuth={setIsAuth} 
                //     loginScreen={loginScreen}
                //     sessionScreen={sessionScreen}
                // />
                <main></main> 
            
            }
            <Footer />
        </>
    )
}

export default App;