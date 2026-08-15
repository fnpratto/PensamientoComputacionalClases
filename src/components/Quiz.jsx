import { useState, useRef } from 'react';
import { normalize, escapeHtml } from '../engine/testRunner.js';

function shuffled(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Quiz({ questions, sections, sectionLabels, studentName, sheetWebhook, onComplete }) {
  const [current, setCurrent] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState([]);
  const [done, setDone] = useState(false);
  const [sendStatus, setSendStatus] = useState('');
  const [sent, setSent] = useState(false);
  const [noteValue, setNoteValue] = useState('');
  const [feedback, setFeedback] = useState(null); // {text, cls}
  const [optionStates, setOptionStates] = useState({}); // {option: 'correct'|'wrong'|null}
  const [shuffledOptions, setShuffledOptions] = useState(() => shuffled(questions[0].options));

  // Move to next question or finish
  function goNext() {
    const nextIdx = current + 1;
    if (nextIdx >= questions.length) {
      setDone(true);
      onComplete(results, score, lives);
    } else {
      setCurrent(nextIdx);
      setAnswered(false);
      setFeedback(null);
      setOptionStates({});
      setNoteValue('');
      setShuffledOptions(shuffled(questions[nextIdx].options));
    }
  }

  function checkAnswer(given) {
    if (answered) return;
    const item = questions[current];
    const isCorrect = item.answers.some(a => normalize(a) === normalize(given));

    const newOptionStates = {};
    item.options.forEach(opt => {
      if (item.answers.some(a => normalize(a) === normalize(opt))) {
        newOptionStates[opt] = 'correct';
      } else if (opt === given) {
        newOptionStates[opt] = 'wrong';
      }
    });
    setOptionStates(newOptionStates);
    setAnswered(true);

    const newResult = {
      pregunta: item.q.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
      respuesta: given,
      correcta: isCorrect,
      nota: noteValue.trim(),
    };
    const newResults = [...results, newResult];
    setResults(newResults);

    if (isCorrect) {
      setScore(s => s + 1);
      setFeedback({ text: 'Correcto. El paso queda marcado en el río.', cls: 'feedback show ok' });
    } else {
      setLives(l => Math.max(0, l - 1));
      setFeedback({ text: `No era esa — se apaga una llama. Respuesta esperada: "${item.answers[0]}".`, cls: 'feedback show bad' });
    }
  }

  function downloadCSV() {
    let csv = 'Nombre,Pregunta,Respuesta,Correcta,Nota\n';
    results.forEach(r => {
      const row = [studentName, r.pregunta, r.respuesta, r.correcta ? 'Si' : 'No', r.nota]
        .map(v => '"' + (v || '').toString().replace(/"/g, '""') + '"').join(',');
      csv += row + '\n';
    });
    csv += `\n"${studentName}","PUNTAJE","${score}/${questions.length}","VIDAS","${lives}"\n`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `respuestas_${normalize(studentName).replace(/\s+/g, '_')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function sendToSheets() {
    if (!sheetWebhook) {
      setSendStatus('Todavía no está configurada la planilla de destino (sheetWebhook vacío). Usá la descarga en CSV mientras tanto.');
      return;
    }
    const body = new URLSearchParams({
      nombre: studentName,
      puntaje: `${score}/${questions.length}`,
      preguntas: JSON.stringify(results.map(r => r.pregunta)),
      respuestas: JSON.stringify(results.map(r => r.respuesta)),
    });
    setSendStatus('Enviando...');
    fetch(sheetWebhook, { method: 'POST', mode: 'no-cors', body })
      .then(() => { setSendStatus('Enviado. Ya debería estar en la planilla.'); setSent(true); })
      .catch(() => { setSendStatus('No se pudo enviar — descargá el CSV y mandalo por otro medio.'); });
  }

  const item = questions[current];
  const pct = (current / questions.length) * 100;
  const currentSectionIdx = sections.indexOf(item.section);

  if (done) {
    let msg = '';
    if (score === questions.length) msg = 'Cruzaste sin perder una sola llama. Caronte asiente.';
    else if (lives === 0) msg = 'Las llamas se apagaron, pero el bote igual cruza. Nadie se queda del otro lado.';
    else msg = `El río quedó atrás. Quedan ${lives} llama(s) encendida(s).`;

    return (
      <>
        <div className="river-wrap">
          <div className="river-track"><div className="river-fill" style={{ width: '100%' }} /></div>
          <div className="river-labels">
            {sectionLabels.map((lbl, i) => (
              <span key={i} className="done">{lbl}</span>
            ))}
          </div>
        </div>
        <div className="summary-card">
          <span className="eyebrow">Bendición de Caronte</span>
          <div className="big-score">{score} / {questions.length}</div>
          <p>{msg}</p>
          <div className="cta-row" style={{ flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            {!sent ? (
              <>
                <button className="btn btn-primary" onClick={sendToSheets} style={{ width: '100%', maxWidth: '360px' }}>
                  Enviar mis respuestas →
                </button>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--bone-dim)' }}>
                  Paso obligatorio antes de continuar.
                </span>
              </>
            ) : (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--styx)' }}>
                ✓ Respuestas enviadas
              </span>
            )}
            <button className="btn" onClick={downloadCSV} style={{ fontSize: '0.78rem', opacity: 0.65 }}>
              Descargar copia en CSV
            </button>
          </div>
          {sendStatus && !sent && <div className="status-note">{sendStatus}</div>}
          <table className="summary-table">
            <thead>
              <tr>
                <th>Pregunta</th>
                <th>Tu respuesta</th>
                <th>¿Correcta?</th>
                <th>Nota</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i}>
                  <td data-label="Pregunta">{r.pregunta}</td>
                  <td data-label="Tu respuesta">{r.respuesta || '—'}</td>
                  <td data-label="¿Correcta?" className={r.correcta ? 'ok' : 'bad'}>{r.correcta ? 'Sí' : 'No'}</td>
                  <td data-label="Nota">{r.nota || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {sent && (
            <div className="cta-row">
              <button
                className="btn btn-primary"
                onClick={() => document.getElementById('camara-2').scrollIntoView({ behavior: 'smooth' })}
              >
                Entrar a la Cámara de los Dones →
              </button>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="status-row">
        <div className="lives">
          {[0, 1, 2].map(i => (
            <div key={i} className={`flame${i >= lives ? ' spent' : ''}`} />
          ))}
        </div>
        <div className="score-tag">
          Pregunta <b>{current + 1}</b>/{questions.length} · Aciertos: <b>{score}</b>
        </div>
      </div>

      <div className="river-wrap">
        <div className="river-track">
          <div className="river-fill" style={{ width: pct + '%' }} />
        </div>
        <div className="river-labels">
          {sectionLabels.map((lbl, i) => (
            <span key={i} className={currentSectionIdx >= i ? 'done' : ''}>{lbl}</span>
          ))}
        </div>
      </div>

      <div className="card">
        <span className="q-section-tag">{item.section}</span>
        <div className="q-text" dangerouslySetInnerHTML={{ __html: item.q }} />

        <div className="options-grid">
          {shuffledOptions.map((opt, i) => {
            const state = optionStates[opt];
            let cls = 'option-btn';
            if (state === 'correct') cls += ' correct';
            else if (state === 'wrong') cls += ' wrong';
            return (
              <button
                key={i}
                type="button"
                className={cls}
                disabled={answered}
                onClick={() => checkAnswer(opt)}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <details className="hint">
          <summary>Ayuda de memoria de Hécate</summary>
          <div className="hint-body" dangerouslySetInnerHTML={{ __html: item.hint }} />
        </details>

        <div className="notes-field">
          <label htmlFor="q-notes">Cuaderno de notas (opcional)</label>
          <textarea
            id="q-notes"
            placeholder="Anotá acá lo que quieras recordar de esta pregunta..."
            value={noteValue}
            onChange={e => setNoteValue(e.target.value)}
          />
        </div>

        {feedback && (
          <div className={feedback.cls}>{feedback.text}</div>
        )}

        <div className="quiz-nav">
          <button
            className="btn btn-primary"
            disabled={!answered}
            onClick={goNext}
          >
            Cruzar a la próxima sala →
          </button>
        </div>
      </div>
    </>
  );
}
