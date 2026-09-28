import { useState } from 'react';
import ClassMenu from './ClassMenu.jsx';
import Gate from './Gate.jsx';
import Hero from './Hero.jsx';
import Section from './Section.jsx';
import SideNav from './SideNav.jsx';
import Quiz from './quiz/Quiz.jsx';
import ExerciseList from './exercises/ExerciseList.jsx';

const QUIZ_ID = 'camara-quiz';
const EXERCISES_ID = 'camara-parcial';

/** @param {{course: import('../courses/types.js').Course}} props */
export default function ClassPage({ course }) {
  const [studentName, setStudentName] = useState('');
  const { quiz, exercises } = course;

  return (
    <>
      <ClassMenu currentSlug={course.slug} />

      {studentName ? (
        <main>
          <Hero hero={course.hero} />

          <Section id={QUIZ_ID} variant="a" eyebrow={quiz.eyebrow} title={quiz.title} description={quiz.description}>
            <Quiz quiz={quiz} studentName={studentName} nextSectionId={EXERCISES_ID} />
          </Section>

          <Section id={EXERCISES_ID} variant="b" eyebrow={exercises.eyebrow} title={exercises.title} description={exercises.description}>
            <ExerciseList exercises={exercises} studentName={studentName} />
          </Section>

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
          { id: EXERCISES_ID, label: course.nav.exercises },
        ]}
      />
    </>
  );
}
