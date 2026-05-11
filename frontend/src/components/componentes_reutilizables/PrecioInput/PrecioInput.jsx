import styles from './PrecioInput.module.css'

import {useState, useEffect} from 'react'

import useSalirESC from '../../../hooks/salirESC/useSalirESC'


function PrecioInput({
    required,
    
    idInputPrecioUnitario,
    name,
    value,
    
    min,
    max,

    hayPrecioUnitario, setHayPrecioUnitario
}) 
{

    //Salir con ESC
    useSalirESC(idInputPrecioUnitario)

    // enfocar input cuando se clickea "precio unitario" o "precio total"
    const [focus, setFocus] = useState(false)

    useEffect(()=>{
        if (focus) {
            document.getElementById(idInputPrecioUnitario).focus()
            setFocus(false)
        }
        
    }, [focus])

    return (
        <div className={styles.container}>
            {hayPrecioUnitario ?
                <div>
                    <label 
                        htmlFor={idInputPrecioUnitario}
                        onClick={()=>{
                            setHayPrecioUnitario(true)
                            setFocus(true)
                        }}
                    >
                        Precio Unitario
                    </label>  
                    <span onClick={()=>{
                        setHayPrecioUnitario(false)
                        setFocus(true)
                    }}>
                        Precio Total
                    </span>
                </div>
                :
                <div>
                    <span onClick={()=>{
                        setHayPrecioUnitario(true)
                        setFocus(true)
                    }}>Precio Unitario</span>
                    <label 
                        htmlFor={idInputPrecioUnitario}
                        onClick={()=>{
                            setHayPrecioUnitario(false)
                            setFocus(true)
                        }}
                    >
                        Precio Total
                    </label>
                </div>
            }
            
            <input 
                autoComplete='off'
                
                required={required}
                type='number'
                
                id={idInputPrecioUnitario}
                name={name}
                value={value?value: null}

                step="0.01"
                min={min}
                max={max}

                title={`Solo se permiten números con 2 decimales a lo sumo. El minimo es ${min} y el máximo es ${max}.`}
            />

            
        </div>
    )
}

export default PrecioInput;