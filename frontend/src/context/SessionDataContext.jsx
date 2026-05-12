import { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';

import fetchBackend from '../utils/fetchBackend/fetch_backend/fetchBackend';
import {
  SEARCHBOX_STATE,
  URL_HISTORIAL_PRODUCTOS,
  URL_HISTORIAL_VENTAS,
  URL_LISTA_PRODUCTOS,
} from '../config/config';

const SessionDataContext = createContext(null);

export function SessionDataProvider({ children, setPopupSessionExpired }) {
  const [listaProductos, setListaProductos] = useState([]);
  const [historialProductos, setHistorialProductos] = useState([]);
  const [historialVentas, setHistorialVentas] = useState([]);
  const [searchBoxState, setSearchBoxState] = useState(SEARCHBOX_STATE.DEFAULT);

  const loadSessionInventory = useCallback(() => {
    setSearchBoxState(SEARCHBOX_STATE.SUBMIT);

    fetchBackend(
      setSearchBoxState,
      URL_LISTA_PRODUCTOS,
      setListaProductos,
      { searchBoxInput: '' },
      setPopupSessionExpired,
      false
    );

    fetchBackend(
      setSearchBoxState,
      URL_HISTORIAL_PRODUCTOS,
      setHistorialProductos,
      { searchBoxInput: '' },
      setPopupSessionExpired,
      false
    );

    fetchBackend(
      setSearchBoxState,
      URL_HISTORIAL_VENTAS,
      setHistorialVentas,
      { searchBoxInput: '' },
      setPopupSessionExpired,
      true
    );
  }, [setPopupSessionExpired]);

  useEffect(() => {
    loadSessionInventory();
  }, [loadSessionInventory]);

  const value = useMemo(
    () => ({
      listaProductos,
      historialProductos,
      historialVentas,
      searchBoxState,
      setSearchBoxState,
      refetchSessionInventory: loadSessionInventory,
      setPopupSessionExpired,
    }),
    [
      listaProductos,
      historialProductos,
      historialVentas,
      searchBoxState,
      loadSessionInventory,
      setPopupSessionExpired,
    ]
  );

  return <SessionDataContext.Provider value={value}>{children}</SessionDataContext.Provider>;
}

export function useSessionData() {
  const ctx = useContext(SessionDataContext);
  if (!ctx) {
    throw new Error('useSessionData must be used within SessionDataProvider');
  }
  return ctx;
}
