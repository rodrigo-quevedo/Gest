import {useEffect} from 'react'


function calcular(hayPrecioUnitario, setTotal, idCantidad, idPrecio) {

    let valorCantidad = Number(document.getElementById(idCantidad).value)
    let valorPrecio =  Number(document.getElementById(idPrecio).value).toFixed(2)

    // console.log('valor cantidad:', valorCantidad)
    // console.log('valor precio', valorPrecio)

    if (hayPrecioUnitario) {    
        setTotal( (valorCantidad * valorPrecio).toFixed(2) )
    }
    else {
        setTotal(valorPrecio)
    }
}


function useCalcularPrecioTotal (calcularTotal, setCalcularTotal, hayPrecioUnitario, setTotal, idCantidad, idPrecio){
    useEffect(()=>{

        if (calcularTotal){
            calcular(hayPrecioUnitario, setTotal, idCantidad, idPrecio)   
            setCalcularTotal(false)
            return;
        }
        // se activa cuando se cambia de precio unitario a precio total en el formulario
        calcular(hayPrecioUnitario, setTotal, idCantidad, idPrecio)

        // se activa cuando hay cambios en el input cantidad
        document.getElementById(idCantidad).addEventListener('input', ()=>{
            calcular(hayPrecioUnitario, setTotal, idCantidad, idPrecio)
        })

        // se activa cuando hay cambios en el input precio
        document.getElementById(idPrecio).addEventListener('input', ()=>{
            calcular(hayPrecioUnitario, setTotal, idCantidad, idPrecio)
        })

        //se activa cuando se clickea en una Autosugerencia
        document.getElementById(idCantidad).addEventListener('change', ()=>{
            calcular(hayPrecioUnitario, setTotal, idCantidad, idPrecio)
        })
        document.getElementById(idPrecio).addEventListener('change', ()=>{
            calcular(hayPrecioUnitario, setTotal, idCantidad, idPrecio)
        })


    }, [hayPrecioUnitario, calcularTotal])
}

export default useCalcularPrecioTotal