import {SEARCHBOX_STATE} from '../../../../config/config'


function busqueda_local(setSearchBoxState, array, setArrayResultado, productoString) {
    let arrResultado = array.filter((arrObj)=>{

        // buscar todo
        if (productoString === ''){
            return arrObj
        }

        //busqueda parecida
        else if (arrObj.producto.toUpperCase().includes(productoString.toUpperCase()) ) {
            return arrObj
        }

        // busqueda exacta
        else if (arrObj.producto.toUpperCase() === productoString.toUpperCase()) {
            return arrObj
        }

    })

    // console.log('arrResultado', arrResultado)

    setArrayResultado(arrResultado)
    setSearchBoxState(SEARCHBOX_STATE.FETCH_SUCCESS)


}

export default busqueda_local