//logica
import elegirClass from './elegir_class/elegirClass'


function FormSubmitButton ({
    text,
    fetchStatus
}) {
    return (
        <input 
            type='submit' 
            value={text}
            className={elegirClass(fetchStatus.status)}
        />
    )
}

export default FormSubmitButton