import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchBox_busquedaLocal from '../../../../../reusable/SearchBox_busquedaLocal/SearchBox_busquedaLocal';
import TablaReutilizable from '../../../../../reusable/TablaReutilizable/TablaReutilizable';
import PanelSection from '../../../../../reusable/workspace/PanelSection';
import { SEARCHBOX_STATE } from '../../../../../../config/config';
import formatDate from '../../../../../../utils/format_date/format_date';
import formatTime from '../../../../../../utils/format_date/format_time';
import formatPrice from '../../../../../../utils/format_prices/formatPrices';
import styles from './HistorialVentas.module.css';

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

function HistorialVentas({ HistorialVentas = [], listaProductos = [] }) {
  const { t } = useTranslation();
  const [searchBoxState, setSearchBoxState] = useState(SEARCHBOX_STATE.DEFAULT);
  const [arrayResultado, setArrayResultado] = useState(HistorialVentas);

  useEffect(() => {
    setArrayResultado(HistorialVentas);
  }, [HistorialVentas]);

  const totalRevenue = useMemo(
    () => sumMoney(HistorialVentas, 'precio_unitario', 'cantidad'),
    [HistorialVentas]
  );
  const saleCount = HistorialVentas.length;
  const averageSale = saleCount > 0 ? totalRevenue / saleCount : 0;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{t('workspace.sales.title') || 'Historial de ventas'}</h1>
          <p className={styles.subtitle}>
            {t('workspace.sales.subtitle') || 'Revisa ingresos, marcas y fechas de los pedidos registrados.'}
          </p>
        </div>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <p>{t('workspace.sales.summary.total') || 'Ingresos totales'}</p>
          <strong>${formatPrice(totalRevenue)}</strong>
        </div>
        <div className={styles.statCard}>
          <p>{t('workspace.sales.summary.transactions') || 'Ventas registradas'}</p>
          <strong>{saleCount}</strong>
        </div>
        <div className={styles.statCard}>
          <p>{t('workspace.sales.summary.average') || 'Venta promedio'}</p>
          <strong>${formatPrice(averageSale)}</strong>
        </div>
      </div>

      <PanelSection
        title={t('workspace.sales.section.history') || 'Últimas ventas'}
        description={t('workspace.sales.section.historyDesc') || 'Filtra por producto o marca para encontrar operaciones recientes.'}
      >
        <div className={styles.searchWrapper}>
          <SearchBox_busquedaLocal
            searchBoxState={searchBoxState}
            setSearchBoxState={setSearchBoxState}
            array={HistorialVentas}
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
                <th>{t('workspace.sales.col.product') || 'Producto'}</th>
                <th>{t('workspace.sales.col.qty') || 'Cantidad'}</th>
                <th>{t('workspace.sales.col.unitPrice') || 'Precio unitario'}</th>
                <th>{t('workspace.sales.col.total') || 'Total venta'}</th>
                <th>{t('workspace.sales.col.brand') || 'Marca'}</th>
                <th>{t('workspace.sales.col.date') || 'Fecha'}</th>
                <th>{t('workspace.sales.col.time') || 'Hora'}</th>
              </tr>
            }
            mapCallback={(item) => (
              <tr key={item.id || `${item.producto}-${item.marca}-${item.fechaHora}`}>
                <td>{item.producto}</td>
                <td>{item.cantidad}</td>
                <td>${formatPrice(item.precio_unitario)}</td>
                <td>${formatPrice(Number(item.precio_unitario) * Number(item.cantidad))}</td>
                <td>{item.marca}</td>
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

export default HistorialVentas;
