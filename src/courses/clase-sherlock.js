/* Clase 9 (variante) · Bibliotecas (Unidad 6) — "Sherlock Forense"
   Caso ficticio: robo de una obra en el museo. Los datos son inventados pero
   están armados para que el análisis con pandas/numpy apunte a un culpable.
   Datos descargables para Colab en public/datos/clase-sherlock/. */

import { bibliotecasGuide } from './_bibliotecas-guide.js';

// ── Escena del crimen: pisadas por sospechoso y por sala ─────
const HUELLAS = [
  'Moran,Hall,12', 'Adler,Hall,8', 'Hudson,Hall,5', 'Lestrade,Hall,10',
  'Moran,Galeria,15', 'Adler,Galeria,6', 'Hudson,Galeria,4', 'Lestrade,Galeria,9',
  'Moran,Boveda,20', 'Adler,Boveda,2', 'Hudson,Boveda,1', 'Lestrade,Boveda,3',
].join('\n') + '\n';
const HUELLAS_CSV = { 'huellas.csv': `sospechoso,sala,pisadas\n${HUELLAS}` };

const INDICIOS = { 'indicios.csv': 'sospechoso,cabellos\nMoran,14\nAdler,8\nHudson,22\nLestrade,5\n' };

/** @type {import('./types.js').Course} */
export default {
  slug: 'clase-sherlock',
  title: 'Sherlock Forense',
  packages: ['numpy', 'pandas'],
  gate: {
    emoji: '🔍',
    title: ['Sherlock', 'Forense'],
    subtitle: 'Bibliotecas de Python para resolver un crimen con los datos · Unidad 6',
    buttonLabel: 'Aceptar el caso',
  },
  hero: {
    badge: '🔍 Pensamiento Computacional · Curso 11: Retamozo, Pratto · 2026',
    title: ['Unidad 6 ·', 'Sherlock Forense'],
    subtitle: 'Robaron una obra del museo de noche. Tenemos las huellas y los indicios en tablas. Con pandas y numpy filtramos, agrupamos y medimos hasta responder: ¿quién fue?',
    decoration: '🔍 🕵️ 🖼️ 🧪 🦶 📊',
  },
  footer: 'Sherlock Forense · Unidad 6 · Pensamiento Computacional FIUBA 🔍',
  nav: {
    label: 'Sherlock Forense',
    guide: 'Apunte',
    exercises: 'La investigación',
    review: 'Peritaje de código',
    feedback: 'Feedback',
  },

  // Sin quiz de nivelación ni machete: esta clase es tarea, ya vieron el tema.
  guide: {
    ...bibliotecasGuide,
    closing: null,
    title: 'pandas, numpy y matplotlib para el peritaje',
    method: {
      title: 'El caso: huellas en la escena del crimen',
      html: `<p class="guide-lead">Anoche robaron una obra de la bóveda del museo. El sistema de sensores dejó un registro de cuántas <b>pisadas</b> dejó cada sospechoso en cada sala. Esa es nuestra evidencia:</p>
<pre>sospechoso,sala,pisadas          # huellas.csv
Moran,Hall,12
Adler,Hall,8
Moran,Boveda,20
...</pre>
<p>Descargá la evidencia para Colab: <a href="/datos/clase-sherlock/huellas.csv" download>huellas.csv</a> · <a href="/datos/clase-sherlock/indicios.csv" download>indicios.csv</a>. Un buen detective no acusa por una corazonada: filtra, agrupa, mide y <b>deja que los datos señalen al culpable</b>.</p>
<p>📓 <a href="/datos/clase-sherlock/sherlock-forense.ipynb" download><b>Descargá la notebook para Colab</b></a>: tiene todos los pasos de la investigación listos para completar, incluido el informe pericial final. Abrila en <a href="https://colab.research.google.com/" target="_blank" rel="noreferrer">Google Colab</a> y subí la evidencia (los dos CSV).</p>`,
    },
    groups: [
      ...bibliotecasGuide.groups,
      {
        label: 'Producto final (para Colab)',
        items: [
          {
            tag: 'Integrador · estilo parcial',
            title: 'Informe pericial: concentración en la escena (Incisos A y B)',
            html: `<p>Con la evidencia completa <code>huellas.csv</code> (<code>sospechoso,sala,pisadas</code>), en Colab. <b>Base:</b> archivos, pandas, numpy y matplotlib — armar un DataFrame desde un archivo y operar, o guardar el resultado en un archivo. <b>Siempre graficar.</b> La escena del crimen es la <code>Boveda</code>.</p>
<p><b>Inciso A.</b> Escribí <code>analizar_y_graficar_sospechas(ruta_archivo)</code> que: (1) calcule con <b>NumPy</b> el promedio de pisadas por registro de todo el archivo; (2) calcule, para cada sospechoso, su <b>índice de concentración en la escena</b> <code>indice = (pisadas_en_la_Boveda / pisadas_totales_del_sospechoso) * 100</code>; y (3) grafique un <b>gráfico de barras</b> con los sospechosos en el eje X y su índice (%) en el eje Y. El pico es el principal sospechoso.</p>
<p><b>Inciso B.</b> Escribí <code>exportar_sospechosos_sala(ruta_archivo, sala)</code> que, con <b>Pandas</b>: (1) filtre solo las filas de esa sala; (2) las ordene de mayor a menor por <code>pisadas</code>; y (3) exporte el resultado a un CSV <code>sospechosos_sala.csv</code>.</p>
<p>La notebook descargable trae las dos celdas listas para completar.</p>`,
          },
        ],
      },
    ],
  },

  // ── La investigación (ejercicios autocorregidos) ───────────
  exercises: {
    eyebrow: 'La investigación',
    title: 'Seguir las huellas con pandas y numpy',
    description: 'La evidencia ya está cargada (huellas.csv). Cada función es un paso de la investigación; al final vas a poder señalar al culpable. Verificá cada paso antes de seguir.',
    sheetPrefix: 'Sherlock-',
    items: [
      {
        badge: 'Pista 1',
        title: 'Pisadas en una sala',
        statement: `<code>huellas.csv</code> tiene, por cada sospechoso y sala, la cantidad de pisadas.
<pre>sospechoso,sala,pisadas
Moran,Hall,12
Adler,Hall,8
...</pre>
<p>Escribí <code>total_pisadas_en_sala(archivo, sala)</code> que <b>devuelva</b> el total de pisadas registradas en esa sala (sumando a todos los sospechosos).</p>`,
        hint: 'Filtrás las filas de esa sala y sumás la columna pisadas. Devolvé un <code>int</code>.',
        starter: 'import pandas as pd\n\ndef total_pisadas_en_sala(archivo, sala):\n    pass',
        test: {
          funcName: 'total_pisadas_en_sala',
          cases: [
            { args: ['huellas.csv', 'Boveda'], files: HUELLAS_CSV, expect: { type: 'numeric', value: 26 } },
            { args: ['huellas.csv', 'Hall'], files: HUELLAS_CSV, expect: { type: 'numeric', value: 35 } },
          ],
        },
      },
      {
        badge: 'Pista 2',
        title: '¿Quién pisó la bóveda?',
        statement: `Escribí <code>pisadas_por_sospechoso(archivo, sala)</code> que <b>devuelva un diccionario</b> <code>{sospechoso: pisadas}</code> con las pisadas de cada uno en esa sala.
<pre>pisadas_por_sospechoso('huellas.csv', 'Boveda')
{'Moran': 20, 'Adler': 2, 'Hudson': 1, 'Lestrade': 3}</pre>
<p>Ya empieza a aparecer un nombre sospechoso...</p>`,
        hint: 'Filtrás por sala, agrupás por sospechoso sumando pisadas, y <code>.to_dict()</code>.',
        starter: 'import pandas as pd\n\ndef pisadas_por_sospechoso(archivo, sala):\n    pass',
        test: {
          funcName: 'pisadas_por_sospechoso',
          cases: [
            { args: ['huellas.csv', 'Boveda'], files: HUELLAS_CSV,
              expect: { type: 'json', value: { Moran: 20, Adler: 2, Hudson: 1, Lestrade: 3 } } },
            { args: ['huellas.csv', 'Hall'], files: HUELLAS_CSV,
              expect: { type: 'json', value: { Moran: 12, Adler: 8, Hudson: 5, Lestrade: 10 } } },
          ],
        },
      },
      {
        badge: 'Pista 3',
        title: 'El más presente en la escena',
        statement: `Escribí <code>sospechoso_mas_presente(archivo)</code> que <b>devuelva</b> el nombre del sospechoso con más pisadas sumando <b>todas</b> las salas.`,
        hint: 'Agrupá por sospechoso, sumá y usá <code>.idxmax()</code>.',
        starter: 'import pandas as pd\n\ndef sospechoso_mas_presente(archivo):\n    pass',
        test: {
          funcName: 'sospechoso_mas_presente',
          cases: [
            { args: ['huellas.csv'], files: HUELLAS_CSV, expect: { type: 'exact', value: 'Moran' } },
            { args: ['huellas.csv'], files: { 'huellas.csv': 'sospechoso,sala,pisadas\nAdler,Hall,99\nMoran,Hall,1\n' },
              expect: { type: 'exact', value: 'Adler' } },
          ],
        },
      },
      {
        badge: 'Pista 4',
        title: 'Promedio de una medición',
        statement: `El perito midió la <b>profundidad</b> (en mm) de varias pisadas. Escribí <code>promedio(valores)</code> que reciba una <b>lista</b> y <b>devuelva</b> el promedio, redondeado a 2 decimales con <code>round(x, 2)</code>.
<pre>promedio([10, 20, 30, 40, 50])
30.0</pre>`,
        hint: 'Pasá la lista a <code>np.array</code> y usá <code>.mean()</code>.',
        starter: 'import numpy as np\n\ndef promedio(valores):\n    pass',
        test: {
          funcName: 'promedio',
          cases: [
            { args: [[10, 20, 30, 40, 50]], expect: { type: 'numeric', value: 30.0 } },
            { args: [[5, 10, 7, 3]], expect: { type: 'numeric', value: 6.25 } },
          ],
        },
      },
      {
        badge: 'Pista 5',
        title: 'La medición que no encaja',
        statement: `Entre las profundidades medidas hay una que se sale de lo normal: esa es la pisada del culpable, la que <b>más se aleja del promedio</b>. Escribí <code>medida_mas_rara(valores)</code> que <b>devuelva la posición</b> (índice) de esa medición.
<pre>medida_mas_rara([22, 24, 21, 23, 25, 60, 22, 23])
5</pre>`,
        hint: 'Con numpy: la distancia al promedio es <code>np.abs(a - a.mean())</code>, y <code>.argmax()</code> te da la posición de la más grande. Devolvé un <code>int</code>.',
        starter: 'import numpy as np\n\ndef medida_mas_rara(valores):\n    pass',
        test: {
          funcName: 'medida_mas_rara',
          cases: [
            { args: [[22, 24, 21, 23, 25, 60, 22, 23]], expect: { type: 'numeric', value: 5 } },
            { args: [[5, 6, 5, 7, 6, 5, 40]], expect: { type: 'numeric', value: 6 } },
          ],
        },
      },
      {
        badge: 'Caso cerrado',
        title: '¿Quién fue?',
        statement: `Hora de acusar. Escribí <code>identificar_culpable(archivo, sala)</code> que <b>devuelva</b> el nombre del sospechoso con <b>más pisadas en esa sala</b> (el lugar del crimen es la <code>Boveda</code>).
<pre>identificar_culpable('huellas.csv', 'Boveda')
'Moran'</pre>`,
        hint: 'Filtrás por sala, ordenás por pisadas de mayor a menor y mirás la primera fila; o agrupás por sospechoso y usás <code>.idxmax()</code>.',
        starter: 'import pandas as pd\n\ndef identificar_culpable(archivo, sala):\n    pass',
        test: {
          funcName: 'identificar_culpable',
          cases: [
            { args: ['huellas.csv', 'Boveda'], files: HUELLAS_CSV, expect: { type: 'exact', value: 'Moran' } },
            { args: ['huellas.csv', 'Hall'], files: { 'huellas.csv': 'sospechoso,sala,pisadas\nMoran,Hall,3\nAdler,Hall,9\n' },
              expect: { type: 'exact', value: 'Adler' } },
          ],
        },
      },
    ],
  },

  // ── Peritaje de código (Evaluación de Código) ──────────────
  review: {
    eyebrow: 'Peritaje de código',
    title: 'Dos informes periciales no andan',
    description: 'Dos peritos entregaron estas funciones y dan mal. Ponete los lentes de Sherlock: leé cada una, encontrá los errores y arreglala en el editor. Verificar corre los tests sobre tu versión.',
    sheetPrefix: 'Sherlock-Peritaje-',
    items: [
      {
        badge: 'Informe 1',
        title: 'Sospechosos con muchos cabellos',
        statement: `<code>indicios.csv</code> tiene cuántos <code>cabellos</code> de cada sospechoso aparecieron en la escena. Esta función tendría que <b>devolver una lista</b> con los sospechosos que dejaron más de 10 cabellos, pero está mal. Encontrá los errores y arreglala.
<pre>def sospechosos_con_cabellos(archivo):
    df = pd.read_csv(archivo)
    mayores = df[df['cabellos'] > '10']
    print(mayores)</pre>
<p>Dos problemas: compara contra el texto <code>'10'</code> en vez del número <code>10</code>, y <code>print</code> en vez de <code>return</code> (y hay que devolver solo los nombres).</p>`,
        starter: "import pandas as pd\n\ndef sospechosos_con_cabellos(archivo):\n    df = pd.read_csv(archivo)\n    mayores = df[df['cabellos'] > '10']\n    print(mayores)",
        test: {
          funcName: 'sospechosos_con_cabellos',
          cases: [
            { args: ['indicios.csv'], files: INDICIOS, expect: { type: 'json', value: ['Moran', 'Hudson'] } },
            { args: ['indicios.csv'], files: { 'indicios.csv': 'sospechoso,cabellos\nAdler,30\nMoran,2\n' },
              expect: { type: 'json', value: ['Adler'] } },
          ],
        },
      },
      {
        badge: 'Informe 2',
        title: 'Promedio de profundidad',
        statement: `Esta función tendría que devolver el promedio de una lista de profundidades, pero da error y además no aprovecha numpy. Arreglala (podés hacerlo en una línea con numpy).
<pre>def promedio_profundidad(valores):
    array = np.array(valores)
    for d in array:
        suma += d
        cant += d
    return suma / cant</pre>
<p>Errores: <code>suma</code> y <code>cant</code> nunca se inicializan, <code>cant += d</code> debería contar de a uno, y numpy ya tiene <code>.mean()</code>.</p>`,
        starter: 'import numpy as np\n\ndef promedio_profundidad(valores):\n    array = np.array(valores)\n    for d in array:\n        suma += d\n        cant += d\n    return suma / cant',
        test: {
          funcName: 'promedio_profundidad',
          cases: [
            { args: [[22, 24, 21, 23, 25]], expect: { type: 'numeric', value: 23.0 } },
            { args: [[10, 20, 30]], expect: { type: 'numeric', value: 20.0 } },
          ],
        },
      },
    ],
  },

  feedback: {
    eyebrow: 'Cierre',
    title: 'Formulario de feedback',
    description: 'Último paso del caso: contanos cómo nos fue con las bibliotecas. Son dos minutos y nos sirve muchísimo.',
    note: '¿Se entendió pandas? ¿Y numpy? ¿El caso ayudó a enganchar? Escaneá el QR o abrí el link.',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSeHXspjNmFyFKBorgadUxrksfIs-tbQVNRqAuX6sGUkbBeKAg/viewform',
  },
};
