import { useEffect } from 'react';
import { getPyodide } from '../../engine/pyodide.js';
import ExerciseCard from './ExerciseCard.jsx';

/**
 * @param {{exercises: import('../../courses/types.js').Course['exercises'], studentName: string}} props
 */
export default function ExerciseList({ exercises, studentName }) {
  // Pyodide pesa varios MB: se empieza a bajar apenas se entra, así el
  // primer "Verificar" no espera la descarga entera.
  useEffect(() => {
    getPyodide().catch(() => {});
  }, []);

  return exercises.items.map((exercise, i) => (
    <ExerciseCard
      key={exercise.test.funcName}
      exercise={exercise}
      sheet={`${exercises.sheetPrefix}${i + 1}`}
      submitLabel={exercises.submitLabel}
      studentName={studentName}
    />
  ));
}
