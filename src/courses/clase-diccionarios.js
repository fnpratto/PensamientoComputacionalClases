/** @type {import('./types.js').Course} */
export default {
  slug: 'clase-diccionarios',
  title: 'Clase de Diccionarios',
  gate: {
    title: ['Clase de', 'Diccionarios'],
    subtitle: 'Errores comunes al usar diccionarios + ejercicios de la Unidad 4',
    buttonLabel: 'Empezar',
    // Traba liviana para que no entren antes de tiempo: queda visible en el
    // bundle, así que no protege nada sensible.
    password: 'te-para-3',
  },
  hero: {
    badge: 'Pensamiento Computacional · Curso 11: Retamozo, Pratto · 2026',
    title: ['Unidad 4 ·', 'Diccionarios'],
    subtitle: 'Reconocé los errores más comunes al usar diccionarios, repasá lo esencial en el machete y resolvé los ejercicios con tests automáticos',
    decoration: '🔑 📓 🗝️ 📒 🔐 📔',
  },
  footer: 'Clase de Diccionarios · 2026 · Pensamiento Computacional FIUBA',
  nav: { label: 'Diccionarios', quiz: 'Errores comunes', exercises: 'Ejercicios', guide: 'Machete' },
  quiz: {
    eyebrow: 'Autoevaluación',
    title: 'Errores comunes con diccionarios',
    description: 'Cada código tiene un error típico al usar diccionarios. Leelo con atención y elegí cuál es el problema.',
    sheet: 'Diccionarios-Quiz',
    sections: [
      { name: 'Acceso', label: 'Acceso' },
      { name: 'Mutabilidad', label: 'Mutabilidad' },
      { name: 'Operaciones', label: 'Operaciones' },
      { name: 'Ordenamiento', label: 'Ordenamiento' },
    ],
    summary: {
      high: '¡Muy bien! Ya reconocés los errores más comunes al usar diccionarios.',
      mid: '¡Bien! Releé las que fallaste: son errores que aparecen seguido.',
      low: 'Releé las explicaciones y el machete: estos errores son muy frecuentes.',
    },
    questions: [
      /* ── ACCESO ── */
      {
        section: 'Acceso',
        prompt: `Se busca el stock de un producto. ¿Cuál es el problema?<pre>def obtener_stock(inventario, producto):
    return inventario[producto]</pre>`,
        answers: ['Si el producto no está en el inventario, inventario[producto] lanza KeyError: conviene usar get() o chequear con in'],
        options: [
          'Si el producto no está en el inventario, inventario[producto] lanza KeyError: conviene usar get() o chequear con in',
          'A los diccionarios no se accede con corchetes, hay que recorrerlos con un for',
          'Falta castear el producto a string antes de buscarlo',
          'No tiene ningún error',
        ],
        hint: '¿Qué pasa si el producto todavía no fue cargado en el inventario?',
        feedbackOk: 'Correcto. Acceder a una clave que no existe con <code>[]</code> lanza <code>KeyError</code>. Para no romper: <code>if producto in inventario</code> o <code>inventario.get(producto)</code>.',
        feedbackBad: 'El problema es el acceso con <code>[]</code>: si la clave no existe, <code>inventario[producto]</code> lanza <code>KeyError</code>. Conviene <code>inventario.get(producto)</code> o chequear con <code>in</code>.',
      },
      {
        section: 'Acceso',
        prompt: `Se quiere mostrar cada contacto con su número. ¿Cuál es el problema?<pre>def mostrar_agenda(agenda):
    for numero in agenda.values():
        print(f"{numero}: {agenda[numero]}")</pre>`,
        answers: ['Itera sobre los valores y después los usa como si fueran claves: del valor no se puede volver a la clave'],
        options: [
          'Itera sobre los valores y después los usa como si fueran claves: del valor no se puede volver a la clave',
          'El método correcto es valores(), no values()',
          'Falta un return al final de la función',
          'Los diccionarios no se pueden recorrer con un for',
        ],
        hint: '¿Qué te da values()? ¿Podés usar un valor como clave para volver a entrar al diccionario?',
        feedbackOk: 'Correcto. <code>values()</code> da los valores, y del valor no se vuelve a la clave. Si necesitás los dos, recorré con <code>for clave, valor in agenda.items()</code>.',
        feedbackBad: 'El problema es que recorre <code>values()</code> y después usa el valor como clave en <code>agenda[numero]</code>. Del valor no se puede volver a la clave: usá <code>agenda.items()</code>.',
      },
      /* ── MUTABILIDAD ── */
      {
        section: 'Mutabilidad',
        prompt: `Se arma un diccionario que agrupa un nombre por cada lista de ids. ¿Cuál es el problema?<pre>def agrupar(datos):
    grupos = {}
    for lista_ids, nombre in datos:
        grupos[lista_ids] = nombre
    return grupos</pre>`,
        answers: ['Usa una lista como clave: las claves tienen que ser de un tipo inmutable (por ejemplo, una tupla)'],
        options: [
          'Usa una lista como clave: las claves tienen que ser de un tipo inmutable (por ejemplo, una tupla)',
          'Un diccionario no puede tener textos como valores',
          'Falta inicializar grupos con la función dict()',
          'El for no puede desempaquetar dos variables a la vez',
        ],
        hint: '¿Qué tipos de datos pueden ser clave de un diccionario?',
        feedbackOk: 'Correcto. Las claves tienen que ser inmutables. Una lista no puede ser clave (<code>TypeError: unhashable type</code>); sí podría una tupla.',
        feedbackBad: 'El problema es usar una lista como clave. Las claves tienen que ser de un tipo inmutable (texto, número, tupla); una lista da <code>TypeError: unhashable type</code>.',
      },
      {
        section: 'Mutabilidad',
        prompt: `Se quiere obtener los precios con descuento sin perder los originales. ¿Cuál es el problema?<pre>def con_descuento(precios, porcentaje):
    for producto in precios:
        precios[producto] = precios[producto] * (1 - porcentaje)
    return precios</pre>`,
        answers: ['Modifica el diccionario original recibido; si se querían conservar los precios, hay que trabajar sobre una copia con copy()'],
        options: [
          'Modifica el diccionario original recibido; si se querían conservar los precios, hay que trabajar sobre una copia con copy()',
          'No se puede asignar a precios[producto] dentro de un for',
          'Falta castear el porcentaje a float',
          'El return sobra porque la función ya modifica precios',
        ],
        hint: 'Después de llamar a la función, ¿el diccionario original quedó igual que antes?',
        feedbackOk: 'Correcto. Los diccionarios son mutables: al modificar <code>precios</code> dentro de la función se cambia el original de quien la llamó. Si querés conservarlo, empezá con <code>precios.copy()</code>.',
        feedbackBad: 'El problema es que modifica el diccionario original (los diccionarios son mutables y se pasan por referencia). Para conservar los precios originales, trabajá sobre <code>precios.copy()</code>.',
      },
      /* ── OPERACIONES ── */
      {
        section: 'Operaciones',
        prompt: `Se quiere contar cuántas veces aparece cada palabra. ¿Cuál es el problema?<pre>def contar_palabras(palabras):
    conteo = {}
    for palabra in palabras:
        conteo[palabra] = 1
    return conteo</pre>`,
        answers: ['Siempre asigna 1, así que no cuenta las repeticiones: debería sumar con conteo.get(palabra, 0) + 1'],
        options: [
          'Siempre asigna 1, así que no cuenta las repeticiones: debería sumar con conteo.get(palabra, 0) + 1',
          'No se puede usar un texto como clave de un diccionario',
          'Falta recorrer el diccionario con items()',
          'conteo tendría que ser una lista, no un diccionario',
        ],
        hint: 'Si una palabra aparece 3 veces, ¿qué queda guardado en conteo?',
        feedbackOk: 'Correcto. Siempre pisa el valor con 1, así que toda palabra queda en 1. Para contar: <code>conteo[palabra] = conteo.get(palabra, 0) + 1</code>.',
        feedbackBad: 'El problema es que asigna 1 cada vez, pisando lo anterior. Hay que acumular: <code>conteo[palabra] = conteo.get(palabra, 0) + 1</code>.',
      },
      {
        section: 'Operaciones',
        prompt: `Se quiere quitar un producto del stock. ¿Cuál es el problema?<pre>def quitar_producto(stock, producto):
    del stock[producto]
    return stock</pre>`,
        answers: ['Si el producto no está en el stock, del stock[producto] lanza KeyError: conviene chequear con in antes'],
        options: [
          'Si el producto no está en el stock, del stock[producto] lanza KeyError: conviene chequear con in antes',
          'del no se usa con diccionarios, solo con listas',
          'Falta recorrer el stock con un for para encontrar el producto',
          'Tendría que devolver el valor eliminado, no el diccionario',
        ],
        hint: '¿Y si el producto ya no estaba en el stock cuando se llama la función?',
        feedbackOk: 'Correcto. <code>del</code> sobre una clave que no existe lanza <code>KeyError</code>. Chequeá con <code>if producto in stock</code> antes, o usá <code>stock.pop(producto, None)</code>.',
        feedbackBad: 'El problema es que <code>del stock[producto]</code> lanza <code>KeyError</code> si la clave no existe. Conviene chequear con <code>in</code> antes, o usar <code>pop</code> con un valor por defecto.',
      },
      /* ── ORDENAMIENTO ── */
      {
        section: 'Ordenamiento',
        prompt: `Se quiere ordenar un diccionario de precios por su clave. ¿Cuál es el problema?<pre>def ordenar_precios(precios):
    return precios.sort()</pre>`,
        answers: ['Los diccionarios no tienen método sort(): da AttributeError; para las claves ordenadas se usa sorted(precios)'],
        options: [
          'Los diccionarios no tienen método sort(): da AttributeError; para las claves ordenadas se usa sorted(precios)',
          'sort() ordena de mayor a menor, falta pasarle reverse=True',
          'Falta pasarle el parámetro key a sort()',
          'No tiene ningún error',
        ],
        hint: '¿El método sort() existe para los diccionarios, como existe para las listas?',
        feedbackOk: 'Correcto. <code>sort()</code> es de las listas, no de los diccionarios (da <code>AttributeError</code>). Para las claves ordenadas: <code>sorted(precios)</code>; para un diccionario ordenado: <code>dict(sorted(precios.items()))</code>.',
        feedbackBad: 'El problema es que los diccionarios no tienen <code>sort()</code> (eso da <code>AttributeError</code>). Usá <code>sorted(precios)</code> para las claves o <code>dict(sorted(precios.items()))</code>.',
      },
      {
        section: 'Ordenamiento',
        prompt: `alumnos es una lista de diccionarios y se la quiere ordenar por nombre. ¿Cuál es el problema?<pre>def ordenar_alumnos(alumnos):
    return sorted(alumnos)</pre>`,
        answers: ['No se pueden comparar diccionarios con <, así que sorted necesita el parámetro key (por ejemplo, key=obtener_nombre)'],
        options: [
          'No se pueden comparar diccionarios con <, así que sorted necesita el parámetro key (por ejemplo, key=obtener_nombre)',
          'sorted no funciona con listas, solo con diccionarios',
          'Hay que usar alumnos.sort() en vez de sorted(alumnos)',
          'Falta convertir la lista a diccionario antes de ordenar',
        ],
        hint: '¿Cómo sabe sorted cuál diccionario tiene que ir antes que otro?',
        feedbackOk: 'Correcto. No hay un orden natural entre diccionarios, así que <code>sorted(alumnos)</code> da <code>TypeError</code>. Hay que decirle por qué ordenar: <code>sorted(alumnos, key=obtener_nombre)</code>.',
        feedbackBad: 'El problema es que no se pueden comparar diccionarios entre sí. <code>sorted</code> necesita el parámetro <code>key</code> para saber por qué ordenar, por ejemplo <code>sorted(alumnos, key=obtener_nombre)</code>.',
      },
    ],
  },
  exercises: {
    eyebrow: 'Ejercicios de la Unidad 4',
    title: 'Ejercicios de diccionarios',
    description: 'Los ejercicios recomendados por la cátedra. Probá tu solución con los tests automáticos, entregala, y después mirá cómo los resolvieron tus compañeros.',
    sheetPrefix: 'Diccionarios-',
    submitLabel: 'Entregar',
    items: [
      /* ── EJ 1 · STOCK ── */
      {
        badge: 'Ejercicio 1',
        tag: 'input · while · len',
        title: 'Stock de la tienda',
        statement: `Tenemos que manejar el stock de nuestra tienda y para digitalizarlo queremos almacenar cada producto con su stock en un par clave-valor dentro de un diccionario. Algunos productos ya están digitalizados y otros los cargamos a mano.<br><br>
Implementar una función que reciba un diccionario donde las claves son los nombres de los productos y el valor es la cantidad de unidades disponibles. La función deberá pedirle al usuario el nombre de un producto y su stock (con el formato <code>&lt;producto&gt;, &lt;stock&gt;</code>) y guardarlo en el diccionario recibido. Se le piden productos hasta que ingrese <code>"x"</code>. Al finalizar, debe mostrar la cantidad total de productos almacenados.<br><br>
Por ejemplo, si se recibe <code>{"atún": 10, "agua": 22}</code>:
<pre>Ingrese producto y stock: papas, 18
Ingrese producto y stock: fideos, 24
Ingrese producto y stock: sopa, 5
Ingrese producto y stock: X
Productos registrados en total: 5</pre>
El diccionario final queda: <code>{"atún": 10, "papas": 18, "agua": 22, "fideos": 24, "sopa": 5}</code>.<br><br>
<b>Plus:</b> como a veces nos olvidamos de los productos ya registrados, hacer que si se ingresa un producto repetido se muestre una advertencia (<code>¡Ya ingresó ese producto!</code>) antes de guardarlo.`,
        hint: `El ingreso trae dos partes separadas por <code>", "</code>. Acordate de castear el stock a <code>int</code> y de cortar cuando la entrada sea <code>"x"</code> (en mayúscula o minúscula). <code>len(stock)</code> te da la cantidad de pares.`,
        note: `Para los tests, la función se tiene que llamar <code>gestionar_stock(stock)</code>. El verificador simula lo que escribe el usuario y revisa lo que imprime al final.`,
        starter: `def gestionar_stock(stock):\n    pass`,
        test: {
          funcName: 'gestionar_stock',
          cases: [
            {
              args: [{ 'atún': 10, 'agua': 22 }],
              stdin: ['papas, 18', 'fideos, 24', 'sopa, 5', 'X'],
              expect: { type: 'stdout_contains', parts: ['productos registrados en total: 5'] },
            },
            {
              args: [{}],
              stdin: ['papas, 18', 'papas, 20', 'X'],
              expect: { type: 'stdout_contains', parts: ['productos registrados en total: 1'] },
            },
          ],
        },
      },

      /* ── EJ 2 · AGENDA ── */
      {
        badge: 'Ejercicio 2',
        tag: 'tuplas · listas de diccionarios',
        title: 'Transferir contactos',
        statement: `Estamos programando una agenda de contactos y queremos transferir los contactos de la tarjeta SIM a nuestra aplicación. En la SIM los contactos se guardan como una tupla <code>(nombre, número, dirección)</code>.<br><br>
Implementar una función que reciba un contacto de la SIM y una agenda representada como una lista de diccionarios, donde cada diccionario tiene el formato <code>{"nombre": ..., "número": ..., "domicilio": ...}</code>. La función deberá agregar el contacto de la SIM a la agenda recibida y devolver la agenda actualizada.<br><br>
Por ejemplo, con el contacto <code>("Ana", "11", "Dir A")</code> y la agenda <code>[{"nombre": "Zoe", "número": "99", "domicilio": "Dir Z"}]</code> se devuelve:
<pre>[{"nombre": "Zoe", "número": "99", "domicilio": "Dir Z"},
 {"nombre": "Ana", "número": "11", "domicilio": "Dir A"}]</pre>
<b>Plus:</b> ¿y si quisiéramos devolver la agenda ordenada alfabéticamente por el nombre? (con <code>sorted</code> y <code>key</code>).`,
        hint: `Podés desempaquetar la tupla directamente: <code>nombre, numero, direccion = contacto</code>. Armá un diccionario con las claves exactas <code>"nombre"</code>, <code>"número"</code> y <code>"domicilio"</code>, agregalo con <code>append</code> y devolvé la agenda.`,
        note: `Para los tests, la función se tiene que llamar <code>agregar_contacto(contacto, agenda)</code> y devolver la agenda con el contacto agregado al final.`,
        starter: `def agregar_contacto(contacto, agenda):\n    pass`,
        test: {
          funcName: 'agregar_contacto',
          cases: [
            {
              args: [['Ana', '11', 'Dir A'], [{ 'nombre': 'Zoe', 'número': '99', 'domicilio': 'Dir Z' }]],
              expect: {
                type: 'json',
                value: [
                  { 'nombre': 'Zoe', 'número': '99', 'domicilio': 'Dir Z' },
                  { 'nombre': 'Ana', 'número': '11', 'domicilio': 'Dir A' },
                ],
              },
            },
            {
              args: [['Bruno', '22', 'Dir B'], []],
              expect: { type: 'json', value: [{ 'nombre': 'Bruno', 'número': '22', 'domicilio': 'Dir B' }] },
            },
          ],
        },
      },

      /* ── EJ 3 · VISITAS ── */
      {
        badge: 'Ejercicio 3',
        tag: 'listas de diccionarios · acumuladores',
        title: 'Resumen de visitas',
        statement: `Pedro lleva un registro de sus salidas. Cada salida es un diccionario como:
<pre>{"lugar_visitado": "Rosedal", "tiempo_estadia": 90, "puntuacion": 8}</pre>
Al finalizar el año quiere un resumen con tres estadísticas: los lugares visitados <b>sin repetir</b>, la <b>puntuación promedio</b> de las salidas y el <b>tiempo total</b> de todas las visitas.<br><br>
Implementar una función que reciba una lista de visitas y devuelva un diccionario con las claves <code>"lugares_visitados"</code>, <code>"puntuacion_promedio"</code> y <code>"tiempo_total"</code>.<br><br>
Por ejemplo, para una lista con Rosedal (80 min, 9), Parque Lezama (120 min, 6), Rosedal (35 min, 6) y Museo FIUBA (75 min, 7) se debe devolver:
<pre>{
  "lugares_visitados": ["Rosedal", "Parque Lezama", "Museo FIUBA"],
  "puntuacion_promedio": 7.0,
  "tiempo_total": 310
}</pre>`,
        hint: `Llevá un acumulador para el tiempo y una lista para las puntuaciones (el promedio es <code>sum / len</code>). Para no repetir lugares, antes de agregar chequeá con <code>if lugar not in lugares_visitados</code>.`,
        note: `Para los tests, la función se tiene que llamar <code>analizar_visitas(visitas)</code> y devolver un diccionario con esas tres claves exactas.`,
        starter: `def analizar_visitas(visitas):\n    pass`,
        test: {
          funcName: 'analizar_visitas',
          cases: [
            {
              args: [[
                { 'lugar_visitado': 'Rosedal', 'tiempo_estadia': 80, 'puntuacion': 9 },
                { 'lugar_visitado': 'Parque Lezama', 'tiempo_estadia': 120, 'puntuacion': 6 },
                { 'lugar_visitado': 'Rosedal', 'tiempo_estadia': 35, 'puntuacion': 6 },
                { 'lugar_visitado': 'Museo FIUBA', 'tiempo_estadia': 75, 'puntuacion': 7 },
              ]],
              expect: {
                type: 'json',
                value: {
                  'lugares_visitados': ['Rosedal', 'Parque Lezama', 'Museo FIUBA'],
                  'puntuacion_promedio': 7.0,
                  'tiempo_total': 310,
                },
              },
            },
            {
              args: [[{ 'lugar_visitado': 'Casa', 'tiempo_estadia': 10, 'puntuacion': 5 }]],
              expect: {
                type: 'json',
                value: { 'lugares_visitados': ['Casa'], 'puntuacion_promedio': 5.0, 'tiempo_total': 10 },
              },
            },
          ],
        },
      },

      /* ── EJ 4 · RECETAS ── */
      {
        badge: 'Ejercicio 4',
        tag: 'filtrar · ordenar · map',
        title: 'Buscar recetas por ingrediente',
        statement: `Tenemos un cuaderno de recetas. Cada receta es un diccionario como:
<pre>{"nombre": "Waffles de banana",
 "ingredientes": ["huevo", "banana", "harina"],
 "procedimiento": "https://...",
 "dificultad": 5}</pre>
Implementar una función que, dada una lista de recetas y un ingrediente, devuelva una lista con los <b>nombres</b> de las recetas que contienen ese ingrediente, ordenados según su dificultad (de menor a mayor).<br><br>
Por ejemplo, para el ingrediente <code>"leche"</code> y recetas Waffles (dificultad 5, con leche), Puré (dificultad 1, con leche) y Empanadas (dificultad 3, sin leche), se debe devolver:
<pre>["Puré", "Waffles"]</pre>`,
        hint: `Primero juntá en una lista las recetas cuyo <code>"ingredientes"</code> contenga el ingrediente (<code>if ingrediente in receta["ingredientes"]</code>). Después ordenalas con <code>sorted(..., key=obtener_dificultad)</code> y quedate con los nombres (podés usar <code>map</code>).`,
        note: `Para los tests, la función se tiene que llamar <code>filtrar_recetas(recetas, ingrediente)</code> y devolver una lista de nombres ordenada por dificultad.`,
        starter: `def filtrar_recetas(recetas, ingrediente):\n    pass`,
        test: {
          funcName: 'filtrar_recetas',
          cases: [
            {
              args: [[
                { 'nombre': 'Waffles', 'ingredientes': ['huevo', 'harina', 'leche'], 'procedimiento': 'url1', 'dificultad': 5 },
                { 'nombre': 'Puré', 'ingredientes': ['manteca', 'leche', 'papa'], 'procedimiento': 'url2', 'dificultad': 1 },
                { 'nombre': 'Empanadas de jamón y queso', 'ingredientes': ['tapas', 'jamón', 'queso'], 'procedimiento': 'url3', 'dificultad': 3 },
              ], 'leche'],
              expect: { type: 'exact', value: 'Puré,Waffles' },
            },
            {
              args: [[
                { 'nombre': 'Waffles', 'ingredientes': ['huevo', 'harina', 'leche'], 'procedimiento': 'url1', 'dificultad': 5 },
                { 'nombre': 'Puré', 'ingredientes': ['manteca', 'leche', 'papa'], 'procedimiento': 'url2', 'dificultad': 1 },
                { 'nombre': 'Empanadas de jamón y queso', 'ingredientes': ['tapas', 'jamón', 'queso'], 'procedimiento': 'url3', 'dificultad': 3 },
              ], 'queso'],
              expect: { type: 'exact', value: 'Empanadas de jamón y queso' },
            },
          ],
        },
      },

      /* ── EJ 5 · SENSORES ── */
      {
        badge: 'Ejercicio 5',
        tag: 'filtrar · condiciones',
        title: 'Sensores a reemplazar',
        statement: `Marta revisa los sensores de su robot antes de una competencia. Cada sensor es un diccionario:
<pre>{"nombre": "Sensor de proximidad", "horas_uso": 850, "fallas": 3}</pre>
Quiere reemplazar los sensores que estén a punto de superar las 1000 horas de uso (es decir, con <b>900 horas o más</b>) <b>o</b> que hayan registrado <b>más de 5 fallas</b>.<br><br>
Implementar una función que reciba una lista de sensores y devuelva una lista con los sensores (los diccionarios completos) que deben ser reemplazados, en el mismo orden en que aparecen.<br><br>
Por ejemplo, para sensores con 850 h / 3 fallas, 950 h / 2 fallas, 600 h / 7 fallas y 400 h / 1 falla, se debe devolver los de 950 h y 600 h:
<pre>[{"nombre": "Sensor de temperatura", "horas_uso": 950, "fallas": 2},
 {"nombre": "Sensor de distancia", "horas_uso": 600, "fallas": 7}]</pre>`,
        hint: `Recorré la lista y, para cada sensor, evaluá la condición con un <code>or</code>: <code>sensor["horas_uso"] &gt;= 900 or sensor["fallas"] &gt; 5</code>. Si se cumple, agregá el sensor entero al resultado.`,
        note: `Para los tests, la función se tiene que llamar <code>revisar_sensores(sensores)</code> y devolver la lista de sensores a reemplazar.`,
        starter: `def revisar_sensores(sensores):\n    pass`,
        test: {
          funcName: 'revisar_sensores',
          cases: [
            {
              args: [[
                { 'nombre': 'Sensor de proximidad', 'horas_uso': 850, 'fallas': 3 },
                { 'nombre': 'Sensor de temperatura', 'horas_uso': 950, 'fallas': 2 },
                { 'nombre': 'Sensor de distancia', 'horas_uso': 600, 'fallas': 7 },
                { 'nombre': 'Sensor de luz', 'horas_uso': 400, 'fallas': 1 },
              ]],
              expect: {
                type: 'json',
                value: [
                  { 'nombre': 'Sensor de temperatura', 'horas_uso': 950, 'fallas': 2 },
                  { 'nombre': 'Sensor de distancia', 'horas_uso': 600, 'fallas': 7 },
                ],
              },
            },
            {
              args: [[{ 'nombre': 'Sensor nuevo', 'horas_uso': 100, 'fallas': 0 }]],
              expect: { type: 'json', value: [] },
            },
          ],
        },
      },

      /* ── EJ 6 · CHAPA NFC ── */
      {
        badge: 'Ejercicio 6',
        tag: 'input · copiar · mantener valores',
        title: 'Duplicar la chapa NFC',
        statement: `José le puso a su gato una chapa con NFC que guarda su información de contacto. Ahora quiere lo mismo para su perro y, para no repetir todo a mano, quiere <b>duplicar</b> la información del gato y modificar solo los campos necesarios.<br><br>
Implementar una función que, dado un diccionario con la información del gato, le vaya pidiendo <b>uno por uno</b> el nuevo valor de cada campo (en el orden en que están en el diccionario). Si el usuario ingresa un <b>string vacío</b>, ese campo se mantiene igual. La función debe devolver un <b>diccionario nuevo</b> con la información del perro, sin modificar el del gato.<br><br>
Por ejemplo, si se recibe <code>{"nombre": "Michi", "dueño": "José", "teléfono": "1122"}</code> y el usuario ingresa <code>"Firulais"</code>, luego vacío y luego vacío, se devuelve:
<pre>{"nombre": "Firulais", "dueño": "José", "teléfono": "1122"}</pre>`,
        hint: `Empezá con una copia del diccionario (<code>info.copy()</code>) para no tocar el original. Recorré los campos con un <code>for campo in info</code>, pedí el nuevo valor con <code>input</code> y solo actualizá si lo ingresado no es un string vacío (<code>if nuevo != ""</code>).`,
        note: `Para los tests, la función se tiene que llamar <code>duplicar_info(info)</code>. El verificador simula un valor por cada campo (vacío = mantener) y revisa el diccionario devuelto.`,
        starter: `def duplicar_info(info):\n    pass`,
        test: {
          funcName: 'duplicar_info',
          cases: [
            {
              args: [{ 'nombre': 'Michi', 'dueño': 'José', 'teléfono': '1122' }],
              stdin: ['Firulais', '', ''],
              expect: { type: 'json', value: { 'nombre': 'Firulais', 'dueño': 'José', 'teléfono': '1122' } },
            },
            {
              args: [{ 'nombre': 'Michi', 'dueño': 'José' }],
              stdin: ['Rex', 'Juan'],
              expect: { type: 'json', value: { 'nombre': 'Rex', 'dueño': 'Juan' } },
            },
          ],
        },
      },
    ],
  },
  guide: {
    eyebrow: 'Machete',
    placement: 'before-exercises',
    title: 'Machete de diccionarios',
    description: 'Lo que necesitás tener a mano para resolver los ejercicios: qué es un diccionario, cómo acceder y recorrer, las operaciones principales y cómo ordenar.',
    method: {
      title: 'Lo esencial',
      html: `<p class="guide-lead">Un diccionario guarda pares <b>clave → valor</b>. Sirve para llegar a un dato a través de su clave de forma directa, sin recorrer todo.</p>
<ul>
  <li>Las <b>claves son únicas</b> y de tipo <b>inmutable</b> (texto, número, tupla). Los <b>valores</b> pueden ser de cualquier tipo y repetirse.</li>
  <li>Son <b>mutables</b>: si los pasás a una función y los modificás, cambia el original.</li>
  <li><b>No tienen orden</b> ni índices: no se puede usar <code>d[0]</code> ni porciones <code>d[:2]</code>.</li>
  <li>Dos diccionarios son iguales si tienen las mismas claves con los mismos valores, sin importar el orden.</li>
</ul>
<pre>materias = {"lunes": [6103, 7540], "martes": [6201]}
materias["miércoles"] = [6103]      # agrega una clave nueva
print(type(materias))               # &lt;class 'dict'&gt;</pre>`,
    },
    groups: [
      {
        label: 'De un vistazo',
        items: [
          {
            tag: 'Acceso',
            title: 'Crear y acceder sin romper',
            html: `<p><code>d[clave]</code> devuelve el valor, pero si la clave no existe lanza <code>KeyError</code>. Para evitarlo:</p>
<pre>materias["sábado"]                  # KeyError si no está

if "sábado" in materias:            # chequear antes con in
    print(materias["sábado"])

materias.get("sábado", "No hay")    # get con valor por defecto</pre>
<p>Ojo con las mayúsculas: <code>"lunes"</code> y <code>"Lunes"</code> son claves distintas (Python es <em>case sensitive</em>).</p>`,
          },
          {
            tag: 'Iteración',
            title: 'Recorrer un diccionario',
            html: `<p>Hay tres formas, según qué necesites:</p>
<pre>for clave in materias:                 # por clave (igual que materias.keys())
    print(clave, materias[clave])

for valor in materias.values():       # por valor
    print(valor)

for clave, valor in materias.items():  # por par clave-valor (desempaquetado)
    print(clave, valor)</pre>
<p>Del <b>valor</b> no se puede volver a la <b>clave</b>. Si necesitás las dos cosas a la vez, usá <code>items()</code>.</p>`,
          },
          {
            tag: 'Operaciones',
            title: 'Operaciones principales',
            html: `<table class="guide-table">
<thead><tr><th>Operación</th><th>Qué hace</th></tr></thead>
<tbody>
<tr><td>d[k]</td><td>Devuelve el valor de la clave k (KeyError si no está)</td></tr>
<tr><td>d[k] = v</td><td>Asigna v a k; si k no existe la agrega, si existe la pisa</td></tr>
<tr><td>del d[k]</td><td>Elimina la clave k (KeyError si no está)</td></tr>
<tr><td>k in d</td><td>True si la clave k está en d</td></tr>
<tr><td>len(d)</td><td>Cantidad de pares clave-valor</td></tr>
<tr><td>d.get(k, v)</td><td>Valor de k, o v si la clave no está</td></tr>
<tr><td>d.pop(k)</td><td>Elimina k y devuelve su valor</td></tr>
<tr><td>d.keys() · d.values() · d.items()</td><td>Claves · valores · pares (clave, valor)</td></tr>
<tr><td>d.copy()</td><td>Una copia del diccionario</td></tr>
</tbody>
</table>
<div class="guide-callout tip"><strong>Contar con diccionarios:</strong> <code>conteo[x] = conteo.get(x, 0) + 1</code> evita el <code>KeyError</code> la primera vez que aparece <code>x</code>.</div>`,
          },
          {
            tag: 'Ordenamiento',
            title: 'Ordenar',
            html: `<p>Ordenar las <b>claves</b> de un diccionario:</p>
<pre>sorted(materias)                    # lista con las claves ordenadas
dict(sorted(materias.items()))      # diccionario ordenado por clave</pre>
<p>Ordenar una <b>lista de diccionarios</b> no se puede con <code>sorted(lista)</code> solo (no se comparan diccionarios entre sí): hay que pasar <code>key</code>.</p>
<pre>def obtener_nombre(alumno):
    return alumno["nombre"]

sorted(alumnos, key=obtener_nombre)  # ordena por el valor de "nombre"</pre>`,
          },
        ],
      },
    ],
    closing: {
      title: 'Los errores del quiz, en una línea',
      html: `<ul>
  <li><b>Acceder a una clave que no existe</b> → <code>KeyError</code>. Chequeá con <code>in</code> o usá <code>get()</code>.</li>
  <li><b>Iterar <code>values()</code> y usar el valor como clave</b> → del valor no se vuelve a la clave. Usá <code>items()</code>.</li>
  <li><b>Usar una lista como clave</b> → las claves tienen que ser inmutables (usá una tupla).</li>
  <li><b>Modificar el diccionario recibido</b> cambia el original: si querés conservarlo, empezá con <code>copy()</code>.</li>
  <li><b>Asignar siempre el mismo valor al contar</b> → acumulá con <code>get(clave, 0) + 1</code>.</li>
  <li><b>sorted(lista_de_diccionarios)</b> sin <code>key</code> → error: pasá <code>key=...</code>.</li>
</ul>`,
    },
  },
};
