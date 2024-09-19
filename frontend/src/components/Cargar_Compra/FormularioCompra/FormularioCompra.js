import {useState} from 'react'

import './FormularioCompra.css'

export default function FormularioCompra ()  {

    const [precioUnitario, setPrecioUnitario] = useState(true)

    return (
        <form id="formularioCompra" class="formulario">
            <div className="just_a_div">
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

            <div className="eleccionPrecio">
                <label for="precioUnitario"  onClick={()=>console.log('unitario')}>Precio unitario</label>
                <label for="precioTotal" 
                onClick={()=>console.log('total')}>Precio total</label>
            </div>

            {precioUnitario ?
            <div>
             <input type="number" id="precioUnitario" placeholder="$ 0"/>
            </div>
            :
            <div>
                <input type="number" id="precioTotal" placeholder="$ 0"/>
            </div>
            }



            

        </form>
    )
}