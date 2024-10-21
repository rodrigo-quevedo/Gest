//css
import styles from './IngresarProductos.module.css'

//components
import FormInput from '../../../../../../componentes_reutilizables/FormInput/FormInput';
import FormSubmitButton from '../../../../../../componentes_reutilizables/FormSubmitButton/FormSubmitButton';

function IngresarProductos () {
    document.querySelector('title').innerText = 'Ingresar producto';


    return (
        <section className={styles.container}>

                <h1>Nuevo producto</h1>

                <form 
                    id="formularioCompra" 
                    className={styles.formulario}
                >
                    
                    <FormInput 
                        idInput='producto'
                        type='texto'
                        texto='Nombre del producto'
                    />

                    <FormInput 
                        idInput='cantidad'
                        type='number'
                        texto='Cantidad'
                    />

                    <FormInput 
                        idInput='precio_unitario'
                        type='number'
                        texto='Precio unitario'
                    />

                    <FormInput 
                        idInput='marca'
                        type='text'
                        texto='Marca'
                    />

                    <FormInput 
                        idInput='proveedor'
                        type='text'
                        texto='Proveedor'
                    />


                    <FormSubmitButton 
                        text='Enviar'
                    />

                </form>

        </section>
    )


}


export default IngresarProductos