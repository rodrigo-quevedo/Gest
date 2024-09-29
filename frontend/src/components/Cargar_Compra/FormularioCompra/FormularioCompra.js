import {useState} from 'react'

import styles from './FormularioCompra.module.css'

export default function FormularioCompra ()  {

    const [precioUnitario, setPrecioUnitario] = useState(true)

    return (
        <form id="formularioCompra" className={styles.formulario}>
            <div className={styles.just_a_div}>
                <label for="nombreProducto">Nombre del producto</label>
                <input type="text" id="nombreProducto" placeholder="Producto"/>
           </div>

            <div>
                <label for="cantidadProducto">Cantidad</label>
                <input type="number" id="cantidadProducto" placeholder="0"/>
            </div>
            


            <div>
                <label for="marcaProducto">Marca</label>
                <input type="text" id="marcaProducto" placeholder="Marca"/>
            </div>

            <div className={styles.eleccionPrecio}>
                <label 
                for="precioUnitario"  
                onClick={()=>setPrecioUnitario(true)}
                className={precioUnitario ? styles.precioElegido : styles.precioInactivo}
                >Precio unitario</label>
                <label 
                for="precioTotal" 
                onClick={()=>setPrecioUnitario(false)}
                className={ ! precioUnitario ? styles.precioElegido : styles.precioInactivo}
                >Precio total</label>
            </div>

            {precioUnitario ?
            <div className={styles.eleccionPrecioInput}>
                <input type="number" id="precioUnitario" placeholder="$ 0"/>
            </div>
            :
            <div className={styles.eleccionPrecioInput}>
                <input type="number" id="precioTotal" placeholder="$ 0"/>
            </div>
            }


            

        </form>
    )
}