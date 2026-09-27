import { describe, expect, it } from 'vitest';
import { CLASSES } from './catalog.js';

// Valida los datos de todas las clases: agarra errores de tipeo que en el
// navegador recién aparecerían al llegar a esa pregunta o ese ejercicio.

const pages = import.meta.glob('../pages/*.jsx');
const courses = import.meta.glob('./clase-*.js', { eager: true, import: 'default' });
const slugs = Object.keys(pages).map(p => p.match(/([^/]+)\.jsx$/)[1]);
const courseFor = slug => courses[`./${slug}.js`];
const EXPECT_TYPES = ['numeric', 'bool', 'exact', 'contains', 'stdout_contains'];

describe.each(slugs)('clase %s', slug => {
  it('tiene página, datos y entrada en el catálogo', () => {
    const course = courseFor(slug);
    expect(course, `falta src/courses/${slug}.js`).toBeDefined();
    expect(course.slug).toBe(slug);
    expect(CLASSES.some(c => c.slug === slug)).toBe(true);
  });

  it('cada pregunta del quiz está bien armada', () => {
    const { quiz } = courseFor(slug);
    const sectionNames = quiz.sections.map(s => s.name);

    expect(quiz.questions.length).toBeGreaterThan(0);
    for (const q of quiz.questions) {
      expect(sectionNames, q.prompt).toContain(q.section);
      expect(new Set(q.options).size, q.prompt).toBe(q.options.length);
      expect(q.answers.length, q.prompt).toBeGreaterThan(0);
      for (const a of q.answers) expect(q.options, q.prompt).toContain(a);
      for (const field of ['prompt', 'hint', 'feedbackOk', 'feedbackBad']) {
        expect(q[field], `${field} en: ${q.prompt}`).toBeTruthy();
      }
    }
  });

  it('cada ejercicio tiene enunciado, starter y tests válidos', () => {
    const { exercises } = courseFor(slug);
    const funcNames = exercises.items.map(e => e.test.funcName);

    expect(new Set(funcNames).size).toBe(funcNames.length);
    for (const ex of exercises.items) {
      const { funcName, cases } = ex.test;
      expect(ex.statement, ex.title).toBeTruthy();
      expect(ex.starter, ex.title).toMatch(new RegExp(`^def ${funcName}\\(`));
      expect(cases.length, ex.title).toBeGreaterThan(0);
      for (const c of cases) {
        expect(Array.isArray(c.args), ex.title).toBe(true);
        expect(EXPECT_TYPES, ex.title).toContain(c.expect.type);
        if (['contains', 'stdout_contains'].includes(c.expect.type)) {
          expect(c.expect.parts?.length, ex.title).toBeGreaterThan(0);
        } else {
          expect(c.expect.value, ex.title).toBeDefined();
        }
      }
    }
  });
});

it('los slugs del catálogo no se repiten', () => {
  const all = CLASSES.map(c => c.slug);
  expect(new Set(all).size).toBe(all.length);
});
