import './CargarCompra.css'

import { MENUS } from '../../App'

export default function CargarCompra ({setMenu}) {

    return (
        <>
            <h1>Ingresar productos</h1>
            <button onClick={()=>setMenu(MENUS[0])}>CANCELAR</button>
        </>
    )


}