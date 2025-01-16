import {useEffect} from 'react'


function calcular(hayPrecioUnitario, setTotal, idCantidad, idPrecio) {
    if (hayPrecioUnitario) {
        setTotal( 
            (
                Number(document.getElementById(idCantidad).value)
                *
                Number(document.getElementById(idPrecio).value).toFixed(2)
            )
            .toFixed(2)   
        )
    }
    else {
        setTotal(
            Number(
                document.getElementById(idPrecio).value
            ).toFixed(2)   
        )
    }
}


function useCalcularPrecioTotal (hayPrecioUnitario, setTotal, idCantidad, idPrecio){
    useEffect(()=>{
        //se activa cuando se cambia de precio unitario a precio total en el formulario
        calcular(hayPrecioUnitario, setTotal, idCantidad, idPrecio)

        // se activa cuando hay cambios en el input cantidad
        document.getElementById(idCantidad).addEventListener('input', ()=>{
            calcular(hayPrecioUnitario, setTotal, idCantidad, idPrecio)
        })

        // se activa cuando hay cambios en el input precio
        document.getElementById(idPrecio).addEventListener('input', ()=>{
            calcular(hayPrecioUnitario, setTotal, idCantidad, idPrecio)
        })

    }, [hayPrecioUnitario])
}

export default useCalcularPrecioTotal