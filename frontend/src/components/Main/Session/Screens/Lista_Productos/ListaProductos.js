//css
import styles from './ListaProductos.module.css'

//hooks
import {useState, useEffect} from 'react'

//config
import {SEARCHBOX_STATE} from '../../../../../config/config'
import {URL_LISTA_PRODUCTOS} from '../../../../../config/config'

//componentes
import SearchBox from './SearchBox/SearchBox';
import TablaProductos from './TablaProductos/TablaProductos'


function ListaProductos () {
    document.querySelector('title').innerText = 'Lista de productos';

    const [searchBoxState, setSearchBoxState] = useState(SEARCHBOX_STATE.DEFAULT)


    const [listaProductos, setListaProductos] = useState([{
        id: 0,
        producto: '-',
        cantidad: '-',
        precio_unitario: '-',
        marca: '-',
        proveedor: '-'
    }])


    // Esto se activa SOLO cuando el usuario hizo un submit:
    //funciona así:
        //1. usuario aprieta ENTER
        //2. se "cambia" (setea) el state de CLICKED a SUBMIT-> se triggerea solamente, NO SE ACTUALIZA, se actualiza recién cuando hace el re-render
        //3. fetch() --> esto empieza a trabajar en segundo plano
        //4. re-render, acá cambian los estilos a la clase .searchBoxSubmitted, la searchbox aparece como loading

        //5. el fetch tira success (.then() ) o error (.catch() ), sea lo que sea, la clase CSS se cambia en ambos casos, pero se cambia al cambiar un STATE (searchBoxState) de SUBMITED a FETCH_SUCCESS
        //6. se re-renderiza (al cambiar el state)
        //7. recién ahí llega acá, y como el state ya está en SUBMIT, entonces se activa el blur() y se deja de mostrar la clase de loading
        //8. blur() activa el evento onBlur()
    useEffect(()=>{
        if (searchBoxState === SEARCHBOX_STATE.SUBMIT) {
            //esto y la condición de 
            document.getElementById('searchBoxInput').blur()

            // (Cuando tenga el fetch, esto de abajo se puede borrar.)
            // Esto esta hardcodeado, en realidad debería ser un fetch.
            // Pero en realidad tampoco hace falta, ya que esto lo puedo poner en el onSubmit del <form> del SearchBox.
            
            // setTimeout(()=>{
            //     //esto también se hace dentro del fetch():
            //     setSearchBoxState(SEARCHBOX_STATE.FETCH_SUCCESS)

            //     //esto se hace dentro del fetch():
            //     setListaProductos([
            //         {
            //             id: 1,
            //             producto: 'Arroz Fino 1kg',
            //             cantidad: 10,
            //             precio_unitario: 2400.00,
            //             marca: 'Doscientos hermanos',
            //             proveedor: 'Almacén Distribuidora'
            //         },
            //         {
            //             id: 2,
            //             producto: 'Arroz Fino 1kg',
            //             cantidad: 20,
            //             precio_unitario: 2000.00,
            //             marca: 'Sovimandi',
            //             proveedor: 'Almacén Distribuidora'
            //         },
            //         {
            //             id: 3,
            //             producto: 'Arroz Integral 1kg',
            //             cantidad: 8,
            //             precio_unitario: 3000.00,
            //             marca: 'Doscientos hermanos',
            //             proveedor: 'Pritiado Distribuidora'
            //         },
            //     ])
            
            // }, 3000)
        }
    }, [searchBoxState])



    return (

        <section className={styles.container}>

            <h1>Lista de productos</h1>

            <SearchBox
                // Estos states son independientes, se usan para las clases del mismo componente SearchBox.
                searchBoxState={searchBoxState}
                setSearchBoxState={setSearchBoxState}
                // Pasandole otra URL puedo utilizar el componente SearchBox en otro lugar.
                URL_LISTA_PRODUCTOS={URL_LISTA_PRODUCTOS}
                setListaProductos={setListaProductos}
            />

            <TablaProductos
                searchBoxState={searchBoxState}
                listaProductos={listaProductos}
            />
            
        </section>
        
    )
}

export default ListaProductos