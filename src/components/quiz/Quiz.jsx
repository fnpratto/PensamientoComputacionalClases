import { useState } from 'react';
import { submitResults } from '../../services/sheets.js';
import QuizProgress from './QuizProgress.jsx';
import QuizQuestion from './QuizQuestion.jsx';
import QuizSummary from './QuizSummary.jsx';

const SEND_STATUS = {
  sending: 'Enviando…',
  sent: '✓ Enviado a la planilla.',
  error: '✗ Error al enviar. Avisale al docente.',
};

/**
 * @param {{quiz: import('../../courses/types.js').Course['quiz'], studentName: string, nextSectionId: string}} props
 */
export default function Quiz({ quiz, studentName, nextSectionId }) {
  const { questions, sections } = quiz;
  const [current, setCurrent] = useState(0);
  const [results, setResults] = useState([]);
  const [sendStatus, setSendStatus] = useState(null);

  const done = current >= questions.length;
  const score = results.filter(r => r.correcta).length;

  function handleAnswer(result) {
    setResults(prev => [...prev, result]);
  }

  // Los resultados se mandan una sola vez, al pasar de la última pregunta.
  function handleNext() {
    const next = current + 1;
    setCurrent(next);
    if (next < questions.length) return;

    setSendStatus('sending');
    submitResults(quiz.sheet, studentName, results, score, questions.length)
      .then(() => setSendStatus('sent'))
      .catch(() => setSendStatus('error'));
  }

  if (done) {
    return (
      <>
        <QuizProgress sections={sections} progress={1} activeSectionIndex={sections.length - 1} />
        <QuizSummary
          score={score}
          total={questions.length}
          results={results}
          messages={quiz.summary}
          sendStatus={sendStatus && SEND_STATUS[sendStatus]}
          onContinue={() => document.getElementById(nextSectionId)?.scrollIntoView({ behavior: 'smooth' })}
        />
      </>
    );
  }

  const question = questions[current];
  return (
    <>
      <div className="status-row">
        <div className="score-tag">
          Pregunta <b>{current + 1}</b>/{questions.length} &nbsp;·&nbsp; Aciertos: <b>{score}</b>
        </div>
      </div>
      <QuizProgress
        sections={sections}
        progress={current / questions.length}
        activeSectionIndex={sections.findIndex(s => s.name === question.section)}
      />
      <QuizQuestion key={current} question={question} onAnswer={handleAnswer} onNext={handleNext} />
    </>
  );
}
