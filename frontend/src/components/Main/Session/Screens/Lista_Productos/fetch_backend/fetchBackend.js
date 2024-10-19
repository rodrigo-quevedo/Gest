import { SEARCHBOX_STATE } from "../../../../../../config/config"

// Nota: Solo hace fetchs GET

function fetchBackend (setSearchBoxState, URL, setState) {
    console.log('Entrando al fetch')

    fetch(URL, {
        method: 'GET',
        mode: 'cors'
    })
    .then(response => {
            console.log(response)

            response.json()
            .then( json => {
                console.log(json)

                // La respuesta de la URL debe venir parseada. El JSON envuelve el body.
                setState(json)
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