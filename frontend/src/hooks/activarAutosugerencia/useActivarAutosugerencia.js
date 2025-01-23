import {useEffect} from 'react'

function useActivarAutosugerencia(
    elementId,
    setProductoSearchString,
    setProductoInputActivo
) {
    useEffect(()=>{
        // Fix para cuando no uso el botón "Nuevo Producto"
        setProductoSearchString(document.getElementById(elementId).value)
        //

        document.getElementById(elementId).addEventListener('click', ()=>{
            setProductoInputActivo(true)
        })

        document.getElementById(elementId).addEventListener('input', ()=>{
            setProductoSearchString(document.getElementById(elementId).value)
            
            setProductoInputActivo(true)
        })
        document.getElementById(elementId).addEventListener('blur', ()=>{
            setProductoInputActivo(false)
        })
    }, [])
}

export default useActivarAutosugerencia