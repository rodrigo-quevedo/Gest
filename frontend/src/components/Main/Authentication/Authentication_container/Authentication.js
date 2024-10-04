import {useState} from 'react'

import styles from './Login.module.css'

import LoginForm from './LoginForm/LoginForm'
import Registrarse from './Registrarse/Registrarse'



const MENUS_LOGIN = ['LOGIN', 'REGISTRARSE']

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



function Authentication ({setWebpageTitle}) {
    const [menuLogin, setMenuLogin] = useState(MENUS_LOGIN[0])

    return (
        <div className={styles.container}>
            {elegirMain(menuLogin, setWebpageTitle)}
        </div>
    )

}

export default Authentication;