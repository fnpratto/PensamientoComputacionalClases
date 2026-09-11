import { useState, useEffect } from 'react';
import config from './courses/cap-4.js';
import NameGate from './components/NameGate.jsx';
import Quiz from './components/Quiz.jsx';
import BoonList from './components/BoonList.jsx';
import PotionCard from './components/PotionCard.jsx';
import Nav from './components/Nav.jsx';

const STORAGE_KEY = config.meta.storagePrefix || 'guia-2';

export default function App() {
  const [studentName, setStudentName] = useState(
    () => localStorage.getItem(`${STORAGE_KEY}:studentName`) || ''
  );

  const { meta, questions, sections, sectionLabels, boons, potion, sheetWebhook } = config;

  // Set page title from config
  useEffect(() => {
    document.title = meta.title;
  }, [meta.title]);

  function handleStart(name) {
    setStudentName(name);
    localStorage.setItem(`${STORAGE_KEY}:studentName`, name);
    setTimeout(() => {
      document.getElementById('camara-1')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }

  return (
    <>
      <Nav />

      {/* HERO */}
      <div className="hero">
        <span className="eyebrow">{meta.eyebrow}</span>
        <h1 dangerouslySetInnerHTML={{ __html: meta.heroTitleHtml }} />
        <p>{meta.heroDescription}</p>

        {!studentName && <NameGate onStart={handleStart} />}
      </div>

      {/* CÁMARA I: QUIZ */}
      <section className="chamber" id="camara-1">
        <div className="chamber-head">
          <span className="eyebrow">Cámara I</span>
          <h2>La Prueba de Estigia</h2>
          <p>
            {questions.length} pasos de opción múltiple. Si no te acordás algo, Hécate deja una pista,
            y podés anotar lo que quieras recordar en el cuaderno de cada pregunta.
          </p>
        </div>

        {!studentName ? (
          <div className="gate" style={{ textAlign: 'center', padding: '2.4rem 1.5rem' }}>
            <div style={{ fontSize: '1.6rem', marginBottom: '0.75rem' }}>🔒</div>
            <p style={{ color: 'var(--bone-dim)', margin: 0 }}>
              Ingresá tu nombre arriba para desbloquear la prueba.
            </p>
          </div>
        ) : (
          <Quiz
            questions={questions}
            sections={sections}
            sectionLabels={sectionLabels}
            studentName={studentName}
            sheetWebhook={sheetWebhook}
            onComplete={() => {}}
            quizKey={`${STORAGE_KEY}:quiz`}
          />
        )}
      </section>

      {/* CÁMARA II: LOS DONES */}
      <section className="chamber" id="camara-2">
        <div className="chamber-head">
          <span className="eyebrow">Cámara II</span>
          <h2>Los Dones</h2>
          <p>
            Seis dones para llevarse antes de subir. Cada uno tiene su ayuda de memoria y, si hace falta,
            la solución sugerida — no hay una única forma correcta.
          </p>
        </div>
        <BoonList boons={boons} storagePrefix={STORAGE_KEY} />
      </section>

      {/* CÁMARA FINAL: BOTICA */}
      <section className="chamber" id="camara-3">
        <div className="chamber-head">
          <span className="eyebrow">Cámara Final</span>
          <h2>La Botica de Hécate</h2>
          <p>Antes de subir a la superficie, hay que pasar por la botica a comprar pociones para el próximo intento.</p>
        </div>
        <PotionCard potion={potion} storagePrefix={STORAGE_KEY} />
      </section>

      <footer>{meta.footerText}</footer>
    </>
  );
}
