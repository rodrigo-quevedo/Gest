import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SESSION_SCREENS } from '../../../../../../config/config';
import KpiCard from '../../../../../reusable/workspace/KpiCard';
import PanelSection from '../../../../../reusable/workspace/PanelSection';
import panelStyles from '../../../../../reusable/workspace/PanelSection.module.css';
import formatPrice from '../../../../../../utils/format_prices/formatPrices';
import formatDate from '../../../../../../utils/format_date/format_date';
import formatTime from '../../../../../../utils/format_date/format_time';
import styles from './HomeDashboard.module.css';

function sumMoney(rows, priceKey, qtyKey) {
  return rows.reduce((acc, row) => {
    const p = Number(row[priceKey]);
    const q = Number(row[qtyKey]);
    if (Number.isFinite(p) && Number.isFinite(q)) return acc + p * q;
    return acc;
  }, 0);
}

function HomeDashboard({
  setSessionScreen,
  listaProductos,
  historialProductos,
  historialVentas,
}) {
  const { t } = useTranslation();

  const stats = useMemo(() => {
    const revenue = sumMoney(historialVentas, 'precio_unitario', 'cantidad');
    const spent = sumMoney(historialProductos, 'precio_unitario', 'cantidad');
    const gross = revenue - spent;
    const inventoryValue = sumMoney(listaProductos, 'precio_unitario', 'cantidad');
    const lowStock = listaProductos.filter((p) => Number(p.cantidad) < 5);

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    let salesToday = 0;
    let revenueToday = 0;
    for (const v of historialVentas) {
      const d = new Date(v.fechaHora);
      if (d >= startOfToday && d <= endOfToday) {
        salesToday += 1;
        revenueToday += Number(v.precio_unitario) * Number(v.cantidad);
      }
    }

    const recentSales = [...historialVentas]
      .sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora))
      .slice(0, 8);
    const recentAcq = [...historialProductos]
      .sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora))
      .slice(0, 8);

    const trend = [];
    for (let i = 6; i >= 0; i -= 1) {
      const day = new Date();
      day.setHours(0, 0, 0, 0);
      day.setDate(day.getDate() - i);
      const next = new Date(day);
      next.setDate(next.getDate() + 1);
      let dayRev = 0;
      for (const v of historialVentas) {
        const d = new Date(v.fechaHora);
        if (d >= day && d < next) {
          dayRev += Number(v.precio_unitario) * Number(v.cantidad);
        }
      }
      trend.push({ label: formatDate(day), value: dayRev });
    }
    const maxTrend = Math.max(...trend.map((x) => x.value), 1);

    return {
      revenue,
      spent,
      gross,
      inventoryValue,
      lowStock,
      salesToday,
      revenueToday,
      recentSales,
      recentAcq,
      trend,
      maxTrend,
      productCount: listaProductos.length,
    };
  }, [listaProductos, historialProductos, historialVentas]);

  const grossVariant = stats.gross >= 0 ? 'positive' : 'negative';

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>{t('workspace.dashboard.title')}</h1>
          <p className={styles.pageMeta}>{t('workspace.dashboard.subtitle')}</p>
        </div>
        <div className={styles.pageActions}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => setSessionScreen(SESSION_SCREENS.LISTA_PRODUCTOS)}
          >
            {t('workspace.dashboard.viewCatalog')}
          </button>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => setSessionScreen(SESSION_SCREENS.REGISTRAR_VENTAS)}
          >
            {t('workspace.dashboard.ctaSale')}
          </button>
        </div>
      </header>

      <div className={styles.kpiGrid}>
        <KpiCard
          label={t('workspace.dashboard.kpi.revenue')}
          value={`$${formatPrice(stats.revenue)}`}
          context={t('workspace.dashboard.kpi.revenueHint')}
        />
        <KpiCard
          label={t('workspace.dashboard.kpi.cogs')}
          value={`$${formatPrice(stats.spent)}`}
          context={t('workspace.dashboard.kpi.cogsHint')}
        />
        <KpiCard
          label={t('workspace.dashboard.kpi.gross')}
          value={`$${formatPrice(stats.gross)}`}
          context={t('workspace.dashboard.kpi.grossHint')}
          variant={grossVariant}
        />
        <KpiCard
          label={t('workspace.dashboard.kpi.inventory')}
          value={`$${formatPrice(stats.inventoryValue)}`}
          context={t('workspace.dashboard.kpi.inventoryHint')}
        />
        <KpiCard
          label={t('workspace.dashboard.kpi.lowStock')}
          value={String(stats.lowStock.length)}
          context={t('workspace.dashboard.kpi.lowStockHint')}
          variant={stats.lowStock.length > 0 ? 'warning' : 'default'}
        />
        <KpiCard
          label={t('workspace.dashboard.kpi.salesToday')}
          value={String(stats.salesToday)}
          context={t('workspace.dashboard.kpi.salesTodayMoney', {
            amount: `$${formatPrice(stats.revenueToday)}`,
          })}
        />
      </div>

      <section className={styles.trendSection} aria-labelledby="trend-heading">
        <h2 id="trend-heading" className={styles.sectionHeading}>
          {t('workspace.dashboard.trendTitle')}
        </h2>
        <p className={styles.sectionLead}>{t('workspace.dashboard.trendLead')}</p>
        <div className={styles.trendBars} role="img" aria-label={t('workspace.dashboard.trendAria')}>
          {stats.trend.map((d) => (
            <div key={d.label} className={styles.trendCol}>
              <div className={styles.trendBarTrack}>
                <div
                  className={styles.trendBar}
                  style={{ height: `${(d.value / stats.maxTrend) * 100}%` }}
                  title={`${d.label}: $${formatPrice(d.value)}`}
                />
              </div>
              <span className={styles.trendLabel}>{d.label.split('/')[0]}</span>
            </div>
          ))}
        </div>
      </section>

      <div className={styles.panels}>
        <PanelSection
          title={t('workspace.dashboard.panel.recentSales')}
          description={t('workspace.dashboard.panel.recentSalesDesc')}
          actionLabel={t('workspace.dashboard.panel.goSales')}
          onAction={() => setSessionScreen(SESSION_SCREENS.HISTORIAL_VENTAS)}
        >
          {stats.recentSales.length === 0 ? (
            <p className={panelStyles.empty}>{t('workspace.dashboard.empty.sales')}</p>
          ) : (
            <table className={panelStyles.table}>
              <thead>
                <tr>
                  <th>{t('workspace.dashboard.col.product')}</th>
                  <th>{t('workspace.dashboard.col.amount')}</th>
                  <th>{t('workspace.dashboard.col.date')}</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentSales.map((row) => (
                  <tr key={row.id}>
                    <td>{row.producto}</td>
                    <td>${formatPrice(Number(row.precio_unitario) * Number(row.cantidad))}</td>
                    <td>
                      {formatDate(new Date(row.fechaHora))} · {formatTime(new Date(row.fechaHora))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </PanelSection>

        <PanelSection
          title={t('workspace.dashboard.panel.recentAcq')}
          description={t('workspace.dashboard.panel.recentAcqDesc')}
          actionLabel={t('workspace.dashboard.panel.goAcq')}
          onAction={() => setSessionScreen(SESSION_SCREENS.HISTORIAL_PRODUCTOS)}
        >
          {stats.recentAcq.length === 0 ? (
            <p className={panelStyles.empty}>{t('workspace.dashboard.empty.acq')}</p>
          ) : (
            <table className={panelStyles.table}>
              <thead>
                <tr>
                  <th>{t('workspace.dashboard.col.product')}</th>
                  <th>{t('workspace.dashboard.col.supplier')}</th>
                  <th>{t('workspace.dashboard.col.cost')}</th>
                  <th>{t('workspace.dashboard.col.date')}</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentAcq.map((row) => (
                  <tr key={row.id}>
                    <td>{row.producto}</td>
                    <td>{row.proveedor}</td>
                    <td>${formatPrice(Number(row.precio_unitario) * Number(row.cantidad))}</td>
                    <td>
                      {formatDate(new Date(row.fechaHora))} · {formatTime(new Date(row.fechaHora))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </PanelSection>

        <PanelSection
          title={t('workspace.dashboard.panel.alerts')}
          description={t('workspace.dashboard.panel.alertsDesc')}
          actionLabel={t('workspace.dashboard.panel.goAdd')}
          onAction={() => setSessionScreen(SESSION_SCREENS.INGRESAR_PRODUCTOS)}
        >
          {stats.lowStock.length === 0 ? (
            <p className={panelStyles.empty}>{t('workspace.dashboard.empty.alerts')}</p>
          ) : (
            <table className={panelStyles.table}>
              <thead>
                <tr>
                  <th>{t('workspace.dashboard.col.product')}</th>
                  <th>{t('workspace.dashboard.col.brand')}</th>
                  <th>{t('workspace.dashboard.col.qty')}</th>
                  <th>{t('workspace.dashboard.col.status')}</th>
                </tr>
              </thead>
              <tbody>
                {stats.lowStock.slice(0, 10).map((row) => (
                  <tr key={row.id}>
                    <td>{row.producto}</td>
                    <td>{row.marca}</td>
                    <td>{row.cantidad}</td>
                    <td>
                      <span className={panelStyles.badge}>{t('workspace.dashboard.badge.low')}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </PanelSection>
      </div>
    </div>
  );
}

export default HomeDashboard;
