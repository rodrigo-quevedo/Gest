import {useState} from 'react'

import Header from '../Header/Header_container/Header'
import Main from '../Main/Main_container/Main'
import CerrarSesion from '../Main/Cerrar_Sesion/CerrarSesion'
import Footer from '../Footer/Footer'

import {AUTHENTICATION_SCREENS, SESSION_SCREENS} from '../../config/config'

function App() {
    const [isAuth, setIsAuth] = useState(true);

    const [popupCerrarSesion, setPopupCerrarSesion] = useState(false)
    
    const [authenticationScreen, setAuthenticationScreen] = useState(AUTHENTICATION_SCREENS.LOGIN)

    

    return (
        <>
            <Header 
                //elegir entre [Ingresar/Registrarse] o [CerrarSesion]:
                isAuth={isAuth} 
                
                //elegir entre Ingresar o Registrarse (esto es para darle un estilo distinto al botón del menu seleccionado):
                authenticationScreen={authenticationScreen} 
                
                //setear [Ingresar/Registrarse] al hacer click:
                setAuthenticationScreen={setAuthenticationScreen} 
                
                //activar el popup [CerrarSesion] al hacer click: setPopupCerrarSesion(true)
                setPopupCerrarSesion={setPopupCerrarSesion} 
            />

            {popupCerrarSesion ? 
               
                <CerrarSesion
                    //cerrar la sesión: setIsAuth(false)
                    setIsAuth={setIsAuth} 
                    
                    //cerrar el popup Cerrar Sesión: setPopupCerrarSesion(false)
                    setPopupCerrarSesion={setPopupCerrarSesion} 
                />
            :
               <Main 
                    //elegir entre authentication screens o session screens:
                    isAuth={isAuth}

                    //ingresar a la sesión con una cuenta: setIsAuth(true)
                    setIsAuth={setIsAuth} 

                    //elegir authentication screen [Ingresar/Registrarse]:
                    authenticationScreen={authenticationScreen}
                />

            
            }
            <Footer />
        </>
    )
}

export default App;