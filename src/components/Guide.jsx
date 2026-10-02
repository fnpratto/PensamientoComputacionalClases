import { useEffect, useRef, useState } from 'react';
import Html from './Html.jsx';
import { highlightPython } from '../engine/pyHighlight.js';

/**
 * Como <Html>, pero colorea los bloques <pre> de código Python que haya dentro.
 * No se usa para el enunciado (que lleva marcas y ejemplos de entrada/salida).
 */
function HighlightedHtml({ html, className }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.querySelectorAll('pre:not([data-hl])').forEach(pre => {
      pre.innerHTML = highlightPython(pre.textContent);
      pre.setAttribute('data-hl', '');
    });
  }, [html]);
  return <div ref={ref} className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

/* Las cuatro cosas a marcar en el enunciado (método general, paso 1). El `key`
   coincide con la clase hl-<key> que usan las marcas del enunciado. */
const CAMPOS = [
  { key: 'recibe', label: 'Qué recibe' },
  { key: 'devuelve', label: 'Qué devuelve' },
  { key: 'input', label: 'Qué pide por teclado' },
  { key: 'imprime', label: 'Qué imprime' },
];

const EMPTY = { recibe: '', devuelve: '', input: '', imprime: '' };

/**
 * Un ejercicio del paso a paso. Si trae `enunciado`, es interactivo: el alumno
 * primero completa las cuatro cosas y recién después revela la solución (con el
 * enunciado resaltado). Si no, muestra el contenido directamente (machete).
 */
function GuideExercise({ item }) {
  const interactive = Boolean(item.enunciado);
  const [values, setValues] = useState(EMPTY);
  const [revealed, setRevealed] = useState(false);

  return (
    <details className="guide-acc">
      <summary>
        {item.tag && <span className="guide-tag">{item.tag}</span>}
        <span className="guide-acc-title">{item.title}</span>
      </summary>
      <div className="guide-body">
        {interactive && (
          <>
            <h4>El enunciado</h4>
            <Html className={`guide-enun${revealed ? ' revealed' : ''}`} html={item.enunciado} />

            <p className="guide-task">
              Antes de ver la solución, completá vos las cuatro cosas que conviene marcar:
            </p>
            <div className="guide-fields">
              {CAMPOS.map(c => (
                <label key={c.key} className="guide-field">
                  <span className={`guide-field-label hl-${c.key}`}>{c.label}</span>
                  <input
                    type="text"
                    value={values[c.key]}
                    onChange={e => setValues(v => ({ ...v, [c.key]: e.target.value }))}
                    placeholder="Escribí lo que detectaste…"
                  />
                </label>
              ))}
            </div>

            {revealed ? (
              <div className="guide-legend" aria-hidden="true">
                <span className="guide-legend-title">En el enunciado:</span>
                {CAMPOS.map(c => (
                  <span key={c.key} className={`guide-legend-chip hl-${c.key}`}>{c.label}</span>
                ))}
              </div>
            ) : (
              <button type="button" className="btn btn-primary guide-reveal" onClick={() => setRevealed(true)}>
                Ver la solución
              </button>
            )}
          </>
        )}

        {(!interactive || revealed) && <HighlightedHtml html={item.html} />}
      </div>
    </details>
  );
}

/**
 * Guía de estudio: un bloque siempre visible, ejercicios/temas en acordeones y
 * un cierre opcional. Todo el contenido es HTML escrito por los docentes.
 *
 * @param {{guide: import('../courses/types.js').Guide}} props
 */
export default function Guide({ guide }) {
  return (
    <div className="guide">
      {guide.method && (
        <div className="guide-card">
          <h3>{guide.method.title}</h3>
          <HighlightedHtml html={guide.method.html} />
        </div>
      )}

      {guide.groups.map(group => (
        <div className="guide-group" key={group.label}>
          <span className="guide-group-label">{group.label}</span>
          {group.items.map(item => (
            <GuideExercise item={item} key={item.title} />
          ))}
        </div>
      ))}

      {guide.closing && (
        <div className="guide-card guide-closing">
          <h3>{guide.closing.title}</h3>
          <HighlightedHtml html={guide.closing.html} />
        </div>
      )}
    </div>
  );
}
