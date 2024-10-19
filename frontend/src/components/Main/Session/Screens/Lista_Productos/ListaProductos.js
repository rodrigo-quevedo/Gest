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
        producto: '-',
        cantidad: '-',
        precio_unitario: '-',
        marca: '-',
        proveedor: '-'
    }])


    // Esto se activa SOLO cuando el usuario hizo un submit:
    useEffect(()=>{
        if (searchBoxState === SEARCHBOX_STATE.SUBMIT) {
            document.getElementById('searchBoxInput').blur()

            // Esto esta hardcodeado, en realidad debería ser un fetch:
            setTimeout(()=>{
                setSearchBoxState(SEARCHBOX_STATE.FETCH_SUCCESS)

                setListaProductos([
                    {
                        producto: 'Arroz Fino 1kg',
                        cantidad: 10,
                        precio_unitario: 2400.00,
                        marca: 'Doscientos hermanos',
                        proveedor: 'Almacén Distribuidora'
                    },
                    {
                        producto: 'Arroz Fino 1kg',
                        cantidad: 20,
                        precio_unitario: 2000.00,
                        marca: 'Sovimandi',
                        proveedor: 'Almacén Distribuidora'
                    },
                    {
                        producto: 'Arroz Integral 1kg',
                        cantidad: 8,
                        precio_unitario: 3000.00,
                        marca: 'Doscientos hermanos',
                        proveedor: 'Pritiado Distribuidora'
                    },
                ])
            
            }, 3000)
        }
    }, [searchBoxState])



    return (

        <section className={styles.container}>

            <h1>Lista de productos</h1>

            <SearchBox 
                searchBoxState={searchBoxState}
                setSearchBoxState={setSearchBoxState}
            />

            <TablaProductos
                searchBoxState={searchBoxState}
                listaProductos={listaProductos}
            />
            
        </section>
        
    )
}

export default ListaProductos