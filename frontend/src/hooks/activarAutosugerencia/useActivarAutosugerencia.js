import {useEffect} from 'react'

function useActivarAutosugerencia(
    elementId,
    setProductoSearchString,
    setProductoInputActivo
) {
        useEffect(()=>{
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