import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PanelSection from '../../../../../reusable/workspace/PanelSection';
import formatPrice from '../../../../../../utils/format_prices/formatPrices';
import styles from './ListaProductos.module.css';

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

function ListaProductos({ listaProductos = [], tableSearchBoxState }) {
  const { t } = useTranslation();

  const totalProducts = listaProductos.length;
  const inventoryValue = useMemo(
    () => sumMoney(listaProductos, 'precio_unitario', 'cantidad'),
    [listaProductos]
  );
  const lowStock = useMemo(
    () => listaProductos.filter((item) => Number(item.cantidad) < 5),
    [listaProductos]
  );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{t('workspace.products.title') || 'Catálogo de productos'}</h1>
          <p className={styles.subtitle}>Lista de inventario con estado de stock, proveedor y valores principales.</p>
        </div>
      </header>

      <div className={styles.overviewGrid}>
        <div className={styles.summaryCard}>
          <p className={styles.summaryLabel}>{t('workspace.products.summary.count') || 'Productos totales'}</p>
          <span className={styles.summaryValue}>{totalProducts}</span>
        </div>
        <div className={styles.summaryCard}>
          <p className={styles.summaryLabel}>{t('workspace.products.summary.value') || 'Valor total inventario'}</p>
          <span className={styles.summaryValue}>${formatPrice(inventoryValue)}</span>
        </div>
        <div className={styles.summaryCard}>
          <p className={styles.summaryLabel}>{t('workspace.products.summary.lowStock') || 'Bajo stock'}</p>
          <span className={styles.summaryValue}>{lowStock.length}</span>
        </div>
      </div>

      <PanelSection
        title={t('workspace.products.section.products') || 'Inventario completo'}
        description={
          t('workspace.products.section.productsDesc') ||
          'Revisa precios unitarios, cantidades y origen de cada producto.'
        }
      >
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t('workspace.products.col.product') || 'Producto'}</th>
                <th>{t('workspace.products.col.brand') || 'Marca'}</th>
                <th>{t('workspace.products.col.supplier') || 'Proveedor'}</th>
                <th>{t('workspace.products.col.qty') || 'Cantidad'}</th>
                <th>{t('workspace.products.col.unitCost') || 'Costo unitario'}</th>
                <th>{t('workspace.products.col.totalCost') || 'Valor total'}</th>
                <th>{t('workspace.products.col.status') || 'Estado'}</th>
              </tr>
            </thead>
            <tbody>
              {listaProductos.map((item) => {
                const total = Number(item.precio_unitario) * Number(item.cantidad);
                const isLow = Number(item.cantidad) < 5;
                return (
                  <tr key={item.id || `${item.producto}-${item.marca}-${item.proveedor}`}> 
                    <td>{item.producto}</td>
                    <td>{item.marca}</td>
                    <td>{item.proveedor}</td>
                    <td>{item.cantidad}</td>
                    <td>${formatPrice(item.precio_unitario)}</td>
                    <td>${formatPrice(total)}</td>
                    <td>
                      <span className={`${styles.statusPill} ${isLow ? styles.statusAlert : styles.statusOk}`}>
                        {isLow ? t('workspace.products.status.low') || 'Bajo stock' : t('workspace.products.status.ok') || 'Suficiente'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </PanelSection>

      {tableSearchBoxState === 'SUBMIT' && (
        <div className={styles.loadingBanner}>{t('workspace.products.loading') || 'Cargando resultados...'}</div>
      )}
    </div>
  );
}

export default ListaProductos;
