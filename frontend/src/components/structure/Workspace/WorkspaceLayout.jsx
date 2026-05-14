import './workspace-tokens.css';
import styles from './WorkspaceLayout.module.css';
import WorkspaceTopBar from './WorkspaceTopBar';
import WorkspaceSidebar from './WorkspaceSidebar';

function WorkspaceLayout({ sessionScreen, setSessionScreen, searchBoxState, language, setLanguage, children }) {
  return (
    <div className={`wsApp ${styles.root}`}>
      <WorkspaceTopBar
        setSessionScreen={setSessionScreen}
        searchBoxState={searchBoxState}

      />
      <div className={styles.body}>
        <WorkspaceSidebar
          sessionScreen={sessionScreen}
          setSessionScreen={setSessionScreen}
          searchBoxState={searchBoxState}
          language={language}
          setLanguage={setLanguage}
        />
        <div className={styles.main}>
          <div className={styles.mainInner}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default WorkspaceLayout;
