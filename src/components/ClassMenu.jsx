import { CLASSES } from '../courses/catalog.js';

/** Botón flotante "Todas las clases" con links al resto del sitio. */
export default function ClassMenu({ currentSlug }) {
  const visible = CLASSES.filter(c => !c.hidden || c.slug === currentSlug);

  return (
    <details className="class-menu">
      <summary title="Navegar a otra clase">📚 Todas las clases</summary>
      <nav className="class-menu-panel" aria-label="Todas las clases">
        <a className="class-menu-link is-home" href="/">🏠 Menú principal</a>
        {visible.map(c =>
          c.slug === currentSlug ? (
            <span key={c.slug} className="class-menu-link is-current" aria-current="page">
              {c.label} · estás acá
            </span>
          ) : (
            <a key={c.slug} className="class-menu-link" href={c.href}>{c.label}</a>
          ),
        )}
      </nav>
    </details>
  );
}
