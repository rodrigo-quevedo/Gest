function elegirSearchboxClass(searchBoxState, styles, SEARCHBOX_STATE) {
    switch(searchBoxState) {
        
        case SEARCHBOX_STATE.DEFAULT : {
            return styles.searchBox
        }

        case SEARCHBOX_STATE.CLICKED : {
            return `${styles.searchBox} ${styles.searchBoxSelected}`
         }

        case SEARCHBOX_STATE.SUBMIT : {
            return `${styles.searchBox} ${styles.searchBoxSubmitted}`
        }

        case SEARCHBOX_STATE.FETCH_SUCCESS : {
            return `${styles.searchBox} ${styles.searchBoxFetchSuccess}`
        }
    }
}

export default elegirSearchboxClass