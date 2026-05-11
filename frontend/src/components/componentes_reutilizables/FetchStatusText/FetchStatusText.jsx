//logica
import elegirClass from './elegir_class/elegirClass'
import elegirTexto from './elegir_texto/elegirTexto'

function FetchStatusText ({
    fetchStatus
}) {
    return (
        <p
            className={elegirClass(fetchStatus)}
        >
            {elegirTexto(fetchStatus)}
        </p>
    )
}

export default FetchStatusText