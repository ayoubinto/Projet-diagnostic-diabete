import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { useEffect, useState } from "react";

/* ═══════════════════════════════════════
   CHART OPTIONS — thème cohérent
═══════════════════════════════════════ */
const BASE_OPTS = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#0f172a",
      titleFont: { family: "'Exo 2',sans-serif", size: 13, weight: "700" },
      bodyFont:  { family: "'DM Sans',sans-serif", size: 12 },
      padding: 12,
      cornerRadius: 8,
      borderColor: "rgba(255,255,255,0.06)",
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      grid: { color: "#f1f5f9", drawBorder: false },
      ticks: {
        font: { family: "'DM Sans',sans-serif", size: 12 },
        color: "#94a3b8",
      },
    },
    y: {
      grid: { color: "#f1f5f9", drawBorder: false },
      ticks: {
        font: { family: "'DM Sans',sans-serif", size: 12 },
        color: "#94a3b8",
      },
      beginAtZero: true,
    },
  },
};

const PIE_OPTS = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#0f172a",
      titleFont: { family: "'Exo 2',sans-serif", size: 13, weight: "700" },
      bodyFont:  { family: "'DM Sans',sans-serif", size: 12 },
      padding: 12,
      cornerRadius: 8,
    },
  },
};

/* ═══════════════════════════════════════
   LOADING PLACEHOLDER
═══════════════════════════════════════ */
function ChartEmpty({ icon = "📊", text = "Chargement des données…" }) {
  return (
    <div className="chart-empty">
      <div className="chart-empty-icon">{icon}</div>
      <div className="chart-empty-text">{text}</div>
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN COMPONENT
   ↓ Toute la logique back-end est inchangée
═══════════════════════════════════════ */
function Analyses({ formDiagnostic }) {

  /* ── STATE (identique à l'original) ── */
  const [nombre_dg_p,  setNombre_dg_p]  = useState(null);
  const [nombre_dg_n,  setNombre_dg_n]  = useState(null);
  const [distru,       setDistru]        = useState([]);
  const [dstru_genre,  setDstru_genre]   = useState([]);
  const [taux,         setTaux]          = useState(0);
  const [dataa,        setDataa]         = useState([]);

  /* ── EFFECTS (identiques à l'original) ── */
  useEffect(() => {
    console.log("formDiagnostics updated:", formDiagnostic);
  }, [formDiagnostic]);

  useEffect(() => {
    if (Array.isArray(formDiagnostic) && formDiagnostic.length > 0) {
      let index = 0;
      formDiagnostic.forEach((item) => {
        if (item.prediction_result === true) index++;
      });
      const tau = (index / formDiagnostic.length) * 100;
      setTaux(tau);
      const count = formDiagnostic.filter(item => item.prediction_result !== true).length;
      setNombre_dg_n(count);
      setNombre_dg_p(index);
    }
  }, [formDiagnostic]);

  useEffect(() => {
    const fetchtests = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/nombre_test', {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
        });
        if (res.ok) {
          const data = await res.json();
          setDataa(data);
          console.log(data);
        }
      } catch (e) { console.error(e); }

      try {
        const respon = await fetch('http://127.0.0.1:8000/distribution_age', {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
        });
        if (respon.ok) {
          const data = await respon.json();
          setDistru(data);
          console.log("setDistru : ", data);
        }
      } catch (e) { console.error(e); }

      try {
        const response = await fetch('http://127.0.0.1:8000/get_number_genre', {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          const data = await response.json();
          setDstru_genre(data);
          console.log("setDstru_genre : ", data);
        }
      } catch (e) { console.error(e); }
    };

    fetchtests();
  }, []);

  /* ── DATA (identique à l'original) ── */
  const data = {
    labels: ["Diabétique", "Non diabétique"],
    datasets: [{
      data: [nombre_dg_p, nombre_dg_n],
      backgroundColor: ["#dc2626", "#16a34a"],
      borderColor:     ["#b91c1c", "#15803d"],
      borderWidth: 2,
      hoverOffset: 8,
    }],
  };

  const labels    = dataa.map(item => item.mois);
  const values    = dataa.map(item => item.total);
  const label_d   = distru.map(d => d.age);
  const values_d  = distru.map(d => d.total);
  const values_gm = dstru_genre.map(d => d.N_male);
  const values_gf = dstru_genre.map(d => d.N_female);

  const data_test = {
    labels,
    datasets: [{
      label: "Diagnostics",
      data: values,
      borderColor: "#2563eb",
      backgroundColor: "rgba(37,99,235,0.08)",
      borderWidth: 2.5,
      pointBackgroundColor: "#2563eb",
      pointRadius: 4,
      pointHoverRadius: 6,
      tension: 0.4,
      fill: true,
    }],
  };

  const data_distru = {
    labels: label_d,
    datasets: [{
      label: "Distribution par âge",
      data: values_d,
      backgroundColor: "rgba(8,145,178,0.75)",
      borderColor: "#0891b2",
      borderWidth: 1.5,
      borderRadius: 5,
      borderSkipped: false,
    }],
  };

  const data_distru_g = {
    labels: ["Homme", "Femme"],
    datasets: [{
      label: "Comparaison Homme / Femme",
      data: [values_gm, values_gf],
      backgroundColor: ["rgba(37,99,235,0.8)", "rgba(190,24,93,0.8)"],
      borderColor:     ["#2563eb", "#be185d"],
      borderWidth: 1.5,
      borderRadius: 6,
      borderSkipped: false,
    }],
  };

  /* ── KPI values ── */
  const total      = (nombre_dg_p ?? 0) + (nombre_dg_n ?? 0);
  const tauxAffich = isNaN(taux) ? 0 : taux.toFixed(1);

  /* ═══════════════════════════════════════
     RENDER
  ═══════════════════════════════════════ */
  return (
    <div className="analytics-page">

      {/* ── PAGE HEADER ── */}
      <div className="analytics-header">
        <div>
          <div className="analytics-title">
            Analytics <span>& Statistiques</span>
          </div>
          <div className="analytics-sub">
            Visualisation des données · Modèle ML AyoPredict
          </div>
        </div>
      </div>

      {/* ── KPI STRIP ── */}
      <div className="kpi-strip">

        <div className="kpi-tile blue">
          <div className="kpi-tile-icon">🧪</div>
          <div className="kpi-tile-label">Total diagnostics</div>
          <div className="kpi-tile-value">{total || "—"}</div>
          <div className="kpi-tile-note">tous patients confondus</div>
        </div>

        <div className="kpi-tile red">
          <div className="kpi-tile-icon">⚠️</div>
          <div className="kpi-tile-label">Cas positifs</div>
          <div className="kpi-tile-value">{nombre_dg_p ?? "—"}</div>
          <div className="kpi-tile-note">diagnostics diabétiques</div>
        </div>

        <div className="kpi-tile green">
          <div className="kpi-tile-icon">✅</div>
          <div className="kpi-tile-label">Cas négatifs</div>
          <div className="kpi-tile-value">{nombre_dg_n ?? "—"}</div>
          <div className="kpi-tile-note">diagnostics non-diabétiques</div>
        </div>

        <div className="kpi-tile amber">
          <div className="kpi-tile-icon">📊</div>
          <div className="kpi-tile-label">Taux diabète</div>
          <div className="kpi-tile-value">{tauxAffich}%</div>
          <div className="kpi-tile-note">estimation sur données réelles</div>
        </div>

      </div>

      {/* ── CHARTS GRID ── */}
      <div className="charts-grid">

        {/* 1. PIE — Répartition */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title">
              <div className="chart-card-title-icon">🥧</div>
              Répartition des résultats
            </div>
            <span className="chart-card-badge">Diabétique / Non</span>
          </div>

          {nombre_dg_p !== null ? (
            <>
              <div className="chart-canvas-wrap pie-wrap">
                <Pie data={data} options={PIE_OPTS} />
              </div>
              <div className="custom-legend">
                <div className="legend-item">
                  <div className="legend-dot" style={{ background: "#dc2626" }} />
                  Diabétique ({nombre_dg_p})
                </div>
                <div className="legend-item">
                  <div className="legend-dot" style={{ background: "#16a34a" }} />
                  Non-Diabétique ({nombre_dg_n})
                </div>
              </div>
            </>
          ) : (
            <ChartEmpty icon="🥧" text="En attente des données…" />
          )}
        </div>

        {/* 2. BAR — Comparaison Genre */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title">
              <div className="chart-card-title-icon">👥</div>
              Comparaison Homme / Femme
            </div>
            <span className="chart-card-badge">Par genre</span>
          </div>

          {dstru_genre.length > 0 ? (
            <>
              <div className="chart-canvas-wrap">
                <Bar
                  data={data_distru_g}
                  options={{
                    ...BASE_OPTS,
                    plugins: { ...BASE_OPTS.plugins, legend: { display: false } },
                  }}
                />
              </div>
              <div className="custom-legend">
                <div className="legend-item">
                  <div className="legend-dot" style={{ background: "rgba(37,99,235,0.8)" }} />
                  Homme
                </div>
                <div className="legend-item">
                  <div className="legend-dot" style={{ background: "rgba(190,24,93,0.8)" }} />
                  Femme
                </div>
              </div>
            </>
          ) : (
            <ChartEmpty icon="👥" text="En attente des données genre…" />
          )}
        </div>

        {/* 3. LINE — Évolution mensuelle (full width) */}
        <div className="chart-card full-width">
          <div className="chart-card-header">
            <div className="chart-card-title">
              <div className="chart-card-title-icon">📈</div>
              Évolution mensuelle des diagnostics
            </div>
            <span className="chart-card-badge">Nombre de tests / mois</span>
          </div>

          {dataa.length > 0 ? (
            <div className="chart-canvas-wrap">
              <Line
                data={data_test}
                options={{
                  ...BASE_OPTS,
                  plugins: {
                    ...BASE_OPTS.plugins,
                    tooltip: {
                      ...BASE_OPTS.plugins.tooltip,
                      callbacks: {
                        label: ctx => ` ${ctx.parsed.y} diagnostic${ctx.parsed.y > 1 ? "s" : ""}`,
                      },
                    },
                  },
                }}
              />
            </div>
          ) : (
            <ChartEmpty icon="📈" text="En attente des données mensuelles…" />
          )}
        </div>

        {/* 4. BAR — Distribution par âge (full width) */}
        <div className="chart-card full-width">
          <div className="chart-card-header">
            <div className="chart-card-title">
              <div className="chart-card-title-icon">📊</div>
              Distribution par âge
            </div>
            <span className="chart-card-badge">Nombre de diagnostics / tranche d'âge</span>
          </div>

          {distru.length > 0 ? (
            <div className="chart-canvas-wrap">
              <Bar
                data={data_distru}
                options={{
                  ...BASE_OPTS,
                  plugins: {
                    ...BASE_OPTS.plugins,
                    tooltip: {
                      ...BASE_OPTS.plugins.tooltip,
                      callbacks: {
                        label: ctx => ` ${ctx.parsed.y} patient${ctx.parsed.y > 1 ? "s" : ""}`,
                      },
                    },
                  },
                }}
              />
            </div>
          ) : (
            <ChartEmpty icon="📊" text="En attente des données d'âge…" />
          )}
        </div>

      </div>
    </div>
  );
}

export default Analyses;
