import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiHome, HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { TbLayoutDashboard, TbPackages } from 'react-icons/tb';
import { FaCartPlus, FaHistory, FaCashRegister } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { SESSION_SCREENS, SEARCHBOX_STATE } from '../../../config/config';
import styles from './WorkspaceSidebar.module.css';

const GROUPS = [
  {
    labelKey: 'workspace.nav.groupOverview',
    items: [{ screen: SESSION_SCREENS.HOME_DASHBOARD, labelKey: 'workspace.nav.dashboard', Icon: HiHome }],
  },
  {
    labelKey: 'workspace.nav.groupProducts',
    items: [
      { screen: SESSION_SCREENS.RESUMEN_PRODUCTO, labelKey: 'workspace.nav.productSummary', Icon: TbLayoutDashboard },
      { screen: SESSION_SCREENS.LISTA_PRODUCTOS, labelKey: 'workspace.nav.allProducts', Icon: TbPackages },
      { screen: SESSION_SCREENS.INGRESAR_PRODUCTOS, labelKey: 'workspace.nav.addProduct', Icon: FaCartPlus },
      { screen: SESSION_SCREENS.HISTORIAL_PRODUCTOS, labelKey: 'workspace.nav.acquisitions', Icon: FaHistory },
    ],
  },
  {
    labelKey: 'workspace.nav.groupSales',
    items: [
      { screen: SESSION_SCREENS.REGISTRAR_VENTAS, labelKey: 'workspace.nav.newSale', Icon: FaCashRegister },
      { screen: SESSION_SCREENS.HISTORIAL_VENTAS, labelKey: 'workspace.nav.salesHistory', Icon: HiOutlineClipboardDocumentList },
    ],
  },
];

function WorkspaceSidebar({ sessionScreen, setSessionScreen, searchBoxState }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(true);
  const navLocked = searchBoxState === SEARCHBOX_STATE.SUBMIT;

  return (
    <aside
      className={`${styles.aside} ${expanded ? '' : styles.collapsed}`}
      aria-label={t('workspace.sidebarAria')}
    >
      <div className={styles.brand}>
        <div className={styles.brandMark}>G</div>
        <div>
          <p className={styles.brandText}>{t('workspace.brandTitle')}</p>
          <p className={styles.brandSub}>{t('workspace.brandSubtitle')}</p>
        </div>
      </div>

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
        {GROUPS.map((group) => (
          <div key={group.labelKey}>
            <p className={styles.groupLabel}>{t(group.labelKey)}</p>
            <div className={styles.navList}>
              {group.items.map(({ screen, labelKey, Icon }) => (
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
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default WorkspaceSidebar;
