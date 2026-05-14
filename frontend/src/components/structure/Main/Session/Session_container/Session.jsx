import { useState, useEffect } from 'react';
import styles from './Session.module.css';

import WorkspaceLayout from '../../../Workspace/WorkspaceLayout';
import WorkspaceSurface from '../../../Workspace/WorkspaceSurface';
import HomeDashboard from '../Screens/HomeDashboard/HomeDashboard';
import ListaProductos from '../Screens/Lista_Productos/ListaProductos';
import IngresarProductos from '../Screens/Ingresar_Productos/Ingresar_Productos_container/IngresarProductos';
import HistorialProductos from '../Screens/Historial_Productos/HistorialProductos';
import RegistrarVentas from '../Screens/Registrar_Ventas/RegistrarVentas';
import HistorialVentas from '../Screens/Historial_Ventas/HistorialVentas';
import Resumen_Producto from '../Screens/Resumen_Producto/Resumen_Producto';

import { SESSION_SCREENS } from '../../../../../config/config';
import { FETCH_STATUS } from '../../../../../config/config';
import { useSessionData } from '../../../../../context/SessionDataContext';

function Session({ language, setLanguage }) {
  const {
    listaProductos,
    historialProductos,
    historialVentas,
    searchBoxState,
    setSearchBoxState,
    refetchSessionInventory,
    setPopupSessionExpired,
  } = useSessionData();

  const triggerRefetchAfterMutation = (flag) => {
    if (flag) refetchSessionInventory();
  };

  const [sessionScreen, setSessionScreen] = useState(SESSION_SCREENS.HOME_DASHBOARD);

  const [productoAIngresar, setProductoAIngresar] = useState(null);
  const [productoAVender, setProductoAVender] = useState(null);

  const [compraVentaFetchStatus, setCompraVentaFetchStatus] = useState({
    status: FETCH_STATUS.DEFAULT,
  });

  useEffect(() => {
    if (sessionScreen === SESSION_SCREENS.REGISTRAR_VENTAS && productoAVender == null) {
      setProductoAVender({ producto: '', marca: '' });
    }
  }, [sessionScreen, productoAVender]);

  function renderScreen() {
    switch (sessionScreen) {
      case SESSION_SCREENS.HOME_DASHBOARD:
        return (
          <HomeDashboard
            setSessionScreen={setSessionScreen}
            listaProductos={listaProductos}
            historialProductos={historialProductos}
            historialVentas={historialVentas}
          />
        );

      case SESSION_SCREENS.RESUMEN_PRODUCTO:
        return (
          <WorkspaceSurface>
            <Resumen_Producto
              setSessionScreen={setSessionScreen}
              searchBoxState={searchBoxState}
              setSearchBoxState={setSearchBoxState}
              listaProductos={listaProductos}
              historialProductos={historialProductos}
              historialVentas={historialVentas}
              setProductoAIngresar={setProductoAIngresar}
              setProductoAVender={setProductoAVender}
              compraVentaFetchStatus={compraVentaFetchStatus}
              setCompraVentaFetchStatus={setCompraVentaFetchStatus}
            />
          </WorkspaceSurface>
        );

      case SESSION_SCREENS.LISTA_PRODUCTOS:
        return (
          <WorkspaceSurface>
            <ListaProductos listaProductos={listaProductos} tableSearchBoxState={searchBoxState} />
          </WorkspaceSurface>
        );

      case SESSION_SCREENS.INGRESAR_PRODUCTOS:
        return (
          <WorkspaceSurface>
            <IngresarProductos
              setSessionScreen={setSessionScreen}
              productoAIngresar={productoAIngresar}
              compraFetchStatus={compraVentaFetchStatus}
              setCompraFetchStatus={setCompraVentaFetchStatus}
              setPopupSessionExpired={setPopupSessionExpired}
              setHacerFetch={triggerRefetchAfterMutation}
              listaProductos={listaProductos}
              historialProductos={historialProductos}
            />
          </WorkspaceSurface>
        );

      case SESSION_SCREENS.HISTORIAL_PRODUCTOS:
        return (
          <WorkspaceSurface>
            <HistorialProductos historialProductos={historialProductos} listaProductos={listaProductos} />
          </WorkspaceSurface>
        );

      case SESSION_SCREENS.REGISTRAR_VENTAS:
        return (
          <WorkspaceSurface>
            <RegistrarVentas
              setSessionScreen={setSessionScreen}
              productoAVender={productoAVender}
              ventaFetchStatus={compraVentaFetchStatus}
              setVentaFetchStatus={setCompraVentaFetchStatus}
              historialVentas={historialVentas}
              listaProductos={listaProductos}
              setPopupSessionExpired={setPopupSessionExpired}
              setHacerFetch={triggerRefetchAfterMutation}
            />
          </WorkspaceSurface>
        );

      case SESSION_SCREENS.HISTORIAL_VENTAS:
        return (
          <WorkspaceSurface>
            <HistorialVentas HistorialVentas={historialVentas} listaProductos={listaProductos} />
          </WorkspaceSurface>
        );

      default:
        return (
          <HomeDashboard
            setSessionScreen={setSessionScreen}
            listaProductos={listaProductos}
            historialProductos={historialProductos}
            historialVentas={historialVentas}
          />
        );
    }
  }

  return (
    <div className={styles.sessionContainer}>
      <WorkspaceLayout
        sessionScreen={sessionScreen}
        setSessionScreen={setSessionScreen}
        searchBoxState={searchBoxState}
        language={language}
        setLanguage={setLanguage}
      >
        {renderScreen()}
      </WorkspaceLayout>
    </div>
  );
}

export default Session;
