import {SEARCHBOX_STATE} from '../../../../config/config'


function busqueda_local(setSearchBoxState, array, setArrayResultado, productoString) {
    let arrResultado = array.find((arrObj)=>{

        // buscar todo
        if (productoString === ''){
            return arrObj
        }

        // busqueda especifica
        return (
            arrObj.producto.toUpperCase() === productoString.toUpperCase()
        )
    })

    if (arrResultado === null) {
        setArrayResultado([])
        setSearchBoxState(SEARCHBOX_STATE.FETCH_SUCCESS)
        return;
    }
    setArrayResultado(arrResultado)
    setSearchBoxState(SEARCHBOX_STATE.FETCH_SUCCESS)


}

export default busqueda_local