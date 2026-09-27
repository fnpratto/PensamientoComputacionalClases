/* Forma de los datos de una clase. Solo JSDoc: da autocompletado y chequeo
   en el editor sin agregar un paso de compilación.

   Los campos marcados como HTML se renderizan tal cual: son contenido
   escrito por los docentes, nunca datos que vengan de alumnos. */

/**
 * @typedef {Object} Question
 * @property {string} section      Tiene que coincidir con un `name` de quiz.sections.
 * @property {string} prompt       HTML.
 * @property {string[]} answers    Opciones correctas (texto exacto de options).
 * @property {string[]} options    Texto plano; los \n se muestran como saltos de línea.
 * @property {string} hint         HTML.
 * @property {string} feedbackOk   HTML.
 * @property {string} feedbackBad  HTML.
 */

/**
 * @typedef {Object} Expectation
 * @property {'numeric'|'bool'|'exact'|'contains'|'stdout_contains'} type
 * @property {*} [value]
 * @property {number} [tolerance]  Solo para 'numeric'.
 * @property {string[]} [parts]    Textos que tienen que aparecer.
 * @property {string[]} [absent]   Textos que NO tienen que aparecer.
 */

/**
 * @typedef {Object} TestCase
 * @property {Array<*>} args
 * @property {string[]} [stdin]    Lo que "escribe" el usuario en cada input().
 * @property {Expectation} expect
 */

/**
 * @typedef {Object} Exercise
 * @property {string} badge
 * @property {string} tag
 * @property {string} title
 * @property {string} statement    HTML.
 * @property {string} hint         HTML.
 * @property {string} [note]       HTML.
 * @property {string} starter
 * @property {{funcName: string, cases: TestCase[]}} test
 */

/**
 * @typedef {Object} Course
 * @property {string} slug
 * @property {string} title
 * @property {{emoji: string, title: [string, string], subtitle: string, buttonLabel: string, password?: string}} gate
 * @property {{badge: string, title: [string, string], subtitle: string, decoration: string}} hero
 * @property {string} footer
 * @property {{label: string, quiz: string, exercises: string}} nav
 * @property {{eyebrow: string, title: string, description: string, sheet: string,
 *   sections: {name: string, label: string}[],
 *   summary: {high: string, mid: string, low: string},
 *   questions: Question[]}} quiz
 * @property {{eyebrow: string, title: string, description: string, sheetPrefix: string,
 *   submitLabel: string, items: Exercise[]}} exercises
 */

export {};
