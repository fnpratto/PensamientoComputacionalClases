import { useMemo, useState } from 'react';
import { shuffle } from '../../utils/shuffle.js';
import Html from '../Html.jsx';

const normalize = s => (s || '').trim().replace(/\s+/g, ' ');
const stripTags = html => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

/**
 * Una pregunta: elegir opción → confirmar → ver feedback → siguiente.
 * Se monta de nuevo por cada pregunta (key en el padre), así el estado
 * local arranca limpio.
 * @param {{question: import('../../courses/types.js').Question,
 *   onAnswer: (r: {pregunta: string, respuesta: string, correcta: boolean}) => void,
 *   onNext: () => void}} props
 */
export default function QuizQuestion({ question, onAnswer, onNext }) {
  const options = useMemo(() => shuffle(question.options), [question]);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const isCorrectOption = opt => question.answers.some(a => normalize(a) === normalize(opt));
  const isCorrect = selected !== null && isCorrectOption(selected);

  function confirm() {
    if (selected === null || answered) return;
    setAnswered(true);
    onAnswer({ pregunta: stripTags(question.prompt), respuesta: selected, correcta: isCorrect });
  }

  function optionClass(opt) {
    if (!answered) return opt === selected ? 'option-btn selected' : 'option-btn';
    if (isCorrectOption(opt)) return 'option-btn correct';
    if (opt === selected) return 'option-btn wrong';
    return 'option-btn';
  }

  return (
    <div className="card">
      <span className="tag-accent">{question.section}</span>
      <Html className="q-text" html={question.prompt} />

      <div className="options-grid">
        {options.map(opt => (
          <button
            key={opt}
            type="button"
            className={optionClass(opt)}
            disabled={answered}
            aria-pressed={opt === selected}
            onClick={() => setSelected(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      <details className="hint">
        <summary>Ayuda de memoria</summary>
        <Html className="hint-body" html={question.hint} />
      </details>

      {answered && (
        <Html
          className={`feedback show ${isCorrect ? 'ok' : 'bad'}`}
          html={isCorrect ? question.feedbackOk : question.feedbackBad}
        />
      )}

      <div className="quiz-nav">
        {answered ? (
          <button type="button" className="btn btn-primary" onClick={onNext}>Siguiente pregunta →</button>
        ) : (
          <button type="button" className="btn btn-primary" disabled={selected === null} onClick={confirm}>
            Confirmar respuesta ✓
          </button>
        )}
      </div>
    </div>
  );
}
