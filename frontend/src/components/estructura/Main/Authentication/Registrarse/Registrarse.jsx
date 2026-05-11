//css
import styles from './Registrarse.module.css'

//react
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'

//config
import { FETCH_STATUS } from '../../../../../config/config';
import { URL_REGISTRARSE } from '../../../../../config/config';

//helper
import fetchBackend from '../../../../componentes_reutilizables/FormularioReutilizable/fetch_backend/fetchBackend';


function Registrarse () {
    const { t } = useTranslation()
    document.querySelector('title').innerText = t('registrarse.pageTitle');

    const [status, setStatus] = useState({
        status: FETCH_STATUS.DEFAULT, // Use property 'status' to match Ingresar.js pattern mostly
        errorMessage: null
    })

    const [credenciales, setCredenciales] = useState({
        usuario: '',
        password: '',
        confirmPassword: ''
    })

    const handleInputChange = (e) => {
        setCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (credenciales.password !== credenciales.confirmPassword) {
            setStatus({
                status: FETCH_STATUS.DEFAULT,
                errorMessage: t('registrarse.errors.passwordMismatch')
            })
            return;
        }

        setStatus({ status: FETCH_STATUS.SUBMIT, errorMessage: null })

        fetchBackend(
            URL_REGISTRARSE,
            setStatus,
            { 
                usuario: credenciales.usuario, 
                password: credenciales.password 
            }, 
            false,
            null
        );
    }
    
    // Reset error when typing
    useEffect(() => {
        if(status.errorMessage) {
            setStatus(prev => ({ ...prev, errorMessage: null }))
        }
    }, [credenciales])


    return (
        <div className={styles.container}>
            
            <section className={styles.registrarseSection}>
                
                <div className={styles.registerContent}>
                    <h1 className={styles.title}>{t('registrarse.title')}</h1>
                    <p className={styles.subtitle}>{t('registrarse.subtitle')}</p>

                    <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
                        
                        <div className={styles.inputGroup}>
                            <input 
                                className={styles.input}
                                type="text" 
                                id="usuario"
                                name="usuario"
                                placeholder=" " 
                                value={credenciales.usuario}
                                onChange={handleInputChange}
                                required
                            />
                            <label className={styles.label} htmlFor="usuario">{t('registrarse.usernameLabel')}</label>
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
                            <label className={styles.label} htmlFor="password">{t('registrarse.passwordLabel')}</label>
                        </div>

                        <div className={styles.inputGroup}>
                            <input 
                                className={styles.input}
                                type="password" 
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder=" "
                                value={credenciales.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />
                            <label className={styles.label} htmlFor="confirmPassword">{t('registrarse.confirmPasswordLabel')}</label>
                        </div>

                        {status.errorMessage && (
                            <div className={styles.errorMessage}>
                                {status.errorMessage}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className={styles.submitButton}
                            disabled={status.status === FETCH_STATUS.SUBMIT}
                        >
                            {status.status === FETCH_STATUS.SUBMIT ? (
                                <>
                                    <span className={styles.loadingSpinner}></span>
                                    {t('registrarse.loading')}
                                </>
                            ) : t('registrarse.submit')}
                        </button>

                    </form>
                </div>

            </section>
        </div>
    )
}

export default Registrarse;