import { useEffect, useRef, useState } from 'react';
import { getPyodide, pccCheckPractices } from '../engine/pyodide.js';
import { runFunctionTests, escapeHtml } from '../engine/testRunner.js';

/* ================= FALLBACK TAB INDENT ================= */
function fallbackTabIndent(textarea) {
  const TAB = '    ';
  textarea.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const { selectionStart: start, selectionEnd: end, value } = textarea;
    if (start === end && !e.shiftKey) {
      textarea.value = value.slice(0, start) + TAB + value.slice(end);
      textarea.selectionStart = textarea.selectionEnd = start + TAB.length;
    }
  });
}

/* ================= INIT CODE EDITOR ================= */
function initCodeEditor(textarea) {
  if (window.CodeMirror) {
    try {
      const cm = window.CodeMirror.fromTextArea(textarea, {
        mode: 'python',
        theme: 'underworld',
        lineNumbers: true,
        indentUnit: 4,
        tabSize: 4,
        indentWithTabs: false,
        smartIndent: true,
        matchBrackets: true,
        styleActiveLine: true,
        viewportMargin: Infinity,
        placeholder: textarea.placeholder,
        extraKeys: {
          Tab: cm => cm.somethingSelected() ? cm.execCommand('indentMore') : cm.replaceSelection('    ', 'end'),
          'Shift-Tab': cm => cm.execCommand('indentLess'),
        },
      });
      return {
        getValue: () => cm.getValue(),
        onChange: fn => cm.on('change', fn),
      };
    } catch (err) {
      console.warn('No se pudo iniciar el editor de código, uso textarea simple:', err);
    }
  }
  fallbackTabIndent(textarea);
  return {
    getValue: () => textarea.value,
    onChange: fn => textarea.addEventListener('input', fn),
  };
}

/* ================= RENDER HELPERS ================= */
function renderPracticeNote(practice, requiredNames) {
  if (!practice.parse_ok) {
    return { cls: 'practice-note warn', text: '⚠ Buenas prácticas: no pudimos analizar el código (' + practice.error + ').' };
  }
  if (practice.defined_functions.length === 0) {
    return { cls: 'practice-note warn', text: '⚠ Buenas prácticas: tu solución no define ninguna función. En esta guía, toda la lógica va encapsulada en una función (def ...), no suelta al nivel del script.' };
  }
  if (practice.missing_required.length > 0) {
    const plural = practice.missing_required.length > 1;
    return {
      cls: 'practice-note warn',
      text: '⚠ Buenas prácticas: no encontramos ' + (plural ? 'las funciones' : 'la función') + ' ' +
        practice.missing_required.map(n => n + '()').join(', ') + ' definida' + (plural ? 's' : '') + ' con def.',
    };
  }
  return { cls: 'practice-note ok', text: '✓ Buenas prácticas: tu código encapsula la lógica en la(s) función(es) esperada(s).' };
}

function buildTestResultsHtml(rows) {
  const passCount = rows.filter(r => r.pass).length;
  const summaryClass = passCount === rows.length ? 'all-pass' : 'some-fail';
  const summaryText = passCount === rows.length
    ? `Pasaron los ${rows.length} casos de prueba.`
    : `Pasaron ${passCount} de ${rows.length} casos — revisá los que fallaron.`;
  let html = `<div class="test-summary ${summaryClass}">${summaryText}</div><div class="test-list">`;
  rows.forEach(r => {
    html += `<div class="test-item ${r.pass ? 'pass' : 'fail'}"><div class="t-head"><span>${r.pass ? '✓ Pasó' : '✗ Falló'}</span><span>${escapeHtml(r.label)}</span></div><div class="t-detail">${escapeHtml(r.detail)}</div></div>`;
  });
  html += '</div>';
  return html;
}

/* ================= VERIFY BLOCK COMPONENT ================= */
export default function VerifyBlock({ idPrefix, noteText, solutionHtml, testSpecs, storagePrefix = 'guia-2' }) {
  const textareaRef = useRef(null);
  const editorRef = useRef(null);
  const storageKey = `${storagePrefix}:code:${idPrefix}`;

  const [canVerify, setCanVerify] = useState(false);
  const [loading, setLoading] = useState(false);
  const [practiceState, setPracticeState] = useState(null); // {cls, text} | null
  const [resultsHtml, setResultsHtml] = useState(null);
  const [solutionVisible, setSolutionVisible] = useState(false);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta || ta.CodeMirror) return; // ya inicializado, no crear un segundo

    const savedCode = localStorage.getItem(storageKey) || '';
    if (savedCode) ta.value = savedCode;

    const editor = initCodeEditor(ta);
    editorRef.current = editor;

    if (savedCode) setCanVerify(true);

    editor.onChange(() => {
      const val = editor.getValue();
      setCanVerify(val.trim().length > 0);
      localStorage.setItem(storageKey, val);
    });
    return () => {
      if (ta.CodeMirror) ta.CodeMirror.toTextArea();
    };
  }, []);

  async function handleVerify() {
    const code = editorRef.current.getValue();
    setLoading(true);
    setPracticeState(null);
    setResultsHtml(null);

    const requiredNames = testSpecs.map(s => s.funcName).filter(Boolean);
    try {
      await getPyodide();
      const practice = await pccCheckPractices(code, requiredNames);
      setPracticeState(renderPracticeNote(practice, requiredNames));

      let rows = [];
      for (const spec of testSpecs) {
        rows = rows.concat(await runFunctionTests(code, spec));
      }
      setResultsHtml(buildTestResultsHtml(rows));
    } catch (err) {
      setResultsHtml(`<div class="test-summary some-fail">No se pudieron correr las pruebas: ${escapeHtml(err.message || String(err))}</div>`);
    } finally {
      setLoading(false);
      setSolutionVisible(true);
    }
  }

  return (
    <div className="answer-box">
      <div className="notes-field">
        <label htmlFor={`${idPrefix}-answer`}>Tu solución (código Python)</label>
        {noteText && <span className="verify-note" dangerouslySetInnerHTML={{ __html: noteText }} />}
        <textarea
          id={`${idPrefix}-answer`}
          ref={textareaRef}
          placeholder="Escribí acá tu código..."
          spellCheck={false}
        />
      </div>
      <div className="verify-row">
        <button
          type="button"
          className="btn btn-primary"
          disabled={!canVerify || loading}
          onClick={handleVerify}
        >
          Verificar mi respuesta
        </button>
        {loading && (
          <span className="verify-note">Cargando intérprete de Python (puede tardar unos segundos la primera vez)…</span>
        )}
      </div>
      {practiceState && (
        <div className={practiceState.cls}>{practiceState.text}</div>
      )}
      {resultsHtml && (
        <div className="test-results" dangerouslySetInnerHTML={{ __html: resultsHtml }} />
      )}
      {solutionVisible && (
        <details className="solution">
          <summary>Mostrar solución sugerida</summary>
          <div className="sol-body">
            <pre dangerouslySetInnerHTML={{ __html: solutionHtml }} />
          </div>
        </details>
      )}
    </div>
  );
}
