import { useState } from 'react';
import ClassMenu from './ClassMenu.jsx';
import Gate from './Gate.jsx';
import Hero from './Hero.jsx';
import Section from './Section.jsx';
import SideNav from './SideNav.jsx';
import Quiz from './quiz/Quiz.jsx';
import ExerciseList from './exercises/ExerciseList.jsx';
import Guide from './Guide.jsx';
import Feedback from './Feedback.jsx';

const QUIZ_ID = 'camara-quiz';
const ANIMATION_ID = 'camara-animacion';
const EXERCISES_ID = 'camara-parcial';
const GUIDE_ID = 'camara-paso-a-paso';
const REVIEW_ID = 'camara-correccion';
const FEEDBACK_ID = 'camara-feedback';

/**
 * Arma la página a partir de los datos de la clase. Las secciones de quiz y
 * ejercicios van siempre; la guía, la animación y el feedback son opcionales.
 *
 * `slots` trae los componentes que una clase puntual necesita y que no se
 * pueden describir como datos — hoy solo `animation`. Así los archivos de
 * src/courses/ siguen siendo data pura.
 *
 * @param {{course: import('../courses/types.js').Course, slots?: {animation?: import('react').ReactNode}}} props
 */
export default function ClassPage({ course, slots = {} }) {
  const [studentName, setStudentName] = useState('');
  const { quiz, exercises, guide, animation, feedback, review } = course;
  const guideFirst = guide && guide.placement === 'before-exercises';
  const showAnimation = Boolean(animation && slots.animation);

  // Las variantes alternan el fondo entre secciones consecutivas, así que se
  // cuentan en el orden en que se renderizan y no se pueden fijar a mano.
  const guideIds = guide ? [GUIDE_ID] : [];
  const order = [
    QUIZ_ID,
    ...(showAnimation ? [ANIMATION_ID] : []),
    ...(guideFirst ? guideIds : []),
    EXERCISES_ID,
    ...(guideFirst ? [] : guideIds),
    ...(review ? [REVIEW_ID] : []),
    ...(feedback ? [FEEDBACK_ID] : []),
  ];
  const variantOf = id => (order.indexOf(id) % 2 === 0 ? 'a' : 'b');

  const guideSection = guide && (
    <Section id={GUIDE_ID} variant={variantOf(GUIDE_ID)} eyebrow={guide.eyebrow} title={guide.title} description={guide.description}>
      <Guide guide={guide} />
    </Section>
  );

  const anchorsFor = id => {
    if (id === QUIZ_ID) return { id, label: course.nav.quiz };
    if (id === ANIMATION_ID) return { id, label: course.nav.animation || 'Demo' };
    if (id === GUIDE_ID) return { id, label: course.nav.guide || 'Paso a paso' };
    if (id === EXERCISES_ID) return { id, label: course.nav.exercises };
    if (id === REVIEW_ID) return { id, label: course.nav.review || 'Corrección' };
    return { id, label: course.nav.feedback || 'Feedback' };
  };

  return (
    <>
      <ClassMenu currentSlug={course.slug} />

      {studentName ? (
        <main>
          <Hero hero={course.hero} />

          <Section id={QUIZ_ID} variant={variantOf(QUIZ_ID)} eyebrow={quiz.eyebrow} title={quiz.title} description={quiz.description}>
            <Quiz quiz={quiz} studentName={studentName} nextSectionId={order[1] ?? EXERCISES_ID} />
          </Section>

          {showAnimation && (
            <Section id={ANIMATION_ID} variant={variantOf(ANIMATION_ID)} eyebrow={animation.eyebrow} title={animation.title} description={animation.description}>
              {slots.animation}
            </Section>
          )}

          {guideFirst && guideSection}

          <Section id={EXERCISES_ID} variant={variantOf(EXERCISES_ID)} eyebrow={exercises.eyebrow} title={exercises.title} description={exercises.description}>
            <ExerciseList exercises={exercises} studentName={studentName} />
          </Section>

          {!guideFirst && guideSection}

          {review && (
            <Section id={REVIEW_ID} variant={variantOf(REVIEW_ID)} eyebrow={review.eyebrow} title={review.title} description={review.description}>
              <ExerciseList exercises={review} studentName={studentName} />
            </Section>
          )}

          {feedback && (
            <Section id={FEEDBACK_ID} variant={variantOf(FEEDBACK_ID)} eyebrow={feedback.eyebrow} title={feedback.title} description={feedback.description}>
              <Feedback feedback={feedback} />
            </Section>
          )}

          <footer className="page-footer">{course.footer}</footer>
        </main>
      ) : (
        <Gate gate={course.gate} onEnter={setStudentName} />
      )}

      <SideNav
        label={course.nav.label}
        anchors={[{ id: 'hero', label: 'Inicio' }, ...order.map(anchorsFor)]}
      />
    </>
  );
}
