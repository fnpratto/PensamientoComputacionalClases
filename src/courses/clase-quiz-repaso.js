/* Quiz de Repaso · Diccionarios, Archivos y Bibliotecas
   Clase corta de repaso antes del parcial: solo un quiz de 8 preguntas "con
   trampa" (dicc, archivos, numpy, pandas y matplotlib). Sin apunte ni
   ejercicios: la clase es el quiz. Los resultados van a la planilla. */

/** @type {import('./types.js').Course} */
export default {
  slug: 'clase-quiz-repaso',
  title: 'Quiz de Repaso',
  gate: {
    emoji: '🧠',
    title: ['Quiz de Repaso', 'Dicc · Archivos · Bibliotecas'],
    subtitle: 'Repaso rápido antes del parcial · 8 preguntas con trampa, menos de 10 minutos',
    buttonLabel: 'Empezar el quiz',
  },
  hero: {
    badge: '🧠 Pensamiento Computacional · Curso 11: Retamozo, Pratto · 2026',
    title: ['Quiz de', 'Repaso'],
    subtitle: '8 preguntas con trampa sobre diccionarios, archivos y bibliotecas (numpy, pandas y matplotlib). Una sola opción correcta por pregunta; unos 70 segundos cada una.',
    decoration: '🧠 🔑 📂 🔢 🐼 📊',
  },
  footer: 'Quiz de Repaso · Pensamiento Computacional FIUBA 🧠',
  nav: {
    label: 'Quiz de Repaso',
    quiz: 'Quiz',
    exercises: 'Ejercicios',
  },

  quiz: {
    eyebrow: 'Quiz de repaso',
    title: 'Quiz de repaso: diccionarios, archivos y bibliotecas',
    description:
      '8 preguntas con trampa, de unos 70 segundos cada una (menos de 10 minutos en total). Una sola opción correcta por pregunta. Repasamos diccionarios, archivos y bibliotecas (numpy, pandas y matplotlib).',
    sheet: 'RepasoQuiz',
    sections: [
      { name: 'Diccionarios', label: 'Diccionarios' },
      { name: 'Archivos', label: 'Archivos' },
      { name: 'Bibliotecas', label: 'Bibliotecas' },
    ],
    summary: {
      high: '¡Genial! Caíste en pocas (o ninguna) de las trampas. Tenés los temas afilados para el parcial.',
      mid: 'Bien. Fijate las que fallaste: casi todas eran "con trampa" (<code>get</code>, los modos de archivo, el <code>&amp;</code> de pandas, <code>legend</code>). Volvé a las diapositivas de esos temas.',
      low: 'Tranqui, para eso es el repaso. Volvé a las diapositivas y Colabs de diccionarios, archivos y bibliotecas: estas preguntas apuntan justo a los errores más comunes.',
    },
    questions: [
      {
        section: 'Diccionarios',
        prompt: '¿Qué imprime este código?<pre>d = {"a": 1, "b": 2}\nd["c"] = d.get("c", 10) + d["a"]\nprint(d)</pre>',
        answers: ["{'a': 1, 'b': 2, 'c': 11}"],
        options: [
          'KeyError, porque la clave "c" no existe',
          "{'a': 1, 'b': 2, 'c': 10}",
          "{'a': 1, 'b': 2, 'c': 11}",
          "{'a': 1, 'b': 2, 'c': 1}",
        ],
        hint: '<code>d.get(clave, defecto)</code> devuelve el valor por defecto si la clave no existe, sin tirar error.',
        feedbackOk: 'Exacto. <code>d.get("c", 10)</code> da 10 (la clave no existe todavía) y se le suma <code>d["a"]</code> (1): 11, que queda guardado en la clave nueva.',
        feedbackBad: 'Es <code>{\'a\': 1, \'b\': 2, \'c\': 11}</code>. <code>get</code> no falla si la clave no existe: devuelve el valor por defecto (10) y se le suma <code>d["a"]</code> (1).',
      },
      {
        section: 'Diccionarios',
        prompt: '¿Qué imprime este código?<pre>notas = {"Ana": 9, "Luis": 7, "Eva": 8}\n\ndef obtener_nota(par):\n    return par[1]\n\nranking = sorted(notas.items(), key=obtener_nota, reverse=True)\nprint(ranking[0][0])</pre>',
        answers: ['Ana'],
        options: ['Luis', '9', "('Ana', 9)", 'Ana'],
        hint: '<code>items()</code> da pares <code>(nombre, nota)</code>. Se ordena por la nota de mayor a menor; <code>ranking[0][0]</code> es solo el nombre del primero.',
        feedbackOk: "Correcto. <code>ranking[0]</code> es <code>('Ana', 9)</code> y <code>ranking[0][0]</code> es solo el nombre: <code>'Ana'</code>.",
        feedbackBad: "Es <code>Ana</code>. Se ordena por nota (de mayor a menor), así que <code>ranking[0]</code> es <code>('Ana', 9)</code> y <code>[0][0]</code> toma el nombre. Si se ordenara el diccionario a secas, saldrían las claves alfabéticamente y el primero sería 'Luis'.",
      },
      {
        section: 'Archivos',
        prompt: '<code>log.txt</code> tiene 3 líneas, cada una terminada en salto de línea. ¿Qué imprime este código?<pre>with open("log.txt", "a") as f:\n    f.write("fin")\n\nwith open("log.txt", "r") as f:\n    print(len(f.readlines()))</pre>',
        answers: ['4'],
        options: ['1', '3', 'Error: no se puede leer un archivo que se acaba de escribir', '4'],
        hint: 'El modo <code>"a"</code> agrega al final sin borrar. Si la última línea ya terminaba en salto de línea, lo nuevo arranca en una línea más.',
        feedbackOk: 'Eso. <code>"a"</code> agrega al final: como la última línea ya terminaba en salto de línea, <code>"fin"</code> queda en una cuarta línea.',
        feedbackBad: 'Es <code>4</code>. El modo <code>"a"</code> no borra nada: <code>"fin"</code> se suma como cuarta línea. Con el modo <code>"w"</code> habría quedado una sola.',
      },
      {
        section: 'Archivos',
        prompt: '¿Qué imprime este código?<pre>with open("n.txt", "w") as f:\n    f.write("a")\n    f.write("b")\n    f.writelines(["c", "d"])\n\nwith open("n.txt", "r") as f:\n    lineas = f.readlines()\n\nprint(len(lineas))</pre>',
        answers: ['1'],
        options: ['4', '2', '1', '0'],
        hint: 'Ni <code>write</code> ni <code>writelines</code> agregan un salto de línea solos. Sin saltos de línea, ¿cuántas líneas tiene el archivo?',
        feedbackOk: 'Correcto. Nada agrega un salto de línea automáticamente: el archivo queda con una sola línea, <code>abcd</code>, y <code>readlines()</code> devuelve un único elemento.',
        feedbackBad: 'Es <code>1</code>. Ningún método de escritura agrega un salto de línea solo: queda todo en una línea (<code>abcd</code>), así que <code>readlines()</code> devuelve una lista de un elemento.',
      },
      {
        section: 'Bibliotecas',
        prompt: '¿Qué imprime este código?<pre>import numpy as np\n\na = [1, 2, 3]\nb = np.array([1, 2, 3])\nprint(a * 2, b * 2)</pre>',
        answers: ['[1, 2, 3, 1, 2, 3] [2 4 6]'],
        options: [
          '[2, 4, 6] [2 4 6]',
          '[1, 2, 3, 1, 2, 3] [2 4 6]',
          '[1, 2, 3, 1, 2, 3] [1 2 3 1 2 3]',
          'Error: no se puede multiplicar una lista',
        ],
        hint: 'Una lista por 2 se <b>repite</b>; un array de numpy multiplica <b>cada elemento</b>.',
        feedbackOk: 'Eso. La lista se repite (<code>[1, 2, 3, 1, 2, 3]</code>) y el array multiplica elemento a elemento (<code>[2 4 6]</code>). Por eso con numpy operás sin <code>for</code>.',
        feedbackBad: 'Es <code>[1, 2, 3, 1, 2, 3] [2 4 6]</code>. La lista por 2 se repite; el array sí multiplica cada elemento.',
      },
      {
        section: 'Bibliotecas',
        prompt: '¿Qué imprime este código?<pre>import pandas as pd\n\ndf = pd.DataFrame({"x": [3, 1, 2]})\ndf.sort_values(by=["x"])\nprint(df["x"][0])</pre>',
        answers: ['3'],
        options: ['1', '3', '2', 'Error: sort_values no se puede usar así'],
        hint: '<code>sort_values</code> devuelve un DataFrame <b>nuevo</b>; si no lo guardás (<code>df = df.sort_values(...)</code>), el original no cambia.',
        feedbackOk: 'Correcto. <code>sort_values</code> no modifica el original y acá no se guarda el resultado: <code>df</code> sigue en el orden 3, 1, 2, y <code>df["x"][0]</code> es 3.',
        feedbackBad: 'Es <code>3</code>. <code>sort_values</code> devuelve una copia ordenada que no se guardó, así que <code>df</code> queda igual: <code>df["x"][0]</code> es el valor del índice 0, o sea 3.',
      },
      {
        section: 'Bibliotecas',
        prompt: '¿Cuál de estas líneas filtra correctamente a las personas con edad mayor a 20 <b>y</b> menor a 30?',
        answers: ['df[(df["edad"] > 20) & (df["edad"] < 30)]'],
        options: [
          'df[df["edad"] > 20 and df["edad"] < 30]',
          'df[df["edad"] > 20 & df["edad"] < 30]',
          'df[(df["edad"] > 20) & (df["edad"] < 30)]',
          'df[20 < df["edad"] < 30]',
        ],
        hint: 'En pandas el "y" es <code>&</code> y el "o" es <code>|</code>, con cada condición entre paréntesis.',
        feedbackOk: 'Exacto. Se combinan con <code>&</code> y cada condición va entre paréntesis por la precedencia. Las otras tres dan error.',
        feedbackBad: 'Es la de <code>&</code> con paréntesis: <code>df[(cond1) &amp; (cond2)]</code>. En pandas se usa <code>&</code> (no <code>and</code>) y cada condición entre paréntesis.',
      },
      {
        section: 'Bibliotecas',
        prompt: 'Este código grafica dos curvas con <code>label</code>, pero al ejecutarlo no aparecen los nombres "A" y "B". ¿Qué falta?<pre>fig, ax = plt.subplots()\nax.plot([1, 2, 3], [4, 5, 6], label="A")\nax.plot([1, 2, 3], [6, 5, 4], label="B")\nplt.show()</pre>',
        answers: ['ax.legend()'],
        options: ['ax.set_label()', 'plt.title("A y B")', 'ax.set_legend()', 'ax.legend()'],
        hint: '<code>label</code> define el nombre de cada curva, pero hay que pedir que se muestre el recuadro con esos nombres antes de <code>plt.show()</code>.',
        feedbackOk: 'Eso. <code>label</code> nombra cada curva, pero para que se vea la referencia hay que llamar a <code>ax.legend()</code> antes de <code>plt.show()</code>.',
        feedbackBad: 'Es <code>ax.legend()</code>. El <code>label</code> solo no alcanza: hay que llamar a <code>ax.legend()</code> para que aparezca el recuadro con los nombres. Es un error muy común con varias curvas.',
      },
    ],
  },
};
