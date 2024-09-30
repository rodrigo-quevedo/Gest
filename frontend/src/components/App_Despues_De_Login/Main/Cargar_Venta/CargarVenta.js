import './CargarVenta.module.css'

import { MENUS } from '../../App_Despues_De_Login'

export default function CargarVenta ({setMenu}) {

    return (
        <div>
            <section>
                <h1>Ingresar una venta</h1>
                <button onClick={()=>setMenu(MENUS[0])}>CANCELAR</button>
            </section>
              
        </div>
    )

    
}