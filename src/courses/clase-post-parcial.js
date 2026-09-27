/** @type {import('./types.js').Course} */
export default {
  slug: 'clase-post-parcial',
  title: 'Clase Post Parcial',
  gate: {
    emoji: '📝',
    title: ['Clase', 'Post Parcial'],
    subtitle: 'Encontrá el error + los 6 ejercicios del parcial',
    buttonLabel: 'Empezar 📝',
    // Traba liviana para que no entren antes de tiempo: queda visible en el
    // bundle, así que no protege nada sensible.
    password: 'te-para-3',
  },
  hero: {
    badge: '🎓 Pensamiento Computacional · Curso 11: Retamozo, Pratto · 2026',
    title: ['Clase', 'Post Parcial'],
    subtitle: 'Encontrá el error en código real de parcial · Resolvé los 6 ejercicios con tests automáticos y mirá cómo los resolvieron tus compañeros',
    decoration: '📝 🔍 🐍 ✅ 🧪 📚',
  },
  footer: 'Clase Post Parcial · 2026 · Pensamiento Computacional FIUBA 📝',
  nav: { label: 'Post Parcial', quiz: 'Encontrá el error', exercises: '6 Ejercicios' },
  quiz: {
    eyebrow: 'Autoevaluación',
    title: 'Encontrá el Error 🔍',
    description: 'Cada código tiene algo que en el parcial se corrige. Leelo con atención y elegí cuál es el problema.',
    sheet: 'PostParcial-Quiz',
    sections: [
      { name: 'Ciclos', label: 'Ciclos' },
      { name: 'Funciones', label: 'Funciones' },
      { name: 'Secuencias', label: 'Secuencias' },
    ],
    summary: {
      high: '¡Muy bien! Ya reconocés los errores que más se corrigen en el parcial.',
      mid: '¡Bien! Releé las que fallaste: son correcciones muy comunes en el parcial.',
      low: 'Releé las explicaciones: estos errores restan puntos en el parcial.',
    },
    questions: [
      /* ── CICLOS ── */
      {
        section: "Ciclos",
        prompt: `¿Cuál es el problema de este código?<pre>def sumar_positivos(numeros):
    i = 0
    total = 0
    while True:
        if i == len(numeros):
            break
        if numeros[i] > 0:
            total += numeros[i]
        i += 1
    return total</pre>`,
        answers: ["Usa while True con un break: la condición de corte tendría que estar en el while"],
        options: [
          "Usa while True con un break: la condición de corte tendría que estar en el while",
          "El return está mal indentado y queda dentro del while",
          "Falta castear numeros[i] a int antes de sumarlo",
          "No tiene ningún error",
        ],
        hint: "La función devuelve el resultado correcto. Pensá en lo que se corrige aunque el resultado sea el correcto.",
        feedbackOk: "Correcto. En el parcial, <code>while True</code> es un ejercicio mal, sin excepción. La condición del ciclo tiene que decir cuándo sigue: <code>while i &lt; len(numeros):</code>.",
        feedbackBad: "El problema es el <code>while True</code> con <code>break</code>. Aunque funcione, en el parcial es un ejercicio mal. La condición tiene que ir en el <code>while</code>: <code>while i &lt; len(numeros):</code>.",
      },
      {
        section: "Ciclos",
        prompt: `Se pide cargar bultos en un camión <b>sin superar</b> la capacidad. ¿Cuál es el problema?<pre>def cargar_bultos(capacidad):
    peso_total = 0
    peso = int(input("Peso del bulto: "))
    while peso_total &lt;= capacidad:
        peso_total += peso
        peso = int(input("Peso del bulto: "))
    return peso_total</pre>`,
        answers: ["La condición mira el peso ya cargado, así que termina cargando el bulto que supera la capacidad"],
        options: [
          "La condición mira el peso ya cargado, así que termina cargando el bulto que supera la capacidad",
          "Falta un break adentro del while para cortar",
          "El primer input tendría que estar adentro del while",
          "No inicializa peso_total",
        ],
        hint: "Probalo a mano con capacidad 10 y bultos de 6, 6, 6. ¿Cuánto devuelve?",
        feedbackOk: "Correcto. Con capacidad 10 y bultos de 6 devuelve 12. Antes de cargar hay que preguntar si el <em>próximo</em> bulto entra: <code>while peso_total + peso &lt;= capacidad:</code>.",
        feedbackBad: "El problema es la condición del <code>while</code>. Mira lo que ya se cargó y no lo que se va a cargar, así que el bulto que se pasa se carga igual. Con capacidad 10 y bultos de 6, devuelve 12.",
      },
      {
        section: "Ciclos",
        prompt: `¿Cuál es el problema de este código?<pre>def contar_aprobados(notas):
    aprobados = 0
    for nota in notas:
        if nota &lt; 4:
            continue
        aprobados += 1
    return aprobados</pre>`,
        answers: ["El continue es innecesario: alcanza con un if nota >= 4"],
        options: [
          "El continue es innecesario: alcanza con un if nota >= 4",
          "Debería usar while en vez de for",
          "El return tendría que estar adentro del for",
          "Cuenta mal: también suma los desaprobados",
        ],
        hint: "El resultado es correcto. Fijate en la lista de correcciones negativas del parcial.",
        feedbackOk: "Correcto. Cuenta bien, pero el <code>continue</code> sobra. <code>if nota &gt;= 4: aprobados += 1</code> dice lo mismo y se lee más fácil.",
        feedbackBad: "El problema es el <code>continue</code> innecesario. Cuenta bien, pero se corrige: <code>if nota &gt;= 4: aprobados += 1</code> es más directo.",
      },
      /* ── FUNCIONES ── */
      {
        section: "Funciones",
        prompt: `El enunciado pide una función que <b>devuelva</b> el promedio. ¿Cuál es el problema?<pre>def calcular_promedio(notas):
    promedio = sum(notas) / len(notas)
    print(promedio)</pre>`,
        answers: ["Usa print en vez de return: la función devuelve None"],
        options: [
          "Usa print en vez de return: la función devuelve None",
          "Tendría que dividir por len(notas) - 1",
          "Falta castear notas a lista antes del sum",
          "El nombre no empieza con un verbo",
        ],
        hint: "¿Qué valor tendría x después de x = calcular_promedio([6, 8])?",
        feedbackOk: "Correcto. Mostrar un valor no es lo mismo que devolverlo. <code>x = calcular_promedio([6, 8])</code> imprime 7.0, pero <code>x</code> queda en <code>None</code>.",
        feedbackBad: "El problema es que usa <code>print</code> en vez de <code>return</code>. La función imprime el promedio, pero quien la llama recibe <code>None</code>.",
      },
      {
        section: "Funciones",
        prompt: `¿Qué se corrige en este código?<pre>def es_mayor_de_edad(edad):
    if edad &gt;= 18:
        return True
    else:
        return False</pre>`,
        answers: ["El if/else sobra: se puede devolver la expresión directamente"],
        options: [
          "El if/else sobra: se puede devolver la expresión directamente",
          "La condición tendría que ser edad > 18",
          "Tendría que usar print en vez de return",
          "Falta castear edad a int",
        ],
        hint: "¿Qué tipo de dato da la expresión edad >= 18?",
        feedbackOk: "Correcto. <code>edad &gt;= 18</code> ya es un booleano, así que alcanza con <code>return edad &gt;= 18</code>. En el parcial, el <code>if/else</code> que devuelve True/False resta puntos.",
        feedbackBad: "Se corrige el <code>if/else</code> que devuelve True/False. <code>edad &gt;= 18</code> ya es un booleano, así que alcanza con <code>return edad &gt;= 18</code>.",
      },
      /* ── SECUENCIAS ── */
      {
        section: "Secuencias",
        prompt: `Se pide separar un ingreso como <code>"Rayuela - 600"</code> y devolver las hojas. ¿Cuál es el problema?<pre>def obtener_hojas(ingreso):
    datos = ingreso.split(" - ")
    hojas = datos[2]
    return hojas * 2</pre>`,
        answers: ["Accede a una posición que no existe y además no castea las hojas a int"],
        options: [
          "Accede a una posición que no existe y además no castea las hojas a int",
          "split no funciona con más de un carácter como separador",
          "Tendría que usar datos[-2]",
          "No tiene ningún error",
        ],
        hint: "¿Cuántos elementos tiene la lista que devuelve el split? ¿De qué tipo son?",
        feedbackOk: "Correcto. El split devuelve <code>['Rayuela', '600']</code>: la posición 2 no existe (IndexError). Aunque tomara <code>datos[1]</code>, <code>'600' * 2</code> daría <code>'600600'</code>. Hay que castear con <code>int(...)</code>.",
        feedbackBad: "Tiene dos problemas. <code>datos</code> solo tiene las posiciones 0 y 1, así que <code>datos[2]</code> da IndexError. Además <code>'600'</code> es un string: si no se castea, <code>* 2</code> lo repite en vez de multiplicarlo.",
      },
    ],
  },
  exercises: {
    eyebrow: 'Ejercicios del Parcial',
    title: 'Los 6 Ejercicios 📝',
    description: 'Los ejercicios que se tomaron en los dos temas del parcial. Probá tu solución con los tests automáticos, entregala, y después mirá las soluciones de tus compañeros.',
    sheetPrefix: 'PostParcial-',
    submitLabel: 'Entregar 📝',
    items: [
      /* ── TEMA 1 · EJ 1: ESTANTERÍA ───────────────────────────── */
      {
        badge: 'Tema 1 · Ejercicio 1',
        tag: 'while · split · tuplas',
        title: 'La Estantería de la Biblioteca',
        statement: `Una biblioteca tiene varias estanterías para guardar sus libros. Para que ninguna supere su capacidad máxima de peso, el encargado quiere un programa para registrar los libros que va guardando en cada estante. Cada hoja de un libro pesa aproximadamente <strong>2 gramos</strong>.<br><br>
Implementá <code>guardar_libros(peso_max, id_estante)</code>. La función recibe la capacidad máxima del estante (<strong>en kilogramos</strong>) y su identificador, y le pide al usuario, uno por uno, el nombre del libro y la cantidad de hojas con el formato <code>&lt;libro&gt; - &lt;hojas&gt;</code>. Antes de guardar cada libro tiene que verificar que no se supere la capacidad. Cuando el próximo libro no entra, termina la carga.<br><br>
Devuelve una tupla <code>(id_estante, [libros_guardados])</code>.<br><br>
<b>Ejemplo</b> con <code>guardar_libros(5, "a.est1")</code>:
<pre>a.est1 - Peso máximo: 5 kg
Peso actual: 0 kg.
Ingrese un libro y cantidad de hojas: Física para ciencias e ingeniería - 748
Peso actual: 1.496 kg.
Ingrese un libro y cantidad de hojas: Ingeniería electromagnética - 152
Peso actual: 1.8 kg.
Ingrese un libro y cantidad de hojas: Temas de Economía - 325
Peso actual: 2.45 kg.
Ingrese un libro y cantidad de hojas: Introducción a los Algoritmos - 1780
El libro no puede ser guardado porque se supera la capacidad máxima.</pre>
Devuelve <code>("a.est1", ["Física para ciencias e ingeniería", "Ingeniería electromagnética", "Temas de Economía"])</code>`,
        hint: `El peso máximo y el peso de las hojas están en unidades distintas.`,
        starter: `def guardar_libros(peso_max, id_estante):\n    pass`,
        test: {
          funcName: 'guardar_libros',
          cases: [
            {
              args: [5, "a.est1"],
              stdin: ["Física para ciencias e ingeniería - 748", "Ingeniería electromagnética - 152", "Temas de Economía - 325", "Introducción a los Algoritmos - 1780"],
              expect: { type: 'contains', parts: ["a.est1", "física para ciencias e ingeniería", "ingeniería electromagnética", "temas de economía"], absent: ["introducción a los algoritmos"] },
            },
            {
              args: [0.5, "est2"],
              stdin: ["Libro Chico - 100", "Libro Grande - 200"],
              expect: { type: 'contains', parts: ["est2", "libro chico"], absent: ["libro grande"] },
            },
          ]
        },
        note: `El verificador simula lo que escribe el usuario y revisa la tupla que devolvés.`,
      },
    
      /* ── TEMA 1 · EJ 2: PAYADA LUNFARDA ──────────────────────── */
      {
        badge: 'Tema 1 · Ejercicio 2',
        tag: 'for · tuplas · listas',
        title: 'La Payada Lunfarda',
        statement: `La biblioteca de FIUBA quiere armar un juego en homenaje al <em>Martín Fierro</em>: una "payada" contra la máquina para ver quién sabe más lunfardo. Se cuenta con una lista de tuplas <code>(palabra, significado)</code>:
<pre>diccionario = [("vichar", "mirar"), ("pucho", "cigarrillo"), ("chamuyar", "hablar"),
               ("gauchada", "favor"), ("misho", "pobre")]</pre>
Implementá <code>jugar_payada(diccionario)</code>. Para cada palabra le pregunta al jugador qué significa y al final devuelve una tupla con dos listas: las palabras que acertó y las que no.<br><br>
<b>Ejemplo</b> de interacción:
<pre>¿Qué significa 'vichar'?: mirar
¿Qué significa 'pucho'?: fumar
¿Qué significa 'chamuyar'?: hablar
¿Qué significa 'gauchada'?: favor
¿Qué significa 'misho'?: pan</pre>
Devuelve <code>(["vichar", "chamuyar", "gauchada"], ["pucho", "misho"])</code>`,
        hint: `Cada elemento del diccionario tiene dos partes, y cada una sirve para algo distinto.`,
        starter: `def jugar_payada(diccionario):\n    pass`,
        test: {
          funcName: 'jugar_payada',
          cases: [
            {
              args: [[["vichar", "mirar"], ["pucho", "cigarrillo"], ["chamuyar", "hablar"], ["gauchada", "favor"], ["misho", "pobre"]]],
              stdin: ["mirar", "fumar", "hablar", "favor", "pan"],
              expect: { type: 'exact', value: 'vichar,chamuyar,gauchada,pucho,misho' },
            },
            {
              args: [[["laburo", "trabajo"], ["che", "amigo"]]],
              stdin: ["estudio", "amigo"],
              expect: { type: 'exact', value: 'che,laburo' },
            },
          ]
        },
        note: `El verificador simula las respuestas del jugador y revisa las dos listas, en orden.`,
      },
    
      /* ── TEMA 1 · EJ 3: CATÁLOGO ─────────────────────────────── */
      {
        badge: 'Tema 1 · Ejercicio 3',
        tag: 'strings · map · sorted',
        title: 'El Catálogo Desordenado',
        statement: `El catálogo de una biblioteca está desordenado y los títulos tienen formatos distintos. Se quiere normalizarlos y ordenarlos.<br><br>
Implementá <code>formatear_catalogo(catalogo)</code>. Recibe una lista de títulos y devuelve una <strong>nueva lista</strong> con los títulos formateados y ordenados alfabéticamente. Formatear un título es pasarlo a minúscula y eliminar estos caracteres especiales: <code>" "</code> (espacio), <code>"."</code>, <code>","</code>, <code>"-"</code>, <code>"_"</code>.<br><br>
<b>Ejemplo:</b> <code>["Física_Para_Ingeniería", "Introducción a los algoritmos", "Álgebra lineal, 1"]</code><br>
→ <code>["álgebralineal1", "físicaparaingeniería", "introducciónalosalgoritmos"]</code><br><br>
<b>Bonus:</b> resolvelo sin usar ciclos (<code>for</code> / <code>while</code>).`,
        hint: `Primero resolvé el problema para un solo título.`,
        starter: `def formatear_catalogo(catalogo):\n    pass`,
        test: {
          funcName: 'formatear_catalogo',
          cases: [
            {
              args: [["Física_Para_Ingeniería", "Introducción a los algoritmos", "Álgebra lineal, 1"]],
              stdin: [],
              expect: { type: 'contains', parts: ["físicaparaingeniería", "introducciónalosalgoritmos", "álgebralineal1"] },
            },
            {
              args: [["Zeta uno", "alfa-dos", "Beta.tres"]],
              stdin: [],
              expect: { type: 'exact', value: 'alfados,betatres,zetauno' },
            },
          ]
        },
      },
    
      /* ── TEMA 2 · EJ 1: EXPOSICIÓN ORAL ──────────────────────── */
      {
        badge: 'Tema 2 · Ejercicio 1',
        tag: 'while · split · tuplas',
        title: 'La Exposición Oral',
        statement: `Una profesora de Geografía toma una evaluación oral sobre puntos turísticos de Argentina. Cada estudiante tiene un tiempo máximo de exposición, que puede variar según el estudiante.<br><br>
Implementá <code>gestionar_exposicion(apellido, tiempo_max)</code>. La función le pide al estudiante el nombre de un tema y los minutos que le lleva desarrollarlo, con el formato <code>&lt;tema&gt; - &lt;minutos&gt;</code>. Los ingresos siguen mientras quede tiempo suficiente para un nuevo tema. Cuando no alcanza para el siguiente, termina la carga.<br><br>
Devuelve una tupla <code>(apellido, [temas_expuestos])</code>.<br><br>
<b>Ejemplo</b> con <code>gestionar_exposicion("Roca", 10)</code>:
<pre>Roca - Tiempo máximo: 10 minutos
Tiempo disponible: 10 minutos.
Ingrese un tema y cantidad de minutos: Cataratas del Iguazú - 3
Tiempo disponible: 7 minutos.
Ingrese un tema y cantidad de minutos: Glaciar Perito Moreno - 2
Tiempo disponible: 5 minutos.
Ingrese un tema y cantidad de minutos: Quebrada de Humahuaca - 4
Tiempo disponible: 1 minutos.
Ingrese un tema y cantidad de minutos: Península Valdés - 4
No hay tiempo suficiente para desarrollar este tema.</pre>
Devuelve <code>("Roca", ["Cataratas del Iguazú", "Glaciar Perito Moreno", "Quebrada de Humahuaca"])</code>`,
        hint: `¿Qué dato tenés que conocer antes de decidir si un tema entra?`,
        starter: `def gestionar_exposicion(apellido, tiempo_max):\n    pass`,
        test: {
          funcName: 'gestionar_exposicion',
          cases: [
            {
              args: ["Roca", 10],
              stdin: ["Cataratas del Iguazú - 3", "Glaciar Perito Moreno - 2", "Quebrada de Humahuaca - 4", "Península Valdés - 4"],
              expect: { type: 'contains', parts: ["roca", "cataratas del iguazú", "glaciar perito moreno", "quebrada de humahuaca"], absent: ["península valdés"] },
            },
            {
              args: ["Sarmiento", 5],
              stdin: ["Tema A - 2", "Tema B - 4"],
              expect: { type: 'contains', parts: ["sarmiento", "tema a"], absent: ["tema b"] },
            },
          ]
        },
        note: `El verificador simula lo que escribe el estudiante y revisa la tupla que devolvés.`,
      },
    
      /* ── TEMA 2 · EJ 2: CAPITALES ────────────────────────────── */
      {
        badge: 'Tema 2 · Ejercicio 2',
        tag: 'for · tuplas · listas',
        title: 'El Torneo de Capitales',
        statement: `En FIUBA arman un torneo de geografía sobre capitales de provincias argentinas. Se cuenta con una lista de tuplas <code>(provincia, capital)</code>:
<pre>provincias = [("Mendoza", "Mendoza"), ("Salta", "Salta"), ("Chubut", "Rawson"),
              ("Misiones", "Posadas"), ("Neuquén", "Neuquén")]</pre>
Implementá <code>evaluar_capitales(provincias)</code>. Para cada provincia le pregunta al jugador cuál es su capital y al final devuelve una tupla con dos listas: las provincias que acertó y las que no.<br><br>
<b>Ejemplo</b> de interacción:
<pre>¿Cuál es la capital de Mendoza?: Mendoza
¿Cuál es la capital de Salta?: Salta
¿Cuál es la capital de Chubut?: Comodoro Rivadavia
¿Cuál es la capital de Misiones?: Posadas
¿Cuál es la capital de Neuquén?: San Martín de los Andes</pre>
Devuelve <code>(["Mendoza", "Salta", "Misiones"], ["Chubut", "Neuquén"])</code>`,
        hint: `Si el jugador escribe "posadas" en minúscula, ¿tu programa lo cuenta como acierto?`,
        starter: `def evaluar_capitales(provincias):\n    pass`,
        test: {
          funcName: 'evaluar_capitales',
          cases: [
            {
              args: [[["Mendoza", "Mendoza"], ["Salta", "Salta"], ["Chubut", "Rawson"], ["Misiones", "Posadas"], ["Neuquén", "Neuquén"]]],
              stdin: ["Mendoza", "Salta", "Comodoro Rivadavia", "Posadas", "San Martín de los Andes"],
              expect: { type: 'exact', value: 'Mendoza,Salta,Misiones,Chubut,Neuquén' },
            },
            {
              args: [[["Córdoba", "Córdoba"], ["Santa Fe", "Santa Fe"]]],
              stdin: ["Rosario", "Santa Fe"],
              expect: { type: 'exact', value: 'Santa Fe,Córdoba' },
            },
          ]
        },
        note: `El verificador simula las respuestas del jugador y revisa las dos listas, en orden.`,
      },
    
      /* ── TEMA 2 · EJ 3: MUSEO ────────────────────────────────── */
      {
        badge: 'Tema 2 · Ejercicio 3',
        tag: 'strings · map · sorted',
        title: 'Las Exposiciones del Museo',
        statement: `El Museo de Ciencia y Técnica de la FIUBA tiene los nombres de sus exposiciones en formatos distintos, y eso complica organizarlas.<br><br>
Implementá <code>organizar_titulos(titulos)</code>. Recibe una lista de nombres de exposiciones y devuelve una <strong>nueva lista</strong> con cada nombre normalizado:
<ul>
<li>Todas las letras en mayúscula.</li>
<li>Cada espacio reemplazado por un guion bajo (<code>_</code>).</li>
<li>Sin los caracteres <code>.</code> <code>,</code> <code>:</code> <code>-</code></li>
<li>Ordenados alfabéticamente.</li>
</ul>
<b>Ejemplo:</b> <code>["Filatelia temática: puentes y caminos", "Obras del Ing. Torroja", "Actividades espaciales"]</code><br>
→ <code>["ACTIVIDADES_ESPACIALES", "FILATELIA_TEMÁTICA_PUENTES_Y_CAMINOS", "OBRAS_DEL_ING_TORROJA"]</code><br><br>
<b>Bonus:</b> resolvelo sin usar ciclos (<code>for</code> / <code>while</code>).`,
        hint: `Pensalo en dos niveles: qué le pasa a cada nombre y qué le pasa a la lista.`,
        starter: `def organizar_titulos(titulos):\n    pass`,
        test: {
          funcName: 'organizar_titulos',
          cases: [
            {
              args: [["Filatelia temática: puentes y caminos", "Obras del Ing. Torroja", "Actividades espaciales"]],
              stdin: [],
              expect: { type: 'contains', parts: ["actividades_espaciales", "filatelia_temática_puentes_y_caminos", "obras_del_ing_torroja"] },
            },
            {
              args: [["Zoologia: aves", "Arte moderno", "Mapas del Sur."]],
              stdin: [],
              expect: { type: 'exact', value: 'ARTE_MODERNO,MAPAS_DEL_SUR,ZOOLOGIA_AVES' },
            },
          ]
        },
      },
    ],
  },
};
