import {SEARCHBOX_STATE} from '../../config/config'


function busqueda_local(setSearchBoxState, array, setArrayResultado, productoString, marcaSelected) {
    // console.log('marcaSelected state:',marcaSelected)

    let arrResultado = array.filter((arrObj)=>{

        if (marcaSelected === '') { //lista productos
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
        }

        else {// historiales
            // buscar todo
            // if (
            //     (productoString === '')
            //     && 
            //     (marcaSelected === arrObj.marca)
            // ){
            //     return arrObj
            // }
    
            //busqueda parecida
            // else if (
            //     arrObj.producto.toUpperCase().includes(productoString.toUpperCase()) 
            //     &&
            //     marcaSelected === arrObj.marca
            // ) {
            //     return arrObj
            // }
    
            // busqueda exacta
            // else if (
            if (
                arrObj.producto.toUpperCase() === productoString.toUpperCase()
                &&
                marcaSelected.toUpperCase() === arrObj.marca.toUpperCase()
            ) {
                return arrObj
            }
        }

    })

    // console.log('arrResultado', arrResultado)

    //ordenar alfabeticamente
    arrResultado.sort((a,b)=>{
        if (a.producto < b.producto) {
            return -1 
        }
        return 0
    })

    setArrayResultado(arrResultado)
    setSearchBoxState(SEARCHBOX_STATE.FETCH_SUCCESS)


}

export default busqueda_local