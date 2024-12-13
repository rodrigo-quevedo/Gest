import styles from './TablaReutilizable.module.css'

import {SEARCHBOX_STATE} from '../../../config/config'


function TablaReutilizable ({
    searchBoxState,
    arrayState,
    tableHeaders,
    mapCallback
}) {
    return (
        <div 
            className={searchBoxState === SEARCHBOX_STATE.FETCH_SUCCESS ? 
                `${styles.tableContainer} ${styles.tableContainerLoaded}`
            :
                searchBoxState === SEARCHBOX_STATE.SUBMIT ?
                `${styles.tableContainer} ${styles.tableContainerLoading}`
                :
                styles.tableContainer
        }
    >

            <table >

                <thead>
                    { tableHeaders }
                </thead>

                <tbody>
                    { arrayState.map(mapCallback) }
                </tbody>

            </table>

        </div>
    )
}

export default TablaReutilizable