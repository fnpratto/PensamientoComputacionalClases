/* Quiz de nivelación compartido por las clases de bibliotecas (Unidad 6).
   Los conceptos de pandas / numpy / matplotlib son los mismos sin importar la
   temática, así que las dos clases lo importan y solo cambian el `sheet`.

   Uso:  quiz: { ...bibliotecasQuiz, sheet: 'Subte-Quiz' }  */

export const bibliotecasQuiz = {
  eyebrow: 'Quiz de nivelación',
  title: '¿Cuánto sabemos de pandas, numpy y matplotlib?',
  description:
    '7 preguntas, sin nota. Sirve para ver desde dónde arrancamos con las bibliotecas antes de meternos con los datos. Una sola opción correcta por pregunta.',
  sheet: 'Bibliotecas-Quiz',
  sections: [
    { name: 'Pandas', label: 'Pandas' },
    { name: 'Filtros', label: 'Filtros' },
    { name: 'Agrupar', label: 'Agrupar y ordenar' },
    { name: 'Numpy', label: 'Numpy' },
  ],
  summary: {
    high: '¡Muy bien! Ya tenés el modelo mental de los DataFrames y los arrays. Usá el apunte como machete y andá derecho a los enunciados.',
    mid: 'Buena base. Repasá en el apunte cómo se filtra con <code>&</code>/<code>|</code> y cómo se agrupa con <code>groupby</code> antes de arrancar.',
    low: 'Tranqui, de esto se trata la clase. Leé el apunte de arriba a abajo: ahí está todo lo que preguntamos acá, con ejemplos.',
  },
  questions: [
    {
      section: 'Pandas',
      prompt: 'Tenés un archivo <code>datos.csv</code> y querés cargarlo como DataFrame. ¿Cuál es la forma correcta?',
      answers: ["df = pd.read_csv('datos.csv')"],
      options: [
        "df = pd.read_csv('datos.csv')",
        "df = pd.open('datos.csv')",
        "df = pd.DataFrame('datos.csv')",
        "df = csv.read('datos.csv')",
      ],
      hint: 'La función lleva el nombre del formato que estás leyendo.',
      feedbackOk: 'Exacto. <code>pd.read_csv</code> lee el archivo y te lo devuelve como DataFrame listo para trabajar.',
      feedbackBad: 'Es <code>pd.read_csv(\'datos.csv\')</code>. <code>pd.DataFrame(...)</code> sirve para armar uno desde un diccionario, no para leer un archivo.',
    },
    {
      section: 'Pandas',
      prompt: 'Ya tenés el DataFrame <code>df</code>. ¿Cómo accedés a la columna <code>pasajeros</code>?',
      answers: ["df['pasajeros']"],
      options: ["df['pasajeros']", "df.pasajeros()", "df[pasajeros]", "df->pasajeros"],
      hint: 'El nombre de la columna es un texto, va entre comillas y entre corchetes.',
      feedbackOk: 'Correcto. <code>df[\'pasajeros\']</code> devuelve esa columna como una Serie.',
      feedbackBad: 'Es <code>df[\'pasajeros\']</code>: el nombre va como string entre corchetes. Sin comillas, Python busca una variable <code>pasajeros</code> que no existe.',
    },
    {
      section: 'Filtros',
      prompt: 'Querés quedarte solo con las filas donde <code>pasajeros</code> sea mayor a 1000. ¿Cuál es la correcta?',
      answers: ["df[df['pasajeros'] > 1000]"],
      options: [
        "df[df['pasajeros'] > 1000]",
        "df(df['pasajeros'] > 1000)",
        "df['pasajeros'] > 1000",
        "df.filter(pasajeros > 1000)",
      ],
      hint: 'Primero armás la condición, y después la usás para "indexar" el DataFrame con corchetes.',
      feedbackOk: 'Eso. La condición <code>df[\'pasajeros\'] > 1000</code> da una Serie de booleanos, y <code>df[ ... ]</code> se queda con las filas en <code>True</code>.',
      feedbackBad: 'Es <code>df[df[\'pasajeros\'] > 1000]</code>. La condición sola te da los <code>True/False</code>; para filtrar hay que meterla entre los corchetes del DataFrame.',
    },
    {
      section: 'Filtros',
      prompt: 'Querés las filas de la <code>LineaA</code> <b>y</b> con más de 1000 pasajeros. ¿Cómo combinás las dos condiciones?',
      answers: ["df[(df['linea'] == 'A') & (df['pasajeros'] > 1000)]"],
      options: [
        "df[(df['linea'] == 'A') & (df['pasajeros'] > 1000)]",
        "df[(df['linea'] == 'A') and (df['pasajeros'] > 1000)]",
        "df[df['linea'] == 'A' & df['pasajeros'] > 1000]",
        "df[df['linea'] == 'A', df['pasajeros'] > 1000]",
      ],
      hint: 'En pandas el <code>and</code> se escribe <code>&</code> y el <code>or</code> se escribe <code>|</code>. Y cada condición va entre paréntesis.',
      feedbackOk: 'Correcto. En pandas se usa <code>&</code> (y <code>|</code> para el "o"), con cada condición entre paréntesis por la precedencia.',
      feedbackBad: 'Es <code>&</code>, no <code>and</code>: <code>df[(cond1) &amp; (cond2)]</code>. Con <code>and</code> Python no sabe combinar dos Series de booleanos y tira error.',
    },
    {
      section: 'Agrupar',
      prompt: 'Querés el total de <code>pasajeros</code> sumado por cada <code>linea</code>. ¿Cuál es la forma idiomática en pandas?',
      answers: ["df.groupby('linea')['pasajeros'].sum()"],
      options: [
        "df.groupby('linea')['pasajeros'].sum()",
        "df.sum('linea')",
        "df['pasajeros'].sum('linea')",
        "df.group('linea').sum()",
      ],
      hint: 'Primero agrupás por la columna, después elegís la columna a sumar, después sumás.',
      feedbackOk: 'Exacto. <code>groupby</code> arma los grupos, elegís <code>[\'pasajeros\']</code> y <code>.sum()</code> suma dentro de cada grupo.',
      feedbackBad: 'Es <code>df.groupby(\'linea\')[\'pasajeros\'].sum()</code>: agrupás por línea, elegís la columna a sumar y sumás.',
    },
    {
      section: 'Agrupar',
      prompt: 'Querés ordenar el DataFrame por <code>pasajeros</code> de mayor a menor. ¿Cuál usás?',
      answers: ["df.sort_values('pasajeros', ascending=False)"],
      options: [
        "df.sort_values('pasajeros', ascending=False)",
        "df.sort('pasajeros')",
        "df.order_by('pasajeros')",
        "df.sort_values('pasajeros', mayor=True)",
      ],
      hint: 'El método ordena "por valores" y tiene un parámetro para elegir ascendente o descendente.',
      feedbackOk: 'Correcto. <code>ascending=False</code> hace que quede de mayor a menor; el top queda arriba de todo.',
      feedbackBad: 'Es <code>df.sort_values(\'pasajeros\', ascending=False)</code>. Por defecto ordena de menor a mayor, por eso hay que poner <code>ascending=False</code>.',
    },
    {
      section: 'Numpy',
      prompt: 'Tenés una lista <code>[10, 20, 30]</code> y la querés como array de numpy. ¿Cómo lo creás?',
      answers: ['np.array([10, 20, 30])'],
      options: ['np.array([10, 20, 30])', 'np.list([10, 20, 30])', 'numpy([10, 20, 30])', 'np.new([10, 20, 30])'],
      hint: 'La función se llama igual que el tipo de dato que estás creando.',
      feedbackOk: 'Eso. <code>np.array(lista)</code> convierte la lista en un array, que ya te deja hacer cuentas sobre todos los elementos de una.',
      feedbackBad: 'Es <code>np.array([10, 20, 30])</code>. Con el array podés hacer operaciones vectorizadas sin escribir un <code>for</code>.',
    },
  ],
};
