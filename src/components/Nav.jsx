import { useState, useEffect } from 'react';

const UNITS = [
  { id: 'g2', label: 'El Descenso', sub: 'Unidad 2', href: 'index.html', active: true },
  { id: 'u3', label: 'Oceanus', sub: 'Unidad 3', href: 'unidad3-intro.html', active: false },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  function close() { setOpen(false); }

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={close}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,.45)',
            backdropFilter: 'blur(2px)',
            zIndex: 8999,
          }}
        />
      )}

      {/* Tab visible always */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Abrir menú"
        style={{
          position: 'fixed', left: 0, top: '50%', transform: 'translateY(-50%)',
          zIndex: 9001,
          width: 26, height: 80,
          background: 'rgba(13,21,39,.92)',
          border: '1px solid rgba(164,124,245,.3)', borderLeft: 'none',
          borderRadius: '0 6px 6px 0',
          color: 'var(--violet)', cursor: 'pointer',
          fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.12em',
          writingMode: 'vertical-rl',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'border-color .2s',
        }}
      >
        nav
      </button>

      {/* Panel */}
      <nav
        aria-label="Navegación del sitio"
        style={{
          position: 'fixed', left: 0, top: 0, bottom: 0, width: 244,
          background: 'rgba(8,13,24,.97)',
          borderRight: '1px solid rgba(164,124,245,.18)',
          backdropFilter: 'blur(12px)',
          zIndex: 9000,
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform .24s cubic-bezier(.25,.8,.25,1)',
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.4rem 1.1rem 1rem',
          borderBottom: '1px solid rgba(164,124,245,.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '.82rem', letterSpacing: '.12em', color: 'var(--violet)' }}>
            ✦ PC · FIUBA
          </span>
          <button
            onClick={close}
            aria-label="Cerrar"
            style={{
              background: 'none', border: 'none', color: 'var(--bone-dim)',
              cursor: 'pointer', fontSize: '1.1rem', lineHeight: 1,
              padding: '.2rem .4rem', borderRadius: 3,
            }}
          >✕</button>
        </div>

        {/* Body */}
        <div style={{ padding: '1rem .8rem 2rem', flex: 1 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.18em',
            textTransform: 'uppercase', color: 'var(--bone-dim)', opacity: .65,
            margin: '0 0 .5rem .3rem', display: 'block',
          }}>
            Unidades
          </span>

          {UNITS.map(u => (
            <a
              key={u.id}
              href={u.href}
              style={{
                display: 'flex', alignItems: 'center', gap: '.6rem',
                fontFamily: 'var(--font-mono)', fontSize: '.74rem',
                color: u.active ? 'var(--violet)' : 'var(--bone-dim)',
                textDecoration: 'none',
                padding: '.5rem .7rem', borderRadius: 4,
                borderLeft: `2px solid ${u.active ? 'var(--violet)' : 'transparent'}`,
                background: u.active ? 'rgba(164,124,245,.06)' : 'transparent',
                marginBottom: '.2rem',
                transition: 'color .15s, background .15s',
              }}
            >
              <span style={{ fontSize: '.6rem', opacity: .7, minWidth: '1.8rem', textAlign: 'right' }}>
                {u.sub}
              </span>
              {u.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
