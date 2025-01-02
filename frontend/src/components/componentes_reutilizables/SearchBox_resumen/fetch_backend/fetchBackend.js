import { SEARCHBOX_STATE } from "../../../../config/config"
import { SESSION_SCREENS } from "../../../../config/config";

// Nota: Solo hace fetchs GET
// Nota 2: el metodo GET, segun REST, NO ACEPTA request body, solo url query params (lo que sigue al '?')

function fetchBackend (
    setSearchBoxState, 
    URL, 
    setState, 
    fetchBody, 
    setPopupSessionExpired
) 
    {
    console.log('Entrando al fetch GET del searchbox');

    console.log('fetchBody before parse:', fetchBody)
    
    const fetchUrlQuery = new URLSearchParams(fetchBody)
    
    console.log('fetchBody despues del parse:', fetchUrlQuery.toString())
    

    fetch(URL + '?'+ fetchUrlQuery, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {     
            "Accept": "application/json"//accepted format by the browser
            //Content-Type no me hace falta porque no hay body
        }
    })
    .then(response => {
        console.log('respuesta del servidor:')
        console.log(response)

        if (response.status === 401) {
            setPopupSessionExpired(true)
        }
        
        response.json()
        .then( json => {
                console.log('respuesta del servidor json:')
                console.log(json)

                if (!json.success) {
                    console.log(`error: ${json.message}`)
                    return;
                }
                
                // La respuesta de la URL debe venir parseada. El JSON envuelve el body.
                setState(json.message)
                setSearchBoxState(SEARCHBOX_STATE.FETCH_SUCCESS)  
            })

        .catch(err=> {
            console.log('Error al parsear.', err)
            setSearchBoxState(SEARCHBOX_STATE.FETCH_SUCCESS)
        });

    })

    .catch(err => {
        console.log('Error del fetch.', err)
        setSearchBoxState(SEARCHBOX_STATE.FETCH_SUCCESS)
    })

}

export default fetchBackend