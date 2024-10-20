import styles from './Ingresar.module.css'

import Lista_Cuentas_Demo from '../Lista_Cuentas_Demo/Lista_Cuentas_Demo'

const actualizarTitle = () => {
    document.querySelector('title').innerText = 'Ingresar';
}

const handleSubmit = (e, setIsAuth) => {
    e.preventDefault();
    setIsAuth(true);
}

function Ingresar (
    {setIsAuth}
) {
    actualizarTitle();

    return (
        <div className={styles.container}>
            <section className={styles.ingresarSection}>
                <h1>Ingresar</h1>

                <form 
                    id="ingresarForm" className={styles.form}
                    onSubmit={(e)=>handleSubmit(e, setIsAuth)}
                >
                    <div className={styles.inputContainer}>
                        <label for="usuario">Usuario</label>
                        <input type="text" id="usuario"/>
                    </div>

                    <div className={styles.inputContainer}>
                        <label for="password">Contraseña</label>
                        <input type="password" id="password" />
                    </div>

                    <input 
                        type='submit' 
                        value='Ingresar'
                        className={styles.submitButton}
                    />
                </form>
            </section>
            

            <Lista_Cuentas_Demo />
            
        </div>
    )
}

export default Ingresar