const config = {

  meta: {
    title: "El Archivo — Unidad 4 Pt. 2",
    storagePrefix: 'cap-4-pt2',
    eyebrow: "UNIDAD 4.2 — Listas y Tuplas",
    heroTitleHtml: "El <span>Archivo</span>",
    heroDescription: "Hécate lleva el registro de todo lo que existe en el Inframundo: almas, objetos, hechizos. Hoy te toca a vos. Tres cámaras: primero demostrar que conocés las reglas de las colecciones, después practicar con ejercicios reales, y por último un caso complejo para cerrar.",
    footerText: "El Archivo · Unidad 4 Pt. 2 — Listas y Tuplas",
  },

  sheetWebhook: "",

  sections: ["Las Aguas del Leteo", "El Laberinto", "La Forja", "El Tribunal"],
  sectionLabels: ["Leteo", "Laberinto", "Forja", "Tribunal"],

  questions: [
    // Las Aguas del Leteo — mutabilidad
    {
      section: "Las Aguas del Leteo",
      q: "¿Qué estructura de datos <strong>no</strong> es inmutable?",
      answers: ["Listas"],
      options: ["Strings", "Tuplas", "Rangos", "Listas"],
      hint: "Las listas son mutables: podés agregar, quitar o cambiar elementos después de crearlas. Strings, tuplas y rangos no se pueden modificar una vez creados.",
    },
    {
      section: "Las Aguas del Leteo",
      q: "¿Cuál es la diferencia fundamental entre una lista y una tupla?",
      answers: ["Las tuplas no pueden modificarse"],
      options: ["Las listas pueden indexarse y las tuplas no", "Las listas no se pueden desempaquetar", "Las tuplas no pueden modificarse", "Las tuplas pueden contener valores de distinto tipo y las listas no"],
      hint: "Ambas se indexan, ambas se desempaquetan y ambas pueden mezclar tipos. La diferencia clave es que la lista es mutable y la tupla es inmutable.",
    },

    // El Laberinto — indexación y operaciones básicas
    {
      section: "El Laberinto",
      q: "¿Qué devuelve <code>len([\"Hola\", \"Chau\", \"?\"])</code>?",
      answers: ["3"],
      options: ["2", "3", "9", "Error. Len es solo para cadenas"],
      hint: "len() cuenta los elementos de la colección, no los caracteres. La lista tiene 3 elementos: \"Hola\", \"Chau\" y \"?\".",
    },
    {
      section: "El Laberinto",
      q: "¿Qué muestra el siguiente código?<pre>valores = [[1, 2], [3, 4]]\nprint(valores[0])</pre>",
      answers: ["[1, 2]"],
      options: ["1", "3", "1, 3", "[1, 2]"],
      hint: "valores[0] accede al primer elemento de la lista, que es la sublista [1, 2] entera. Para llegar al 1 sería valores[0][0].",
    },
    {
      section: "El Laberinto",
      q: "¿Qué muestra el siguiente código?<pre>valores = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nprint(valores[1][2])</pre>",
      answers: ["6"],
      options: ["1", "6", "8", "5"],
      hint: "valores[1] es la sublista [4, 5, 6]. Luego [2] accede al tercer elemento (índice 2) de esa sublista, que es 6.",
    },

    // La Forja — métodos
    {
      section: "La Forja",
      q: "¿Qué diferencia hay entre <code>sort()</code> y <code>sorted()</code>?",
      answers: ["Sort modifica la lista original"],
      options: ["Sorted modifica la lista original", "Sort modifica la lista original", "Sort ordena de mayor a menor siempre", "Sorted es solo para números"],
      hint: "sort() modifica la lista en su lugar y devuelve None. sorted() devuelve una nueva lista ordenada sin tocar la original.",
    },
    {
      section: "La Forja",
      q: "¿Qué diferencia hay entre <code>append()</code> e <code>insert()</code>?",
      answers: ["Append agrega un elemento al final"],
      options: ["Append agrega un elemento al final", "Insert agrega un elemento al inicio", "Append recibe el índice donde lo querés insertar", "Insert crea una nueva lista con el valor agregado"],
      hint: "append(x) siempre agrega al final. insert(i, x) agrega en la posición i que le indiques — no necesariamente al inicio.",
    },

    // El Tribunal — map/filter
    {
      section: "El Tribunal",
      q: "¿Qué condición debe cumplir la función que se utiliza con <code>filter</code>?",
      answers: ["Debe devolver un tipo de dato booleano"],
      options: ["Debe recibir un tipo de dato booleano", "Debe devolver un tipo de dato booleano", "Debe mostrar por pantalla el resultado del filtro", "Debe tener una sola línea"],
      hint: "filter(función, iterable) aplica la función a cada elemento y conserva aquellos donde el resultado es True. La función debe devolver un booleano (o algo que evalúe como verdadero/falso).",
    },
    {
      section: "El Tribunal",
      q: "¿Para qué se usa <code>map()</code>?",
      answers: ["Aplica una misma función a todos los elementos y devuelve una nueva secuencia"],
      options: ["Modificar los valores de una lista", "Filtrar los valores booleanos de una lista", "Aplica una misma función a todos los elementos y devuelve una nueva secuencia", "Aplica una función booleana y devuelve los elementos que devuelven True"],
      hint: "map(función, iterable) transforma cada elemento usando la función dada y devuelve un nuevo iterable con los resultados. No modifica la lista original — en eso se diferencia de sort().",
    },
  ],

  boons: [
    // 1 - ADN Digital
    {
      title: "ADN Digital",
      flavor: "No toda secuencia es lo que parece.",
      statement: `En un laboratorio analizamos <strong>ADN digital</strong>: cadenas de ceros y unos donde cada símbolo representa una base artificial. A veces se cuelan mutaciones — símbolos que no son <code>0</code> ni <code>1</code>.<br><br>
Implementar una función que reciba una <strong>cadena</strong> y un <strong>patrón</strong> y devuelva, en una <strong>estructura no mutable de elementos ordenados</strong>, la siguiente información:
<ul>
  <li>Cantidad de <code>1</code> en la cadena</li>
  <li>Cantidad de <code>0</code> en la cadena</li>
  <li>Cantidad de veces que aparece el patrón</li>
  <li>Posición de la primera aparición del patrón (siempre aparece al menos una vez)</li>
  <li>Porcentaje de elementos que no son <code>0</code> ni <code>1</code></li>
</ul>
Por ejemplo: <code>analizar_adn("1f101011011W3011010", "1010")</code> debe devolver <code>(10, 6, 2, 2, 15.78...)</code>.`,
      hint: "Una <em>estructura no mutable de elementos ordenados</em> es una tupla. Para contar: <code>str.count()</code>. Para la primera posición: <code>str.find()</code> o <code>str.index()</code>. Para las mutaciones: total - cant_unos - cant_ceros.",
      note: "Para poder verificarla, definí una función llamada <code>analizar_adn(secuencia, patron)</code>.",
      sol: `def analizar_adn(secuencia, patron):
    cant_unos = secuencia.count("1")
    cant_ceros = secuencia.count("0")
    cant_patron = secuencia.count(patron)
    pos_patron = secuencia.find(patron)

    cant_diferentes = len(secuencia) - cant_unos - cant_ceros
    porcentaje_diferentes = cant_diferentes / len(secuencia) * 100

    return (cant_unos, cant_ceros, cant_patron, pos_patron, porcentaje_diferentes)`,
      test: {
        type: 'function',
        funcName: 'analizar_adn',
        cases: [
          {
            args: ["1f101011011W3011010", "1010"],
            expect: { type: 'contains', parts: ["10,6", "2,2", "15.78"] },
          },
          {
            args: ["110", "1"],
            expect: { type: 'contains', parts: ["2,1,2,0,0"] },
          },
        ],
      },
    },

    // 2 - Gestión de gastos
    {
      title: "Gestión de Gastos",
      flavor: "El oro no miente.",
      statement: `Pedro registra sus gastos diarios en una lista. Al finalizar la semana quiere saber cuál fue el <strong>índice</strong> del día en que más gastó y cuánto gastó en <strong>promedio</strong> (entero).<br><br>
Implementar una función que reciba la lista de gastos y devuelva una tupla <code>(indice_dia_max, gasto_prom)</code>.<br><br>
Por ejemplo, para <code>[500, 100, 300]</code> debe devolver <code>(0, 300)</code> — el mayor gasto fue el día de índice 0 con $500, y el promedio es 300.`,
      hint: "<code>max(lista)</code> devuelve el valor máximo. <code>lista.index(valor)</code> devuelve la primera posición de ese valor. <code>sum(lista) // len(lista)</code> calcula el promedio entero.",
      note: "Para poder verificarla, definí una función llamada <code>gestionar_gastos(gastos)</code>.",
      sol: `def gestionar_gastos(gastos):
    maximo = max(gastos)
    dia = gastos.index(maximo)
    promedio = sum(gastos) // len(gastos)
    return (dia, promedio)`,
      test: {
        type: 'function',
        funcName: 'gestionar_gastos',
        cases: [
          {
            args: [[500, 100, 300]],
            expect: { type: 'contains', parts: ["0,300"] },
          },
          {
            args: [[10, 50, 20, 80, 30]],
            expect: { type: 'contains', parts: ["3,38"] },
          },
        ],
      },
    },

    // 3 - Música retro
    {
      title: "Música Retro",
      flavor: "El nombre importa más que el formato.",
      statement: `Tenemos canciones guardadas en formato <code>.mp3</code> para un reproductor antiguo sin pantalla. Queremos una lista con los nombres limpios para poder imprimirla.<br><br>
Implementar una función que reciba una lista con nombres de archivo como <code>"No_te_imaginas.mp3"</code> y devuelva una lista con los nombres limpios: <code>"No te imaginas"</code> (sin extensión, guiones bajos reemplazados por espacios).`,
      hint: "<code>str.split(\".\")</code> separa en partes por el punto — la primera es el nombre. <code>str.replace(\"_\", \" \")</code> reemplaza guiones bajos por espacios. Podés armar el resultado con un ciclo y <code>append</code>, o con <code>map()</code>.",
      note: "Para poder verificarla, definí una función llamada <code>limpiar_nombre_canciones(canciones)</code>.",
      sol: `def limpiar_nombre_canciones(canciones):
    resultado = []
    for cancion in canciones:
        nombre, extension = cancion.split(".")
        nombre = nombre.replace("_", " ")
        resultado.append(nombre)
    return resultado`,
      test: {
        type: 'function',
        funcName: 'limpiar_nombre_canciones',
        cases: [
          {
            args: [["No_te_imaginas.mp3", "Hola_mundo.mp3"]],
            expect: { type: 'contains', parts: ["No te imaginas", "Hola mundo"] },
          },
          {
            args: [["Bohemian_Rhapsody.mp3"]],
            expect: { type: 'contains', parts: ["Bohemian Rhapsody"] },
          },
        ],
      },
    },

    // 4 - Lista de cumpleaños
    {
      title: "Lista de Cumpleaños",
      flavor: "Las invitaciones no admiten errores.",
      statement: `Organizamos un cumpleaños de 15 y necesitamos imprimir invitaciones para la familia. Cada familia recibe una invitación con su apellido y la cantidad de personas que puede traer.<br><br>
Dada una lista de tuplas <code>[(apellido, cant)]</code>, implementar una función que <strong>imprima</strong> cada invitación con el formato:<br>
<code>Familia &lt;apellido&gt;, &lt;cant&gt; invitaciones</code><br>
(y <code>invitación</code> en singular cuando <code>cant == 1</code>).<br><br>
Por ejemplo para <code>[("Prieto", 3), ("Corsi", 1)]</code>:<br>
<pre>Familia Prieto, 3 invitaciones\nFamilia Corsi, 1 invitación</pre>`,
      hint: "Usá desempaquetado en el for: <code>for apellido, cant in invitados</code>. Para singular/plural: un <code>if cant == 1</code> decide entre <code>\"invitación\"</code> e <code>\"invitaciones\"</code>.",
      note: "Para poder verificarla, definí una función llamada <code>imprimir_invitaciones(invitados)</code>.",
      sol: `def imprimir_invitaciones(invitados):
    for apellido, cant in invitados:
        texto = f"Familia {apellido}, {cant} "
        if cant == 1:
            texto += "invitación"
        else:
            texto += "invitaciones"
        print(texto)`,
      test: {
        type: 'function',
        funcName: 'imprimir_invitaciones',
        cases: [
          {
            args: [[["Prieto", 3], ["Capulleto", 4]]],
            expect: { type: 'stdout_contains', parts: ["Familia Prieto", "3 invitaciones", "Familia Capulleto", "4 invitaciones"] },
          },
          {
            args: [[["Corsi", 1]]],
            expect: { type: 'stdout_contains', parts: ["Familia Corsi", "1 invitaci"] },
          },
        ],
      },
    },

    // 5 - Competencia de deletreo
    {
      title: "Competencia de Deletreo",
      flavor: "Solo los mejores representan al colegio.",
      statement: `Una escuela selecciona alumnos para una competencia de deletreo. El registro tiene el formato <code>[(nombre, promedio)]</code>.<br><br>
Implementar una función que reciba ese listado y devuelva solo aquellos cuyo promedio es <strong>mayor o igual a 7</strong>.<br><br>
Por ejemplo, para <code>[("Lola Torres", 8.33), ("Mateo Murilla", 6.66), ("Luca Jeréz", 7)]</code> debe devolver <code>[("Lola Torres", 8.33), ("Luca Jeréz", 7)]</code>.`,
      hint: "Podés usar un ciclo con <code>append</code> condicional, o <code>filter()</code> con una función auxiliar que reciba la tupla completa y devuelva si el promedio (índice 1) alcanza.",
      note: "Para poder verificarla, definí una función llamada <code>seleccionar_estudiantes(listado)</code>.",
      sol: `def promedio_suficiente(alumno):
    return alumno[1] >= 7

def seleccionar_estudiantes(listado):
    return list(filter(promedio_suficiente, listado))`,
      test: {
        type: 'function',
        funcName: 'seleccionar_estudiantes',
        cases: [
          {
            args: [[["Lola Torres", 8.33], ["Mateo Murilla", 6.66], ["Luca Jerez", 7]]],
            expect: { type: 'contains', parts: ["Lola Torres", "Luca Jerez"] },
          },
          {
            args: [[["Ana", 9], ["Pedro", 5], ["Sol", 7.5]]],
            expect: { type: 'contains', parts: ["Ana", "Sol"] },
          },
        ],
      },
    },

    // 6 - Premiar desempeño
    {
      title: "Premiar Desempeño",
      flavor: "El factor no perdona.",
      statement: `Recursos Humanos quiere premiar las <strong>3 sucursales con mejor desempeño</strong>. El desempeño se mide con el factor <strong>ventas / monto_total</strong>: cuanto más alto, mejor.<br><br>
Implementar una función que reciba una lista de tuplas <code>(sucursal, ventas, monto_total)</code> y devuelva las 3 primeras al ordenar de mayor a menor por ese factor.<br><br>
Por ejemplo, para <code>[("Santa Cruz", 1800, 90), ("Mendoza", 3500, 50), ("Buenos Aires", 9600, 1200), ("Chubut", 990, 9), ("Córdoba", 7000, 70)]</code> debe devolver las 3 con mayor factor ventas/monto.`,
      hint: "<code>sorted(lista, key=función, reverse=True)</code> ordena de mayor a menor usando la función como criterio. Slicing <code>[:3]</code> toma los primeros 3. El factor de cada sucursal es <code>sucursal[1] / sucursal[2]</code>.",
      note: "Para poder verificarla, definí una función llamada <code>premiar_desempeño(sucursales)</code>.",
      sol: `def obtener_factor(sucursal):
    return sucursal[1] / sucursal[2]

def premiar_desempeño(sucursales):
    ordenadas = sorted(sucursales, key=obtener_factor, reverse=True)
    return ordenadas[:3]`,
      test: {
        type: 'function',
        funcName: 'premiar_desempeño',
        cases: [
          {
            args: [[["Santa Cruz", 1800, 90], ["Mendoza", 3500, 50], ["Buenos Aires", 9600, 1200], ["Chubut", 990, 9], ["Cordoba", 7000, 70]]],
            expect: { type: 'contains', parts: ["Chubut", "Cordoba", "Mendoza"] },
          },
          {
            args: [[["Norte", 200, 10], ["Sur", 10, 100], ["Este", 300, 30], ["Oeste", 15, 50]]],
            expect: { type: 'contains', parts: ["Norte", "Este", "Oeste"] },
          },
        ],
      },
    },
  ],

  potion: {
    title: "Análisis Salarial",
    flavor: '"Los números no mienten. El análisis sí puede fallar." — Hécate',
    statementHtml: `Marcos analiza los salarios de su empresa y nos pidió ayuda. Dada una lista de salarios mensuales, necesitamos una función que devuelva una lista con dos elementos:<br><br>
<ul>
  <li>Una lista con todos los salarios que <strong>superan</strong> el salario promedio (sin repetir valores)</li>
  <li>El porcentaje de salarios (del total) que <strong>superan</strong> el promedio</li>
</ul>
Podés usar <code>obtener_promedio(salarios)</code> como caja negra — la tenés que implementar igual, pero podés asumir que ya existe.`,
    receiptHtml: `Entrada: <span class="s">[100, 200, 300, 50, 250, 300]</span><br>
Promedio: <span class="s">200.0</span><br>
Salarios que superan el promedio: <span class="g">[300, 250]</span><br>
Porcentaje: <span class="g">33.33%</span><br>
Salida: <span class="s">[[300, 250], 33.33]</span>`,
    requirementsList: [
      "obtener_promedio(salarios)  ← implementarla; se puede usar como caja negra",
      "generar_analisis_salarial(salarios)",
    ],
    hintText: "El promedio es sum(lista)/len(lista). Para los salarios altos sin repetir: recorrés la lista y usás 'not in' para evitar duplicados. El porcentaje: cantidad de salarios altos sobre total multiplicado por 100.",
    note: "Definí las dos funciones (<code>obtener_promedio</code> y <code>generar_analisis_salarial</code>) para que podamos verificarlas.",
    tests: [
      {
        type: 'function',
        funcName: 'generar_analisis_salarial',
        cases: [
          {
            args: [[100, 200, 300, 50, 250, 300]],
            expect: { type: 'contains', parts: ["300", "250", "33.3"] },
          },
          {
            args: [[1000, 2000, 500]],
            expect: { type: 'contains', parts: ["2000", "33.3"] },
          },
        ],
      },
    ],
    solutionHtml: `def obtener_promedio(salarios):
    return sum(salarios) / len(salarios)

def generar_analisis_salarial(salarios):
    salario_promedio = obtener_promedio(salarios)
    salarios_altos = []

    for salario in salarios:
        if salario > salario_promedio and salario not in salarios_altos:
            salarios_altos.append(salario)

    return [salarios_altos, len(salarios_altos) / len(salarios) * 100]`,
  },

};

export default config;
