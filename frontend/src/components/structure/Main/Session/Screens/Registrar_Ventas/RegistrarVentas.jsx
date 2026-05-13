import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiArrowGoBackFill } from 'react-icons/ri';
import FormularioReutilizable from '../../../../../reusable/FormularioReutilizable/FormularioReutilizable';
import FormInput from '../../../../../reusable/FormInput/FormInput';
import PrecioInput from '../../../../../reusable/PrecioInput/PrecioInput';
import FetchStatusText from '../../../../../reusable/FetchStatusText/FetchStatusText';
import Autosugerencias_cantidadFormulario from '../../../../../reusable/AutosugerenciasFormulario/Autosugerencias_cantidadFormulario/Autosugerencias_cantidadFormulario';
import Autosugerencias_precioFormulario from '../../../../../reusable/AutosugerenciasFormulario/Autosugerencias_precioFormulario/Autosugerencias_precioFormulario';
import useActivarAutosugerencia from '../../../../../../hooks/activarAutosugerencia/useActivarAutosugerencia';
import useCalcularPrecioTotal from '../../../../../../hooks/calcularPrecioTotal/useCalcularPrecoTotal';
import formatPrice from '../../../../../../utils/format_prices/formatPrices';
import { FETCH_STATUS, SESSION_SCREENS, URL_REGISTRAR_VENTAS } from '../../../../../../config/config';
import styles from './RegistrarVentas.module.css';

function RegistrarVentas({
  setSessionScreen,
  productoAVender,
  ventaFetchStatus,
  setVentaFetchStatus,
  historialVentas,
  listaProductos,
  setPopupSessionExpired,
  setHacerFetch,
}) {
  const { t } = useTranslation();
  const [hayPrecioUnitario, setHayPrecioUnitario] = useState(true);
  const [total, setTotal] = useState(0);
  const [calcularTotal, setCalcularTotal] = useState(true);

  useEffect(() => {
    document.getElementById('cantidad')?.focus();
  }, []);

  useEffect(() => {
    if (ventaFetchStatus.status === FETCH_STATUS.SUCCESS) {
      setSessionScreen(SESSION_SCREENS.RESUMEN_PRODUCTO);
      setHacerFetch(true);
    }
  }, [ventaFetchStatus, setHacerFetch, setSessionScreen]);

  useCalcularPrecioTotal(calcularTotal, setCalcularTotal, hayPrecioUnitario, setTotal, 'cantidad', 'inputPrecioUnitarioVenta');

  const [productoSearchString, setProductoSearchString] = useState('');
  const [productoInputActivo, setProductoInputActivo] = useState(false);
  useActivarAutosugerencia('producto', setProductoSearchString, setProductoInputActivo);

  const [marcaSearchString, setMarcaSearchString] = useState('');
  const [marcaInputActivo, setMarcaInputActivo] = useState(false);
  useActivarAutosugerencia('marca', setMarcaSearchString, setMarcaInputActivo);

  const [cantidadSearchString, setCantidadSearchString] = useState('');
  const [cantidadInputActivo, setCantidadInputActivo] = useState(false);
  useActivarAutosugerencia('cantidad', setCantidadSearchString, setCantidadInputActivo);

  const [precioSearchString, setPrecioSearchString] = useState('');
  const [precioInputActivo, setPrecioInputActivo] = useState(false);
  useActivarAutosugerencia('inputPrecioUnitarioVenta', setPrecioSearchString, setPrecioInputActivo);

  const currentStock = productoAVender?.producto && productoAVender?.marca
    ? listaProductos.find((item) =>
        item.producto?.toUpperCase() === productoAVender.producto?.toUpperCase() &&
        item.marca?.toUpperCase() === productoAVender.marca?.toUpperCase()
      )?.cantidad
    : undefined;

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <button type="button" className={styles.backButton} onClick={() => setSessionScreen(SESSION_SCREENS.RESUMEN_PRODUCTO)}>
          <RiArrowGoBackFill /> {t('workspace.sales.back') || 'Volver'}
        </button>
        <div>
          <p className={styles.label}>{t('workspace.sales.subtitle') || 'Registrar una nueva venta'}</p>
          <h1 className={styles.title}>{t('workspace.sales.title') || 'Nueva venta'}</h1>
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.statusInfo}>
          <p>{t('workspace.sales.availableStock') || 'Cantidad disponible'}</p>
          <strong>{currentStock ?? '—'}</strong>
        </div>

        <div className={styles.summaryBlock}>
          <span>{t('workspace.sales.totalEstimation') || 'Monto total'}</span>
          <strong>${formatPrice(total)}</strong>
        </div>

        <section className={styles.formSection}>
          <FormularioReutilizable
            hayPrecioUnitario={hayPrecioUnitario}
            setPopupSessionExpired={setPopupSessionExpired}
            fetchStatus={ventaFetchStatus}
            setFetchStatus={setVentaFetchStatus}
            submitMessage={t('workspace.sales.submitMessage') || 'Registrando venta...'}
            fetchURL={URL_REGISTRAR_VENTAS}
            formInputs={
              <>
                <FormInput
                  idInput="producto"
                  type="text"
                  texto={t('workspace.sales.productName') || 'Nombre del producto'}
                  required="true"
                  value={productoAVender?.producto}
                />
                <FormInput
                  idInput="marca"
                  type="text"
                  texto={t('workspace.sales.brand') || 'Marca'}
                  required="true"
                  value={productoAVender?.marca}
                />
                <div className={styles.completeInputContainer}>
                  <FormInput
                    idInput="cantidad"
                    type="number"
                    texto={t('workspace.sales.quantity') || 'Cantidad'}
                    min="1"
                    max={`${currentStock ?? 9999}`}
                    esPrecio="false"
                    required="true"
                  />
                  <Autosugerencias_cantidadFormulario
                    productoSearchString={productoSearchString}
                    cantidadInputActivo={cantidadInputActivo}
                    setCantidadInputActivo={setCantidadInputActivo}
                    cantidadSearchString={cantidadSearchString}
                    setCantidadSearchString={setCantidadSearchString}
                    listaProductos={listaProductos}
                    historialProductos={historialVentas}
                    setCalcularTotal={setCalcularTotal}
                  />
                </div>
                <div className={styles.completeInputContainer}>
                  <PrecioInput
                    required="true"
                    idInputPrecioUnitario="inputPrecioUnitarioVenta"
                    name="precio_unitario"
                    min="0.01"
                    max="999999999"
                    hayPrecioUnitario={hayPrecioUnitario}
                    setHayPrecioUnitario={setHayPrecioUnitario}
                  />
                  <Autosugerencias_precioFormulario
                    productoSearchString={productoSearchString}
                    precioInputActivo={precioInputActivo}
                    setPrecioInputActivo={setPrecioInputActivo}
                    precioSearchString={precioSearchString}
                    setPrecioSearchString={setPrecioSearchString}
                    listaProductos={listaProductos}
                    historialProductos={historialVentas}
                    inputId="inputPrecioUnitarioVenta"
                    setCalcularTotal={setCalcularTotal}
                  />
                </div>
              </>
            }
          />
          <FetchStatusText fetchStatus={ventaFetchStatus} />
        </section>
      </div>
    </div>
  );
}

export default RegistrarVentas;
