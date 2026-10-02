/** @type {import('./types.js').Course} */
export default {
  slug: 'clase-post-parcial',
  title: 'Clase Post Parcial',
  gate: {
    title: ['Clase', 'Post Parcial'],
    subtitle: 'Encontrá el error + ejercicios del primer parcial (ambos temas)',
    buttonLabel: 'Empezar',
  },
  hero: {
    badge: 'Pensamiento Computacional · Curso 11: Retamozo, Pratto · 2026',
    title: ['Clase', 'Post Parcial'],
    subtitle: 'Encontrá el error en código real de parcial · Resolvé los ejercicios del primer parcial (ambos temas) con tests automáticos y mirá cómo los resolvieron tus compañeros',
  },
  footer: 'Clase Post Parcial · 2026 · Pensamiento Computacional FIUBA',
  nav: { label: 'Post Parcial', quiz: 'Encontrá el error', exercises: 'Ejercicios del primer parcial', guide: 'Paso a paso' },
  quiz: {
    eyebrow: 'Autoevaluación',
    title: 'Encontrá el Error',
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
    title: 'Ejercicios del primer parcial (ambos temas)',
    description: 'Los ejercicios que se tomaron en los dos temas del primer parcial, con el enunciado original. Probá tu solución con los tests automáticos, entregala, y después mirá las soluciones de tus compañeros.',
    sheetPrefix: 'PostParcial-',
    submitLabel: 'Entregar',
    items: [
      /* Los enunciados son textuales del parcial: no corregirlos ni reescribirlos. */

      /* ── TEMA 1 · EJERCICIO 1 ── */
      {
        badge: 'Tema 1',
        title: 'Ejercicio 1',
        statement: `Una biblioteca cuenta con varias estanterías para almacenar sus libros. Para evitar que una estantería supere su capacidad máxima de peso, el encargado quiere utilizar un programa que le permita registrar los libros que va guardando en cada estante.<br><br>
Se sabe que cada hoja de un libro pesa aproximadamente 2 gramos. Por lo tanto, a partir de la cantidad de hojas de un libro se puede calcular su peso.<br><br>
Implementar una función que dada una capacidad máxima que puede soportar un estante (expresada en kilogramos) y un identificador del mismo, le solicite al usuario, uno por uno, el nombre del libro y la cantidad de hojas que posee. Antes de guardar cada libro, deberá calcular su peso y verificar que, al incorporarlo, no se supere la capacidad máxima del estante. El ingreso de libros deberá continuar mientras haya espacio disponible. Cuando el próximo libro no pueda ser guardado porque haría que se supere la capacidad máxima, se deberá finalizar la carga.<br><br>
Finalmente, la función deberá devolver una tupla con el siguiente formato: <code>(identificador_estante, [libros_guardados])</code> donde <code>libros_guardados</code> contiene los nombres de todos los libros que pudieron ser almacenados en el estante.<br><br>
Ejemplo de ejecución si se recibe: <code>5</code>, <code>a.est1</code>
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
La función deberá devolver: <code>("a.est1", ["Física para ciencias e ingeniería", "Ingeniería electromagnética", "Temas de Economía"])</code>`,
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
        note: `Para los tests, la función se tiene que llamar <code>guardar_libros(peso_max, id_estante)</code>. El verificador simula lo que escribe el usuario y revisa la tupla que devolvés.`,
      },

      /* ── TEMA 1 · EJERCICIO 2 ── */
      {
        badge: 'Tema 1',
        title: 'Ejercicio 2',
        statement: `La biblioteca de FIUBA quiere armar un juego a modo de homenaje al <em>Martín Fierro</em>, donde el jugador se enfrenta a la máquina en una especie de "payada" para ver quién sabe más de lunfardo. El programa cuenta con una lista de tuplas ya creada, donde cada tupla tiene una palabra en lunfardo y su significado correcto en castellano. Por ejemplo:
<pre>diccionario = [("vichar", "mirar"), ("pucho", "cigarrillo"), ("chamuyar", "hablar"),
            ("gauchada", "favor"), ("misho", "pobre")]</pre>
Se pide implementar una función que reciba un diccionario con el formato especificado y, para cada elemento, le pregunte al jugador cuál cree que es el significado de la palabra en lunfardo. Al finalizar se debe devolver una tupla con  dos listas: una con las palabras que el jugador acertó y otra con las que se equivocó.<br>
Por ejemplo, dada la lista <code>diccionario</code> de arriba, si la interacción con el jugador fuera la siguiente:
<pre>¿Qué significa 'vichar'?: mirar
¿Qué significa 'pucho'?: fumar
¿Qué significa 'chamuyar'?: hablar
¿Qué significa 'gauchada'?: favor
¿Qué significa 'misho'?: pan</pre>
La función debería devolver:
<pre>(["vichar", "chamuyar", "gauchada"], ["pucho", "misho"])</pre>`,
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
        note: `Para los tests, la función se tiene que llamar <code>jugar_payada(diccionario)</code>. El verificador simula las respuestas del jugador y revisa las dos listas, en orden.`,
      },

      /* ── TEMA 1 · EJERCICIO 3 ── */
      {
        badge: 'Tema 1',
        title: 'Ejercicio 3',
        statement: `El catálogo de una biblioteca se encuentra desordenado y los títulos de los libros presentan diferentes formatos, lo que dificulta encontrar rápidamente los libros que se necesitan. Para solucionar este problema, se desea desarrollar una función que permita normalizar y ordenar los títulos del catálogo.<br><br>
Por ejemplo si se recibe el catálogo: <code>["Física_Para_Ingeniería", "Introducción a los algoritmos", "Álgebra lineal, 1"]</code> se debe devolver <code>["álgebralineal1", "físicaparaingeniería", "introducciónalosalgoritmos"]</code> .<br><br>
La función deberá recibir una lista con los títulos de los libros y devolver una nueva lista con los títulos formateados y ordenados alfabéticamente. El formateo de cada título incluye eliminar los caracteres especiales (incluyendo espacios) y pasar todo el texto a minúscula.<br><br>
Los únicos caracteres especiales que deberán eliminarse son: <code>“ “</code>  <code>“.”</code>  <code>“,”</code>   <code>“-”</code>  <code>“_”</code><br><br>
<b>Bonus:</b> intentar resolver el ejercicio sin utilizar ciclos (<code>for</code> / <code>while</code>).`,
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
        note: `Para los tests, la función se tiene que llamar <code>formatear_catalogo(catalogo)</code>.`,
      },

      /* ── TEMA 2 · EJERCICIO 1 ── */
      {
        badge: 'Tema 2',
        title: 'Ejercicio 1',
        statement: `Una profesora de Geografía está preparando una evaluación oral sobre los distintos puntos turísticos de Argentina. Como debe evaluar a muchos estudiantes, decidió asignarle a cada uno un tiempo máximo de exposición, que puede variar según el estudiante. Para organizar las evaluaciones, necesita un programa que le permita registrar los temas desarrollados por cada alumno y controlar el tiempo utilizado.<br><br>
Implementar una función que dado el apellido del estudiante y el tiempo máximo disponible para su exposición, le solicite al estudiante el nombre de un tema y la cantidad de minutos que le tomará desarrollarlo. Los ingresos continuarán mientras quede tiempo suficiente para incorporar un nuevo tema. Cuando el tiempo disponible no sea suficiente para incorporar otro tema, deberá finalizar la carga.<br><br>
Al finalizar, la función deberá devolver una tupla con el siguiente formato: <code>(apellido_estudiante, [temas_expuestos])</code> donde <code>temas_expuestos</code> contiene los nombres de los temas que fueron registrados durante la exposición.<br><br>
Ejemplo de ejecución si se recibe: <code>"Roca"</code>, <code>10</code>
<pre>Roca - Tiempo máximo: 10 minutos

Tiempo disponible: 10 minutos.
Ingrese un tema y cantidad de minutos: Cataratas del Iguazú - 3

Tiempo disponible: 7 minutos.
Ingrese un tema y cantidad de minutos: Glaciar Perito Moreno - 2

Tiempo disponible: 5 minutos.
Ingrese un tema y cantidad de minutos: Quebrada de Humahuaca - 4

Tiempo disponible: 2 minutos.
Ingrese un tema y cantidad de minutos: Península Valdés - 4

No hay tiempo suficiente para desarrollar este tema.</pre>
La función deberá devolver: <code>("Roca", ["Cataratas del Iguazú", "Glaciar Perito Moreno", "Quebrada de Humahuaca"])</code>`,
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
        note: `Para los tests, la función se tiene que llamar <code>gestionar_exposicion(apellido, tiempo_max)</code>. El verificador simula lo que escribe el estudiante y revisa la tupla que devolvés.`,
      },

      /* ── TEMA 2 · EJERCICIO 2 ── */
      {
        badge: 'Tema 2',
        title: 'Ejercicio 2',
        statement: `En FIUBA quieren armar un torneo de geografía para poner a prueba cuánto saben los estudiantes sobre capitales de provincias argentinas. Para esto se cuenta con una lista de tuplas donde cada elemento contiene el nombre de la provincia y su capital, por ejemplo:
<pre>provincias = [("Mendoza", "Mendoza"), ("Salta", "Salta"), ("Chubut", "Rawson"),
              ("Misiones", "Posadas"), ("Neuquén", "Neuquén")]</pre>
Se pide implementar una función que reciba una lista de provincias con el formato específicado y, para cada una, le pregunte al jugador cuál es su capital. Al finalizar se debe devolver una tupla con dos listas: una con las provincias que el jugador acertó y otra con las que se equivocó.<br><br>
Por ejemplo, dada la lista <code>provincias</code> de arriba, si la interacción con el jugador fuera la siguiente:
<pre>¿Cuál es la capital de Mendoza?: Mendoza
¿Cuál es la capital de Salta?: Salta
¿Cuál es la capital de Chubut?: Comodoro Rivadavia
¿Cuál es la capital de Misiones?: Posadas
¿Cuál es la capital de Neuquén?: San Martín de los Andes</pre>
La función debería devolver:
<pre>(["Mendoza", "Salta", "Misiones"], ["Chubut", "Neuquén"])</pre>`,
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
        note: `Para los tests, la función se tiene que llamar <code>evaluar_capitales(provincias)</code>. El verificador simula las respuestas del jugador y revisa las dos listas, en orden.`,
      },

      /* ── TEMA 2 · EJERCICIO 3 ── */
      {
        badge: 'Tema 2',
        title: 'Ejercicio 3',
        statement: `Para una exposición del Museo de Ciencia y Técnica de la FIUBA, se está recopilando información sobre las distintas exposiciones disponibles para organizar una próxima visita guiada. Sin embargo, la información se encuentra almacenada utilizando distintos formatos para los títulos, lo que dificulta su organización y gestión. Para facilitar esta tarea, se necesita un programa que permita normalizar los nombres de las exposiciones y devolverlos ordenados alfabéticamente.<br><br>
Implementar una función que, dada una lista con los nombres de todas las exposiciones disponibles, devuelva una nueva lista en la que cada nombre esté normalizado según los siguientes criterios:
<ul>
<li>Todas las letras deben estar en mayúsculas.</li>
<li>Cada espacio debe ser reemplazado por un guion bajo <b>(<code>_</code>)</b>.</li>
<li>Se deben eliminar los siguientes caracteres especiales: <code>“.,:-”</code></li>
<li>Los nombres resultantes deben estar ordenados alfabéticamente.</li>
</ul>
Por ejemplo, si se recibe <code>["Filatelia temática: puentes y caminos", "Obras del Ing. Torroja", "Actividades espaciales"]</code>  se deberá devolver <code>["ACTIVIDADES_ESPACIALES", "FILATELIA_TEMÁTICA_PUENTES_Y_CAMINOS", "OBRAS_DEL_ING_TORROJA"]</code> .<br><br>
<b>Bonus:</b> intentar resolver el ejercicio sin utilizar ciclos (<code>for</code> / <code>while</code>).`,
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
        note: `Para los tests, la función se tiene que llamar <code>organizar_titulos(titulos)</code>.`,
      },
    ],
  },
  guide: {
    eyebrow: 'Guía de estudio',
    title: 'Paso a paso: cómo resolver el parcial',
    description: 'Una forma de atacar cada ejercicio, con el razonamiento, el código comentado, una traza del ejemplo y los errores que más se corrigen. Primero intentá resolverlos arriba; después usá esto para comparar.',
    method: {
      title: 'Método general (para cualquier ejercicio)',
      html: `<p class="guide-lead">Una receta que sirve para los seis ejercicios. La idea no es memorizar soluciones, sino tener un orden de ataque.</p>
<ol class="guide-ol">
  <li><strong>Leé el enunciado y marcá cuatro cosas:</strong> qué <em>recibe</em> la función, qué <em>devuelve</em>, qué pide por teclado (<code>input</code>) y qué <em>imprime</em>.</li>
  <li><strong>Seguí el ejemplo a mano</strong> antes de escribir código. Si no entendés por qué da ese resultado, todavía no entendiste el problema.</li>
  <li><strong>Identificá el patrón.</strong> En este parcial hay tres:
    <ul>
      <li><b>Ej. 1</b> — <code>while</code> con condición de corte y un acumulador (peso o tiempo).</li>
      <li><b>Ej. 2</b> — <code>for</code> sobre una lista de tuplas: comparar y separar en dos listas.</li>
      <li><b>Ej. 3</b> — transformar cada elemento (<code>map</code>) y ordenar (<code>sorted</code>).</li>
    </ul>
  </li>
  <li><strong>Separá en funciones chicas:</strong> una que pide y parsea los datos, otra con la lógica.</li>
  <li><strong>Armá el esqueleto:</strong> las variables necesarias y el <code>return</code> con el formato exacto del enunciado.</li>
  <li><strong>Probá con el ejemplo y con un caso borde</strong> (por ejemplo, un valor que llena justo la capacidad).</li>
</ol>
<div class="guide-callout tip"><strong>En el examen:</strong> empezá por el ejercicio que te da más seguridad para asegurar puntos.</div>`,
    },
    groups: [
      {
        label: 'Tema 1',
        items: [
          {
            tag: 'Tema 1 · Ej 1',
            title: 'Estantería de la biblioteca',
            enunciado: `Una biblioteca cuenta con varias estanterías para almacenar sus libros. Para evitar que una estantería supere su capacidad máxima de peso, el encargado quiere utilizar un programa que le permita registrar los libros que va guardando en cada estante.<br><br>
Se sabe que cada hoja de un libro pesa aproximadamente 2 gramos. Por lo tanto, a partir de la cantidad de hojas de un libro se puede calcular su peso.<br><br>
Implementar una función que dada <mark class="hl hl-recibe">una capacidad máxima que puede soportar un estante (expresada en kilogramos) y un identificador del mismo</mark>, <mark class="hl hl-input">le solicite al usuario, uno por uno, el nombre del libro y la cantidad de hojas que posee</mark>. Antes de guardar cada libro, deberá calcular su peso y verificar que, al incorporarlo, no se supere la capacidad máxima del estante. El ingreso de libros deberá continuar mientras haya espacio disponible. Cuando el próximo libro no pueda ser guardado porque haría que se supere la capacidad máxima, se deberá finalizar la carga.<br><br>
Finalmente, la función deberá <mark class="hl hl-devuelve">devolver una tupla con el siguiente formato: <code>(identificador_estante, [libros_guardados])</code></mark> donde <code>libros_guardados</code> contiene los nombres de todos los libros que pudieron ser almacenados en el estante.<br><br>
Ejemplo de ejecución si se recibe: <code>5</code>, <code>a.est1</code>
<pre><mark class="hl hl-imprime">a.est1 - Peso máximo: 5 kg</mark>
<mark class="hl hl-imprime">Peso actual: 0 kg.</mark>
Ingrese un libro y cantidad de hojas: Física para ciencias e ingeniería - 748

<mark class="hl hl-imprime">Peso actual: 1.496 kg.</mark>
Ingrese un libro y cantidad de hojas: Ingeniería electromagnética - 152

<mark class="hl hl-imprime">Peso actual: 1.8 kg.</mark>
Ingrese un libro y cantidad de hojas: Temas de Economía - 325

<mark class="hl hl-imprime">Peso actual: 2.45 kg.</mark>
Ingrese un libro y cantidad de hojas: Introducción a los Algoritmos - 1780
<mark class="hl hl-imprime">El libro no puede ser guardado porque se supera la capacidad máxima.</mark></pre>
La función deberá devolver: <code>("a.est1", ["Física para ciencias e ingeniería", "Ingeniería electromagnética", "Temas de Economía"])</code>`,
            html: `<h4>Unidades (la trampa del ejercicio)</h4>
<p>Cada hoja pesa 2 gramos, pero el máximo viene en kilos: hay que convertir. Por ejemplo 748 hojas × 2 = 1496 g = 1.496 kg.</p>
<p>Conviene trabajar todo en gramos (<code>peso_max * 1000</code>) y dividir por 1000 solo al imprimir. Así evitás errores de redondeo al sumar <code>float</code> (ese <code>1.7999999999999998</code> molesto).</p>
<h4>La lógica en palabras</h4>
<p>Pedir un libro → calcular su peso → ¿entra? → si entra, lo guardo y sumo el peso → pido otro. Si no entra, corto. "Entra" significa <code>peso_actual + peso &lt;= peso_max</code>: es <code>&lt;=</code>, no <code>&lt;</code>, porque un libro que deja la estantería justo en el máximo no la supera.</p>
<h4>La estructura del ciclo</h4>
<p>Hay que pedir un libro <em>antes</em> de saber si entra. El patrón es: pedir antes del <code>while</code>, y volver a pedir al final de cada vuelta.</p>
<h4>Código</h4>
<pre>def solicitar_ingreso(peso_actual):
    print(f"Peso actual: {peso_actual / 1000} kg.")
    ingreso = input("Ingrese un libro y cantidad de hojas: ")
    libro, hojas = ingreso.split(" - ")
    return libro, int(hojas) * 2          # peso en gramos

def guardar_libros(peso_max, id_estante):
    peso_max_g = peso_max * 1000          # kg -&gt; g
    libros_guardados = []
    peso_actual = 0
    print(f"{id_estante} - Peso máximo: {peso_max} kg")

    libro, peso = solicitar_ingreso(peso_actual)

    while peso_actual + peso &lt;= peso_max_g:
        peso_actual += peso
        libros_guardados.append(libro)
        libro, peso = solicitar_ingreso(peso_actual)

    print("El libro no puede ser guardado porque se supera la capacidad máxima.")
    return (id_estante, libros_guardados)</pre>
<h4>Traza con el ejemplo (5, "a.est1" → máximo = 5000 g)</h4>
<table class="guide-table">
  <thead><tr><th>Vuelta</th><th>Libro (hojas)</th><th>peso (g)</th><th>acum + peso</th><th>¿≤ 5000?</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>Física… (748)</td><td>1496</td><td>1496</td><td class="si">sí</td></tr>
    <tr><td>2</td><td>Ing. electromagnética (152)</td><td>304</td><td>1800</td><td class="si">sí</td></tr>
    <tr><td>3</td><td>Temas de Economía (325)</td><td>650</td><td>2450</td><td class="si">sí</td></tr>
    <tr><td>4</td><td>Intro. a los Algoritmos (1780)</td><td>3560</td><td>6010</td><td class="no">no, corta</td></tr>
  </tbody>
</table>
<div class="guide-callout bad"><strong>Errores típicos</strong>
  <ul>
    <li>No convertir g a kg (comparar gramos contra kilos).</li>
    <li>Usar <code>&lt;</code> en lugar de <code>&lt;=</code>.</li>
    <li>Usar <code>split("-")</code> en vez de <code>split(" - ")</code>: deja espacios en el nombre y no coincide con el resultado esperado.</li>
    <li>Poner el <code>print</code> del mensaje final <em>dentro</em> del <code>while</code>.</li>
  </ul>
</div>`,
          },
          {
            tag: 'Tema 1 · Ej 2',
            title: 'Juego de lunfardo',
            enunciado: `La biblioteca de FIUBA quiere armar un juego a modo de homenaje al <em>Martín Fierro</em>, donde el jugador se enfrenta a la máquina en una especie de "payada" para ver quién sabe más de lunfardo. El programa cuenta con una lista de tuplas ya creada, donde cada tupla tiene una palabra en lunfardo y su significado correcto en castellano. Por ejemplo:
<pre>diccionario = [("vichar", "mirar"), ("pucho", "cigarrillo"), ("chamuyar", "hablar"),
            ("gauchada", "favor"), ("misho", "pobre")]</pre>
Se pide implementar una función que <mark class="hl hl-recibe">reciba un diccionario con el formato especificado</mark> y, para cada elemento, <mark class="hl hl-input">le pregunte al jugador cuál cree que es el significado de la palabra en lunfardo</mark>. Al finalizar se debe <mark class="hl hl-devuelve">devolver una tupla con  dos listas: una con las palabras que el jugador acertó y otra con las que se equivocó</mark>.<br>
Por ejemplo, dada la lista <code>diccionario</code> de arriba, si la interacción con el jugador fuera la siguiente:
<pre>¿Qué significa 'vichar'?: mirar
¿Qué significa 'pucho'?: fumar
¿Qué significa 'chamuyar'?: hablar
¿Qué significa 'gauchada'?: favor
¿Qué significa 'misho'?: pan</pre>
La función debería devolver:
<pre>(["vichar", "chamuyar", "gauchada"], ["pucho", "misho"])</pre>`,
            html: `<h4>La lógica en palabras</h4>
<p>Para cada tupla: pregunto → comparo con el significado correcto → si coincide, la palabra va a <code>acertadas</code>; si no, a <code>erradas</code>.</p>
<h4>Estructura</h4>
<p>Como hay que recorrer todos los elementos, es un <code>for</code>, desempaquetando la tupla directamente.</p>
<h4>Código</h4>
<pre>def jugar_payada(diccionario):
    acertadas = []
    erradas = []

    for palabra, significado in diccionario:
        respuesta = input(f"¿Qué significa '{palabra}'?: ")

        if respuesta.lower() == significado.lower():
            acertadas.append(palabra)
        else:
            erradas.append(palabra)

    return (acertadas, erradas)</pre>
<h4>Traza con el ejemplo</h4>
<ul>
  <li><code>vichar</code> → "mirar" == "mirar" → acertadas</li>
  <li><code>pucho</code> → "fumar" != "cigarrillo" → erradas</li>
  <li><code>chamuyar</code> → "hablar" == "hablar" → acertadas</li>
  <li><code>gauchada</code> → "favor" == "favor" → acertadas</li>
  <li><code>misho</code> → "pan" != "pobre" → erradas</li>
</ul>
<p>Resultado: <code>(["vichar", "chamuyar", "gauchada"], ["pucho", "misho"])</code>. Coincide con el enunciado.</p>
<div class="guide-callout tip"><strong>Detalles:</strong> el <code>.lower()</code> en ambos lados hace que "Mirar" y "mirar" cuenten igual (podés sumar <code>.strip()</code> para ignorar espacios). Creá las dos listas <em>antes</em> del <code>for</code>, si no se reinician en cada vuelta.</div>`,
          },
          {
            tag: 'Tema 1 · Ej 3',
            title: 'Normalizar y ordenar el catálogo',
            enunciado: `El catálogo de una biblioteca se encuentra desordenado y los títulos de los libros presentan diferentes formatos, lo que dificulta encontrar rápidamente los libros que se necesitan. Para solucionar este problema, se desea desarrollar una función que permita normalizar y ordenar los títulos del catálogo.<br><br>
Por ejemplo si se recibe el catálogo: <code>["Física_Para_Ingeniería", "Introducción a los algoritmos", "Álgebra lineal, 1"]</code> se debe devolver <code>["álgebralineal1", "físicaparaingeniería", "introducciónalosalgoritmos"]</code> .<br><br>
La función deberá <mark class="hl hl-recibe">recibir una lista con los títulos de los libros</mark> y <mark class="hl hl-devuelve">devolver una nueva lista con los títulos formateados y ordenados alfabéticamente</mark>. El formateo de cada título incluye eliminar los caracteres especiales (incluyendo espacios) y pasar todo el texto a minúscula.<br><br>
Los únicos caracteres especiales que deberán eliminarse son: <code>“ “</code>  <code>“.”</code>  <code>“,”</code>   <code>“-”</code>  <code>“_”</code><br><br>
<b>Bonus:</b> intentar resolver el ejercicio sin utilizar ciclos (<code>for</code> / <code>while</code>).`,
            html: `<h4>Dividir el problema en dos</h4>
<p>Una función que formatea <em>un</em> título, y después aplicarla a toda la lista (<code>map</code>) y ordenar (<code>sorted</code>). Ejemplo: <code>"Álgebra lineal, 1"</code> → <code>"álgebralineal1"</code>.</p>
<h4>Código</h4>
<pre>def formatear_titulo(titulo):
    formateado = titulo
    for caracter in " -_,.":
        formateado = formateado.replace(caracter, "")
    return formateado.lower()

def formatear_catalogo(catalogo):
    formateado = list(map(formatear_titulo, catalogo))
    return sorted(formateado)</pre>
<h4>Versión del bonus (sin ningún ciclo)</h4>
<p>La de arriba usa un <code>for</code> dentro de <code>formatear_titulo</code>. Para cumplir el bonus, encadenás los <code>replace</code>:</p>
<pre>def formatear_titulo(titulo):
    return (titulo.replace(" ", "").replace(".", "").replace(",", "")
                  .replace("-", "").replace("_", "").lower())

def formatear_catalogo(catalogo):
    return sorted(map(formatear_titulo, catalogo))</pre>`,
          },
        ],
      },
      {
        label: 'Tema 2',
        items: [
          {
            tag: 'Tema 2 · Ej 1',
            title: 'Exposición oral (temas y minutos)',
            enunciado: `Una profesora de Geografía está preparando una evaluación oral sobre los distintos puntos turísticos de Argentina. Como debe evaluar a muchos estudiantes, decidió asignarle a cada uno un tiempo máximo de exposición, que puede variar según el estudiante. Para organizar las evaluaciones, necesita un programa que le permita registrar los temas desarrollados por cada alumno y controlar el tiempo utilizado.<br><br>
Implementar una función que dado <mark class="hl hl-recibe">el apellido del estudiante y el tiempo máximo disponible para su exposición</mark>, <mark class="hl hl-input">le solicite al estudiante el nombre de un tema y la cantidad de minutos que le tomará desarrollarlo</mark>. Los ingresos continuarán mientras quede tiempo suficiente para incorporar un nuevo tema. Cuando el tiempo disponible no sea suficiente para incorporar otro tema, deberá finalizar la carga.<br><br>
Al finalizar, la función deberá <mark class="hl hl-devuelve">devolver una tupla con el siguiente formato: <code>(apellido_estudiante, [temas_expuestos])</code></mark> donde <code>temas_expuestos</code> contiene los nombres de los temas que fueron registrados durante la exposición.<br><br>
Ejemplo de ejecución si se recibe: <code>"Roca"</code>, <code>10</code>
<pre><mark class="hl hl-imprime">Roca - Tiempo máximo: 10 minutos</mark>

<mark class="hl hl-imprime">Tiempo disponible: 10 minutos.</mark>
Ingrese un tema y cantidad de minutos: Cataratas del Iguazú - 3

<mark class="hl hl-imprime">Tiempo disponible: 7 minutos.</mark>
Ingrese un tema y cantidad de minutos: Glaciar Perito Moreno - 2

<mark class="hl hl-imprime">Tiempo disponible: 5 minutos.</mark>
Ingrese un tema y cantidad de minutos: Quebrada de Humahuaca - 4

<mark class="hl hl-imprime">Tiempo disponible: 2 minutos.</mark>
Ingrese un tema y cantidad de minutos: Península Valdés - 4

<mark class="hl hl-imprime">No hay tiempo suficiente para desarrollar este tema.</mark></pre>
La función deberá devolver: <code>("Roca", ["Cataratas del Iguazú", "Glaciar Perito Moreno", "Quebrada de Humahuaca"])</code>`,
            html: `<h4>Es el mismo patrón que el Ej. 1 del Tema 1</h4>
<p>La diferencia: en vez de un peso que <em>sube</em> hasta un máximo, hay un tiempo que <em>baja</em> hasta 0. Y acá no hay conversión de unidades.</p>
<h4>La condición</h4>
<p>Un tema entra si alcanza el tiempo: <code>tiempo &lt;= tiempo_disponible</code> (lo mismo que <code>tiempo_disponible - tiempo &gt;= 0</code>). Si ocupa justo lo que queda, alcanza; con <code>&gt; 0</code> se rechazaría mal.</p>
<h4>Código</h4>
<pre>def solicitar_ingreso(tiempo_disponible):
    print(f"Tiempo disponible: {tiempo_disponible} minutos.")
    ingreso = input("Ingrese un tema y cantidad de minutos: ")
    tema, minutos = ingreso.split(" - ")
    return tema, int(minutos)

def gestionar_exposicion(apellido, tiempo_max):
    temas = []
    tiempo_disponible = tiempo_max
    print(f"{apellido} - Tiempo máximo: {tiempo_max} minutos")

    tema, tiempo = solicitar_ingreso(tiempo_disponible)

    while tiempo &lt;= tiempo_disponible:
        temas.append(tema)
        tiempo_disponible -= tiempo
        tema, tiempo = solicitar_ingreso(tiempo_disponible)

    print("No hay tiempo suficiente para desarrollar este tema.")
    return (apellido, temas)</pre>
<h4>Traza con el ejemplo ("Roca", 10)</h4>
<table class="guide-table">
  <thead><tr><th>Vuelta</th><th>Tema</th><th>min</th><th>disp. antes</th><th>¿entra?</th><th>disp. después</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>Cataratas del Iguazú</td><td>3</td><td>10</td><td class="si">sí</td><td>7</td></tr>
    <tr><td>2</td><td>Glaciar Perito Moreno</td><td>2</td><td>7</td><td class="si">sí</td><td>5</td></tr>
    <tr><td>3</td><td>Quebrada de Humahuaca</td><td>4</td><td>5</td><td class="si">sí</td><td>1</td></tr>
    <tr><td>4</td><td>Península Valdés</td><td>4</td><td>1</td><td class="no">no, corta</td><td>—</td></tr>
  </tbody>
</table>
<div class="guide-callout warn"><strong>Ojo con el enunciado:</strong> después de "Quebrada de Humahuaca" muestra "Tiempo disponible: 2 minutos", pero 5 − 4 = 1. Es un error de tipeo del enunciado; el resultado final igual es correcto.</div>
<div class="guide-callout bad"><strong>Errores típicos</strong>
  <ul>
    <li>Usar <code>&gt; 0</code> en lugar de <code>&gt;= 0</code> / <code>&lt;=</code> (rechaza un tema que llena justo el tiempo).</li>
    <li><code>split("-")</code> en lugar de <code>split(" - ")</code>.</li>
    <li>Olvidar convertir los minutos con <code>int()</code>.</li>
  </ul>
</div>`,
          },
          {
            tag: 'Tema 2 · Ej 2',
            title: 'Torneo de capitales',
            enunciado: `En FIUBA quieren armar un torneo de geografía para poner a prueba cuánto saben los estudiantes sobre capitales de provincias argentinas. Para esto se cuenta con una lista de tuplas donde cada elemento contiene el nombre de la provincia y su capital, por ejemplo:
<pre>provincias = [("Mendoza", "Mendoza"), ("Salta", "Salta"), ("Chubut", "Rawson"),
              ("Misiones", "Posadas"), ("Neuquén", "Neuquén")]</pre>
Se pide implementar una función que <mark class="hl hl-recibe">reciba una lista de provincias con el formato específicado</mark> y, para cada una, <mark class="hl hl-input">le pregunte al jugador cuál es su capital</mark>. Al finalizar se debe <mark class="hl hl-devuelve">devolver una tupla con dos listas: una con las provincias que el jugador acertó y otra con las que se equivocó</mark>.<br><br>
Por ejemplo, dada la lista <code>provincias</code> de arriba, si la interacción con el jugador fuera la siguiente:
<pre>¿Cuál es la capital de Mendoza?: Mendoza
¿Cuál es la capital de Salta?: Salta
¿Cuál es la capital de Chubut?: Comodoro Rivadavia
¿Cuál es la capital de Misiones?: Posadas
¿Cuál es la capital de Neuquén?: San Martín de los Andes</pre>
La función debería devolver:
<pre>(["Mendoza", "Salta", "Misiones"], ["Chubut", "Neuquén"])</pre>`,
            html: `<h4>Es idéntico al Ej. 2 del Tema 1</h4>
<p>Cambia solo el texto de la pregunta y qué se agrega a cada lista (acá, la provincia).</p>
<h4>Código</h4>
<pre>def evaluar_capitales(provincias):
    acertadas = []
    erradas = []

    for provincia, capital in provincias:
        respuesta = input(f"¿Cuál es la capital de {provincia}?: ")

        if respuesta.lower() == capital.lower():
            acertadas.append(provincia)
        else:
            erradas.append(provincia)

    return (acertadas, erradas)</pre>
<h4>Traza con el ejemplo</h4>
<ul>
  <li>Mendoza → "Mendoza" ✓</li>
  <li>Salta → "Salta" ✓</li>
  <li>Chubut → "Comodoro Rivadavia" ≠ "Rawson" ✗</li>
  <li>Misiones → "Posadas" ✓</li>
  <li>Neuquén → "San Martín de los Andes" ≠ "Neuquén" ✗</li>
</ul>
<p>Resultado: <code>(["Mendoza", "Salta", "Misiones"], ["Chubut", "Neuquén"])</code>. Coincide con el enunciado.</p>`,
          },
          {
            tag: 'Tema 2 · Ej 3',
            title: 'Normalizar exposiciones del museo',
            enunciado: `Para una exposición del Museo de Ciencia y Técnica de la FIUBA, se está recopilando información sobre las distintas exposiciones disponibles para organizar una próxima visita guiada. Sin embargo, la información se encuentra almacenada utilizando distintos formatos para los títulos, lo que dificulta su organización y gestión. Para facilitar esta tarea, se necesita un programa que permita normalizar los nombres de las exposiciones y devolverlos ordenados alfabéticamente.<br><br>
Implementar una función que, <mark class="hl hl-recibe">dada una lista con los nombres de todas las exposiciones disponibles</mark>, <mark class="hl hl-devuelve">devuelva una nueva lista en la que cada nombre esté normalizado</mark> según los siguientes criterios:
<ul>
<li>Todas las letras deben estar en mayúsculas.</li>
<li>Cada espacio debe ser reemplazado por un guion bajo <b>(<code>_</code>)</b>.</li>
<li>Se deben eliminar los siguientes caracteres especiales: <code>“.,:-”</code></li>
<li>Los nombres resultantes deben estar ordenados alfabéticamente.</li>
</ul>
Por ejemplo, si se recibe <code>["Filatelia temática: puentes y caminos", "Obras del Ing. Torroja", "Actividades espaciales"]</code>  se deberá devolver <code>["ACTIVIDADES_ESPACIALES", "FILATELIA_TEMÁTICA_PUENTES_Y_CAMINOS", "OBRAS_DEL_ING_TORROJA"]</code> .<br><br>
<b>Bonus:</b> intentar resolver el ejercicio sin utilizar ciclos (<code>for</code> / <code>while</code>).`,
            html: `<h4>El orden de los pasos importa</h4>
<p>Reemplazá los espacios por <code>_</code> y después eliminá los caracteres especiales, cuidando de no borrar el <code>_</code> nuevo. Como el <code>_</code> no está en la lista a eliminar, cualquier orden funciona; lo importante es no tocarlo.</p>
<h4>Cómo queda un nombre</h4>
<p><code>"Obras del Ing. Torroja"</code> → mayúsculas → <code>"OBRAS DEL ING. TORROJA"</code> → espacios a <code>_</code> → <code>"OBRAS_DEL_ING._TORROJA"</code> → sacar <code>.</code> → <code>"OBRAS_DEL_ING_TORROJA"</code>.</p>
<h4>Código</h4>
<pre>def formatear_titulo(titulo):
    formateado = titulo.upper()
    formateado = formateado.replace(" ", "_")
    for caracter in ",.:-":
        formateado = formateado.replace(caracter, "")
    return formateado

def organizar_titulos(titulos):
    return sorted(list(map(formatear_titulo, titulos)))</pre>
<h4>Versión del bonus (sin ciclos)</h4>
<pre>def formatear_titulo(titulo):
    return (titulo.upper().replace(" ", "_").replace(",", "")
                  .replace(".", "").replace(":", "").replace("-", ""))

def organizar_titulos(titulos):
    return sorted(map(formatear_titulo, titulos))</pre>
<p>Resultado del ejemplo: <code>["ACTIVIDADES_ESPACIALES", "FILATELIA_TEMÁTICA_PUENTES_Y_CAMINOS", "OBRAS_DEL_ING_TORROJA"]</code>. Acá la tilde está en el medio del nombre, así que no afecta el orden.</p>`,
          },
        ],
      },
    ],
  },
};
