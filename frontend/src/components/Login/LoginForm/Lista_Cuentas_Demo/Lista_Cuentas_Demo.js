import styles from './Lista_Cuentas_Demo.module.css'

function Lista_Cuentas_Demo () {
    return (
        <section>
            <h2>O también podés utilizar una cuenta demo:</h2>

            {/* Solo es un placeholder. Esta lista en realidad se saca de un FETCH al backend */}
            <ul>
                <li>
                    <button>sabroso23</button>
                </li>
                <li>
                    <button>otro_usuario</button>
                </li>
                <li>
                    <button>multicuentaxd</button>
                </li>
            </ul>
        </section>
    )
}

export default Lista_Cuentas_Demo