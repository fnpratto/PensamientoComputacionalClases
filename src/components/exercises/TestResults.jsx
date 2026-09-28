function PracticeNote({ practice }) {
  if (!practice.parse_ok) {
    return <div className="practice-note warn">✗ Error de sintaxis: {practice.error}</div>;
  }
  if (practice.missing_required.length > 0) {
    return (
      <div className="practice-note warn">
        ✗ No se encontró la función <code>{practice.missing_required[0]}</code>. Asegurate de definirla.
      </div>
    );
  }
  return (
    <div className="practice-note ok">
      ✓ Código válido. Funciones definidas: {practice.defined_functions.join(', ')}
    </div>
  );
}

/** @param {{report: null | {error: string} | {practice: object, rows: {pass: boolean, label: string, detail: string}[]}}} props */
export default function TestResults({ report }) {
  if (!report) return null;
  if (report.error) {
    return <div className="test-results"><div className="practice-note warn">Error: {report.error}</div></div>;
  }

  return (
    <>
      <div className="practice-note-area"><PracticeNote practice={report.practice} /></div>
      <ul className="test-results">
        {report.rows.map((r, i) => (
          <li key={i} className={`test-item ${r.pass ? 'pass' : 'fail'}`}>
            <div className="t-head">
              <span>{r.label}</span>
              <span>{r.pass ? '✓ PASÓ' : '✗ FALLÓ'}</span>
            </div>
            <div className="t-detail">{r.detail}</div>
          </li>
        ))}
      </ul>
    </>
  );
}
