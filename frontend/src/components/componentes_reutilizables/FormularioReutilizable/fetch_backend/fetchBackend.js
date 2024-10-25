//config
import { FETCH_STATUS } from "../../../../config/config"


function fetchBackend (URL, setFetchStatus, nameValuePairs) {

    console.log('Entrando al fetch');

    fetch(URL, {
        method: 'POST',
        mode: 'cors',

        headers: {
            //'Accept': formatos que este fetch del navegador puede entender:

            //Por qué usar json: si el server te tiene que enviar un objeto, no te conviene el text/plain, porque vos ese texto lo tendrías que parsear a mano. En cambio, si envias un application/json, tenes la librería de JavaScript que te parsea el json.
            'Accept': 'application/json',
            //formato en el que este fetch del navegador ENVÍA info:
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(nameValuePairs)
    })

    .then(res=> res.json()
        .then((response)=> {
            
            setFetchStatus({
                status: FETCH_STATUS.SUCCESS,
                successMessage: `Producto ingresado con éxito:\n${JSON.stringify(response)}`,
                errorMessage: null
            })
        })
        .catch(err=>{
            
            console.log('Frontend error: while parsing json response.')
            console.log(err)
            
            setFetchStatus({
                status: FETCH_STATUS.ERROR,
                successMessage: null,
                errorMessage: `No se pudo ingresar el producto.\n${err}`
            })
        })
    )
    .catch(err=>{
        
        console.log('Frontend error: while fetching.')
        console.log(err)
        
        setFetchStatus({
            status: FETCH_STATUS.ERROR,
            successMessage: null,
            errorMessage: `No se pudo ingresar el producto.\n${err}`
        })
    })
}

export default fetchBackend