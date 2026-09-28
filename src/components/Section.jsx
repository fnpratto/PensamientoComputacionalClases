/**
 * Bloque de contenido a lo ancho con encabezado. `variant` alterna el fondo
 * entre secciones consecutivas.
 */
export default function Section({ id, variant = 'a', eyebrow, title, description, children }) {
  return (
    <div className={`section section-${variant}`}>
      <section className="chamber" id={id}>
        <header className="chamber-head">
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </header>
        {children}
      </section>
    </div>
  );
}
