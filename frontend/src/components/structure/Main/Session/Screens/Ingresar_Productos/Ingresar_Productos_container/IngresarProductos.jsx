import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiArrowGoBackFill } from 'react-icons/ri';
import FormularioReutilizable from '../../../../../../reusable/FormularioReutilizable/FormularioReutilizable';
import FormInput from '../../../../../../reusable/FormInput/FormInput';
import PrecioInput from '../../../../../../reusable/PrecioInput/PrecioInput';
import FetchStatusText from '../../../../../../reusable/FetchStatusText/FetchStatusText';
import Autosugerencias_productoFormulario from '../../../../../../reusable/AutosugerenciasFormulario/Autosugerencias_productoFormulario/Autosugerencias_productoFormulario';
import Autosugerencias_marcaFormulario from '../../../../../../reusable/AutosugerenciasFormulario/Autosugerencias_marcaFormulario/Autosugerencias_marcaFormulario';
import Autosugerencias_proveedorFormulario from '../../../../../../reusable/AutosugerenciasFormulario/Autosugerencias_proveedorFormulario/Autosugerencias_proveedorFormulario';
import Autosugerencias_cantidadFormulario from '../../../../../../reusable/AutosugerenciasFormulario/Autosugerencias_cantidadFormulario/Autosugerencias_cantidadFormulario';
import Autosugerencias_precioFormulario from '../../../../../../reusable/AutosugerenciasFormulario/Autosugerencias_precioFormulario/Autosugerencias_precioFormulario';
import useActivarAutosugerencia from '../../../../../../../hooks/activarAutosugerencia/useActivarAutosugerencia';
import useCalcularPrecioTotal from '../../../../../../../hooks/calcularPrecioTotal/useCalcularPrecoTotal';
import formatPrice from '../../../../../../../utils/format_prices/formatPrices';
import { FETCH_STATUS, SESSION_SCREENS, URL_INGRESAR_PRODUCTOS } from '../../../../../../../config/config';
import styles from './IngresarProductos.module.css';

function IngresarProductos({
  setSessionScreen,
  productoAIngresar,
  compraFetchStatus,
  setCompraFetchStatus,
  setPopupSessionExpired,
  setHacerFetch,
  listaProductos,
  historialProductos,
}) {
  const { t } = useTranslation();
  const [hayPrecioUnitario, setHayPrecioUnitario] = useState(true);
  const [total, setTotal] = useState(0);
  const [calcularTotal, setCalcularTotal] = useState(true);

  useEffect(() => {
    if (productoAIngresar !== null) {
      document.getElementById('cantidad')?.focus();
    } else {
      document.getElementById('producto')?.focus();
    }
  }, [productoAIngresar]);

  useEffect(() => {
    if (compraFetchStatus.status === FETCH_STATUS.SUCCESS) {
      setSessionScreen(SESSION_SCREENS.RESUMEN_PRODUCTO);
      setHacerFetch(true);
    }
  }, [compraFetchStatus, setHacerFetch, setSessionScreen]);

  useCalcularPrecioTotal(calcularTotal, setCalcularTotal, hayPrecioUnitario, setTotal, 'cantidad', 'inputPrecioUnitarioCompra');

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
  useActivarAutosugerencia('inputPrecioUnitarioCompra', setPrecioSearchString, setPrecioInputActivo);

  const [proveedorSearchString, setProveedorSearchString] = useState('');
  const [proveedorInputActivo, setProveedorInputActivo] = useState(false);
  useActivarAutosugerencia('proveedor', setProveedorSearchString, setProveedorInputActivo);

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <button type="button" className={styles.backButton} onClick={() => setSessionScreen(SESSION_SCREENS.RESUMEN_PRODUCTO)}>
          <RiArrowGoBackFill /> {t('workspace.inbound.back') || 'Volver'}
        </button>
        <div>
          <p className={styles.label}>{t('workspace.inbound.subtitle') || 'Nueva entrada de inventario'}</p>
          <h1 className={styles.title}>{t('workspace.inbound.title') || 'Registrar compra'}</h1>
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.summaryBlock}>
          <span>{t('workspace.inbound.totalEstimation') || 'Costo estimado'}</span>
          <strong>${formatPrice(total)}</strong>
        </div>

        <section className={styles.formSection}>
          <FormularioReutilizable
            hayPrecioUnitario={hayPrecioUnitario}
            setPopupSessionExpired={setPopupSessionExpired}
            fetchStatus={compraFetchStatus}
            setFetchStatus={setCompraFetchStatus}
            submitMessage={t('workspace.inbound.submitMessage') || 'Ingresando producto...'}
            fetchURL={URL_INGRESAR_PRODUCTOS}
            formInputs={
              <>
                <div className={styles.completeInputContainer}>
                  <FormInput
                    idInput="producto"
                    type="text"
                    texto={t('workspace.inbound.productName') || 'Nombre del producto'}
                    required="true"
                    value={productoAIngresar?.producto}
                  />
                  <Autosugerencias_productoFormulario
                    productoSearchString={productoSearchString}
                    setProductoSearchString={setProductoSearchString}
                    productoInputActivo={productoInputActivo}
                    setProductoInputActivo={setProductoInputActivo}
                    listaProductos={listaProductos}
                  />
                </div>

                <div className={styles.completeInputContainer}>
                  <FormInput
                    idInput="marca"
                    type="text"
                    texto={t('workspace.inbound.brand') || 'Marca'}
                    required="true"
                    value={productoAIngresar?.marca}
                  />
                  <Autosugerencias_marcaFormulario
                    productoSearchString={productoSearchString}
                    marcaSearchString={marcaSearchString}
                    setMarcaSearchString={setMarcaSearchString}
                    marcaInputActivo={marcaInputActivo}
                    setMarcaInputActivo={setMarcaInputActivo}
                    listaProductos={listaProductos}
                  />
                </div>

                <div className={styles.completeInputContainer}>
                  <FormInput
                    idInput="cantidad"
                    type="number"
                    texto={t('workspace.inbound.quantity') || 'Cantidad'}
                    min="1"
                    max="9999"
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
                    historialProductos={historialProductos}
                    inputId="inputPrecioUnitarioCompra"
                    setCalcularTotal={setCalcularTotal}
                  />
                </div>

                <div className={styles.completeInputContainer}>
                  <PrecioInput
                    required="true"
                    idInputPrecioUnitario="inputPrecioUnitarioCompra"
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
                    historialProductos={historialProductos}
                    inputId="inputPrecioUnitarioCompra"
                    setCalcularTotal={setCalcularTotal}
                  />
                </div>

                <div className={styles.completeInputContainer}>
                  <FormInput
                    idInput="proveedor"
                    type="text"
                    texto={t('workspace.inbound.supplier') || 'Proveedor'}
                    required="true"
                  />
                  <Autosugerencias_proveedorFormulario
                    proveedorInputActivo={proveedorInputActivo}
                    setProveedorInputActivo={setProveedorInputActivo}
                    proveedorSearchString={proveedorSearchString}
                    setProveedorSearchString={setProveedorSearchString}
                    historialProductos={historialProductos}
                  />
                </div>
              </>
            }
          />

          <FetchStatusText fetchStatus={compraFetchStatus} />
        </section>
      </div>
    </div>
  );
}

export default IngresarProductos;
