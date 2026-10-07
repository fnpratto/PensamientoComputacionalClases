import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import ClassPage from './components/ClassPage.jsx';
import './styles/class-page.css';

/**
 * @param {import('./courses/types.js').Course} course
 * @param {{animation?: import('react').ReactNode}} [slots]  Componentes propios de la clase (ver ClassPage).
 */
export function mountClass(course, slots = {}) {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ClassPage course={course} slots={slots} />
      <Analytics />
    </StrictMode>,
  );
}
