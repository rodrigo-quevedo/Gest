import './CargarCompra.css'

import { MENUS } from '../../App'

import FormularioCompra from './FormularioCompra/FormularioCompra'

export default function CargarCompra ({setMenu}) {

    return (
        <>
            <button className="cancelButton" onClick={()=>setMenu(MENUS[0])}>&lt;--Cancelar</button>
            <h1>Ingresar productos:</h1>
            <FormularioCompra/>
            
        </>
    )


}