import {useState} from 'react'

import Header from '../Header/Header_container/Header'
import Main from '../Main/Main_container/Main'
import CerrarSesion from '../Main/Cerrar_Sesion/CerrarSesion'
import Session_Expired from '../Main/Session_Expired/Session_Expired'
import Footer from '../Footer/Footer'

import {AUTHENTICATION_SCREENS} from '../../../config/config'
import { useTranslation } from 'react-i18next'

function App() {
    const [isAuth, setIsAuth] = useState(false);

    const [popupCerrarSesion, setPopupCerrarSesion] = useState(false)
    const [popupSessionExpired, setPopupSessionExpired] = useState(false)
    
    const [authenticationScreen, setAuthenticationScreen] = useState(AUTHENTICATION_SCREENS.LOGIN)

    const {i18n} = useTranslation();

    const languageBase = (i18n.resolvedLanguage || i18n.language || 'es').split('-')[0];
    const language = languageBase === 'en' ? 'en' : 'es';

    const setLanguage = (lng) => {
      if (lng !== 'es' && lng !== 'en') return;
      i18n.changeLanguage(lng);
      localStorage.setItem('language', lng);
    };

    return (
        <>
            {!isAuth && <Header 
                // [Login/Register] or [Logout] buttons:
                isAuth={isAuth} 
                
                // [Login/Register] button styles:
                authenticationScreen={authenticationScreen} 
                
                //set [Login/Register] when clicking:
                setAuthenticationScreen={setAuthenticationScreen} 
                
                //activate [Logout] popup when clicking:
                setPopupCerrarSesion={setPopupCerrarSesion} 

                // language :
                language={language}
                setLanguage={setLanguage}
            />}

            {
                popupSessionExpired ?
                    <Session_Expired 
                        //mostrar login
                        setIsAuth={setIsAuth}
                        //desactivar ese popup
                        setPopupSessionExpired={setPopupSessionExpired}
                    />
                :
            
                    popupCerrarSesion ? 
                    
                        <CerrarSesion
                            //close session: setIsAuth(false)
                            setIsAuth={setIsAuth} 
                            
                            //close the [Logout] popup: setPopupCerrarSesion(false)
                            setPopupCerrarSesion={setPopupCerrarSesion} 
                        />
                    :
                        <Main 
                            // [Login/Register] or [Session]:
                            isAuth={isAuth}

                            // session with an account: setIsAuth(true)
                            setIsAuth={setIsAuth} 

                            // [Login/Register] screen:
                            authenticationScreen={authenticationScreen}

                            setPopupSessionExpired={setPopupSessionExpired}

                            // language:
                            language={language}
                            setLanguage={setLanguage}
                        />

            
            }
            <Footer />
        </>
    )
}

export default App;