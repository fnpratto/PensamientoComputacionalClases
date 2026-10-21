/* Clase 9 · Bibliotecas (Unidad 6) — "Detectives del Subte"
   Datos REALES: molinetes de SBASE 2024 (portal de datos abiertos del GCBA,
   dataset "Subte: Viajes Molinetes"). Limpiados y agregados a dos vistas:
     public/datos/clase-subte/subte_diario_por_linea.csv       (fecha,linea,pasajeros)
     public/datos/clase-subte/subte_diario_por_estacion.csv    (fecha,linea,estacion,pasajeros)
   Los ejercicios de la página corren sobre un recorte real (una semana de marzo)
   con los mismos nombres de archivo; el dataset completo, matplotlib y la tarea
   se trabajan en Colab. */

import { bibliotecasQuiz } from './_bibliotecas-quiz.js';
import { bibliotecasGuide } from './_bibliotecas-guide.js';

// ── Recortes reales para los ejercicios de la página ─────────
// Semana del 18 al 24 de marzo de 2024 (por línea). Valores tal cual salen
// de los datos abiertos: lunes a viernes altos, finde en baja.
const SEMANA = [
  '2024-03-18,A,176568', '2024-03-18,B,210625', '2024-03-18,C,142956', '2024-03-18,D,163945', '2024-03-18,E,91072', '2024-03-18,H,104715',
  '2024-03-19,A,186305', '2024-03-19,B,217518', '2024-03-19,C,142881', '2024-03-19,D,176043', '2024-03-19,E,96802', '2024-03-19,H,110126',
  '2024-03-20,A,130684', '2024-03-20,B,146845', '2024-03-20,C,105364', '2024-03-20,D,110036', '2024-03-20,E,72329', '2024-03-20,H,72459',
  '2024-03-21,A,191897', '2024-03-21,B,232340', '2024-03-21,C,148147', '2024-03-21,D,184590', '2024-03-21,E,99809', '2024-03-21,H,108178',
  '2024-03-22,A,186375', '2024-03-22,B,219066', '2024-03-22,C,140855', '2024-03-22,D,176176', '2024-03-22,E,92975', '2024-03-22,H,105470',
  '2024-03-23,A,87178', '2024-03-23,B,109992', '2024-03-23,C,69614', '2024-03-23,D,81040', '2024-03-23,E,35146', '2024-03-23,H,51497',
  '2024-03-24,A,82755', '2024-03-24,B,96078', '2024-03-24,C,63396', '2024-03-24,D,82219', '2024-03-24,E,43002', '2024-03-24,H,29959',
].join('\n') + '\n';
const POR_LINEA = { 'subte_diario_por_linea.csv': `fecha,linea,pasajeros\n${SEMANA}` };

// Rosas y Federico Lacroze (Línea B) en la misma semana. Lacroze está para
// que haga falta filtrar por estación: sin filtro, su 21/3 se mete en el top.
const ESTACIONES_SEMANA = [
  '2024-03-18,B,Federico Lacroze,22826', '2024-03-18,B,Rosas,22979',
  '2024-03-19,B,Federico Lacroze,21935', '2024-03-19,B,Rosas,23952',
  '2024-03-20,B,Federico Lacroze,16359', '2024-03-20,B,Rosas,16787',
  '2024-03-21,B,Federico Lacroze,24548', '2024-03-21,B,Rosas,25726',
  '2024-03-22,B,Federico Lacroze,23563', '2024-03-22,B,Rosas,24124',
  '2024-03-23,B,Federico Lacroze,10715', '2024-03-23,B,Rosas,10913',
  '2024-03-24,B,Federico Lacroze,9397', '2024-03-24,B,Rosas,10688',
].join('\n') + '\n';
const POR_ESTACION = { 'subte_diario_por_estacion.csv': `fecha,linea,estacion,pasajeros\n${ESTACIONES_SEMANA}` };

const DATOS_LINK = '/datos/clase-subte/subte_diario_por_linea.csv';
const DATOS_EST_LINK = '/datos/clase-subte/subte_diario_por_estacion.csv';
const NOTEBOOK_LINK = '/datos/clase-subte/detectives-del-subte.ipynb';

/** @type {import('./types.js').Course} */
export default {
  slug: 'clase-subte',
  title: 'Detectives del Subte',
  packages: ['numpy', 'pandas'],
  gate: {
    emoji: '🚇',
    title: ['Detectives', 'del Subte'],
    subtitle: 'Bibliotecas de Python con datos abiertos reales del subte porteño · Unidad 6',
    buttonLabel: 'Entrar a la estación',
  },
  hero: {
    badge: '🚇 Pensamiento Computacional · Curso 11: Retamozo, Pratto · 2026',
    title: ['Unidad 6 ·', 'Detectives del Subte'],
    subtitle: 'NumPy, pandas y matplotlib con los molinetes reales de SBASE 2024 (datos abiertos del GCBA). ¿Qué día fue el más raro del año? ¿Qué línea mueve más gente?',
    decoration: '🚇 🗺️ 🕵️ 📊 🎫 📉',
  },
  footer: 'Detectives del Subte · Unidad 6 · Pensamiento Computacional FIUBA 🚇',
  nav: {
    label: 'Detectives del Subte',
    quiz: 'Quiz de nivelación',
    guide: 'El caso',
    exercises: 'Ejercicios',
    review: 'Evaluación de código',
    appendix: 'matplotlib y tarea',
    feedback: 'Feedback',
  },

  quiz: { ...bibliotecasQuiz, sheet: 'Subte-Quiz' },

  // ── El caso: los datos, los temas y el apunte ──────────────
  guide: {
    ...bibliotecasGuide,
    eyebrow: 'El caso',
    title: 'Los datos: molinetes reales del subte (SBASE 2024)',
    description: 'Dataset: Subte: Viajes Molinetes, de SBASE (portal de datos abiertos del GCBA), año 2024. Abrí cada tema para ver qué vamos a usar.',
    method: {
      title: 'El caso',
      html: `<p class="guide-lead">Limpiamos y agregamos los datos originales en dos archivos CSV:</p>
<ul>
<li><code>subte_diario_por_linea.csv</code> → <code>fecha, linea, pasajeros</code></li>
<li><code>subte_diario_por_estacion.csv</code> → <code>fecha, linea, estacion, pasajeros</code></li>
</ul>
<p><b>Fuente:</b> <a href="https://data.buenosaires.gob.ar/dataset/subte-viajes-molinetes" target="_blank" rel="noreferrer">data.buenosaires.gob.ar/dataset/subte-viajes-molinetes</a></p>
<p><b>Nota de datos — Parte del caso.</b> Los fines de semana y feriados tienen muchísimos menos pasajeros que los días de semana. Además, hay días que directamente faltan: ¡todo octubre! Un detective de datos siempre desconfía primero de los datos.</p>
<p>Descargalos para Colab: <a href="${DATOS_LINK}" download>pasajeros por línea</a> · <a href="${DATOS_EST_LINK}" download>pasajeros por estación</a>. 📓 <a href="${NOTEBOOK_LINK}" download><b>Notebook para Colab</b></a> con todos los ejercicios listos para completar: abrila en <a href="https://colab.research.google.com/" target="_blank" rel="noreferrer">Google Colab</a> y subí los dos CSV.</p>
<p>En la página, los ejercicios corren sobre un recorte real de esos mismos archivos (la semana del 18 al 24 de marzo de 2024), ya cargado.</p>`,
    },
    groups: [
      {
        label: 'Qué vamos a ver',
        items: [
          {
            tag: 'Unidad 6',
            title: 'NumPy',
            html: `<ul>
<li>Arrays: cómo crearlos, atributos, mutabilidad</li>
<li>Operaciones con arrays, ecuaciones</li>
</ul>
<p><i>Recomendación de la cátedra:</i> NumPy: 5, 6, 7, 8, 9 · Evaluación de Código: 2, 4.</p>`,
          },
          {
            tag: 'Unidad 6',
            title: 'pandas',
            html: `<ul>
<li>Series: comparación con arrays</li>
<li>DataFrames desde csv o diccionarios</li>
<li>Atributos y métodos</li>
<li>Acceso a filas</li>
<li>Modificar filas y valores</li>
<li>Filtrado</li>
<li>Ordenamiento</li>
<li>Archivos csv</li>
</ul>
<p><i>Recomendación de la cátedra:</i></p>
<ul>
<li>Pandas Básico: 6, 8, 9, 12, 14, 17, 19, 21, 22.</li>
<li>Pandas CSV: 1, 2, 5, 6, 7.</li>
<li>Evaluación de Código: 1, 3.</li>
</ul>`,
          },
          {
            tag: 'pandas',
            title: 'Antes de empezar: ¿cómo formateamos el dataset?',
            html: `<p>En nuestro análisis vamos a estar revisando cantidad de pasajeros totales por fecha, línea de subte y pasajeros en total. El dataset original trae muchas más columnas de las que necesitamos. ¿Cómo deberíamos formatearlo para que nos quede más útil?</p>
<ul>
<li>Eliminar columnas que no sirvan y quedarnos con las que sí: <code>fecha</code>, <code>linea</code>, <code>pax_total</code>.</li>
<li>Formatear el texto de las líneas para pasar de <code>"LineaA"</code> → <code>"A"</code>.</li>
<li>Cambiarle el nombre a la columna <code>pax_total</code> → <code>pasajeros</code>.</li>
</ul>`,
          },
        ],
      },
      ...bibliotecasGuide.groups
        .filter(g => g.label !== 'matplotlib (para Colab)')
        .map(g => ({ ...g, label: `Apunte · ${g.label}` })),
    ],
  },

  // ── Ejercicios (recorte real, autocorregidos) ──────────────
  exercises: {
    eyebrow: 'Ejercicios',
    title: 'NumPy y pandas',
    description: 'Primero NumPy con listas de pasajeros, después pandas con los CSV del subte (un recorte real ya cargado con los mismos nombres de archivo). Probá tu solución con Verificar: corre los tests automáticos.',
    sheetPrefix: 'Subte-',
    items: [
      /* ── NumPy ── */
      {
        badge: 'NumPy · Ejercicio 1',
        title: 'Promedio de pasajeros',
        statement: `<p>Se quiere una función donde se recibe una lista de pasajeros por día y devuelve el promedio redondeado a dos decimales.</p>
<p><b>Ejemplo</b></p>
<pre>calcular_promedio([10, 20, 30, 40, 50])  # -&gt; 30.0</pre>`,
        starter: 'import numpy as np\n\ndef calcular_promedio(valores):\n    pass',
        test: {
          funcName: 'calcular_promedio',
          cases: [
            { args: [[10, 20, 30, 40, 50]], expect: { type: 'numeric', value: 30.0 } },
            { args: [[5, 10, 7, 3]], expect: { type: 'numeric', value: 6.25 } },
            { args: [[1, 2, 2]], expect: { type: 'numeric', value: 1.67, tolerance: 0.001 } },
          ],
        },
      },
      {
        badge: 'NumPy · Ejercicio 2',
        title: 'El día más raro',
        statement: `<p>El día más raro es el que <b>más se aleja del promedio</b>, tanto hacia arriba como hacia abajo. Escribir una función que busque el día más raro y devuelva su posición (índice).</p>
<p><b>Ejemplo</b></p>
<pre>obtener_dia_mas_raro([100, 102, 98, 101, 99, 250, 100])  # -&gt; 5</pre>`,
        starter: 'import numpy as np\n\ndef obtener_dia_mas_raro(valores):\n    pass',
        test: {
          funcName: 'obtener_dia_mas_raro',
          cases: [
            { args: [[100, 102, 98, 101, 99, 250, 100]], expect: { type: 'numeric', value: 5 } },
            { args: [[50, 52, 48, 51, 49, 53, 47, 5]], expect: { type: 'numeric', value: 7 } },
          ],
        },
      },
      {
        badge: 'NumPy · Ejercicio 3',
        title: 'Distancia entre dos semanas',
        statement: `<p>Se quiere comparar dos semanas de pasajeros (dos listas de la misma longitud). La <b>distancia</b> entre ellas es la raíz cuadrada de la suma de las diferencias al cuadrado, día por día. Escribir una función que la calcule.</p>
<p><b>Ejemplo</b></p>
<pre>calcular_distancia([1, 2, 3], [4, 6, 3])  # -&gt; 5.0</pre>`,
        starter: 'import numpy as np\n\ndef calcular_distancia(semana1, semana2):\n    pass',
        test: {
          funcName: 'calcular_distancia',
          cases: [
            { args: [[1, 2, 3], [4, 6, 3]], expect: { type: 'numeric', value: 5.0 } },
            { args: [[0, 0], [3, 4]], expect: { type: 'numeric', value: 5.0 } },
            { args: [[7, 7, 7, 7], [7, 7, 7, 7]], expect: { type: 'numeric', value: 0.0 } },
          ],
        },
      },

      /* ── pandas ── */
      {
        badge: 'pandas · Ejercicio 1',
        title: 'Pasajeros de un día',
        statement: `<p>Trabajamos con <code>subte_diario_por_linea.csv</code> (<code>fecha, linea, pasajeros</code>).</p>
<p>Quiero una función que calcule el total de pasajeros de todo el subte de una fecha.</p>
<p><b>Ejemplo</b></p>
<pre>calcular_total_del_dia('subte_diario_por_linea.csv', '2024-03-19')
# -&gt; 929675</pre>`,
        starter: 'import pandas as pd\n\ndef calcular_total_del_dia(archivo, fecha):\n    pass',
        test: {
          funcName: 'calcular_total_del_dia',
          cases: [
            { args: ['subte_diario_por_linea.csv', '2024-03-19'], files: POR_LINEA, expect: { type: 'numeric', value: 929675 } },
            { args: ['subte_diario_por_linea.csv', '2024-03-23'], files: POR_LINEA, expect: { type: 'numeric', value: 434467 } },
          ],
        },
      },
      {
        badge: 'pandas · Ejercicio 2',
        title: 'Pasajeros por línea',
        statement: `<p>Quiero saber los pasajeros de una línea en una fecha.</p>
<p><b>Ejemplo</b></p>
<pre>obtener_pasajeros_de_la_linea('subte_diario_por_linea.csv', 'B', '2024-03-19')
# -&gt; 217518</pre>`,
        starter: 'import pandas as pd\n\ndef obtener_pasajeros_de_la_linea(archivo, linea, fecha):\n    pass',
        test: {
          funcName: 'obtener_pasajeros_de_la_linea',
          cases: [
            { args: ['subte_diario_por_linea.csv', 'B', '2024-03-19'], files: POR_LINEA, expect: { type: 'numeric', value: 217518 } },
            { args: ['subte_diario_por_linea.csv', 'H', '2024-03-24'], files: POR_LINEA, expect: { type: 'numeric', value: 29959 } },
          ],
        },
      },
      {
        badge: 'pandas · Ejercicio 3',
        title: 'La línea más usada',
        statement: `<p>Se quiere saber cuál es la línea más útil. Para eso, buscá la línea con más pasajeros sumando todos los días del año. Las líneas son <code>'A'</code>, <code>'B'</code>, <code>'C'</code>, <code>'D'</code>, <code>'E'</code> y <code>'H'</code>.</p>
<p><b>Ejemplo</b></p>
<pre>obtener_linea_mas_usada('subte_diario_por_linea.csv')  # -&gt; 'B'</pre>`,
        starter: 'import pandas as pd\n\ndef obtener_linea_mas_usada(archivo):\n    pass',
        test: {
          funcName: 'obtener_linea_mas_usada',
          cases: [
            { args: ['subte_diario_por_linea.csv'], files: POR_LINEA, expect: { type: 'exact', value: 'B' } },
            { args: ['subte_diario_por_linea.csv'], files: { 'subte_diario_por_linea.csv': 'fecha,linea,pasajeros\n2024-07-01,A,500\n2024-07-01,B,100\n2024-07-02,B,300\n' },
              expect: { type: 'exact', value: 'A' } },
          ],
        },
      },
      {
        badge: 'pandas · Ejercicio 4',
        title: 'Los días más concurridos de una estación',
        statement: `<p>Sofía quiere tocar unos covers en una estación de subte y busca los días en que más gente pasa por ahí. Quiere una función que, dada una estación y un número <code>n</code>, devuelva las fechas de los <code>n</code> días con más pasajeros, de mayor a menor.</p>
<p>Trabajamos con <code>subte_diario_por_estacion.csv</code> (<code>fecha, linea, estacion, pasajeros</code>).</p>
<p><b>Ejemplo</b></p>
<pre>obtener_dias_mas_concurridos('subte_diario_por_estacion.csv', 'Rosas', 3)
# -&gt; lista con 3 fechas, de la más concurrida a la menos</pre>`,
        starter: 'import pandas as pd\n\ndef obtener_dias_mas_concurridos(archivo, estacion, n):\n    pass',
        test: {
          funcName: 'obtener_dias_mas_concurridos',
          cases: [
            { args: ['subte_diario_por_estacion.csv', 'Rosas', 3], files: POR_ESTACION,
              expect: { type: 'json', value: ['2024-03-21', '2024-03-22', '2024-03-19'] } },
            { args: ['subte_diario_por_estacion.csv', 'Federico Lacroze', 2], files: POR_ESTACION,
              expect: { type: 'json', value: ['2024-03-21', '2024-03-22'] } },
          ],
        },
      },
    ],
  },

  // ── Evaluación de código ──────────────────────────────────
  review: {
    eyebrow: 'Evaluación de código',
    title: 'Encontrá y corregí los errores',
    description: 'Cada función tiene algo para corregir o mejorar. Arreglala en el editor y verificá: los tests corren sobre tu versión.',
    sheetPrefix: 'Subte-Evaluacion-',
    items: [
      {
        badge: 'NumPy',
        title: 'Producto escalar',
        statement: `<p>Esta función debería devolver el producto escalar de dos vectores (listas de números), o <code>None</code> si no tienen la misma longitud. Encontrá el error y corregilo.</p>
<pre>def calcular_producto_escalar(vector1, vector2):
    if len(vector1) != len(vector1):
        return None

    suma = 0
    for i in range(len(vector1)):
        suma += vector1[i] * vector2[i]
    return suma</pre>`,
        starter: 'def calcular_producto_escalar(vector1, vector2):\n    if len(vector1) != len(vector1):\n        return None\n\n    suma = 0\n    for i in range(len(vector1)):\n        suma += vector1[i] * vector2[i]\n    return suma',
        test: {
          funcName: 'calcular_producto_escalar',
          cases: [
            { args: [[1, 2, 3], [4, 5, 6]], expect: { type: 'numeric', value: 32 } },
            { args: [[1, 2, 3], [1, 2]], expect: { type: 'exact', value: 'null' } },
            { args: [[2], [1, 5]], expect: { type: 'exact', value: 'null' } },
          ],
        },
      },
      {
        badge: 'NumPy',
        title: 'Mejorá con numpy (matriz identidad)',
        statement: `<p>Esta función funciona, pero tiene 10 líneas. ¿Existe en numpy algo que la reemplace?</p>
<pre>def obtener_matriz_identidad(tamaño):
    matriz = []
    for i in range(tamaño):
        fila = []
        for j in range(tamaño):
            if i == j:
                fila.append(1)
            else:
                fila.append(0)
        matriz.append(fila)
    return matriz</pre>`,
        starter: 'def obtener_matriz_identidad(tamaño):\n    matriz = []\n    for i in range(tamaño):\n        fila = []\n        for j in range(tamaño):\n            if i == j:\n                fila.append(1)\n            else:\n                fila.append(0)\n        matriz.append(fila)\n    return matriz',
        note: 'Los tests ya pasan con esta versión: el desafío es reemplazarla por numpy sin que dejen de pasar.',
        test: {
          funcName: 'obtener_matriz_identidad',
          cases: [
            { args: [2], expect: { type: 'json', value: [[1, 0], [0, 1]] } },
            { args: [3], expect: { type: 'json', value: [[1, 0, 0], [0, 1, 0], [0, 0, 1]] } },
          ],
        },
      },
      {
        badge: 'pandas',
        title: 'Líneas llenas',
        statement: `<p>Debería mostrar las líneas con más de 100000 pasajeros en un día. Encontrá y corregí los errores.</p>
<pre>def lineas_llenas(archivo):
    df = pd.read_csv(archivo)
    llenas = df[df[2] &gt; '100000']
    print(llenas)</pre>`,
        starter: "def lineas_llenas(archivo):\n    df = pd.read_csv(archivo)\n    llenas = df[df[2] > '100000']\n    print(llenas)",
        test: {
          funcName: 'lineas_llenas',
          cases: [
            {
              args: ['subte_diario_por_linea.csv'],
              files: { 'subte_diario_por_linea.csv': 'fecha,linea,pasajeros\n2024-03-19,A,186305\n2024-03-19,E,96802\n2024-03-19,B,217518\n2024-03-23,E,35146\n' },
              expect: { type: 'json', value: {
                fecha: { 0: '2024-03-19', 2: '2024-03-19' },
                linea: { 0: 'A', 2: 'B' },
                pasajeros: { 0: 186305, 2: 217518 },
              } },
            },
            {
              args: ['subte_diario_por_linea.csv'],
              files: { 'subte_diario_por_linea.csv': 'fecha,linea,pasajeros\n2024-03-24,E,43002\n2024-03-24,H,29959\n' },
              expect: { type: 'json', value: { fecha: {}, linea: {}, pasajeros: {} } },
            },
          ],
        },
      },
    ],
  },

  // ── matplotlib (para Colab) y tarea ─────────────────────────
  appendix: {
    eyebrow: 'Para Colab',
    title: 'matplotlib y la tarea',
    description: 'Los gráficos no se pueden autocorregir en la página: estos se resuelven en Colab, con el dataset completo. Abrí cada ejercicio para ver la consigna.',
    method: {
      title: '¿Qué gráfico uso en cada caso?',
      html: `<table class="guide-table">
<thead><tr><th>Gráfico</th><th>Se usa para</th><th>Método</th></tr></thead>
<tbody>
<tr><td>Barras</td><td>Comparar categorías (por ejemplo, pasajeros por línea)</td><td><code>ax.bar(...)</code></td></tr>
<tr><td>Líneas</td><td>Ver cómo cambia algo a lo largo del tiempo</td><td><code>ax.plot(...)</code></td></tr>
<tr><td>Dispersión</td><td>Marcar puntos o ver la relación entre dos variables</td><td><code>ax.scatter(...)</code></td></tr>
<tr><td>Torta</td><td>Ver qué porcentaje del total representa cada categoría (conviene con pocas categorías)</td><td><code>ax.pie(...)</code></td></tr>
</tbody>
</table>`,
    },
    groups: [
      {
        label: 'matplotlib',
        items: [
          {
            tag: 'Ejercicio 1',
            title: 'Barras por línea',
            html: `<p>Graficar el total de pasajeros de 2024 por línea.</p>`,
          },
          {
            tag: 'Ejercicio 2',
            title: 'Serie temporal con el día más raro',
            html: `<p>Graficar el total diario de todo el subte y marcar el día que más se aleja del promedio.</p>`,
          },
          {
            tag: 'Ejercicio 3 · opcional',
            title: 'Histograma',
            html: `<p>Graficar cómo se distribuyen los pasajeros diarios de la línea B. ¿Qué forma tiene? ¿Qué explica esa forma?</p>`,
          },
          {
            tag: 'Ejercicio 4 · opcional',
            title: 'Torta: ¿qué porcentaje del subte usa cada línea?',
            html: `<p>Graficar qué porcentaje del total de pasajeros de 2024 representa cada línea. ¿Qué muestra de distinto una torta respecto de las barras del ejercicio 1?</p>`,
          },
        ],
      },
      {
        label: 'Tarea',
        items: [
          {
            tag: 'Tarea',
            title: 'Resolvé el caso — Sherlock Forense',
            html: `<p>Anoche robaron una obra de la bóveda del museo. No hay testigos, no hay cámaras… <b>pero hay datos.</b> Los sensores registraron cada pisada de cada sospechoso en cada sala, y esa evidencia alcanza para señalar al culpable. Su trabajo es hacerla hablar.</p>
<p>Con lo que vimos de <b>pandas</b> y <b>numpy</b> tienen todo lo necesario: filtrar la escena del crimen, agrupar por sospechoso, sacar promedios y encontrar la medición que no encaja. No hace falta ser un genio ni acertar de una — se trata de seguir las pistas, una por una, hasta que los números dejen de mentir.</p>
<p>🕵️ <b>Qué tienen que hacer:</b></p>
<p>Abran la notebook en Colab y completen las pistas: está todo armado, solo faltan sus líneas de código. Todo está en la página de <a href="/archive/clase-sherlock/index.html"><b>Sherlock Forense</b></a> (la notebook y la evidencia se descargan desde ahí).</p>
<p>Rematen con el <b>informe pericial</b> (estilo parcial): una función que calcule el <b>índice de concentración en la escena</b> de cada sospechoso y lo <b>grafique</b> en barras, y otra que <b>exporte</b> a un CSV los sospechosos de una sala ordenados por pisadas. El pico del gráfico es su principal sospechoso.</p>
<p>Traigan su conclusión: a quién acusan y qué evidencia lo delata (su presencia en la bóveda, el total de pisadas, la pisada más rara y ese índice de concentración). Dos o tres renglones alcanzan.</p>
<p>Si se traban, no sufran solos: tírenlo en <b>Discord</b> y lo resolvemos entre todos. Y si ya lo resolvieron, <b>vengan con el nombre del culpable</b> para la próxima clase.</p>`,
          },
        ],
      },
    ],
    closing: {
      title: 'Machete: estructura de un gráfico',
      html: `<pre>fig, ax = plt.subplots()

ax.plot(x, y, label="Etiqueta de la curva")

ax.set_title("Título del gráfico")
ax.set_xlabel("Descripción en Eje X")
ax.set_ylabel("Descripción en Eje Y")

ax.legend()
ax.grid()
plt.show()</pre>`,
    },
  },

  feedback: {
    eyebrow: 'Cierre',
    title: 'Formulario de feedback',
    description: 'Último paso: contanos cómo nos fue con las bibliotecas y el caso del subte. Son dos minutos y nos sirve muchísimo.',
    note: '¿Se entendió pandas? ¿Y numpy? ¿El caso real ayudó o complicó? Escaneá el QR o abrí el link.',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSeHXspjNmFyFKBorgadUxrksfIs-tbQVNRqAuX6sGUkbBeKAg/viewform',
  },
};
