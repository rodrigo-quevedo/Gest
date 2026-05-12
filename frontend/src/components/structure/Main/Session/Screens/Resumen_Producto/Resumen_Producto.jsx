import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchBox_resumen from '../../../../../reusable/SearchBox_resumen/SearchBox_resumen';
import PanelSection from '../../../../../reusable/workspace/PanelSection';
import { SEARCHBOX_STATE, SESSION_SCREENS } from '../../../../../../config/config';
import formatPrice from '../../../../../../utils/format_prices/formatPrices';
import styles from './Resumen_Producto.module.css';

function sumMoney(rows, priceKey, qtyKey) {
  return rows.reduce((acc, row) => {
    const price = Number(row[priceKey]);
    const qty = Number(row[qtyKey]);
    if (Number.isFinite(price) && Number.isFinite(qty)) {
      return acc + price * qty;
    }
    return acc;
  }, 0);
}

function Resumen_Producto({
  setSessionScreen,
  searchBoxState,
  setSearchBoxState,
  listaProductos = [],
  historialProductos = [],
  historialVentas = [],
  setProductoAIngresar,
  setProductoAVender,
  compraVentaFetchStatus,
  setCompraVentaFetchStatus,
}) {
  const { t } = useTranslation();
  const [listaProductosResult, setListaProductosResult] = useState(listaProductos);
  const [historialProductosResult, setHistorialProductosResult] = useState(historialProductos);
  const [historialVentasResult, setHistorialVentasResult] = useState(historialVentas);
  const [marcaSelected, setMarcaSelected] = useState(null);

  useEffect(() => {
    if (searchBoxState === SEARCHBOX_STATE.FETCH_SUCCESS) {
      document.getElementById('searchBoxForm')?.requestSubmit();
      setSearchBoxState(SEARCHBOX_STATE.DEFAULT);
    }
  }, [searchBoxState, setSearchBoxState]);

  useEffect(() => {
    setListaProductosResult(listaProductos);
    setHistorialProductosResult(historialProductos);
    setHistorialVentasResult(historialVentas);
  }, [listaProductos, historialProductos, historialVentas]);

  useEffect(() => {
    document.title = 'Resumen';
  }, []);

  const inventoryValue = useMemo(
    () => sumMoney(listaProductosResult, 'precio_unitario', 'cantidad'),
    [listaProductosResult]
  );
  const totalSpent = useMemo(
    () => sumMoney(historialProductosResult, 'precio_unitario', 'cantidad'),
    [historialProductosResult]
  );
  const totalRevenue = useMemo(
    () => sumMoney(historialVentasResult, 'precio_unitario', 'cantidad'),
    [historialVentasResult]
  );
  const grossProfit = totalRevenue - totalSpent;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{t('workspace.summary.title') || 'Resumen del inventario'}</h1>
          <p className={styles.subtitle}>
            {t('workspace.summary.subtitle') || 'Mira la salud del inventario, ingresos y compras en un solo lugar.'}
          </p>
        </div>
        <div className={styles.actions}> 
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => setSessionScreen(SESSION_SCREENS.INGRESAR_PRODUCTOS)}
          >
            {t('workspace.summary.actionInbound') || 'Nueva entrada'}
          </button>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => setSessionScreen(SESSION_SCREENS.REGISTRAR_VENTAS)}
          >
            {t('workspace.summary.actionSale') || 'Registrar venta'}
          </button>
        </div>
      </header>

      <section className={styles.metricGrid}>
        <div className={styles.metricCard}>
          <span>{t('workspace.summary.metric.inventoryValue') || 'Valor del inventario'}</span>
          <strong>${formatPrice(inventoryValue)}</strong>
        </div>
        <div className={styles.metricCard}>
          <span>{t('workspace.summary.metric.spend') || 'Total gastado'}</span>
          <strong>${formatPrice(totalSpent)}</strong>
        </div>
        <div className={styles.metricCard}>
          <span>{t('workspace.summary.metric.revenue') || 'Total ventas'}</span>
          <strong>${formatPrice(totalRevenue)}</strong>
        </div>
        <div className={styles.metricCard}>
          <span>{t('workspace.summary.metric.grossProfit') || 'Ganancia bruta'}</span>
          <strong className={grossProfit >= 0 ? styles.positive : styles.negative}>
            ${formatPrice(grossProfit)}
          </strong>
        </div>
      </section>

      <section className={styles.searchSection}>
        <div className={styles.searchHeader}>
          <div>
            <h2>{t('workspace.summary.searchTitle') || 'Explorar datos'}</h2>
            <p>{t('workspace.summary.searchLead') || 'Filtra por producto o marca para ajustar el resumen.'}</p>
          </div>
          {marcaSelected ? (
            <span className={styles.filterTag}>{marcaSelected}</span>
          ) : null}
        </div>

        <SearchBox_resumen
          searchBoxState={searchBoxState}
          setSearchBoxState={setSearchBoxState}
          listaProductos={listaProductos}
          historialProductos={historialProductos}
          historialVentas={historialVentas}
          setListaProductosResult={setListaProductosResult}
          setHistorialProductosResult={setHistorialProductosResult}
          setHistorialVentasResult={setHistorialVentasResult}
          marcaSelected={marcaSelected}
          setMarcaSelected={setMarcaSelected}
        />
      </section>

      <div className={styles.panels}>
        <PanelSection
          title={t('workspace.summary.panel.inbound') || 'Compras recientes'}
          description={t('workspace.summary.panel.inboundDesc') || 'Visualiza los movimientos de inventario más recientes.'}
          actionLabel={t('workspace.summary.panel.goInbound') || 'Agregar compra'}
          onAction={() => setSessionScreen(SESSION_SCREENS.INGRESAR_PRODUCTOS)}
        >
          <div className={styles.summaryText}>
            {t('workspace.summary.panel.inboundSummary') || `Entradas filtradas: ${historialProductosResult.length}`}
          </div>
        </PanelSection>

        <PanelSection
          title={t('workspace.summary.panel.sales') || 'Ventas recientes'}
          description={t('workspace.summary.panel.salesDesc') || 'Consulta los ingresos registrados en el periodo.'}
          actionLabel={t('workspace.summary.panel.goSales') || 'Ver historial'}
          onAction={() => setSessionScreen(SESSION_SCREENS.HISTORIAL_VENTAS)}
        >
          <div className={styles.summaryText}>
            {t('workspace.summary.panel.salesSummary') || `Ventas filtradas: ${historialVentasResult.length}`}
          </div>
        </PanelSection>
      </div>
    </div>
  );
}

export default Resumen_Producto;
