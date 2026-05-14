import styles from './Header.module.css'

import website_icon from '../../../../media/website_icon.png'

import HeaderNav from '../HeaderNav/HeaderNav'
import { useTranslation } from 'react-i18next'


function Header({isAuth, authenticationScreen, setAuthenticationScreen, setPopupCerrarSesion, language, setLanguage}) {
  const {t} = useTranslation();

    return (
        <header className={styles.headerContainer}>

            {/* Website logo + title */}
            <div className={styles.websiteBanner}>
              <div className={styles.imageContainer}>  
                <img 
                    src={website_icon} 
                    alt={t('header.alt')}
                    />
              </div>

              <div className={styles.bannerTextContainer}>
                <div className={styles.separator}></div>
                <h1>{t('header.title')}</h1>
              </div>
            </div>


            <HeaderNav
                isAuth={isAuth}
                authenticationScreen={authenticationScreen}
                setAuthenticationScreen={setAuthenticationScreen}
                setPopupCerrarSesion={setPopupCerrarSesion}
                language={language}
                setLanguage={setLanguage}
            />

        </header>
    )

}

export default Header