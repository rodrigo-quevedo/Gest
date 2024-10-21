import styles from './Ingresar.module.css'

import Lista_Cuentas_Demo from '../Lista_Cuentas_Demo/Lista_Cuentas_Demo'

import FormInput from '../../../../../componentes_reutilizables/FormInput/FormInput';
import FormSubmitButton from '../../../../../componentes_reutilizables/FormSubmitButton/FormSubmitButton';


const actualizarTitle = () => {
    document.querySelector('title').innerText = 'Ingresar';
}

const handleSubmit = (e, setIsAuth) => {
    e.preventDefault();
    setIsAuth(true);
}

function Ingresar (
    {setIsAuth}
) {
    actualizarTitle();

    return (
        <div className={styles.container}>

            <section className={styles.ingresarSection}>

                <h1>Ingresar</h1>

                <form 
                    id="ingresarForm" 
                    className={styles.form}
                    onSubmit={(e)=>handleSubmit(e, setIsAuth)}
                >

                    <FormInput 
                        idInput='usario'
                        type='text'
                        texto='Usuario'
                    />

                    <FormInput 
                        idInput='password'
                        type='password'
                        texto='Contraseña'
                    />

                    <FormSubmitButton 
                        texto='Ingresar'
                    />

                </form>

            </section>
            

            <Lista_Cuentas_Demo />
            
        </div>
    )
}

export default Ingresar