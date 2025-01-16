import styles from './PrecioInput.module.css'

import {useState} from 'react'

function PrecioInput({
    required,
    
    idInputPrecioUnitario,
    name,
    value,
    
    min,
    max,

    cantidad // este se va a usar para calcular el precio unitario y total    
}) 
{

    // cambiar entre precio unitario / precio total
    const [precioUnitario, setPrecioUnitario] = useState(true)

    return (
        <div className={styles.container}>
            {precioUnitario ?
                <div>
                    <label 
                        htmlFor={idInputPrecioUnitario}
                        onClick={()=>{setPrecioUnitario(true)}}
                    >
                        Precio Unitario
                    </label>  
                    <span onClick={()=>{setPrecioUnitario(false)}}>
                        Precio Total
                    </span>
                </div>
                :
                <div>
                    <span onClick={()=>{setPrecioUnitario(true)}}>Precio Unitario</span>
                    <label 
                        htmlFor={idInputPrecioUnitario}
                        onClick={()=>{setPrecioUnitario(false)}}
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
            />

            
        </div>
    )
}

export default PrecioInput;