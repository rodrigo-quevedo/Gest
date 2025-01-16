import styles from './PrecioInput.module.css'

import {useState} from 'react'

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



    return (
        <div className={styles.container}>
            {hayPrecioUnitario ?
                <div>
                    <label 
                        htmlFor={idInputPrecioUnitario}
                        onClick={()=>{setHayPrecioUnitario(true)}}
                    >
                        Precio Unitario
                    </label>  
                    <span onClick={()=>{setHayPrecioUnitario(false)}}>
                        Precio Total
                    </span>
                </div>
                :
                <div>
                    <span onClick={()=>{setHayPrecioUnitario(true)}}>Precio Unitario</span>
                    <label 
                        htmlFor={idInputPrecioUnitario}
                        onClick={()=>{setHayPrecioUnitario(false)}}
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