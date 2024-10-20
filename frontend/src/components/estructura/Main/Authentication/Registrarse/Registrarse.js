import styles from './Registrarse.module.css'

import FormInput from '../../../../componentes_reutilizables/FormInput/FormInput';
import FormSubmitButton from '../../../../componentes_reutilizables/FormSubmitButton/FormSubmitButton';

function Registrarse (
) {
    document.querySelector('title').innerText = 'Registrarse';

    return (
        <div className={styles.container}>
            <h1>Registrarse</h1>

            <form>

                <FormInput 
                    idInput='usuario'
                    type='text'
                    texto='Usuario'
                />

                <FormInput 
                    idInput='password'
                    type='password'
                    texto='Contraseña'
                />

                <FormInput 
                    idInput='confirmPassword'
                    type='password'
                    texto='Repetir contraseña'
                />

                <FormSubmitButton 
                    texto="Registrarse"
                />
            </form>
        </div>
    )
}

export default Registrarse;