import styles from './FormInput.module.css'

function FormInput ({
    idInput,
    type,
    texto
}) {
    return (
        <div className={styles.inputContainer}>
            <label for={idInput}>{texto}</label>
             <input type={type} id={idInput}/>
         </div>
    )
}

export default FormInput