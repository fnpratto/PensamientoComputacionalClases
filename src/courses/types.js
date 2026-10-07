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
 * @property {'numeric'|'bool'|'exact'|'json'|'contains'|'stdout_contains'|'file_exact'|'file_contains'} type
 * @property {*} [value]           Para 'numeric', 'bool', 'exact', 'json' y 'file_exact'. En 'json' se compara en profundidad (sirve para diccionarios y listas de diccionarios).
 * @property {number} [tolerance]  Solo para 'numeric'.
 * @property {string[]} [parts]    Textos que tienen que aparecer.
 * @property {string[]} [absent]   Textos que NO tienen que aparecer.
 * @property {string} [path]       Solo para 'file_exact' y 'file_contains': el archivo que el código tiene que haber escrito.
 */

/**
 * @typedef {Object} TestCase
 * @property {Array<*>} args
 * @property {string[]} [stdin]    Lo que "escribe" el usuario en cada input().
 * @property {Object<string, string>} [files]  Archivos que existen antes de correr, por nombre → contenido. Cada caso corre en un directorio propio y descartable.
 * @property {Expectation} expect
 */

/**
 * @typedef {Object} Exercise
 * @property {string} badge
 * @property {string} [tag]
 * @property {string} title
 * @property {string} statement    HTML.
 * @property {string} [hint]       HTML. Sin hint no se muestra el acordeón "Pista".
 * @property {string} [note]       HTML.
 * @property {string} starter
 * @property {{funcName: string, cases: TestCase[]}} test
 */

/**
 * @typedef {Object} GuideItem
 * @property {string} title
 * @property {string} [tag]        Etiqueta corta (ej: "Tema 1 · Ej 1").
 * @property {string} [enunciado]  HTML del enunciado, con las 4 cosas marcadas con <mark class="hl hl-recibe|hl-devuelve|hl-input|hl-imprime">. Si está, el ejercicio es interactivo: el alumno completa las 4 cosas y después revela la solución.
 * @property {string} html         HTML: el paso a paso del ejercicio (solución).
 */

/**
 * @typedef {Object} GuideGroup
 * @property {string} label    Encabezado del grupo (ej: "Tema 1").
 * @property {GuideItem[]} items
 */

/**
 * @typedef {Object} Guide
 * @property {string} eyebrow
 * @property {string} title
 * @property {string} description
 * @property {'before-exercises'|'after-exercises'} [placement]  Dónde va la sección (por defecto, después de los ejercicios).
 * @property {{title: string, html: string}} [method]   Bloque siempre visible (método general o intro del machete).
 * @property {GuideGroup[]} groups                       Cada tema/ejercicio va en un acordeón.
 * @property {{title: string, html: string}} [closing]  Cierre (plantillas o tabla de referencia).
 */

/**
 * @typedef {Object} Course
 * @property {string} slug
 * @property {string} title
 * @property {{emoji?: string, title: [string, string], subtitle: string, buttonLabel: string, password?: string}} gate
 * @property {{badge: string, title: [string, string], subtitle: string, decoration?: string}} hero
 * @property {string} footer
 * @property {{label: string, quiz: string, exercises: string, guide?: string, animation?: string, review?: string, feedback?: string}} nav
 * @property {{eyebrow: string, title: string, description: string}} [animation]  Encabezado de la sección de la demo. El componente en sí lo pasa la página por `slots.animation`.
 * @property {{eyebrow: string, title: string, description: string, url: string, note?: string}} [feedback]  Formulario de feedback del cierre.
 * @property {{eyebrow: string, title: string, description: string, sheet: string,
 *   sections: {name: string, label: string}[],
 *   summary: {high: string, mid: string, low: string},
 *   questions: Question[]}} quiz
 * @property {{eyebrow: string, title: string, description: string, sheetPrefix: string,
 *   submitLabel?: string, items: Exercise[]}} exercises  Sin submitLabel no hay entrega ni galería de soluciones.
 * @property {Guide} [guide]
 * @property {{eyebrow: string, title: string, description: string, sheetPrefix: string,
 *   submitLabel?: string, items: Exercise[]}} [review]  Corrección de código después de los ejercicios; mismo formato que `exercises`.
 */

export {};
