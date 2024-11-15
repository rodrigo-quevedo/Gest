const {URL_CUENTAS_DEMO} = require('../../../../../../../config/config')


const fetch_cuentas_demo = (setFirstFetch, setCuentasDemo) => {
    
    setFirstFetch(true)
    
    return fetch(URL_CUENTAS_DEMO, {
        method: 'GET',//esto es el default, no hace falta
        headers: {
            'Accept': 'application/json'//en teoria esto permite una request sin preflight
        }
    })
    .then((res)=>{
        res.json()
        .then((parsedResponse)=>{
            if (parsedResponse.success) {

                console.log(parsedResponse.message);

                setCuentasDemo(parsedResponse.cuentasDemo);

            }
            else {
                console.log(`Frontend: no se pudo obtener las cuentas demo. Info:${parsedResponse.message}`)
            }
        })
        .catch((err)=> {
            console.log(`Frontend: Error while fetching. ${err}`);
            return null;
        })
    })
    
    .catch((err)=>{
        console.log(`Frontend: Error while parsing. ${err}`);
        return null;
    })
}


export default fetch_cuentas_demo