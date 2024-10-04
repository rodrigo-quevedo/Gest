import styles from './Main.module.css'

import {useState} from 'react'

import Authentication from '../Authentication/Authentication_container/Authentication'
import Session from '../Session/Session_container/Session'

function Main ({isAuth, setIsAuth}) {


    //Session puede manejar autónomamente el state "screens" porque el navbar que utiliza para cambiar "screen" está dentro de sí mismo.
    //Por otro lado, Authentication depende de Header para cambiar el state (Login/Registrarse)
    return (
        <main>
            {isAuth ? 
                <Session 
                    setIsAuth={setIsAuth}
                /> 
                
                : 
                <Authentication
                    setIsAuth={setIsAuth}
                />}
        </main>
    )
}

export default Main