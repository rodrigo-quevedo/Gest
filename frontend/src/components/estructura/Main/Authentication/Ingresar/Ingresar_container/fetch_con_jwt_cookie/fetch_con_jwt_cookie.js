import {URL_INGRESAR} from '../../../../../../../config/config'
import { FETCH_STATUS } from '../../../../../../../config/config'

const fetch_con_jwt_cookie = (setFirstJwtFetch, setFetchStatus, setIsAuth)=> {

    setFirstJwtFetch(true)

    setFetchStatus({
        status: FETCH_STATUS.SUBMIT,
        submitMessage: `Buscando sesión guardada en el navegador...`
    })

    fetch(URL_INGRESAR, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',//aca envio mi cookie jwt
        headers: {
            "Accept": "application/json",//lo que acepto como body de la response
    
            "Content-Type": "application/json"//lo que estoy enviando en el body de mi request
        }
    })
    .then(res=>res.json()
        .then(parsedRes => {
            if (parsedRes.success){
                setFetchStatus({
                    status: FETCH_STATUS.SUCCESS,
                    successMessage: parsedRes.message
                })
                setIsAuth(true)
            }
            else {
                setFetchStatus({
                    status: FETCH_STATUS.DEFAULT,
                })
                console.log(`No se pudo ingresar con la sesión guardada en el navegador. ${parsedRes.message}`)
            }
        })

        .catch((err)=>    
            setFetchStatus({
                status: FETCH_STATUS.ERROR,
                errorMessage: `No se pudo ingresar con la sesión guardada en el navegador. ${err}`
            })
        )
    )

    .catch((err)=>    
        setFetchStatus({
            status: FETCH_STATUS.ERROR,
            errorMessage: `No se pudo ingresar con la sesión guardada en el navegador. ${err}`
        })
    )

}

export default fetch_con_jwt_cookie