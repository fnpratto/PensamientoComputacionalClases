import { lazy, Suspense, useState } from 'react';
import { checkPractices } from '../../engine/pyodide.js';
import { runFunctionTests } from '../../engine/testRunner.js';
import { submitResults } from '../../services/sheets.js';
import Html from '../Html.jsx';
import TestResults from './TestResults.jsx';
import SolutionGallery from './SolutionGallery.jsx';

// CodeMirror es la mayor parte del bundle: se baja recién al llegar a los ejercicios.
const CodeEditor = lazy(() => import('./CodeEditor.jsx'));

/**
 * @param {{exercise: import('../../courses/types.js').Exercise, sheet: string,
 *   submitLabel: string, studentName: string}} props
 */
export default function ExerciseCard({ exercise, sheet, submitLabel, studentName }) {
  const { test } = exercise;
  const [code, setCode] = useState(exercise.starter);
  const [busy, setBusy] = useState(null); // null | 'verify' | 'submit'
  const [progress, setProgress] = useState('');
  const [report, setReport] = useState(null); // {practice, rows} | {error}
  const [sendStatus, setSendStatus] = useState('');
  const [submitted, setSubmitted] = useState(false);

  async function verify(source) {
    setReport(null);
    setProgress('Cargando intérprete…');
    try {
      const practice = await checkPractices(source, [test.funcName]);
      setProgress('Ejecutando tests…');
      const rows = await runFunctionTests(source, test);
      setReport({ practice, rows });
      return rows;
    } catch (err) {
      setReport({ error: err.message || String(err) });
      return [];
    } finally {
      setProgress('');
    }
  }

  async function handleVerify() {
    const source = code.trim();
    if (!source) return;
    setBusy('verify');
    await verify(source);
    setBusy(null);
  }

  // Se vuelven a correr los tests con el código que se entrega: si no, un
  // "✓ pasa los tests" podría quedar pegado a una versión anterior.
  async function handleSubmit() {
    const source = code.trim();
    if (!source) return setSendStatus('Escribí tu solución antes de entregar.');
    setBusy('submit');
    const rows = await verify(source);
    const passed = rows.filter(r => r.pass).length;
    const total = test.cases.length;
    setSendStatus('Enviando…');
    try {
      await submitResults(
        sheet,
        studentName,
        [{ pregunta: exercise.title, respuesta: source, correcta: rows.length > 0 && passed === total }],
        passed,
        total,
      );
      setSendStatus('✓ Enviado a la planilla.');
      setSubmitted(true);
    } catch {
      setSendStatus('✗ Error al enviar. Avisale al docente.');
    } finally {
      setBusy(null);
    }
  }

  return (
    <article className="exercise-card">
      <div className="exercise-badges">
        <span className="badge-primary">{exercise.badge}</span>
        <span className="badge-secondary">{exercise.tag}</span>
      </div>
      <h3 className="exercise-title">{exercise.title}</h3>
      <Html className="exercise-statement" html={exercise.statement} />

      <details className="hint">
        <summary>Pista</summary>
        <Html className="hint-body" html={exercise.hint} />
      </details>
      {exercise.note && <Html as="p" className="exercise-note" html={exercise.note} />}

      <div className="answer-box">
        <span className="verify-note">Tu solución en Python</span>
        <Suspense fallback={<div className="code-editor-placeholder">Cargando editor…</div>}>
          <CodeEditor initialValue={exercise.starter} onChange={setCode} label={`Solución: ${exercise.title}`} />
        </Suspense>

        <div className="verify-row">
          <button type="button" className="btn btn-primary" disabled={busy !== null} onClick={handleVerify}>
            Verificar
          </button>
          <span className="verify-status" role="status">{progress}</span>
        </div>

        <TestResults report={report} />

        <div className="submit-row">
          <button type="button" className="btn btn-primary" disabled={busy !== null} onClick={handleSubmit}>
            {submitLabel}
          </button>
        </div>
        {sendStatus && <p className="send-status" role="status">{sendStatus}</p>}

        {submitted && <SolutionGallery sheet={sheet} />}
      </div>
    </article>
  );
}
