import {useState} from 'react'

import styles from './Login.module.css'

import LoginForm from './LoginForm/LoginForm'
import Registrarse from './Registrarse/Registrarse'

const MENUS = ['LOGIN', 'REGISTRARSE']

function elegirMenu (menu, setMenuArg) {
    switch(menu) {
        case MENUS[0] : {
            return <LoginForm setMenu={setMenuArg}/>
        }
        
        case MENUS[1] : {
            return <Registrarse setMenu={setMenuArg}/>
        }
        
    }
}



function Login () {
    const [menu, setMenu] = useState(MENUS[0])

    return (
        <div>
            <header>
                <nav>
                    <button onClick={()=> {setMenu(MENUS[0], setMenu)}}>Login</button>
                    <button onClick={()=> {setMenu(MENUS[1], setMenu)}}>Registrarse</button>
                </nav>
            </header>
            <main>
                {elegirMenu(menu)}
            </main>
            <footer>
                <p>Inicio: Septiembre de 2024. Última update: Septiembre de 2024</p>
                <nav>
                    <a href="https://github.com/rodrigo-quevedo">GitHub</a>
                    <a href="https://www.linkedin.com/in/martinquevedo">LinkedIn</a>
                </nav>
            </footer>
        </div>
    )

}

export default Login;