/** @type {import('./types.js').Course} */
export default {
  slug: 'clase-repaso',
  title: 'Clase de Repaso',
  gate: {
    emoji: '🌸',
    title: ['Clase de', 'Repaso'],
    subtitle: 'Quiz + 7 ejercicios de parcial · ¡Feliz Primavera!',
    buttonLabel: 'Empezar 🌸',
  },
  hero: {
    badge: '🌺 Pensamiento Computacional · Curso 11: Retamozo, Pratto · Primavera 2026',
    title: ['Clase de', 'Repaso'],
    subtitle: 'Unidades 1–4 · Quiz de lectura de código + 7 ejercicios de parcial',
    decoration: '🌸 🌺 🌹 🌼 🌻 🌷',
  },
  footer: 'Clase de Repaso · Primavera 2026 · Pensamiento Computacional FIUBA 🌸',
  nav: { label: 'Repaso · Primavera', quiz: 'Quiz', exercises: '7 Ejercicios' },
  quiz: {
    eyebrow: 'Autoevaluación',
    title: 'Quiz de Repaso',
    description: '8 preguntas de lectura de código. Seleccioná tu respuesta y confirmala antes de ver el resultado.',
    sheet: 'Repaso-Quiz',
    sections: [
      { name: 'Fundamentos', label: 'U1–U2' },
      { name: 'Control de Flujo', label: 'U3' },
      { name: 'Colecciones', label: 'U4' },
    ],
    summary: {
      high: '¡Excelente repaso! Estás listo/a para el parcial 🌸',
      mid: '¡Buen trabajo! Repasá las que fallaste antes del parcial.',
      low: 'Aprovechá los ejercicios para reforzar lo que no quedó claro.',
    },
    questions: [
      /* ── FUNDAMENTOS ── */
      {
        section: "Fundamentos",
        prompt: `¿Qué imprime el siguiente código?<pre>def doblar(n):\n    print(n * 2)\n\nresultado = doblar(5)\nprint(resultado)</pre>`,
        answers: ["10\nNone"],
        options: ["10\n10", "10\nNone", "None\n10", "Error de sintaxis"],
        hint: "¿Qué devuelve una función que solo tiene <code>print</code> y no tiene <code>return</code>? Si asignás ese resultado a una variable, ¿qué valor tendrá?",
        feedbackOk: "Correcto. <code>doblar(5)</code> imprime <code>10</code> como efecto secundario, pero no devuelve nada — devuelve <code>None</code>. Al imprimir <code>resultado</code>, se ve <code>None</code>.",
        feedbackBad: "La respuesta es <b>10 / None</b>. <code>doblar</code> hace un <code>print</code> (imprime 10) pero no tiene <code>return</code>, así que devuelve <code>None</code>. Eso es lo que se asigna a <code>resultado</code>.",
      },
      {
        section: "Fundamentos",
        prompt: `¿Qué imprime el siguiente código?<pre>def unir(a, b):\n    return a + b\n\nprint(unir("3", "4"))</pre>`,
        answers: ["34"],
        options: ["7", "34", '"34"', "TypeError"],
        hint: '¿Qué tipo de dato es <code>"3"</code> — es el número 3 o algo diferente? ¿Qué hace el operador <code>+</code> cuando ambos operandos son strings?',
        feedbackOk: 'Correcto. <code>"3"</code> y <code>"4"</code> son strings. El <code>+</code> entre strings los concatena, dando <code>"34"</code>. No son números, así que no suma 7.',
        feedbackBad: 'La respuesta es <b>34</b>. <code>"3"</code> y <code>"4"</code> son cadenas de texto. Sumar strings los concatena: <code>"3" + "4" = "34"</code>.',
      },
      {
        section: "Fundamentos",
        prompt: `¿Qué imprime el siguiente código?<pre>def es_positivo(n):\n    if n > 0:\n        return True\n    return False\n\nprint(es_positivo(-3))\nprint(es_positivo(0))</pre>`,
        answers: ["False\nFalse"],
        options: ["True\nFalse", "False\nFalse", "True\nTrue", "False\nTrue"],
        hint: "Evaluá cada llamada por separado: ¿<code>-3 > 0</code> es True o False? ¿Y <code>0 > 0</code>? Fijate qué devuelve la función en cada caso.",
        feedbackOk: "Correcto. <code>-3 > 0</code> es False → devuelve False. <code>0 > 0</code> también es False → devuelve False. La condición es estricta (>, no >=).",
        feedbackBad: "La respuesta es <b>False / False</b>. <code>-3 > 0</code> es False. <code>0 > 0</code> también es False (el cero no es positivo con esta definición).",
      },
      /* ── CONTROL DE FLUJO ── */
      {
        section: "Control de Flujo",
        prompt: `¿Qué imprime el siguiente código?<pre>i = 1\ntotal = 0\nwhile i <= 4:\n    total += i\n    i += 2\nprint(total)</pre>`,
        answers: ["4"],
        options: ["4", "6", "10", "3"],
        hint: "Seguí los valores de <code>i</code> y <code>total</code> paso a paso. Arrancás con <code>i=1</code>; ¿cuánto suma y cuánto salta en cada vuelta? ¿Cuántas veces entra al ciclo?",
        feedbackOk: "Correcto. El ciclo corre con i=1 (total=1, i→3) y con i=3 (total=4, i→5). Con i=5 ya no entra. Resultado: 4.",
        feedbackBad: "La respuesta es <b>4</b>. El ciclo entra con i=1 (total+=1→1, i+=2→3) y con i=3 (total+=3→4, i+=2→5). Con i=5 la condición i≤4 es falsa.",
      },
      {
        section: "Control de Flujo",
        prompt: `¿Qué imprime el siguiente código?<pre>def clasificar(n):\n    if n > 100:\n        return "alto"\n    elif n > 50:\n        return "medio"\n    elif n > 0:\n        return "bajo"\n    return "cero o negativo"\n\nprint(clasificar(75))</pre>`,
        answers: ["medio"],
        options: ["alto", "medio", "bajo", "cero o negativo"],
        hint: "Las condiciones se evalúan en orden. En cuanto una es verdadera, se ejecuta ese bloque y se sale. ¿Cuál es la primera condición que cumple 75?",
        feedbackOk: "Correcto. <code>75 > 100</code> es False. <code>75 > 50</code> es True → devuelve <code>\"medio\"</code>.",
        feedbackBad: "La respuesta es <b>medio</b>. <code>75 > 100</code> es False. La siguiente, <code>75 > 50</code>, es True → se retorna <code>\"medio\"</code> y no se evalúan las demás.",
      },
      /* ── COLECCIONES ── */
      {
        section: "Colecciones",
        prompt: `¿Qué imprime el siguiente código?<pre>valores = list(range(2, 10, 3))\nprint(valores)</pre>`,
        answers: ["[2, 5, 8]"],
        options: ["[2, 5, 8]", "[2, 5, 8, 11]", "[0, 3, 6, 9]", "[2, 3, 4, 5, 6, 7, 8, 9]"],
        hint: "¿Qué significa el tercer argumento de <code>range</code>? Arrancando en 2 y saltando de a 3, ¿cuáles valores caen <em>antes</em> de llegar a 10?",
        feedbackOk: "Correcto. <code>range(2, 10, 3)</code> genera 2, 5, 8. El siguiente sería 11, que ya se pasa de 10, así que no entra.",
        feedbackBad: "La respuesta es <b>[2, 5, 8]</b>. <code>range(inicio, fin, paso)</code> arranca en 2 y salta de a 3: 2, 5, 8. El 11 quedaría fuera porque <code>range</code> nunca llega al <code>fin</code>.",
      },
      {
        section: "Colecciones",
        prompt: `¿Qué imprime el siguiente código? <em>(la cadena es "primavera")</em><pre>s = "primavera"\nprint(s[-5:])\nprint(s[::2])</pre>`,
        answers: ["avera\npiaea"],
        options: ["avera\npiaea", "avera\nprmvr", "rimav\nprima", "vera\nprima"],
        hint: "Para <code>s[-5:]</code>: ¿qué posición es <code>-5</code> en un string de 9 letras? Para <code>s[::2]</code>: tomás posiciones 0, 2, 4, 6, 8 — ¿qué letras son esas?",
        feedbackOk: `Correcto. "primavera" tiene 9 letras. <code>s[-5:]</code> = posición 4 en adelante = "avera". <code>s[::2]</code> = letras en posiciones 0,2,4,6,8 = p,i,a,e,a = "piaea".`,
        feedbackBad: `La respuesta es <b>avera / piaea</b>. <code>s[-5:]</code>: posición -5 en "primavera" = índice 4 → "avera". <code>s[::2]</code>: posiciones 0,2,4,6,8 = p,i,a,e,a = "piaea".`,
      },
      {
        section: "Colecciones",
        prompt: `¿Qué imprime el siguiente código?<pre>datos = [("Ana", 8), ("Luis", 5), ("Sol", 9)]\nfor nombre, nota in datos:\n    if nota >= 7:\n        print(nombre)</pre>`,
        answers: ["Ana\nSol"],
        options: ["Ana\nSol", "Luis", "Ana\nLuis\nSol", "8\n9"],
        hint: "En el <code>for nombre, nota in datos</code>, ¿qué hace el desempaquetado? Evaluá la condición <code>nota >= 7</code> para cada tupla y anotá qué nombres se imprimen.",
        feedbackOk: "Correcto. Ana tiene nota 8 (≥7 → imprime), Luis 5 (no imprime), Sol 9 (≥7 → imprime). Resultado: Ana, Sol.",
        feedbackBad: "La respuesta es <b>Ana / Sol</b>. El desempaquetado asigna nombre y nota de cada tupla. Nota de Ana=8 ✓, Luis=5 ✗, Sol=9 ✓.",
      },
    ],
  },
  exercises: {
    eyebrow: 'Ejercicios de Parcial',
    title: 'Los 7 Desafíos 🌹',
    description: 'Ejercicios integradores que combinan todo lo visto. Cada uno tiene tests automáticos y podés entregar tu solución directamente.',
    sheetPrefix: 'Repaso-Parcial-',
    submitLabel: 'Entregar 🌸',
    items: [
      /* ── EJ 1: COSTOS DE ENVÍO ──────────────────────────────── */
      {
        badge: 'Ejercicio 1',
        tag: 'while · acumuladores · input',
        title: 'Registro de Costos de Envío',
        statement: `Una empresa de envíos planifica sus transportes en base a la capacidad máxima de cada camión. Para cada pedido, el costo se calcula como: <code>precio_base + (precio_por_kilo × peso)</code>.<br><br>
Implementá <code>planificar_envios(cap_max, precio_base, precio_x_kg)</code> que pida al usuario el peso de cada pedido hasta que el siguiente supere la capacidad máxima. En ese caso debe imprimir un mensaje indicando que no será incluido y terminar. Debe devolver el <strong>monto total a cobrar</strong>.<br><br>
<b>Ejemplo</b> con <code>planificar_envios(20, 2000, 1000)</code> e inputs <code>4, 11, 0.5, 5</code>:<br>
Los primeros tres pedidos (4+11+0.5=15.5 kg) entran. El cuarto (5 kg) excedería la capacidad → no se incluye.<br>
Retorna: <code>21500</code>`,
        hint: `¿Cuándo sabés si un nuevo pedido "cabe" — antes de agregarlo o después? Necesitás llevar la cuenta del peso total acumulado. ¿En qué parte del ciclo lo actualizás? ¿Dónde pedís el primer input — adentro o afuera del while?`,
        starter: `def planificar_envios(cap_max, precio_base, precio_x_kg):\n    pass`,
        test: {
          funcName: 'planificar_envios',
          cases: [
            { args: [20, 2000, 1000], stdin: ["4", "11", "0.5", "5"], expect: { type: 'numeric', value: 21500 } },
            { args: [5, 500, 100],    stdin: ["2", "1", "5"],          expect: { type: 'numeric', value: 1300 } },
          ]
        },
        note: `El verificador prueba el valor de retorno (el monto total). Recordá actualizar el peso acumulado en cada iteración.`,
      },
    
      /* ── EJ 2: PREMIAR ALUMNOS ───────────────────────────────── */
      {
        badge: 'Ejercicio 2',
        tag: 'for · booleanos · funciones',
        title: 'Merecen el Premio',
        statement: `Antes de un examen difícil, los docentes prometen un día libre si la <strong>mayoría</strong> de los exámenes supera una nota mínima.<br><br>
Implementá <code>merecen_premio(notas, minimo)</code> que reciba una lista de notas y una nota mínima, y devuelva <code>True</code> si más de la mitad de las notas superan el mínimo, o <code>False</code> si no.<br><br>
<b>Ejemplos</b> con nota mínima <code>6</code>:<br>
<code>[4, 8, 2, 9, 6, 7]</code> → <code>True</code> (4 de 6 superan el mínimo)<br>
<code>[4, 3, 10, 10, 5, 2]</code> → <code>False</code> (solo 2 de 6 superan el mínimo)`,
        hint: `¿Cómo contás cuántas notas superan el mínimo? Una vez que tenés ese conteo, ¿cómo comparás con "la mitad"? Pensá en qué devuelve la función — debería ser directamente un booleano, no un <code>if/else</code> que imprime.`,
        starter: `def merecen_premio(notas, minimo):\n    pass`,
        test: {
          funcName: 'merecen_premio',
          cases: [
            { args: [[4, 8, 2, 9, 6, 7], 6], stdin: [], expect: { type: 'bool', value: true } },
            { args: [[4, 3, 10, 10, 5, 2], 6], stdin: [], expect: { type: 'bool', value: false } },
            { args: [[5, 5, 6], 7], stdin: [], expect: { type: 'bool', value: false } },
          ]
        },
      },
    
      /* ── EJ 3: STOCK DEL ALMACÉN ─────────────────────────────── */
      {
        badge: 'Ejercicio 3',
        tag: 'for · tuplas · split · format',
        title: 'Stock del Almacén',
        statement: `Carlos maneja un almacén y quiere digitalizar el cierre del día. Para cada producto le interesa saber cuánto vendió y actualizar el stock.<br><br>
Implementá <code>gestionar_stock(productos)</code> que reciba una lista de tuplas <code>(nombre, stock)</code>. Para cada producto, debe pedir al usuario la cantidad vendida y el precio, usando el formato: <code>&lt;unidades&gt; - &lt;precio&gt;</code><br><br>
Al finalizar debe imprimir la <strong>ganancia bruta total</strong> y devolver la lista de tuplas con el <strong>stock actualizado</strong>.<br><br>
<b>Ejemplo</b> con <code>[("Leche", 5), ("Fideos", 12)]</code> e inputs <code>"3 - 1200"</code>, <code>"10 - 1500"</code>:<br>
Imprime <code>Ganancias brutas: $18600</code>. Devuelve <code>[("Leche", 2), ("Fideos", 2)]</code>`,
        hint: `El input tiene dos partes separadas por <code>" - "</code> — ¿cómo las separás? Recordá castear los valores. Para "actualizar" una tupla en Python tenés que crear una nueva. ¿Cómo la agregás a la lista de resultados?`,
        starter: `def gestionar_stock(productos):\n    pass`,
        test: {
          funcName: 'gestionar_stock',
          cases: [
            { args: [[["Leche", 5], ["Fideos", 12]]], stdin: ["3 - 1200", "10 - 1500"], expect: { type: 'contains', parts: ["leche,2", "fideos,2"] } },
            { args: [[["Chocolatada", 10]]],          stdin: ["0 - 4500"],               expect: { type: 'contains', parts: ["chocolatada,10"] } },
          ]
        },
        note: `El verificador simula los inputs prefijados y comprueba el stock devuelto. Imprimí también la ganancia bruta total.`,
      },
    
      /* ── EJ 4: CODIFICAR NÚMEROS ─────────────────────────────── */
      {
        badge: 'Ejercicio 4',
        tag: 'strings · replace · range',
        title: 'Codificar Números',
        statement: `Formamos parte de La Resistencia 🕵️. Para compartir mensajes numéricos de forma segura usamos un sistema de sustitución: un código de 10 caracteres donde cada posición representa un dígito (posición 0 → representa al dígito '0', posición 1 → representa al '1', etc.).<br><br>
Implementá <code>encriptar_numero(numero, codigo)</code> que reciba un número (entero o decimal) y un código secreto, y devuelva el número encriptado.<br>
Si el código tiene menos de 10 caracteres, devolver <code>None</code>.<br><br>
<b>Ejemplo:</b> <code>encriptar_numero(1234567890, "abcdefghij")</code> → <code>"bcdefghija"</code>`,
        hint: `¿Cómo convertís el número en un string para poder recorrerlo caracter por caracter? Para cada dígito, ¿cómo obtenés el carácter de reemplazo del código? El punto decimal no es un dígito — ¿qué hacés con él?`,
        starter: `def encriptar_numero(numero, codigo):\n    pass`,
        test: {
          funcName: 'encriptar_numero',
          cases: [
            { args: [1234567890, "abcdefghij"], stdin: [], expect: { type: 'exact', value: 'bcdefghija' } },
            { args: [42, "abc"],               stdin: [], expect: { type: 'exact', value: 'null' } },
            { args: [100, "0123456789"],        stdin: [], expect: { type: 'exact', value: '100' } },
          ]
        },
      },
    
      /* ── EJ 5: VALIDAR SITIO WEB ─────────────────────────────── */
      {
        badge: 'Ejercicio 5',
        tag: 'strings · slicing · tuplas · listas',
        title: 'Validar Sitio Web',
        statement: `Trabajamos en una empresa de hosting y necesitamos validar que los sitios web pedidos sean válidos antes de crearlos.<br><br>
Implementá <code>validar_sitio_web_valido(sitio, pais, sitios_usados)</code> que reciba el nombre del sitio, el código de país (ej: <code>"ar"</code>) y una colección de sitios ya en uso.<br><br>
La función debe validar que:
<ul>
<li>El sitio <strong>no esté en uso</strong></li>
<li>Comience con <code>www.</code></li>
<li>Termine con <code>.com.&lt;pais&gt;</code></li>
<li>No sea vacío y no supere los 63 caracteres</li>
</ul>
Devolver una tupla <code>(sitio, lista_de_errores)</code>. Si no hay errores, la lista estará vacía.<br><br>
<b>Ejemplo:</b> <code>validar_sitio_web_valido("test", "br", [])</code> → <code>('test', ['El sitio no comienza con www.', 'El sitio no finaliza con .com.br'])</code>`,
        hint: `Chequeá cada condición por separado y usá <code>append</code> para ir acumulando errores. Para verificar el prefijo, ¿qué slicing necesitás? Para el sufijo, considerá que el código de país tiene largo variable.`,
        starter: `def validar_sitio_web_valido(sitio, pais, sitios_usados):\n    pass`,
        test: {
          funcName: 'validar_sitio_web_valido',
          cases: [
            { args: ["www.test.com.ar", "ar", ["www.otro.com.ar"]], stdin: [], expect: { type: 'contains', parts: ["www.test.com.ar"] } },
            { args: ["test", "br", []], stdin: [], expect: { type: 'contains', parts: ["comienza", "finaliza"] } },
            { args: ["www.google.com.ar", "ar", ["www.google.com.ar"]], stdin: [], expect: { type: 'contains', parts: ["utilizado"] } },
          ]
        },
        note: `El verificador verifica que los mensajes de error contienen las palabras clave esperadas.`,
      },
    
      /* ── EJ 6: PROMOCIÓN DEL BAZAR ───────────────────────────── */
      {
        badge: 'Ejercicio 6',
        tag: 'while · listas · remove · input',
        title: 'Promoción del Bazar',
        statement: `Un bazar hace una promo mensual: el cliente elige N artículos de un cajón de opciones.<br><br>
Implementá <code>elegir_regalos(lista_opciones, cantidad)</code> que muestre las opciones disponibles y deje elegir al usuario mientras no haya completado la cantidad y queden opciones en el cajón.<br>
Si elige una opción no disponible, mostrar un mensaje y volver a preguntar.<br>
La función debe devolver la lista con los artículos elegidos.<br><br>
<b>Ejemplo</b> con <code>["palangana","termo 1L","plato vidrio"]</code> y <code>cantidad=2</code>, eligiendo <code>"palangana"</code> y <code>"plato vidrio"</code>:<br>
→ Devuelve <code>["palangana", "plato vidrio"]</code>`,
        hint: `La condición del while tiene dos partes: ¿cuándo se cumplió la cantidad? ¿cuándo no quedan más opciones? Antes del while pedís el primer input — dentro del while lo pedís al final. ¿Cómo eliminás la opción elegida del cajón para que no se pueda elegir dos veces?`,
        starter: `def elegir_regalos(lista_opciones, cantidad):\n    pass`,
        test: {
          funcName: 'elegir_regalos',
          cases: [
            { args: [["palangana", "termo 1L", "plato vidrio"], 2], stdin: ["palangana", "plato vidrio"], expect: { type: 'contains', parts: ["palangana", "plato vidrio"] } },
            { args: [["silla", "mesa", "lampara"], 1],              stdin: ["mesa"],                      expect: { type: 'contains', parts: ["mesa"] } },
          ]
        },
        note: `El verificador simula las elecciones del usuario con los inputs prefijados.`,
      },
    
      /* ── EJ 7: VALIDAR CONTRASEÑA ────────────────────────────── */
      {
        badge: 'Ejercicio 7',
        tag: 'strings · booleanos · for',
        title: 'Validar Contraseña',
        statement: `Implementá <code>es_contrasena_valida(contrasena)</code> que devuelva <code>True</code> si la contraseña cumple <em>todas</em> estas condiciones, o <code>False</code> si falla alguna:
<ul>
<li>Tiene al menos <strong>8 caracteres</strong></li>
<li>Contiene al menos <strong>un dígito</strong></li>
<li>Contiene al menos <strong>una letra mayúscula</strong></li>
</ul>
<b>Ejemplos:</b><br>
<code>es_contrasena_valida("Abc12345")</code> → <code>True</code><br>
<code>es_contrasena_valida("abc1234")</code> → <code>False</code> (muy corta)<br>
<code>es_contrasena_valida("abcdefgh")</code> → <code>False</code> (sin dígitos)<br>
<code>es_contrasena_valida("ABCDEFG1")</code> → <code>True</code>`,
        hint: `Chequeá cada condición por separado antes de combinarlas. Para recorrer la contraseña caracter por caracter, ¿qué tipos de métodos de string te sirven? Una vez que tenés las tres condiciones individuales, ¿cómo las combinás con un operador lógico para devolver un solo booleano?`,
        starter: `def es_contrasena_valida(contrasena):\n    pass`,
        test: {
          funcName: 'es_contrasena_valida',
          cases: [
            { args: ["Abc12345"], stdin: [], expect: { type: 'bool', value: true } },
            { args: ["abc1234"],  stdin: [], expect: { type: 'bool', value: false } },
            { args: ["abcdefgh"], stdin: [], expect: { type: 'bool', value: false } },
            { args: ["ABCDEFG1"], stdin: [], expect: { type: 'bool', value: true } },
          ]
        },
      },
    ],
  },
};
