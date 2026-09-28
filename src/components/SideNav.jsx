import { useState } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy.js';

/** Pestaña lateral con el índice de la clase. */
export default function SideNav({ label, anchors }) {
  const [open, setOpen] = useState(false);
  const current = useScrollSpy(anchors.map(a => a.id));
  const close = () => setOpen(false);

  return (
    <>
      <div className={`snav-overlay${open ? ' open' : ''}`} onClick={close} />
      <button
        type="button"
        className="snav-tab"
        onClick={() => setOpen(o => !o)}
        aria-label="Abrir índice"
        aria-expanded={open}
        title="Índice de esta clase"
      >
        nav
      </button>
      <nav className={`snav-panel${open ? ' open' : ''}`} aria-label="Índice de la clase">
        <div className="snav-header">
          <span className="snav-logo">PC · FIUBA</span>
          <button type="button" className="snav-close" onClick={close} aria-label="Cerrar">✕</button>
        </div>
        <div className="snav-body">
          <span className="snav-section-label">Clase</span>
          <a className="snav-unit active" href="#">{label}</a>
          <hr className="snav-divider" />
          <span className="snav-section-label">Secciones</span>
          {anchors.map(a => (
            <a
              key={a.id}
              className={`snav-anchor${current === a.id ? ' current' : ''}`}
              href={`#${a.id}`}
              onClick={close}
            >
              {a.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
