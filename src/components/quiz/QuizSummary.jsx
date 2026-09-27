const truncate = (s, n) => (s.length > n ? `${s.slice(0, n)}…` : s);

function pickMessage(score, total, messages) {
  if (score >= total * 0.8) return messages.high;
  if (score >= total * 0.5) return messages.mid;
  return messages.low;
}

export default function QuizSummary({ score, total, results, messages, sendStatus, onContinue }) {
  return (
    <div className="summary-card">
      <span className="eyebrow">Resultado del Quiz</span>
      <div className="big-score">{score} / {total}</div>
      <p>{pickMessage(score, total, messages)}</p>

      <ol className="result-grid">
        {results.map((r, i) => (
          <li key={i} className={`result-chip ${r.correcta ? 'ok' : 'bad'}`}>
            <div className="result-chip-top">
              <span className="rc-icon">{r.correcta ? '✓' : '✗'}</span>
              <span>{i + 1}. {truncate(r.pregunta, 80)}</span>
            </div>
            <div className="result-chip-answer">Tu respuesta: <span>{r.respuesta || '—'}</span></div>
          </li>
        ))}
      </ol>

      <div className="cta-row">
        <button type="button" className="btn btn-primary" onClick={onContinue}>Pasar a Ejercicios →</button>
      </div>
      {sendStatus && <p className="send-status" role="status">{sendStatus}</p>}
    </div>
  );
}
