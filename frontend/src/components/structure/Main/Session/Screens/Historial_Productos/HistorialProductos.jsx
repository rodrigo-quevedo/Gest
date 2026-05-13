import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchBox_busquedaLocal from '../../../../../reusable/SearchBox_busquedaLocal/SearchBox_busquedaLocal';
import TablaReutilizable from '../../../../../reusable/TablaReutilizable/TablaReutilizable';
import PanelSection from '../../../../../reusable/workspace/PanelSection';
import { SEARCHBOX_STATE } from '../../../../../../config/config';
import formatDate from '../../../../../../utils/format_date/format_date';
import formatTime from '../../../../../../utils/format_date/format_time';
import formatPrice from '../../../../../../utils/format_prices/formatPrices';
import styles from './HistorialProductos.module.css';

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

function HistorialProductos({ historialProductos = [], listaProductos = [] }) {
  const { t } = useTranslation();
  const [searchBoxState, setSearchBoxState] = useState(SEARCHBOX_STATE.DEFAULT);
  const [arrayResultado, setArrayResultado] = useState(historialProductos);

  useEffect(() => {
    setArrayResultado(historialProductos);
  }, [historialProductos]);

  const totalSpent = useMemo(
    () => sumMoney(historialProductos, 'precio_unitario', 'cantidad'),
    [historialProductos]
  );
  const supplierCount = useMemo(
    () => new Set(historialProductos.map((item) => item.proveedor).filter(Boolean)).size,
    [historialProductos]
  );
  const recentCount = Math.min(historialProductos.length, 10);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{t('workspace.acquisitions.title') || 'Historial de adquisiciones'}</h1>
          <p className={styles.subtitle}>
            {t('workspace.acquisitions.subtitle') || 'Registros de compras y entradas de inventario con detalles de proveedor y costo.'}
          </p>
        </div>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <p>{t('workspace.acquisitions.summary.total') || 'Total gastado'}</p>
          <strong>${formatPrice(totalSpent)}</strong>
        </div>
        <div className={styles.statCard}>
          <p>{t('workspace.acquisitions.summary.entries') || 'Entradas registradas'}</p>
          <strong>{historialProductos.length}</strong>
        </div>
        <div className={styles.statCard}>
          <p>{t('workspace.acquisitions.summary.suppliers') || 'Proveedores únicos'}</p>
          <strong>{supplierCount}</strong>
        </div>
      </div>

      <PanelSection
        title={t('workspace.acquisitions.section.history') || 'Entradas recientes'}
        description={t('workspace.acquisitions.section.historyDesc') || `Mostrando los ${recentCount} registros más recientes.`}
      >
        <div className={styles.searchWrapper}>
          <SearchBox_busquedaLocal
            searchBoxState={searchBoxState}
            setSearchBoxState={setSearchBoxState}
            array={historialProductos}
            setArrayResultado={setArrayResultado}
            listaProductos={listaProductos}
          />
        </div>

        <div className={styles.tableWrapper}>
          <TablaReutilizable
            searchBoxState={searchBoxState}
            arrayState={arrayResultado}
            tableHeaders={
              <tr>
                <th>{t('workspace.acquisitions.col.product') || 'Producto'}</th>
                <th>{t('workspace.acquisitions.col.qty') || 'Cantidad'}</th>
                <th>{t('workspace.acquisitions.col.unitCost') || 'Costo unitario'}</th>
                <th>{t('workspace.acquisitions.col.totalCost') || 'Total gastado'}</th>
                <th>{t('workspace.acquisitions.col.brand') || 'Marca'}</th>
                <th>{t('workspace.acquisitions.col.supplier') || 'Proveedor'}</th>
                <th>{t('workspace.acquisitions.col.date') || 'Fecha'}</th>
                <th>{t('workspace.acquisitions.col.time') || 'Hora'}</th>
              </tr>
            }
            mapCallback={(item) => (
              <tr key={item.id || `${item.producto}-${item.marca}-${item.fechaHora}`}>
                <td>{item.producto}</td>
                <td>{item.cantidad}</td>
                <td>${formatPrice(item.precio_unitario)}</td>
                <td>${formatPrice(Number(item.precio_unitario) * Number(item.cantidad))}</td>
                <td>{item.marca}</td>
                <td>{item.proveedor}</td>
                <td>{formatDate(new Date(item.fechaHora))}</td>
                <td>{formatTime(new Date(item.fechaHora))}</td>
              </tr>
            )}
          />
        </div>
      </PanelSection>
    </div>
  );
}

export default HistorialProductos;
