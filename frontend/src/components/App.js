import {useState} from 'react'

import styles from './App.module.css';

import Login from './Login/Login'
import App_Despues_De_Login from './App_Despues_De_Login/App_Despues_De_Login'

function App() {
    const [logged, setLogged] = useState(false)

    return (
        <>
            {logged ?
                <App_Despues_De_Login/>
                :
                <Login/>
            }
        </>
    )
}

export default App;