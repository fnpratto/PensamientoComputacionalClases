/* Repaso · Diccionarios y Archivos (Unidades 4 y 5)
   Repaso general antes del segundo parcial: apunte de diccionarios y archivos
   + los ejercicios propuestos del Colab, con tests automáticos y un cuadro
   para probar cada función. Material adaptado del Colab de la cátedra. */

// ── Datos compartidos por los ejercicios ───────────────────
// Pronóstico de una semana, como lista de diccionarios (ejercicios de dicc).
const PRONOSTICOS = [
  { fecha: '2026-10-16', temp_max: 20, temp_min: 12, prob_lluvia: 78, veloc_viento: 20 },
  { fecha: '2026-10-17', temp_max: 23, temp_min: 15, prob_lluvia: 10, veloc_viento: 18 },
  { fecha: '2026-10-18', temp_max: 21, temp_min: 14, prob_lluvia: 40, veloc_viento: 22 },
  { fecha: '2026-10-19', temp_max: 25, temp_min: 16, prob_lluvia: 20, veloc_viento: 15 },
  { fecha: '2026-10-20', temp_max: 27, temp_min: 18, prob_lluvia: 5, veloc_viento: 12 },
  { fecha: '2026-10-21', temp_max: 24, temp_min: 17, prob_lluvia: 60, veloc_viento: 25 },
];
// El mismo pronóstico con la clave dia_lindo resuelta (ejercicio 4 de dicc).
const DIAS_LINDOS = [false, true, false, true, false, false];
const PRONOSTICOS_CON_LINDO = PRONOSTICOS.map((p, i) => ({ ...p, dia_lindo: DIAS_LINDOS[i] }));

// Archivos que se siembran antes de correr los ejercicios de archivos.
const NOTAS_JUAN = { 'notas_juan.txt': 'física 5 2 8 4 4\nálgebra 10 8 7\nanálisis 4 8 7 7\n' };
const REGISTROS = {
  'registros_molinetes.txt':
    '15/10/2026 | 16:02 | María Gómez | 3344556677 | ingreso\n' +
    '15/10/2026 | 12:07 | Juan Pérez | 22334455 | egreso\n' +
    '15/10/2026 | 16:12 | Carla Fernández | 4455667788 | ingreso\n' +
    '15/10/2026 | 09:18 | Diego Ramírez | 30111222 | egreso\n' +
    '15/10/2026 | 12:25 | Sofía Martínez | 27888999 | ingreso\n' +
    '15/10/2026 | 19:31 | Pablo González | 5566778899 | egreso\n' +
    '15/10/2026 | 20:37 | Lucía Torres | 33442211 | ingreso\n' +
    '15/10/2026 | 13:42 | Martín Díaz | 6677889900 | egreso\n' +
    '15/10/2026 | 07:49 | Valentina López | 44553322 | ingreso\n' +
    '15/10/2026 | 12:55 | Andrés Castro | 1122334455 | egreso\n',
};

/** @type {import('./types.js').Course} */
export default {
  slug: 'clase-repaso-dicc-archivos',
  title: 'Repaso · Diccionarios y Archivos',
  gate: {
    emoji: '📚',
    title: ['Repaso', 'Dicc. y Archivos'],
    subtitle: 'Repaso general antes del segundo parcial · Unidades 4 y 5',
    buttonLabel: 'Empezar el repaso',
  },
  hero: {
    badge: '📚 Pensamiento Computacional · Curso 11: Retamozo, Pratto · 2026',
    title: ['Repaso ·', 'Diccionarios y Archivos'],
    subtitle: 'Un repaso general de las últimas dos clases para ponerse al día de cara al segundo parcial. Apunte breve por tema y ejercicios propuestos con tests automáticos.',
    decoration: '📚 🔑 📂 🗂️ ✍️ ✅',
  },
  footer: 'Repaso · Diccionarios y Archivos · Pensamiento Computacional FIUBA 📚',
  nav: {
    label: 'Repaso Dicc. y Archivos',
    guide: 'Apunte',
    exercises: 'Ejercicios',
    feedback: 'Feedback',
  },

  // ── Apunte (va antes de los ejercicios) ────────────────────
  guide: {
    eyebrow: 'Apunte',
    title: 'Repaso rápido: diccionarios y archivos',
    description: 'Una introducción breve por tema. Abrí cada uno, repasá el apunte de la materia si algo no queda claro y después resolvé los ejercicios.',
    placement: 'before-exercises',
    method: {
      title: '¿De qué va este repaso?',
      html: `<p class="guide-lead">Este repaso junta algunos conceptos importantes de las últimas dos clases para quienes, por otros exámenes, no llegaron a seguirlas del todo.</p>
<p>Igual es clave que revisen las diapositivas y los Colabs de clase: <b>todo lo que vemos en clase entra en el segundo parcial</b>. Esto es solo un repaso general.</p>
<p><b>Cómo usarlo:</b> leé la intro de cada tema, resolvé los ejercicios propuestos en el editor y usá <b>Verificar</b> para correr los tests. Con <b>Probar tu función</b> podés llamarla con tus propias entradas. Recordá que hay muchas formas de resolver un ejercicio: las soluciones son solo una idea.</p>`,
    },
    groups: [
      {
        label: 'Diccionarios',
        items: [
          {
            tag: 'Concepto',
            title: '¿Qué es un diccionario?',
            html: `<p>Una estructura de datos <b>mutable</b> y <b>no ordenada</b>:</p>
<ul>
<li>Podemos agregar, eliminar y modificar sus elementos después de crearlo.</li>
<li>Sus elementos no tienen orden interno: <b>no</b> se indexan como <code>diccionario[1]</code>.</li>
<li>Guardan pares <code>clave: valor</code>. Cada clave identifica a un valor y <b>no puede repetirse</b>.</li>
</ul>`,
          },
          {
            tag: 'Crear y modificar',
            title: 'Crear, agregar, obtener y eliminar',
            html: `<pre>alumno = {"nombre": "José", "apellido": "Fulano"}
alumno = {}              # también se puede crear vacío

# Agregar / modificar
alumno["nombre"] = "José"

# Obtener
apellido = alumno["apellido"]
# get: si la clave no existe, devuelve el valor por defecto que le pases
edad = alumno.get("edad", -1)   # -1

# Eliminar
del alumno["apellido"]</pre>
<p>Si asignás una clave que ya existe, <b>reemplazás</b> su valor anterior.</p>`,
          },
          {
            tag: 'Recorrer',
            title: 'Recorrer un diccionario',
            html: `<pre>examenes = {"física": "22/10", "álgebra": "25/10"}

for materia in examenes.keys():      # por claves
    print(materia)

for fecha in examenes.values():      # por valores
    print(fecha)

for examen in examenes.items():      # por clave y valor
    materia = examen[0]
    fecha = examen[1]
    print(f"{materia}: {fecha}")</pre>`,
          },
          {
            tag: 'Ordenar',
            title: 'Ordenar con una función auxiliar',
            html: `<p>Python ordena strings y números. Para estructuras más complejas (como una lista de diccionarios) le pasamos una función <code>key</code>:</p>
<pre>def obtener_nombre(alumno):
    return alumno["nombre"]

def ordenar_alumnos(alumnos):
    return sorted(alumnos, key=obtener_nombre)</pre>
<p>Con <code>reverse=True</code> ordena de mayor a menor.</p>`,
          },
        ],
      },
      {
        label: 'Archivos',
        items: [
          {
            tag: 'Concepto',
            title: 'Los 3 pasos y los modos de apertura',
            html: `<p>Un archivo permite <b>persistir</b> información después de que el programa termina. Siempre son 3 pasos:</p>
<ol>
<li><b>Abrirlo</b></li>
<li><b>Hacer algo</b> (leer o escribir)</li>
<li><b>Cerrarlo</b></li>
</ol>
<p><b>Importante:</b> si no cerrás un archivo en el parcial, todo el ejercicio queda desaprobado.</p>
<ul>
<li>Leer → modo <code>"r"</code></li>
<li>Escribir desde cero → modo <code>"w"</code> (pisa el contenido previo)</li>
<li>Agregar al final → modo <code>"a"</code></li>
</ul>`,
          },
          {
            tag: 'Abrir',
            title: 'Abrir un archivo',
            html: `<p>Manual (hay que acordarse de cerrar):</p>
<pre>archivo = open("poema.txt", "r")
print(archivo.read())
archivo.close()</pre>
<p>Con <code>with</code> (se cierra solo al salir del bloque):</p>
<pre>with open("poema.txt", "r") as archivo:
    print(archivo.read())
# acá el archivo ya está cerrado</pre>`,
          },
          {
            tag: 'Leer',
            title: 'read, readline y readlines',
            html: `<ul>
<li><code>read()</code>: todo el archivo como un único string.</li>
<li><code>readline()</code>: una línea por vez (devuelve <code>""</code> al terminar).</li>
<li><code>readlines()</code>: una lista con cada línea como string.</li>
</ul>
<p>Cada línea termina en <code>\\n</code> (salto de línea). Para sacarlo usá <code>.strip()</code>.</p>
<p><b>¿Cuál uso?</b> Queremos el archivo abierto <b>poco tiempo</b> y <b>no llenar la memoria</b>:</p>
<ul>
<li>Archivo chico → <code>readlines()</code></li>
<li>Archivo enorme (millones de líneas) → <code>readline()</code> de a una</li>
</ul>`,
          },
          {
            tag: 'Escribir',
            title: 'write y writelines',
            html: `<ul>
<li><code>write(texto)</code>: escribe un único string.</li>
<li><code>writelines(lista)</code>: escribe una lista de strings, uno tras otro.</li>
</ul>
<p><b>Ninguno</b> agrega saltos de línea: hay que poner <code>\\n</code> a mano al final de cada línea.</p>
<pre>with open("stock.txt", "a") as archivo:   # "a" agrega al final
    archivo.writelines(["atún: 5\\n", "cereales: 8\\n"])</pre>`,
          },
        ],
      },
    ],
  },

  // ── Ejercicios propuestos (autocorregidos) ─────────────────
  exercises: {
    eyebrow: 'Ejercicios',
    title: 'Ejercicios propuestos',
    description: 'Primero diccionarios, después archivos. Escribí tu solución y tocá Verificar para correr los tests. Con "Probar tu función" la podés llamar con tus propias entradas.',
    sheetPrefix: 'RepasoDiccArch-',
    items: [
      /* ── Diccionarios ── */
      {
        badge: 'Diccionarios · Ejercicio 1',
        title: 'Temperatura de un día',
        statement: `<p>El servicio meteorológico guarda el pronóstico del fin de semana en un diccionario donde cada clave es un día y cada valor es una tupla <code>(máxima, mínima)</code>.</p>
<p>Escribí una función que reciba el pronóstico, le pida al usuario un día con <code>input()</code> y muestre la temperatura máxima y mínima de ese día.</p>
<p><b>Ejemplo</b> con <code>{"viernes": (15, 5), "sabado": (17, 8)}</code> e ingresando <code>viernes</code>:</p>
<pre>ingrese un día de la semana: viernes
La temperatura máxima será: 15°
La temperatura mínima será: 5°</pre>`,
        starter: 'def mostrar_pronostico(pronostico):\n    pass',
        playground: {
          sample: 'print(mostrar_pronostico({"viernes": (15, 5), "sabado": (17, 8)}))',
          stdin: ['viernes'],
        },
        test: {
          funcName: 'mostrar_pronostico',
          cases: [
            { args: [{ viernes: [15, 5], sabado: [17, 8], domingo: [16, 8] }], stdin: ['viernes'],
              expect: { type: 'stdout_contains', parts: ['máxima será: 15', 'mínima será: 5'] } },
            { args: [{ viernes: [15, 5], sabado: [17, 8], domingo: [16, 8] }], stdin: ['sabado'],
              expect: { type: 'stdout_contains', parts: ['máxima será: 17', 'mínima será: 8'] } },
          ],
        },
      },
      {
        badge: 'Diccionarios · Ejercicio 2',
        title: 'La fecha más calurosa',
        statement: `<p>Ahora el pronóstico de un mes es una <b>lista de diccionarios</b>, cada uno con las claves <code>fecha</code>, <code>temp_max</code>, <code>temp_min</code>, <code>prob_lluvia</code> y <code>veloc_viento</code>.</p>
<p>Escribí una función que reciba la lista y devuelva la <code>fecha</code> donde se espera la temperatura máxima más alta del mes.</p>
<p><b>Ejemplo:</b> para el pronóstico de la semana devuelve <code>"2026-10-20"</code>.</p>`,
        starter: 'def hallar_temp_max(pronosticos):\n    pass',
        playground: {
          sample: 'pronosticos = [\n    {"fecha": "2026-10-16", "temp_max": 20},\n    {"fecha": "2026-10-20", "temp_max": 27},\n]\nprint(hallar_temp_max(pronosticos))',
        },
        test: {
          funcName: 'hallar_temp_max',
          cases: [
            { args: [PRONOSTICOS], expect: { type: 'exact', value: '2026-10-20' } },
            { args: [[{ fecha: 'a', temp_max: 10, temp_min: 1, prob_lluvia: 0, veloc_viento: 0 },
                       { fecha: 'b', temp_max: 30, temp_min: 1, prob_lluvia: 0, veloc_viento: 0 },
                       { fecha: 'c', temp_max: 25, temp_min: 1, prob_lluvia: 0, veloc_viento: 0 }]],
              expect: { type: 'exact', value: 'b' } },
          ],
        },
      },
      {
        badge: 'Diccionarios · Ejercicio 3',
        title: 'Días con lluvia',
        statement: `<p>Con la misma lista de pronósticos, escribí una función que devuelva una lista con las <code>fecha</code> de todos los días donde la <code>prob_lluvia</code> es mayor a 50%.</p>
<p><b>Ejemplo:</b> para el pronóstico de la semana devuelve <code>["2026-10-16", "2026-10-21"]</code>.</p>`,
        starter: 'def obtener_dias_lluviosos(pronosticos):\n    pass',
        playground: {
          sample: 'pronosticos = [\n    {"fecha": "2026-10-16", "prob_lluvia": 78},\n    {"fecha": "2026-10-17", "prob_lluvia": 10},\n]\nprint(obtener_dias_lluviosos(pronosticos))',
        },
        test: {
          funcName: 'obtener_dias_lluviosos',
          cases: [
            { args: [PRONOSTICOS], expect: { type: 'json', value: ['2026-10-16', '2026-10-21'] } },
            { args: [[{ fecha: 'x', temp_max: 0, temp_min: 0, prob_lluvia: 50, veloc_viento: 0 },
                       { fecha: 'y', temp_max: 0, temp_min: 0, prob_lluvia: 51, veloc_viento: 0 }]],
              expect: { type: 'json', value: ['y'] } },
          ],
        },
      },
      {
        badge: 'Diccionarios · Ejercicio 4',
        title: '¿Día lindo?',
        statement: `<p>Escribí una función que, para cada pronóstico de la lista, agregue una nueva clave <code>"dia_lindo"</code> con un booleano. Un día es lindo si cumple <b>todo</b>:</p>
<ul>
<li>temperatura máxima menor a 25°</li>
<li>temperatura mínima mayor a 15°</li>
<li>probabilidad de lluvia menor a 30%</li>
<li>velocidad del viento menor a 20 km/h</li>
</ul>
<p>Modificá cada diccionario y <b>devolvé la lista</b> con la clave agregada (así podemos verificarla).</p>`,
        starter: 'def establecer_dias_lindos(pronosticos):\n    pass',
        note: 'El criterio de la cátedra usa <code>&lt;= 25</code> para la máxima y <code>&gt;= 15</code> para la mínima. Acordate de devolver la lista al final.',
        playground: {
          sample: 'pronosticos = [\n    {"fecha": "2026-10-17", "temp_max": 23, "temp_min": 15, "prob_lluvia": 10, "veloc_viento": 18},\n]\nprint(establecer_dias_lindos(pronosticos))',
        },
        test: {
          funcName: 'establecer_dias_lindos',
          cases: [
            { args: [PRONOSTICOS], expect: { type: 'json', value: PRONOSTICOS_CON_LINDO } },
          ],
        },
      },

      /* ── Archivos ── */
      {
        badge: 'Archivos · Ejercicio 1',
        title: 'Promedio de notas',
        statement: `<p>Juan guarda sus notas en un archivo, una materia por línea, con el formato:</p>
<pre>materia nota1 nota2 nota3 ...</pre>
<p>Escribí una función que reciba la <b>ruta</b> del archivo y muestre por pantalla, para cada materia, su nombre y su promedio.</p>
<p>Para <code>notas_juan.txt</code> imprime <code>física: 4.6</code>, <code>álgebra: 8.33…</code> y <code>análisis: 6.5</code>.</p>`,
        starter: 'def analizar_notas(ruta):\n    pass',
        playground: { sample: "analizar_notas('notas_juan.txt')" },
        test: {
          funcName: 'analizar_notas',
          cases: [
            { args: ['notas_juan.txt'], files: NOTAS_JUAN,
              expect: { type: 'stdout_contains', parts: ['física: 4.6', 'álgebra: 8.33', 'análisis: 6.5'] } },
          ],
        },
      },
      {
        badge: 'Archivos · Ejercicio 2',
        title: 'Torneo de truco',
        statement: `<p>Queremos registrar gente para un torneo y armar las partidas. Escribí una función que pida nombres con <code>input()</code> hasta que se ingrese <code>"fin"</code>, arme emparejamientos de a 2 (en orden) y escriba en el archivo <code>partidas.txt</code> una partida por línea.</p>
<p><b>Ejemplo:</b> ingresando <code>Maria Liza</code>, <code>Pedro Piedra</code>, <code>Luis Arcon</code>, <code>Ana Pasco</code>, <code>fin</code>, el archivo queda:</p>
<pre>Maria Liza vs Pedro Piedra
Luis Arcon vs Ana Pasco</pre>`,
        starter: 'def gestionar_torneo():\n    pass',
        note: 'Para el ejemplo se asume una cantidad par de participantes.',
        playground: {
          sample: 'gestionar_torneo()\nwith open("partidas.txt") as f:\n    print(f.read())',
          stdin: ['Ana', 'Beto', 'Caro', 'Dino', 'fin'],
        },
        test: {
          funcName: 'gestionar_torneo',
          cases: [
            { args: [], stdin: ['Maria Liza', 'Pedro Piedra', 'Luis Arcon', 'Ana Pasco', 'fin'],
              expect: { type: 'file_exact', path: 'partidas.txt', value: 'Maria Liza vs Pedro Piedra\nLuis Arcon vs Ana Pasco\n' } },
            { args: [], stdin: ['Juan', 'Pedro', 'fin'],
              expect: { type: 'file_exact', path: 'partidas.txt', value: 'Juan vs Pedro\n' } },
          ],
        },
      },
      {
        badge: 'Archivos · Ejercicio 3',
        title: 'Registros por franja horaria',
        statement: `<p>Un archivo registra todos los ingresos y egresos de los molinetes de la facultad durante el año (puede tener muchísimas líneas). Cada línea tiene el formato:</p>
<pre>15/10/2026 | 15:54 | Luis Arcon | 4455667788 | ingreso</pre>
<p>Escribí una función que reciba la <b>ruta</b> del archivo y devuelva un diccionario con la cantidad de registros en cada franja horaria. Las franjas son <code>"8-12"</code> (de 8 a 12), <code>"13-16"</code> (de 13 a 16) y <code>"17-21"</code> (de 17 a 21).</p>
<p>Leé el archivo de a una línea (<code>readline()</code>): podría ser enorme.</p>`,
        starter: "def contar_registros_por_hora(ruta):\n    pass",
        note: 'Seguimos el criterio de la cátedra: la franja "8-12" cuenta las horas 9 a 12 (la hora 8 justa y la 7 quedan afuera).',
        playground: { sample: "print(contar_registros_por_hora('registros_molinetes.txt'))" },
        test: {
          funcName: 'contar_registros_por_hora',
          cases: [
            { args: ['registros_molinetes.txt'], files: REGISTROS,
              expect: { type: 'json', value: { '8-12': 4, '13-16': 3, '17-21': 2 } } },
          ],
        },
      },
    ],
  },

  feedback: {
    eyebrow: 'Cierre',
    title: 'Formulario de feedback',
    description: '¿Te sirvió el repaso? Contanos en dos minutos, nos ayuda un montón a mejorar el material.',
    note: '¿Se entendieron los diccionarios? ¿Y los archivos? ¿Qué tema sumarías? Escaneá el QR o abrí el link.',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSeHXspjNmFyFKBorgadUxrksfIs-tbQVNRqAuX6sGUkbBeKAg/viewform',
  },
};
