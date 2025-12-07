//css
import styles from './Ingresar.module.css'

//componentes
import Lista_Cuentas_Demo from '../Lista_Cuentas_Demo/Lista_Cuentas_Demo'

//react
import { useState, useEffect } from 'react';

//config
import { FETCH_STATUS } from '../../../../../../config/config';
import { URL_INGRESAR } from '../../../../../../config/config';

//ingresar con jwt cookie
import fetch_con_jwt_cookie from './fetch_con_jwt_cookie/fetch_con_jwt_cookie'
import fetchBackend from '../../../../../componentes_reutilizables/FormularioReutilizable/fetch_backend/fetchBackend';


function Ingresar ({ setIsAuth }) {
    document.querySelector('title').innerText = 'Ingresar';

    // State for credentials
    const [credenciales, setCredenciales] = useState({
        usuario: '',
        password: ''
    })

    // Helper for demo account updates
    const [canUpdate, setCanUpdate] = useState(false)
    
    // Effect to update credentials when demo account is clicked
    useEffect(()=>{
        if (canUpdate) {
             // Logic handled by child component directly setting state, 
             // but we ensure UI reflects it
             setCanUpdate(false)
        }
    }, [credenciales, canUpdate])

    // Handling fetch status
    const [fetchStatus, setFetchStatus] = useState({
        status: FETCH_STATUS.DEFAULT,
        errorMessage: null
    })

    // Effect to handle successful login
    useEffect(()=>{
        if (fetchStatus.status === FETCH_STATUS.SUCCESS) {
            setIsAuth(true);
        }
    }, [fetchStatus, setIsAuth])

    // Try JWT login on mount
    const [firstJwtFetch, setFirstJwtFetch] = useState(false)
    useEffect(()=>{
        if (firstJwtFetch === false){
            fetch_con_jwt_cookie(setFirstJwtFetch, setFetchStatus, setIsAuth);
        }
    }, [firstJwtFetch, setIsAuth])


    const handleInputChange = (e) => {
        setCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setFetchStatus({ ...fetchStatus, status: FETCH_STATUS.SUBMIT })

        // Use the existing fetchBackend utility
        fetchBackend(
            URL_INGRESAR,
            setFetchStatus,
            { ...credenciales },
            false, // hayPrecioUnitario: not relevant here
            () => {} // setPopupSessionExpired: handle if needed, or null
        );
    }

    return (
        <div className={styles.container}>
            
            <section className={styles.ingresarSection}>
                
                <h1 className={styles.title}>Bienvenido</h1>
                <p className={styles.subtitle}>Ingresa a tu cuenta para continuar</p>

                <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
                    
                    <div className={styles.inputGroup}>
                        <input 
                            className={styles.input}
                            type="text" 
                            id="usuario"
                            name="usuario"
                            placeholder=" " /* Space required for CSS :placeholder-shown trick */
                            value={credenciales.usuario}
                            onChange={handleInputChange}
                            required
                        />
                        <label className={styles.label} htmlFor="usuario">Usuario</label>
                    </div>

                    <div className={styles.inputGroup}>
                        <input 
                            className={styles.input}
                            type="password" 
                            id="password"
                            name="password"
                            placeholder=" "
                            value={credenciales.password}
                            onChange={handleInputChange}
                            required
                        />
                        <label className={styles.label} htmlFor="password">Contraseña</label>
                    </div>

                    {fetchStatus.errorMessage && (
                        <div className={styles.errorMessage}>
                            {fetchStatus.errorMessage}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={fetchStatus.status === FETCH_STATUS.SUBMIT}
                    >
                        {fetchStatus.status === FETCH_STATUS.SUBMIT ? (
                            <>
                                <span className={styles.loadingSpinner}></span>
                                Iniciando sesión...
                            </>
                        ) : 'Ingresar'}
                    </button>

                </form>

                <div className={styles.demoSection}>
                    <span className={styles.demoTitle}>Cuentas Demo</span>
                    <Lista_Cuentas_Demo 
                        setCredenciales={setCredenciales}
                        setCanUpdate={setCanUpdate}
                    />
                </div>

            </section>
        </div>
    )
}

export default Ingresar