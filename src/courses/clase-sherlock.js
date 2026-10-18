/* Clase 9 (variante) · Bibliotecas (Unidad 6) — "Sherlock Forense"
   Caso ficticio: robo de una obra en el museo. Los datos son inventados pero
   están armados para que el análisis con pandas/numpy apunte a un culpable.
   Datos descargables para Colab en public/datos/clase-sherlock/. */

import { bibliotecasGuide } from './_bibliotecas-guide.js';

// Única evidencia que usa la página: los indicios para el peritaje de código.
// La investigación completa (pandas/numpy paso a paso) vive en la notebook de Colab.
const INDICIOS = { 'indicios.csv': 'sospechoso,cabellos\nBaynes,14\nEl Gato del Museo,30\nConserje Wiggins,7\nMoriarty,15\nUn Turista Perdido,5\nWatson,24\nJardinero Mudo,27\nMoran,25\nLestrade,9\nGodzilla,25\nInspector Bradstreet,8\nVigilante Nocturno,18\nRepartidor de Pizza,11\nPaloma Mensajera,16\nUn PingUino,30\nFantasma del Museo,3\nHudson,0\nAdler,15\nElvis,0\nNessie,23\nMimo Callejero,11\nRobot Aspiradora,9\nWally,6\nKeyboard Cat,20\nGregson,3\nSenora de la Limpieza,18\n' };

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
<pre>sospechoso,sala,pisadas          # huellas.csv (decenas de sospechosos y salas)
Gregson,Hall,40
Gregson,Pasillo,50
El Gato del Museo,Subsuelo,43
Godzilla,Cafeteria,42
...</pre>
<p>Ojo: el que más pisadas dejó <b>en total</b> no tiene por qué ser el culpable (el guardia patrulla todo el museo). Hay que mirar <b>la escena</b>: quién se concentró en la bóveda.</p>
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
            { args: ['indicios.csv'], files: INDICIOS, expect: { type: 'json', value: ['Baynes', 'El Gato del Museo', 'Moriarty', 'Watson', 'Jardinero Mudo', 'Moran', 'Godzilla', 'Vigilante Nocturno', 'Repartidor de Pizza', 'Paloma Mensajera', 'Un PingUino', 'Adler', 'Nessie', 'Mimo Callejero', 'Keyboard Cat', 'Senora de la Limpieza'] } },
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
