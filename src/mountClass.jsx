import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ClassPage from './components/ClassPage.jsx';
import './styles/class-page.css';

/** @param {import('./courses/types.js').Course} course */
export function mountClass(course) {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ClassPage course={course} />
    </StrictMode>,
  );
}
