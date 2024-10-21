import styles from './FormSubmitButton.module.css'

function FormSubmitButton ({
    texto
}) {
    return (
        <input 
            type='submit' 
            value={texto}
            className={styles.submitButton}
        />
    )
}

export default FormSubmitButton