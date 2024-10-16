import Authentication from '../Authentication/Authentication_container/Authentication'
import Session from '../Session/Session_container/Session'

function Main (
    {
        isAuth, setIsAuth, 
        authenticationScreen, 
        sessionScreen, setSessionScreen
    }
) {

    //Sobre la navbar de Session:
    //Session puede manejar autónomamente el state "screens" porque el navbar que utiliza para cambiar "screen" está dentro de sí mismo.
    //Por otro lado, Authentication depende de Header para cambiar el state (Login/Registrarse), porque ese navbar está en otro componente (Header).

    return (
        <main>

            {/* elegir entre login screens o session screens: */}
            {isAuth ?

                <Session 
                    //elegir la session screen [ListaProductos/IngresarProductos/HistorialProductos/RegistrarVentas/HistorialVentas]:
                    sessionScreen={sessionScreen}

                    //setear la session screen [ListaProductos/IngresarProductos/HistorialProductos/RegistrarVentas/HistorialVentas] al hacer click en un botón de la navbar de Session:
                    setSessionScreen={setSessionScreen}
                /> 
                
            : 

                <Authentication
                    //ingresar a la sesión con una cuenta, en la screen Ingresar: setIsAuth(true)
                    setIsAuth={setIsAuth}
                    
                    //elegir la authentication screen [Ingresar/Registrarse]:
                    authenticationScreen={authenticationScreen}
                />

            }

        </main>
    )
}

export default Main