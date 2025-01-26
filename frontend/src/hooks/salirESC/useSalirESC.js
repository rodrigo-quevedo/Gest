import { useEffect } from "react"


function useSalirESC(idInput){
    useEffect(()=>{
        document.getElementById(idInput).addEventListener('keydown', (e)=>{
            if (e.code === 'Escape'){
                console.log('ESC activado')
                e.currentTarget.blur();
            }
        })
    }, [])
}

export default useSalirESC