import { useState } from 'react';
import ClassMenu from './ClassMenu.jsx';
import Gate from './Gate.jsx';
import Hero from './Hero.jsx';
import Section from './Section.jsx';
import SideNav from './SideNav.jsx';
import Quiz from './quiz/Quiz.jsx';
import ExerciseList from './exercises/ExerciseList.jsx';
import Guide from './Guide.jsx';

const QUIZ_ID = 'camara-quiz';
const EXERCISES_ID = 'camara-parcial';
const GUIDE_ID = 'camara-paso-a-paso';

/** @param {{course: import('../courses/types.js').Course}} props */
export default function ClassPage({ course }) {
  const [studentName, setStudentName] = useState('');
  const { quiz, exercises, guide } = course;
  const guideFirst = guide && guide.placement === 'before-exercises';

  const guideSection = guide && (
    <Section id={GUIDE_ID} variant={guideFirst ? 'b' : 'a'} eyebrow={guide.eyebrow} title={guide.title} description={guide.description}>
      <Guide guide={guide} />
    </Section>
  );

  const guideAnchor = guide ? [{ id: GUIDE_ID, label: course.nav.guide || 'Paso a paso' }] : [];

  return (
    <>
      <ClassMenu currentSlug={course.slug} />

      {studentName ? (
        <main>
          <Hero hero={course.hero} />

          <Section id={QUIZ_ID} variant="a" eyebrow={quiz.eyebrow} title={quiz.title} description={quiz.description}>
            <Quiz quiz={quiz} studentName={studentName} nextSectionId={guideFirst ? GUIDE_ID : EXERCISES_ID} />
          </Section>

          {guideFirst && guideSection}

          <Section id={EXERCISES_ID} variant={guideFirst ? 'a' : 'b'} eyebrow={exercises.eyebrow} title={exercises.title} description={exercises.description}>
            <ExerciseList exercises={exercises} studentName={studentName} />
          </Section>

          {!guideFirst && guideSection}

          <footer className="page-footer">{course.footer}</footer>
        </main>
      ) : (
        <Gate gate={course.gate} onEnter={setStudentName} />
      )}

      <SideNav
        label={course.nav.label}
        anchors={[
          { id: 'hero', label: 'Inicio' },
          { id: QUIZ_ID, label: course.nav.quiz },
          ...(guideFirst ? guideAnchor : []),
          { id: EXERCISES_ID, label: course.nav.exercises },
          ...(guideFirst ? [] : guideAnchor),
        ]}
      />
    </>
  );
}
