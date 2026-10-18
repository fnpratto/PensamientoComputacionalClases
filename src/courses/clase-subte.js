/* Clase 9 · Bibliotecas (Unidad 6) — "Detectives del Subte"
   Datos REALES: molinetes de SBASE 2024 (portal de datos abiertos del GCBA,
   dataset "Subte: Viajes Molinetes"). Limpiados y agregados a dos vistas:
     public/datos/clase-subte/subte_diario_por_linea.csv       (fecha,linea,pasajeros)
     public/datos/clase-subte/subte_diario_por_estacion.csv    (fecha,linea,estacion,pasajeros)
   Los ejercicios de la página corren sobre un recorte real (una semana de marzo);
   el dataset completo y el desafío final se trabajan en Colab. */

import { bibliotecasQuiz } from './_bibliotecas-quiz.js';
import { bibliotecasGuide } from './_bibliotecas-guide.js';

// ── Recorte real para los ejercicios de la página ────────────
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
const VIAJES = { 'viajes.csv': `fecha,linea,pasajeros\n${SEMANA}` };

// Estaciones de la Línea B el martes 2024-03-19 (recorte real por estación).
const ESTACIONES_B = [
  '2024-03-19,B,Angel Gallardo,12648', '2024-03-19,B,Callao.B,13603', '2024-03-19,B,Carlos Gardel,10960',
  '2024-03-19,B,Carlos Pellegrini,15252', '2024-03-19,B,Dorrego,10265', '2024-03-19,B,Echeverria,5414',
  '2024-03-19,B,Federico Lacroze,21935', '2024-03-19,B,Florida,12461', '2024-03-19,B,Leandro N. Alem,16287',
  '2024-03-19,B,Los Incas,7711', '2024-03-19,B,Malabia,14705', '2024-03-19,B,Medrano,14487',
  '2024-03-19,B,Pasteur,11476', '2024-03-19,B,Pueyrredon,9385', '2024-03-19,B,Rosas,23952',
  '2024-03-19,B,Tronador,5454', '2024-03-19,B,Uruguay,11523',
].join('\n') + '\n';
const ESTACIONES = { 'estaciones.csv': `fecha,linea,estacion,pasajeros\n${ESTACIONES_B}` };

const DATOS_LINK = '/datos/clase-subte/subte_diario_por_linea.csv';
const DATOS_EST_LINK = '/datos/clase-subte/subte_diario_por_estacion.csv';

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
    subtitle: 'Cargamos los molinetes reales de SBASE 2024 (datos abiertos del GCBA), los limpiamos con pandas, medimos con numpy y buscamos al sospechoso: ¿qué día fue el más raro del año y por qué?',
    decoration: '🚇 🗺️ 🕵️ 📊 🎫 📉',
  },
  footer: 'Detectives del Subte · Unidad 6 · Pensamiento Computacional FIUBA 🚇',
  nav: {
    label: 'Detectives del Subte',
    quiz: 'Quiz de nivelación',
    guide: 'Apunte',
    exercises: 'Ejercicios',
    feedback: 'Feedback',
  },

  quiz: { ...bibliotecasQuiz, sheet: 'Subte-Quiz' },

  // ── Apunte: el compartido + links a los datos reales + el desafío final ──
  guide: {
    ...bibliotecasGuide,
    closing: {
      title: bibliotecasGuide.closing.title,
      html: `${bibliotecasGuide.closing.html}
<p class="guide-lead" style="margin-top:1.2rem">Estructura de un gráfico con matplotlib (machete):</p>
<pre>_, ax = plt.subplots()

ax.plot(x, y, label="Etiqueta de la curva")

ax.set_title("Título del gráfico")
ax.set_xlabel("Descripción en Eje X")
ax.set_ylabel("Descripción en Eje Y")

ax.legend()
ax.grid()
plt.show()</pre>`,
    },
    title: 'pandas, numpy y matplotlib con los datos del subte',
    method: {
      title: 'Los datos: molinetes reales del subte (SBASE 2024)',
      html: `<p class="guide-lead">Trabajamos con datos abiertos <b>reales</b> del GCBA: la cantidad de pasajeros que pasaron por los molinetes del subte en 2024. Los dejamos limpios y agregados en dos archivos:</p>
<pre>fecha,linea,pasajeros                 # subte_diario_por_linea.csv
2024-01-02,A,127202
2024-01-02,B,153901
...

fecha,linea,estacion,pasajeros        # subte_diario_por_estacion.csv
2024-03-19,B,Rosas,23952
...</pre>
<p>Descargalos para Colab: <a href="${DATOS_LINK}" download>pasajeros por línea</a> · <a href="${DATOS_EST_LINK}" download>pasajeros por estación</a>. En Colab se cargan con <code>pd.read_csv('subte_diario_por_linea.csv')</code>.</p>
<p>📓 <a href="/datos/clase-subte/detectives-del-subte.ipynb" download><b>Descargá la notebook para Colab</b></a>: tiene todos los enunciados y las celdas listas para completar (pandas, numpy, matplotlib y el desafío final). Abrila en <a href="https://colab.research.google.com/" target="_blank" rel="noreferrer">Google Colab</a> y subí los dos CSV.</p>
<p>Dos cosas que vas a descubrir y que son parte del caso: los fines de semana y feriados tienen muchísimos menos pasajeros que un día de semana, y hay días que directamente <b>faltan</b> en los datos (¡todo octubre!). Un detective de datos siempre desconfía primero de los datos.</p>`,
    },
    groups: [
      ...bibliotecasGuide.groups,
      {
        label: 'Producto final (para Colab)',
        items: [
          {
            tag: 'Integrador · estilo parcial',
            title: 'Análisis de la demanda y días pico (Incisos A y B)',
            html: `<p>Con el dataset completo <code>subte_diario_por_linea.csv</code>, en Colab. <b>Base:</b> archivos, pandas, numpy y matplotlib — armar un DataFrame desde un archivo y operar, o guardar el resultado en un archivo. <b>Siempre graficar.</b></p>
<p><b>Inciso A.</b> Mateo mencionó que sabía algo de Python y trabaja en Amoba, por eso mismo le dan un CSV con los pasajeros diarios del subte en 2024, <code>subte_diario_por_linea.csv</code> (<code>fecha,linea,pasajeros</code>), y le piden que escriba <code>analizar_y_graficar_demanda(ruta_archivo)</code> que: (1) calcule el promedio de pasajeros por día de todo el subte (sumando las líneas de cada fecha); (2) calcule, para cada línea, su <b>porcentaje de participación</b> en la demanda total del año <code>participacion = (total_de_la_linea / total_general) * 100</code>; y (3) grafique las líneas y su participación (gráfico de barras).</p>
<p><b>Inciso B.</b> Como Mateo hizo un gran trabajo, ahora le piden que escriba <code>exportar_dias_pico(ruta_archivo, linea, n)</code> que: (1) filtre solo las filas de la línea recibida por parámetro; (2) las ordene de mayor a menor según <code>pasajeros</code>; y (3) exporte las <code>n</code> primeras filas (los <code>n</code> días de mayor demanda) a un CSV <code>dias_pico.csv</code>.</p>
<p>Conclusión: ¿qué línea concentra más demanda? ¿Los días pico son hábiles o fin de semana, y por qué? La notebook descargable trae las dos celdas listas para completar.</p>`,
          },
        ],
      },
    ],
  },

  // ── Ejercicios (recorte real, autocorregidos) ──────────────
  exercises: {
    eyebrow: 'Ejercicios',
    title: 'Primeras pistas con pandas y numpy',
    description: 'Calentamos con un recorte real: la semana del 18 al 24 de marzo de 2024 (archivo viajes.csv) y las estaciones de la Línea B (estaciones.csv), ya cargados. Cada ejercicio es una consigna estilo parcial. El dataset completo y el integrador final (análisis de la demanda y días pico) quedan para Colab (están en el apunte).',
    sheetPrefix: 'Subte-',
    items: [
      {
        badge: 'Ejercicio 1',
        title: 'Pasajeros de un día',
        statement: `El equipo de datos de SBASE le pasa a Mateo el archivo <code>viajes.csv</code>, con una fila por línea y por día.
<pre>fecha,linea,pasajeros
2024-03-18,A,176568
2024-03-18,B,210625
...</pre>
<p>Para el informe diario, le piden a Mateo que escriba <code>total_del_dia(archivo, fecha)</code> que <b>devuelva</b> el total de pasajeros de todo el subte en esa fecha (sumando todas las líneas).</p>`,
        hint: 'Primero filtrás las filas de esa fecha, después sumás la columna pasajeros. Devolvé un <code>int</code>.',
        starter: 'import pandas as pd\n\ndef total_del_dia(archivo, fecha):\n    pass',
        test: {
          funcName: 'total_del_dia',
          cases: [
            { args: ['viajes.csv', '2024-03-19'], files: VIAJES, expect: { type: 'numeric', value: 929675 } },
            { args: ['viajes.csv', '2024-03-23'], files: VIAJES, expect: { type: 'numeric', value: 434467 } },
          ],
        },
      },
      {
        badge: 'Ejercicio 2',
        title: 'Pasajeros por línea de un día',
        statement: `Al jefe de Mateo no le alcanza con el total: quiere el desglose por línea de ese día. Le piden que escriba <code>pasajeros_por_linea(archivo, fecha)</code> que <b>devuelva un diccionario</b> <code>{linea: pasajeros}</code> con lo de cada línea en esa fecha.
<pre>pasajeros_por_linea('viajes.csv', '2024-03-19')
{'A': 186305, 'B': 217518, 'C': 142881, 'D': 176043, 'E': 96802, 'H': 110126}</pre>`,
        hint: 'Filtrás por fecha y agrupás por línea sumando pasajeros. <code>.to_dict()</code> lo convierte en diccionario.',
        starter: 'import pandas as pd\n\ndef pasajeros_por_linea(archivo, fecha):\n    pass',
        test: {
          funcName: 'pasajeros_por_linea',
          cases: [
            { args: ['viajes.csv', '2024-03-19'], files: VIAJES,
              expect: { type: 'json', value: { A: 186305, B: 217518, C: 142881, D: 176043, E: 96802, H: 110126 } } },
            { args: ['viajes.csv', '2024-03-20'], files: VIAJES,
              expect: { type: 'json', value: { A: 130684, B: 146845, C: 105364, D: 110036, E: 72329, H: 72459 } } },
          ],
        },
      },
      {
        badge: 'Ejercicio 3',
        title: 'La línea más usada',
        statement: `La gerencia quiere saber qué línea mueve más gente en toda la semana para priorizar mantenimiento. Le piden a Mateo que escriba <code>linea_mas_usada(archivo)</code> que <b>devuelva</b> la letra de la línea con más pasajeros sumando <b>todos</b> los días del archivo.`,
        hint: 'Agrupá por línea, sumá y usá <code>.idxmax()</code> para quedarte con la de mayor total.',
        starter: 'import pandas as pd\n\ndef linea_mas_usada(archivo):\n    pass',
        test: {
          funcName: 'linea_mas_usada',
          cases: [
            { args: ['viajes.csv'], files: VIAJES, expect: { type: 'exact', value: 'B' } },
            { args: ['viajes.csv'], files: { 'viajes.csv': 'fecha,linea,pasajeros\n2024-07-01,A,500\n2024-07-01,B,100\n' },
              expect: { type: 'exact', value: 'A' } },
          ],
        },
      },
      {
        badge: 'Ejercicio 4',
        title: 'Top de estaciones',
        statement: `Para reforzar molinetes, a Mateo le dan <code>estaciones.csv</code> con los pasajeros por estación de la Línea B el 19/3.
<pre>fecha,linea,estacion,pasajeros
2024-03-19,B,Rosas,23952
2024-03-19,B,Federico Lacroze,21935
...</pre>
<p>Le piden que escriba <code>top_estaciones(archivo, n)</code> que <b>devuelva una lista</b> con los nombres de las <code>n</code> estaciones con más pasajeros, de mayor a menor.</p>`,
        hint: 'Ordená por pasajeros de mayor a menor, quedate con las primeras <code>n</code> filas y devolvé la columna estacion como lista (<code>.tolist()</code>).',
        starter: 'import pandas as pd\n\ndef top_estaciones(archivo, n):\n    pass',
        test: {
          funcName: 'top_estaciones',
          cases: [
            { args: ['estaciones.csv', 3], files: ESTACIONES,
              expect: { type: 'json', value: ['Rosas', 'Federico Lacroze', 'Leandro N. Alem'] } },
            { args: ['estaciones.csv', 2], files: ESTACIONES,
              expect: { type: 'json', value: ['Rosas', 'Federico Lacroze'] } },
          ],
        },
      },
      {
        badge: 'Ejercicio 5',
        title: 'Promedio de pasajeros',
        statement: `Mateo tiene una <b>lista</b> con los pasajeros de cada día de una línea y necesita el valor típico para comparar. Le piden que escriba <code>promedio(valores)</code> que <b>devuelva</b> el promedio, redondeado a 2 decimales con <code>round(x, 2)</code>.
<pre>promedio([10, 20, 30, 40, 50])
30.0</pre>`,
        hint: 'Convertí la lista a <code>np.array</code> y usá <code>.mean()</code>.',
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
        badge: 'Ejercicio 6',
        title: 'El día más raro',
        statement: `A Mateo le piden detectar automáticamente el día que se despega del resto: el día más "raro" es el que <b>más se aleja del promedio</b> (para arriba o para abajo). Tiene que escribir <code>dia_mas_raro(valores)</code> que reciba una lista de pasajeros por día y <b>devuelva la posición</b> (índice) del día más raro.
<pre>dia_mas_raro([100, 102, 98, 101, 99, 250, 100])
5</pre>`,
        hint: 'Con numpy: calculá el promedio, la distancia de cada día al promedio con <code>np.abs(a - a.mean())</code>, y la posición del más grande con <code>.argmax()</code>. Devolvé un <code>int</code>.',
        starter: 'import numpy as np\n\ndef dia_mas_raro(valores):\n    pass',
        test: {
          funcName: 'dia_mas_raro',
          cases: [
            { args: [[100, 102, 98, 101, 99, 250, 100]], expect: { type: 'numeric', value: 5 } },
            { args: [[50, 52, 48, 51, 49, 53, 47, 5]], expect: { type: 'numeric', value: 7 } },
          ],
        },
      },
    ],
  },

  feedback: {
    eyebrow: 'Cierre',
    title: 'Formulario de feedback',
    description: 'Último paso: contanos cómo nos fue con las bibliotecas y el caso del subte. Son dos minutos y nos sirve muchísimo.',
    note: '¿Se entendió pandas? ¿Y numpy? ¿El caso real ayudó o complicó? Escaneá el QR o abrí el link.',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSeHXspjNmFyFKBorgadUxrksfIs-tbQVNRqAuX6sGUkbBeKAg/viewform',
  },
};
