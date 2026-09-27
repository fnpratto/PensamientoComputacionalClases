import { useState } from 'react';
import { fetchSubmissions } from '../../services/sheets.js';

const FILTERS = [
  { id: 'pass', label: '✓ Pasan', matches: it => it.correcta === true },
  { id: 'fail', label: '✗ No pasan', matches: it => it.correcta !== true },
  { id: 'all', label: 'Todas', matches: () => true },
];

const EMPTY_MESSAGE = {
  pass: 'Todavía nadie pasó los tests. Probá con "Todas" para ver el resto de las entregas.',
  fail: 'Nadie falló los tests (o todavía no hay entregas).',
  all: 'Todavía no hay otras entregas.',
};

/** Entregas anónimas de otros alumnos para el mismo ejercicio. */
export default function SolutionGallery({ sheet }) {
  const [items, setItems] = useState(null); // null = todavía no se cargó
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState('pass'); // por default solo las que pasan

  async function load() {
    setLoading(true);
    setOpen(true);
    try {
      setItems(await fetchSubmissions(sheet));
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const loaded = items !== null;
  const active = FILTERS.find(f => f.id === filter);
  const visible = loaded ? items.filter(active.matches) : [];

  let status = '';
  if (loading) status = 'Cargando…';
  else if (loaded && items.length) status = `${items.length} ${items.length === 1 ? 'solución en total' : 'soluciones en total'}`;

  return (
    <div className="gallery">
      <div className="verify-row gallery-actions">
        <button type="button" className="btn" disabled={loading} onClick={load}>
          {loaded ? 'Actualizar' : 'Ver otras soluciones'}
        </button>
        {open && loaded && (
          <button type="button" className="btn" onClick={() => setOpen(false)}>✕ Cerrar</button>
        )}
        <span className="verify-status" role="status">{status}</span>
      </div>

      {open && (
        <div className="gallery-content">
          {error && !loaded && <div className="practice-note warn">No se pudieron cargar. Probá de nuevo.</div>}

          {loaded && items.length > 0 && (
            <div className="gal-filters" role="group" aria-label="Filtrar soluciones">
              {FILTERS.map(f => (
                <button
                  key={f.id}
                  type="button"
                  data-filter={f.id}
                  className={`gal-filter-btn${f.id === filter ? ' active' : ''}`}
                  aria-pressed={f.id === filter}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label} ({items.filter(f.matches).length})
                </button>
              ))}
            </div>
          )}

          {loaded && (
            <div className="gal-list">
              {visible.length === 0 ? (
                <div className="practice-note">{EMPTY_MESSAGE[filter]}</div>
              ) : (
                visible.map((it, i) => (
                  <div key={i} className={`gal-item ${it.correcta ? 'pass' : 'fail'}`}>
                    <div className="gal-head">
                      <span>Solución {i + 1}</span>
                      <span className="gal-badge">{it.correcta ? '✓ Pasa los tests' : '✗ No pasa los tests'}</span>
                    </div>
                    <pre className="gal-code">{it.codigo}</pre>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
