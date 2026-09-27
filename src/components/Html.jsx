/**
 * Renderiza HTML escrito por los docentes en los datos de la clase.
 * Nunca pasarle contenido que venga de alumnos (entregas, nombres): eso va
 * como texto normal, que React escapa solo.
 */
export default function Html({ as: Tag = 'div', className, html }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
