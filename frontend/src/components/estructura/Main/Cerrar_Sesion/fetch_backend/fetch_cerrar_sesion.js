import {URL_CERRAR_SESION} from '../../../../../config/config'
import {FETCH_STATUS} from '../../../../../config/config'

const fetch_cerrar_sesion = (setFetchStatus, setIsAuth, setPopupCerrarSesion) => {
    fetch(URL_CERRAR_SESION, {
        method: 'DELETE',
        mode:'cors',
        credentials: 'include',//importante para que se envien las cookies
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(res=>res.json()
        .then((parsedRes)=>{
            if (parsedRes.success){
                setFetchStatus({
                    status: FETCH_STATUS.SUCCESS,
                    successMessage: parsedRes.message
                })
                setIsAuth(false)
                setPopupCerrarSesion(false)
            }
            else {
                setFetchStatus({
                    status: FETCH_STATUS.ERROR,
                    errorMessage: `No se pudo cerrar la sesión. Aún así, se borrará automáticamente en 10 minutos. Error: ${parsedRes.message}`
                })
            }
        })

        .catch((err)=>setFetchStatus({
            status: FETCH_STATUS.ERROR,
            errorMessage: `No se pudo cerrar la sesión. Aún así, se borrará automáticamente en 10 minutos. Error: al parsear body JSON de la respuesta. ${err}`
        }))
    )

    .catch((err)=>setFetchStatus({
        status: FETCH_STATUS.ERROR,
        errorMessage: `No se pudo cerrar la sesión. Aún así, se borrará automáticamente en 10 minutos. Error: al hacer fetch. ${err}`
    }))
}

export default fetch_cerrar_sesion