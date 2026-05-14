import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiHome } from 'react-icons/hi2';
import { TbPackages } from 'react-icons/tb';
import { FaCashRegister } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { SESSION_SCREENS, SEARCHBOX_STATE } from '../../../config/config';
import styles from './WorkspaceSidebar.module.css';
import website_icon from '../../../media/website_icon.png';
import LangSwitchButton from '../../reusable/LangSwitchButton/LangSwitchButton';

const NAV_ITEMS = [
  { screen: SESSION_SCREENS.HOME_DASHBOARD, labelKey: 'workspace.nav.dashboard', Icon: HiHome },
  { screen: SESSION_SCREENS.RESUMEN_PRODUCTO, labelKey: 'workspace.nav.products', Icon: TbPackages },
  { screen: SESSION_SCREENS.REGISTRAR_VENTAS, labelKey: 'workspace.nav.sales', Icon: FaCashRegister },
];

function WorkspaceSidebar({ sessionScreen, setSessionScreen, searchBoxState, language, setLanguage}) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(true);
  const navLocked = searchBoxState === SEARCHBOX_STATE.SUBMIT;

  return (
    <aside
      className={`${styles.aside} ${expanded ? '' : styles.collapsed}`}
      aria-label={t('workspace.sidebarAria')}
    >
      <div className={styles.brand}>
        <div className={styles.brandMark}>
          <div className={styles.imageWrapper}>
            <img 
              src={website_icon} 
              alt={t('header.alt')}
              />
          </div>
        </div>
        <div>
          <p className={styles.brandText}>{t('workspace.brandTitle')}</p>
          <p className={styles.brandSub}>{t('workspace.brandSubtitle')}</p>
        </div>
      </div>

      <LangSwitchButton
          language={language}
          setLanguage={setLanguage}
          edgeAlign="start"
      />

      <button
        type="button"
        className={styles.mobileToggle}
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
      >
        <span>{t('workspace.nav.menu')}</span>
        <span className={styles.icon} aria-hidden>
          <GiHamburgerMenu />
        </span>
      </button>

      <nav className={`${styles.navScroll} ${navLocked ? styles.navDisabled : ''}`} role="navigation" aria-busy={navLocked}>
        <div className={styles.navList}>
          {NAV_ITEMS.map(({ screen, labelKey, Icon }) => (
            <button
              key={screen}
              type="button"
              className={`${styles.navButton} ${sessionScreen === screen ? styles.active : ''}`}
              disabled={navLocked}
              onClick={() => {
                setSessionScreen(screen);
                if (typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches) {
                  setExpanded(false);
                }
              }}
            >
              <span className={styles.icon} aria-hidden>
                <Icon />
              </span>
              {t(labelKey)}
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
}

export default WorkspaceSidebar;
