//config
import { FETCH_STATUS } from "../../../../config/config"



function fetchBackend (
    URL, 
    setFetchStatus, 
    fetchBody, 
    hayPrecioUnitario,
    setPopupSessionExpired
) {

    console.log('Entrando al fetch');
    
    
    //parsear cantidad y precio_unitario
    console.log(fetchBody)
    
    if (fetchBody.cantidad) fetchBody.cantidad = Number(fetchBody.cantidad)
    
    if (fetchBody.precio_unitario) fetchBody.precio_unitario = Number(fetchBody.precio_unitario)

    
    // parsear precio total a precio unitario
    if (! hayPrecioUnitario) {
        fetchBody.precio_unitario = (fetchBody.precio_unitario / fetchBody.cantidad).toFixed(2)

        fetchBody.precio_unitario = Number(fetchBody.precio_unitario)
    }



    fetch(URL, {
        method: 'POST',
        mode: 'cors',

        //cookie cors
        credentials: "include",

        headers: {
            //'Accept': formatos que este fetch del navegador puede entender:

            //Por qué usar json: si el server te tiene que enviar un objeto, no te conviene el text/plain, porque vos ese texto lo tendrías que parsear a mano. En cambio, si envias un application/json, tenes la librería de JavaScript que te parsea el json.
            'Accept': 'application/json',

            //formato en el que este fetch del navegador ENVÍA info:
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(fetchBody)
    })

    .then(res=> { 
        console.log(res); 
        
        // manejar sesion expirada
        if (res.status === 401) {
            setPopupSessionExpired(true)
        }

        // manejar body de la Response
        res.json().then((response)=> {

            if (response.success) {
                setFetchStatus({
                    status: FETCH_STATUS.SUCCESS,
                    // successMessage: response.message,
                    resultado: response.message,
                    errorMessage: null
                })
            }

            else {
                setFetchStatus({
                    status: FETCH_STATUS.ERROR,
                    successMessage: null,
                    errorMessage: response.message
                })
            }

        })
        .catch(err=>{
            
            console.log('Frontend error: while parsing json response.')
            console.log(err)
            
            setFetchStatus({
                status: FETCH_STATUS.ERROR,
                successMessage: null,
                errorMessage: `Frontend error: while parsing json response.\n${err}`
            })
        }) }
    )
    .catch(err=>{
        
        // manejar error de conexion con el servidor
        if (err.toString() === "TypeError: Failed to fetch"){
            console.log("Error en la conexion con el servidor (TypeError: Failed to fetch). Recargue la página o presione F5.")

            setFetchStatus({
                status: FETCH_STATUS.ERROR,
                errorMessage: `Error en la conexion con el servidor (${err}). Recargue la página o presione F5.`
            })

            return;

        }

        console.log('Frontend error: while fetching.')
        console.log(err)
        
        setFetchStatus({
            status: FETCH_STATUS.ERROR,
            successMessage: null,
            errorMessage: `Frontend error: while fetching.\n${err}`
        })
    })
}

export default fetchBackend