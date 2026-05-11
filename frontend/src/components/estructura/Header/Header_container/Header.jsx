import styles from './Header.module.css'

import website_icon from '../../../../media/website_icon.png'

import AuthenticationHeader from '../AuthenticationHeader/AuthenticationHeader'
import SessionHeader from '../SessionHeader/SessionHeader'
import { useTranslation } from 'react-i18next'

function Header({isAuth, authenticationScreen, setAuthenticationScreen, setPopupCerrarSesion, language, setLanguage}) {
  const {t} = useTranslation();

    return (
        <header className={styles.headerContainer}>

            {/* Website logo + title */}
            <div className={styles.websiteBanner}>
                <img 
                    src={website_icon} 
                    alt={t('header.alt')}
                />
                <div className={styles.separator}></div>
                <h1>{t('header.title')}</h1>

                <div className={styles.languageSelectWrap}>
                    <label htmlFor="header-language-select" className={styles.languageSelectLabel}>
                        {t('langButton')}
                    </label>
                    <select
                        id="header-language-select"
                        className={styles.languageSelect}
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        aria-label={t('header.languageSelectAria')}
                    >
                        <option value="es">{t('header.language.es')}</option>
                        <option value="en">{t('header.language.en')}</option>
                    </select>
                </div>
            </div>


            {/* Aca se elige entre mostrar [Login/Registrarse] o [Perfil/Cerrar sesión] */}
            {isAuth ? 

                <SessionHeader
                    setPopupCerrarSesion={setPopupCerrarSesion}
                /> 

            : 

                <AuthenticationHeader
                    authenticationScreen={authenticationScreen}
                    setAuthenticationScreen={setAuthenticationScreen}
                />

            }

        </header>
    )

}

export default Header