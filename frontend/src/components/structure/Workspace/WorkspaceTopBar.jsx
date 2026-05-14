import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoNotificationsOutline } from 'react-icons/io5';
import { SESSION_SCREENS, SEARCHBOX_STATE } from '../../../config/config';
import LangSwitchButton from '../../reusable/LangSwitchButton/LangSwitchButton';
import styles from './WorkspaceTopBar.module.css';

function WorkspaceTopBar({ setSessionScreen, searchBoxState, language, setLanguage }) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navLocked = searchBoxState === SEARCHBOX_STATE.SUBMIT;

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className={styles.bar} role="banner">
      <div className={styles.searchWrap}>
        <label className="visually-hidden" htmlFor="ws-global-search">
          {t('workspace.topBar.searchLabel')}
        </label>
        <div
          className={`${styles.searchInner} ${navLocked ? styles.searchInnerDisabled : ''}`}
        >
          <span className={styles.kbd} aria-hidden>
            {t('workspace.topBar.searchKbd')}
          </span>
          <input
            ref={inputRef}
            id="ws-global-search"
            className={styles.searchInput}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('workspace.topBar.searchPlaceholder')}
            autoComplete="off"
            disabled={navLocked}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.btnPrimary}
          disabled={navLocked}
          onClick={() => setSessionScreen(SESSION_SCREENS.REGISTRAR_VENTAS)}
        >
          {t('workspace.topBar.newSale')}
        </button>
        <button
          type="button"
          className={styles.btnGhost}
          disabled={navLocked}
          onClick={() => setSessionScreen(SESSION_SCREENS.INGRESAR_PRODUCTOS)}
        >
          {t('workspace.topBar.addProduct')}
        </button>

        <LangSwitchButton
          language={language}
          setLanguage={setLanguage}
          edgeAlign="start"
        />

        <button
          type="button"
          className={styles.btnIcon}
          disabled={navLocked}
          aria-label={t('workspace.topBar.notifications')}
        >
          <IoNotificationsOutline />
        </button>

        <div className={styles.profile} aria-label={t('workspace.topBar.profileAria')}>
          <div className={styles.avatar} aria-hidden>
            {t('workspace.topBar.avatarInitial')}
          </div>
          <div className={styles.profileText}>
            <p className={styles.profileName}>{t('workspace.topBar.profileName')}</p>
            <p className={styles.profileHint}>{t('workspace.topBar.profileHint')}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default WorkspaceTopBar;
