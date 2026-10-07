/* Clase 8 · Archivos y manejo de errores (Unidad 5)
   Los datos de los partidos y las crónicas son inventados. */

// ── Archivos de datos ────────────────────────────────────────
// Se siembran en el directorio de trabajo de cada caso de test (ver
// TestCase.files en types.js). Son los mismos que están en
// public/datos/clase-archivos/ para practicar en la compu.

const PARTIDOS = [
  'Argentina 2-0 Chile',
  'Argentina 1-1 Brasil',
  'Argentina 3-0 Peru',
  'Argentina 2-1 Francia',
  'Argentina 0-0 Uruguay',
  'Argentina 1-0 Ecuador',
  'Argentina 3-1 Paraguay',
  'Argentina 2-0 Venezuela',
  'Argentina 1-2 Mexico',
  'Argentina 4-0 Guatemala',
  'Argentina 4-1 Bolivia',
  'Argentina 1-0 Colombia',
].map(l => `${l}\n`).join('');

/** Lo que devuelve readlines() sobre partidos.txt: cada línea con su '\n'. */
const LINEAS_PARTIDOS = PARTIDOS.split('\n').filter(l => l !== '').map(l => `${l}\n`);

const CONVOCADOS = [
  '[ ] Armar la bandera gigante',
  '[x] Imprimir las entradas',
  '[ ] Comprar la camiseta con el 10',
  '[x] Avisar en el grupo de WhatsApp',
  '[ ] Conseguir el bombo',
  '[x] Reservar el micro',
  '[ ] Pintar el banderazo',
].map(l => `${l}\n`).join('');

const CRONICA1 = [
  'Messi recibe en tres cuartos y mira el arco.',
  'Messi pica al vacio y define de zurda.',
  'La hinchada canta de pie, el estadio vibra.',
  'Messi levanta los brazos y abraza a sus companeros.',
  'Di Maria desborda por la banda y mete el centro.',
  'El Dibu vuela al angulo y saca el tiro al corner.',
].map(l => `${l}\n`).join('');

const CRONICA2 = [
  'El equipo sale a presionar desde el inicio.',
  'Dibu ataja un penal sobre el final.',
  'Messi pide la pelota y cambia el ritmo.',
  'Los defensores aguantan cada pelota parada.',
  'El banco festeja el triunfo con todo.',
].map(l => `${l}\n`).join('');

const GOLES_TORNEO = [
  '#Eliminatorias',
  'Chile;23;Messi',
  'Peru;41;Alvarez',
  'Uruguay;67;Messi',
  '#CopaAmerica',
  'Canada;49;Alvarez',
  'Colombia;112;Lautaro',
  'Brasil;78;Messi',
  'Ecuador;5;DiMaria',
  '#Amistosos',
  'Francia;12;Messi',
  'Panama;88;Lautaro',
  '#Mundial',
  'Mexico;64;Messi',
  'Polonia;46;Alvarez',
  'Croacia;34;Alvarez',
].map(l => `${l}\n`).join('');

// 11 válidos (suman 93.5, promedio 8.5) y 5 que no se pueden convertir.
const PUNTAJES = ['8.5', '9', '9,5', 's/c', '7.5', '10', '8..5', '9', '8', '9.5', '6.5', 'nd', '7', '9', '9.5', '-'].map(l => `${l}\n`).join('');

const PARTIDOS_TXT = { 'partidos.txt': PARTIDOS };
const CONVOCADOS_TXT = { 'convocados.txt': CONVOCADOS };
const CRONICAS_TXT = { 'cronica1.txt': CRONICA1, 'cronica2.txt': CRONICA2 };

/** @type {import('./types.js').Course} */
export default {
  slug: 'clase-archivos',
  title: 'Archivos y Errores',
  gate: {
    emoji: '🇦🇷',
    title: ['Archivos y', 'Errores'],
    subtitle: 'Quiz de nivelación + 12 ejercicios + corrección de código · Unidad 5',
    buttonLabel: 'Empezar',
  },
  hero: {
    badge: '⚽ Pensamiento Computacional · Curso 11: Retamozo, Pratto · 2026',
    title: ['Unidad 5 ·', 'Archivos y Errores'],
    subtitle: 'Guardar datos que sobrevivan al programa, leerlos sin romper nada y manejar los errores con un try que envuelva solo lo que puede fallar',
    decoration: '⚽ 📂 🏆 📝 🥇 📄',
  },
  footer: 'Clase de Archivos y Errores · 2026 · Pensamiento Computacional FIUBA ⚽',
  nav: {
    label: 'Archivos y Errores',
    quiz: 'Quiz de nivelación',
    animation: 'Demo',
    guide: 'Apunte',
    exercises: '12 Ejercicios',
    review: 'Corrección',
    feedback: 'Feedback',
  },

  // ── Quiz de nivelación ─────────────────────────────────────
  quiz: {
    eyebrow: 'Quiz de nivelación',
    title: '¿Desde dónde arrancamos?',
    description: '10 preguntas, sin nota. Sirve para ver qué sabemos de archivos y errores antes de empezar. Una sola opción correcta por pregunta.',
    sheet: 'Archivos-Quiz',
    sections: [
      { name: 'Persistencia', label: 'Persistencia' },
      { name: 'Modos', label: 'Modos de apertura' },
      { name: 'Lectura', label: 'Lectura' },
      { name: 'Escritura', label: 'Escritura' },
      { name: 'Buenas prácticas', label: 'Buenas prácticas' },
      { name: 'Errores', label: 'Errores' },
    ],
    summary: {
      high: '¡Muy bien! Ya tenés el modelo mental de archivos y excepciones. Usá los ejercicios para afianzar la escritura y el <code>try</code> acotado.',
      mid: 'Buena base. Repasá en el apunte los modos de apertura y qué devuelve <code>readline()</code> al final del archivo antes de ir a los ejercicios.',
      low: 'Tranqui, de esto se trata la clase. Mirá la demo y el apunte antes de los ejercicios: ahí está todo lo que preguntamos acá.',
    },
    questions: [
      {
        section: 'Persistencia',
        prompt: 'Armaste un programa que guarda en una lista los goles de Messi en la Selección. Cerrás el programa y lo volvés a abrir. ¿Qué pasó con la lista?',
        answers: ['Se perdió, porque las variables viven en la memoria mientras el programa corre'],
        options: [
          'Sigue ahí, Python la guarda sola',
          'Se perdió, porque las variables viven en la memoria mientras el programa corre',
          'Se guardó en un archivo .txt automáticamente',
          'Queda guardada solo si la lista tiene menos de 100 elementos',
        ],
        hint: '¿Dónde vive una variable mientras el programa corre, y qué pasa con ese lugar cuando el programa termina?',
        feedbackOk: 'Exacto. Los datos en variables viven en memoria y se pierden cuando el programa termina. Para que sobrevivan hay que guardarlos en un archivo: eso es <b>persistencia</b>.',
        feedbackBad: 'Python no guarda nada por su cuenta. Las variables viven en memoria y mueren con el programa; para que los datos sobrevivan hay que escribirlos en un archivo.',
      },
      {
        section: 'Modos',
        prompt: 'Querés leer el archivo <code>partidos.txt</code> sin correr el riesgo de modificarlo. ¿Qué modo usás?',
        answers: ["'r'"],
        options: ["'w'", "'a'", "'r'", 'Cualquiera, da lo mismo'],
        hint: 'Uno de los modos ni siquiera te deja escribir. Ese es el más seguro.',
        feedbackOk: "Correcto. <code>'r'</code> abre solo para lectura: si intentás escribir, Python te frena.",
        feedbackBad: "El modo seguro es <code>'r'</code> (solo lectura). Si lo abrieras con <code>'w'</code> vaciarías el archivo en el acto, antes de leer una sola línea.",
      },
      {
        section: 'Modos',
        prompt: `<code>partidos.txt</code> tiene 12 partidos. Ejecutás esto y nada más. ¿Cuántos partidos tiene el archivo ahora?<pre>archivo = open('partidos.txt', 'w')
archivo.close()</pre>`,
        answers: ["0, el modo 'w' borra el contenido anterior"],
        options: ['12', '13', "0, el modo 'w' borra el contenido anterior", 'Da error porque no escribimos nada'],
        hint: 'El contenido no se borra al escribir: se borra al abrir.',
        feedbackOk: "Eso es. Abrir con <code>'w'</code> crea el archivo si no existe y, si existe, lo deja vacío <b>aunque no escribas nada</b>.",
        feedbackBad: "Queda en 0. El vaciado pasa en el <code>open</code>, no en el <code>write</code>: con <code>'w'</code> el archivo se trunca aunque después no escribas nada.",
      },
      {
        section: 'Modos',
        prompt: 'Querés agregar un partido nuevo al final de <code>partidos.txt</code> sin perder los anteriores. ¿Qué modo usás?',
        answers: ["'a'"],
        options: ["'r'", "'w'", "'a'", "'x'"],
        hint: 'El nombre del modo viene del inglés <i>append</i>.',
        feedbackOk: "Correcto. <code>'a'</code> (append) escribe siempre al final y respeta lo que ya había.",
        feedbackBad: "Es <code>'a'</code> (append): escribe al final y conserva el contenido. <code>'w'</code> lo borraría todo y <code>'r'</code> no deja escribir.",
      },
      {
        section: 'Lectura',
        prompt: 'Estás recorriendo un archivo con <code>readline()</code> y llegás al final. ¿Qué devuelve <code>readline()</code> en ese momento?',
        answers: ["Un string vacío ''"],
        options: ['None', "Un string vacío ''", 'Un error', "El '\\n' del final"],
        hint: 'Pensá contra qué compara el <code>while</code> que usamos para recorrer un archivo.',
        feedbackOk: "Bien. Una línea en blanco <i>del medio</i> devuelve <code>'\\n'</code>, pero el fin de archivo devuelve <code>''</code> (string vacío). Por eso el <code>while</code> compara contra <code>''</code>.",
        feedbackBad: "Devuelve <code>''</code> (string vacío), no <code>None</code> ni un error. Ojo con la diferencia: una línea vacía del medio devuelve <code>'\\n'</code>, que no es lo mismo que <code>''</code>.",
      },
      {
        section: 'Lectura',
        prompt: 'Si <code>partidos.txt</code> tiene 12 líneas, ¿qué devuelve <code>len(archivo.readlines())</code>?',
        answers: ['12'],
        options: ['1', '12', 'Depende de cuántas palabras tenga', 'Da error: readlines no se puede usar con len'],
        hint: '¿Qué tipo de dato devuelve <code>readlines()</code>, y cuántos elementos tiene?',
        feedbackOk: 'Exacto. <code>readlines()</code> devuelve una <b>lista</b> con un string por línea, así que <code>len</code> da 12.',
        feedbackBad: 'Da 12. <code>readlines()</code> devuelve una lista con un elemento por línea, y <code>len</code> cuenta esos elementos. Desde ahí ya es un problema de listas.',
      },
      {
        section: 'Escritura',
        prompt: `Ejecutás estas dos líneas sobre un archivo abierto para escritura. ¿Cómo queda el archivo?<pre>archivo.write('Argentina 2-0 Chile')
archivo.write('Argentina 1-1 Brasil')</pre>`,
        answers: ["Una sola línea con los dos partidos pegados, porque write no agrega '\\n'"],
        options: [
          'Dos líneas, una por cada write',
          "Una sola línea con los dos partidos pegados, porque write no agrega '\\n'",
          'Solo queda el último partido',
          'Da error',
        ],
        hint: 'Comparalo con <code>print</code>: ¿cuál de los dos agrega el salto de línea por su cuenta?',
        feedbackOk: "Correcto. <code>write</code> escribe <b>exactamente</b> el string que le pasás; el salto de línea lo tenés que agregar vos con <code>'\\n'</code>.",
        feedbackBad: "Queda una sola línea con todo pegado: <code>write</code> no agrega el <code>'\\n'</code> (a diferencia de <code>print</code>). Hay que escribirlo a mano.",
      },
      {
        section: 'Buenas prácticas',
        prompt: '¿Por qué conviene tener el archivo abierto la menor cantidad de tiempo posible y cerrarlo con <code>close()</code>?',
        answers: ['Porque ocupa recursos del sistema y, al escribir, lo escrito puede no guardarse hasta cerrar'],
        options: [
          'Porque si no, Python cambia el contenido',
          'Porque ocupa recursos del sistema y, al escribir, lo escrito puede no guardarse hasta cerrar',
          'Porque close() acelera la lectura',
          'No hace falta, es solo una costumbre',
        ],
        hint: 'Pensá en qué le está pidiendo tu programa al sistema operativo mientras el archivo está abierto.',
        feedbackOk: 'Eso. Un archivo abierto ocupa recursos del sistema y, en algunos casos, lo que escribiste no se guarda de verdad hasta el <code>close()</code>.',
        feedbackBad: 'No es una costumbre: un archivo abierto ocupa recursos del sistema y lo escrito puede quedar en el camino si nunca cerrás. La receta es abrir, trabajar lo justo y cerrar.',
      },
      {
        section: 'Errores',
        prompt: "¿Qué excepción lanza <code>int('diez')</code>?",
        answers: ['ValueError'],
        options: ['TypeError', 'ValueError', 'IndexError', 'SyntaxError'],
        hint: 'El tipo que le pasás es correcto (es un string). El problema está en otra cosa.',
        feedbackOk: 'Correcto. El <b>tipo</b> (str) es el esperado, pero el <b>valor</b> no se puede convertir: <code>ValueError</code>.',
        feedbackBad: 'Es <code>ValueError</code>: el tipo está bien (un string), lo que falla es el valor. <code>TypeError</code> sería, por ejemplo, sumar un número con un string.',
      },
      {
        section: 'Errores',
        prompt: 'Querés abrir un archivo que puede no existir y después procesar todas sus líneas. ¿Qué es lo correcto?',
        answers: ['Poner solo el open() dentro del try y atrapar FileNotFoundError'],
        options: [
          'Poner todo el código de la función dentro del try, así no se escapa nada',
          'Poner solo el open() dentro del try y atrapar FileNotFoundError',
          'Usar un except sin tipo para atrapar cualquier error',
          'No usar try y confiar en que el archivo existe',
        ],
        hint: 'De todo ese código, ¿qué línea es la única que puede fallar porque el archivo no existe?',
        feedbackOk: 'Justo. El <code>try</code> envuelve <b>solo lo que puede fallar</b> y el <code>except</code> nombra el error esperado. Así no escondemos otros errores por accidente.',
        feedbackBad: 'Lo correcto es el <code>try</code> acotado al <code>open</code> y un <code>except FileNotFoundError</code>. Si metés todo adentro o usás un <code>except</code> pelado, tapás bugs que no tienen nada que ver con el archivo.',
      },
    ],
  },

  // ── Demo animada ───────────────────────────────────────────
  animation: {
    eyebrow: 'Demo',
    title: 'Cómo trabaja Python con archivos',
    description: 'Tres mini demos para ver qué pasa por dentro antes de programar. Antes de cada clic, arriesgá qué va a pasar: ¿qué devuelve este readline()? ¿cómo va a quedar el archivo con este modo? ¿por qué línea sigue el programa?',
  },

  // ── Apunte ─────────────────────────────────────────────────
  guide: {
    eyebrow: 'Apunte',
    title: 'Archivos y errores en una página',
    description: 'Lo mínimo para resolver los ejercicios. Abrí el tema que necesites.',
    placement: 'before-exercises',
    method: {
      title: 'La idea de fondo: persistencia',
      html: `<p class="guide-lead">Lo que guardás en una variable vive en <b>memoria</b> y se pierde al terminar el programa; para que sobreviva, va a un <b>archivo</b>. Siempre tres pasos:</p>
<pre>archivo = open('partidos.txt', 'r')   # 1. abrir (elegís el modo)
lineas = archivo.readlines()          # 2. trabajar
archivo.close()                       # 3. cerrar</pre>
<p>Datos para practicar en tu compu: <a href="/datos/clase-archivos/partidos.txt">partidos</a>, <a href="/datos/clase-archivos/convocados.txt">convocados</a>, <a href="/datos/clase-archivos/cronica1.txt">cronica1</a>, <a href="/datos/clase-archivos/cronica2.txt">cronica2</a>, <a href="/datos/clase-archivos/goles_por_torneo.txt">goles_por_torneo</a>, <a href="/datos/clase-archivos/puntajes.txt">puntajes</a>.</p>`,
    },
    groups: [
      {
        label: 'Archivos',
        items: [
          {
            tag: 'Modos',
            title: 'Los tres modos que usamos',
            html: `<pre>open('partidos.txt', 'r')   # leer. No podés escribir.
open('partidos.txt', 'w')   # escribir desde cero: VACIA el archivo al abrirlo
open('partidos.txt', 'a')   # append: escribe al final, conserva lo que había</pre>`,
          },
          {
            tag: 'Leer',
            title: 'readline() de a una, readlines() todo junto',
            html: `<p><code>readlines()</code> trae todo como una <b>lista</b> (un string por línea, con su <code>'\\n'</code>):</p>
<pre>archivo = open('partidos.txt', 'r')
lineas = archivo.readlines()
archivo.close()

for linea in lineas:
    print(linea.strip())          # strip() saca el '\\n'</pre>
<p><code>readline()</code> trae una línea; al final devuelve <code>''</code>, el corte del <code>while</code>:</p>
<pre>archivo = open('partidos.txt', 'r')
linea = archivo.readline()
while linea != "":
    print(linea.strip())
    linea = archivo.readline()     # sin esto, bucle infinito
archivo.close()</pre>`,
          },
          {
            tag: 'Escribir',
            title: 'write() no agrega el salto de línea',
            html: `<p><code>write</code> escribe exactamente lo que le pasás: el <code>'\\n'</code> lo ponés vos. <code>writelines</code> escribe una lista (tampoco agrega saltos).</p>
<pre>archivo = open('plantel.txt', 'w')
archivo.write('Dibu\\n')
archivo.writelines(['Messi\\n', 'Romero\\n'])
archivo.close()</pre>`,
          },
          {
            tag: 'Reescribir',
            title: 'Modificar una línea del medio',
            html: `<p>No se edita una línea en el lugar: leés todo a una lista, cambiás el elemento y <b>reescribís el archivo completo</b> con <code>'w'</code>.</p>
<pre>lineas = leer_lineas('convocados.txt')   # readlines y close

if 0 &lt;= indice &lt; len(lineas):            # evita el IndexError
    lineas[indice] = '[x]' + lineas[indice][3:]

archivo = open('convocados.txt', 'w')    # pisamos todo
archivo.writelines(lineas)
archivo.close()</pre>`,
          },
        ],
      },
      {
        label: 'Manejo de errores',
        items: [
          {
            tag: 'try / except',
            title: 'El try envuelve solo lo que puede fallar',
            html: `<p>El <code>try</code> va <b>ajustado</b> a la línea que puede fallar y el <code>except</code> <b>nombra</b> el error (nunca un <code>except:</code> pelado, que esconde bugs):</p>
<pre>try:
    archivo = open(nombre_archivo, 'r')
except FileNotFoundError:
    print("El archivo no existe")
    return None

lineas = archivo.readlines()      # afuera del try: no falla por el archivo
archivo.close()</pre>`,
          },
          {
            tag: 'Errores',
            title: 'Qué excepción lanza cada cosa',
            html: `<pre>int('diez')              # ValueError: el tipo está bien, el valor no sirve
float('9,5')             # ValueError: la coma no es un punto decimal
open('falta.txt', 'r')   # FileNotFoundError
estadio['Tribuna']       # KeyError: esa clave no está en el diccionario
asientos[99]             # IndexError: esa posición no existe en la lista
10 / 0                   # ZeroDivisionError
1 + 'uno'                # TypeError: los tipos no se pueden combinar</pre>
<p>Ojo: <code>asientos[-1]</code> <b>no</b> lanza <code>IndexError</code> (devuelve el último). Un índice negativo sin sentido lo chequeás con un <code>if</code>.</p>`,
          },
          {
            tag: 'Validar',
            title: 'Pedir datos hasta que sean válidos',
            html: `<p>Validar un ingreso: <code>try</code> en la conversión y, si falla, volver a pedir. En un archivo sucio, <code>continue</code> saltea lo que no sirve.</p>
<pre>def pedir_entero(mensaje):
    numero = None
    while numero is None:
        try:
            numero = int(input(mensaje))
        except ValueError:
            print("Tenés que ingresar un número entero.")
    return numero</pre>
<pre>for linea in lineas:
    try:
        puntaje = float(linea.strip())
    except ValueError:
        continue          # esta línea no servía: a la que sigue
    validos += 1
    suma += puntaje</pre>`,
          },
        ],
      },
    ],
    closing: {
      title: 'Machete de referencia',
      html: `<table class="guide-table">
<thead><tr><th>Lo que necesitás</th><th>Cómo se escribe</th></tr></thead>
<tbody>
<tr><td>Leer todo como lista</td><td><code>lineas = archivo.readlines()</code></td></tr>
<tr><td>Leer de a una línea</td><td><code>linea = archivo.readline()</code> y cortar con <code>while linea != ""</code></td></tr>
<tr><td>Limpiar y partir una línea</td><td><code>linea.strip()</code> saca el <code>'\\n'</code>; <code>.split(';')</code> la parte</td></tr>
<tr><td>Escribir</td><td><code>archivo.write(texto + '\\n')</code> o <code>archivo.writelines(lista)</code></td></tr>
<tr><td>Agregar al final / reescribir</td><td><code>open(nombre, 'a')</code> / <code>open(nombre, 'w')</code></td></tr>
<tr><td>Archivo que puede no existir</td><td><code>try: open(...)</code> / <code>except FileNotFoundError:</code></td></tr>
<tr><td>Texto que puede no ser número</td><td><code>try: int(x)</code> / <code>except ValueError:</code></td></tr>
<tr><td>Clave o posición inexistente</td><td><code>except KeyError:</code> / <code>except IndexError:</code> (+ chequear <code>i &lt; 0</code>)</td></tr>
</tbody>
</table>`,
    },
  },

  // ── Ejercicios ─────────────────────────────────────────────
  exercises: {
    eyebrow: 'Ejercicios',
    title: 'Ejercicios de Archivos y Errores',
    description: 'Los archivos de datos ya están cargados: podés abrirlos por nombre directamente. Cada ejercicio corre en su propia carpeta, así que lo que escribas no afecta a los demás.',
    sheetPrefix: 'Archivos-',
    items: [
      // ── Bloque 1: archivos ──
      {
        badge: 'Ejercicio 1',
        title: 'Contar los partidos',
        statement: `El archivo <code>partidos.txt</code> tiene un partido por línea. Escribí <code>contar_partidos(nombre_archivo)</code> que <b>devuelva</b> cuántos partidos tiene.
<pre>Argentina 2-0 Chile
Argentina 1-1 Brasil
Argentina 3-0 Peru
...</pre>`,
        hint: '¿Con qué modo lo abrís? ¿En qué momento conviene cerrarlo?',        starter: 'def contar_partidos(nombre_archivo):\n    pass',
        test: {
          funcName: 'contar_partidos',
          cases: [
            { args: ['partidos.txt'], files: PARTIDOS_TXT, expect: { type: 'numeric', value: 12 } },
            { args: ['convocados.txt'], files: CONVOCADOS_TXT, expect: { type: 'numeric', value: 7 } },
          ],
        },
      },
      {
        badge: 'Ejercicio 2',
        title: 'Los últimos partidos',
        statement: `Escribí <code>ultimos_partidos(nombre_archivo, n)</code> que <b>devuelva una lista</b> con los últimos <code>n</code> partidos del archivo (tal como vienen, con su salto de línea). Es el <code>tail</code> de la terminal.
<p>Si <code>n</code> es más grande que la cantidad de líneas, devolvé todas las que haya.</p>`,
        hint: '¿Qué devuelve <code>lineas[-n:]</code> cuando <code>n</code> vale 0? Probalo mentalmente antes de escribir el código.',        starter: 'def ultimos_partidos(nombre_archivo, n):\n    pass',
        test: {
          funcName: 'ultimos_partidos',
          cases: [
            { args: ['partidos.txt', 2], files: PARTIDOS_TXT,
              expect: { type: 'json', value: ['Argentina 4-1 Bolivia\n', 'Argentina 1-0 Colombia\n'] } },
            { args: ['partidos.txt', 50], files: PARTIDOS_TXT,
              expect: { type: 'json', value: LINEAS_PARTIDOS } },
            { args: ['partidos.txt', 0], files: PARTIDOS_TXT,
              expect: { type: 'json', value: [] } },
          ],
        },
      },
      {
        badge: 'Ejercicio 3',
        title: 'Buscar un rival',
        statement: `Escribí <code>buscar_rival(cadena, nombre_archivo)</code> que <b>imprima</b> los partidos que contienen esa cadena, sin el salto de línea. Es el <code>grep</code> de la terminal.
<pre>buscar_rival('Francia', 'partidos.txt')
Argentina 2-1 Francia</pre>`,
        hint: '¿Cómo preguntás si un texto está dentro de otro?',        starter: 'def buscar_rival(cadena, nombre_archivo):\n    pass',
        test: {
          funcName: 'buscar_rival',
          cases: [
            { args: ['Francia', 'partidos.txt'], files: PARTIDOS_TXT,
              expect: { type: 'stdout_contains', parts: ['Argentina 2-1 Francia'], absent: ['Chile', 'Brasil'] } },
            { args: ['Argentina', 'partidos.txt'], files: PARTIDOS_TXT,
              expect: { type: 'stdout_contains', parts: ['Argentina 2-0 Chile', 'Argentina 1-0 Colombia'] } },
          ],
        },
      },
      {
        badge: 'Ejercicio 4',
        title: 'Reporte de crónicas',
        statement: `Escribí <code>procesar_cronicas(archivos, palabra)</code>, que recibe una <b>lista</b> de nombres de archivo y una palabra, y genera <code>reporte_cronicas.txt</code> con una línea por archivo:
<pre>archivo;palabras;apariciones
cronica1.txt;55;3
cronica2.txt;36;1</pre>
<p>La primera línea es el encabezado, tal cual. Después, por cada archivo: su nombre, cuántas palabras tiene en total y cuántas veces aparece la palabra buscada.</p>`,
        hint: '¿Cuántas veces abrís el reporte, una por archivo procesado o una sola?',        starter: 'def procesar_cronicas(archivos, palabra):\n    pass',
        test: {
          funcName: 'procesar_cronicas',
          cases: [
            { args: [['cronica1.txt', 'cronica2.txt'], 'Messi'], files: CRONICAS_TXT,
              expect: { type: 'file_contains', path: 'reporte_cronicas.txt',
                parts: ['archivo;palabras;apariciones', 'cronica1.txt;55;3', 'cronica2.txt;36;1'] } },
            { args: [['cronica2.txt'], 'Dibu'], files: CRONICAS_TXT,
              expect: { type: 'file_contains', path: 'reporte_cronicas.txt', parts: ['cronica2.txt;36;1'] } },
          ],
        },
      },
      {
        badge: 'Ejercicio 5',
        title: 'Leer el checklist',
        statement: `<code>convocados.txt</code> es el checklist del homenaje: cada línea arranca con <code>[ ]</code> si está pendiente o <code>[x]</code> si ya se hizo.
<pre>[ ] Armar la bandera gigante
[x] Imprimir las entradas
[ ] Comprar la camiseta con el 10
[x] Avisar en el grupo de WhatsApp</pre>
<p>Escribí <code>leer_checklist(nombre_archivo)</code> que <b>devuelva una tupla</b> <code>(pendientes, hechas)</code> con las descripciones, <b>sin</b> la marca del principio y sin el salto de línea.</p>`,
        hint: '¿Cuántos caracteres hay que saltear para quedarte solo con la descripción?',        starter: 'def leer_checklist(nombre_archivo):\n    pass',
        test: {
          funcName: 'leer_checklist',
          cases: [
            { args: ['convocados.txt'], files: CONVOCADOS_TXT,
              expect: { type: 'json', value: [
                ['Armar la bandera gigante', 'Comprar la camiseta con el 10', 'Conseguir el bombo', 'Pintar el banderazo'],
                ['Imprimir las entradas', 'Avisar en el grupo de WhatsApp', 'Reservar el micro'],
              ] } },
            { args: ['todo.txt'], files: { 'todo.txt': '[x] Ya esta\n' },
              expect: { type: 'json', value: [[], ['Ya esta']] } },
          ],
        },
      },
      {
        badge: 'Ejercicio 6',
        title: 'Agregar pendientes',
        statement: `Escribí <code>agregar_pendientes(nombre_archivo)</code> que pida tareas por teclado y las agregue <b>al final</b> del checklist con el formato <code>[ ] &lt;tarea&gt;</code>, una por línea. Termina cuando el usuario ingresa <code>X</code>.
<pre>Tarea para el homenaje (X para terminar): Pintar la cara
Tarea para el homenaje (X para terminar): Llevar bombo
Tarea para el homenaje (X para terminar): X</pre>`,
        hint: '¿Abrís el archivo antes de pedir las tareas o después? ¿Qué modo usás para no borrar lo que ya estaba?',
        starter: 'def agregar_pendientes(nombre_archivo):\n    pass',
        test: {
          funcName: 'agregar_pendientes',
          cases: [
            { args: ['convocados.txt'], files: CONVOCADOS_TXT,
              stdin: ['Pintar la cara', 'Llevar bombo', 'X'],
              expect: { type: 'file_contains', path: 'convocados.txt',
                parts: ['[ ] Armar la bandera gigante', '[x] Imprimir las entradas', '[ ] Pintar la cara', '[ ] Llevar bombo'],
                absent: ['[ ] X'] } },
            { args: ['convocados.txt'], files: CONVOCADOS_TXT,
              stdin: ['X'],
              expect: { type: 'file_exact', path: 'convocados.txt', value: CONVOCADOS } },
          ],
        },
      },
      {
        badge: 'Ejercicio 7',
        title: 'Marcar una tarea como hecha',
        statement: `Escribí <code>marcar_hecha(nombre_archivo, numero_linea)</code> que cambie el <code>[ ]</code> por <code>[x]</code> en esa línea del checklist. La <b>primera línea es la 1</b>.
<p>Si el número de línea no existe, la función no tiene que romper: deja el archivo como estaba.</p>`,
        hint: '¿Se puede editar una sola línea en el medio de un archivo, o hay que reescribirlo todo?',
        starter: 'def marcar_hecha(nombre_archivo, numero_linea):\n    pass',
        test: {
          funcName: 'marcar_hecha',
          cases: [
            { args: ['convocados.txt', 1], files: CONVOCADOS_TXT,
              expect: { type: 'file_contains', path: 'convocados.txt',
                parts: ['[x] Armar la bandera gigante', '[ ] Comprar la camiseta con el 10'],
                absent: ['[ ] Armar la bandera gigante'] } },
            { args: ['convocados.txt', 99], files: CONVOCADOS_TXT,
              expect: { type: 'file_exact', path: 'convocados.txt', value: CONVOCADOS } },
          ],
        },
      },
      {
        badge: 'Ejercicio 8',
        title: 'Goles por torneo',
        statement: `<code>goles_por_torneo.txt</code> agrupa los goles por torneo. Las líneas que empiezan con <code>#</code> abren un torneo; las de abajo son goles con el formato <code>rival;minuto;goleador</code>.
<pre>#Eliminatorias
Chile;23;Messi
Peru;41;Alvarez
#CopaAmerica
Canada;49;Alvarez
...</pre>
<p>Escribí <code>goles_por_torneo(nombre_archivo)</code> que <b>devuelva un diccionario</b> <code>{torneo: cantidad}</code> y además escriba <code>resumen_goles.txt</code> con una línea <code>torneo;cantidad</code> por torneo.</p>`,
        hint: 'Mientras recorrés las líneas, ¿cómo te acordás de a qué torneo pertenece el gol que estás leyendo?',        starter: 'def goles_por_torneo(nombre_archivo):\n    pass',
        test: {
          funcName: 'goles_por_torneo',
          cases: [
            { args: ['goles_por_torneo.txt'], files: { 'goles_por_torneo.txt': GOLES_TORNEO },
              expect: { type: 'json', value: { Eliminatorias: 3, CopaAmerica: 4, Amistosos: 2, Mundial: 3 } } },
            { args: ['goles_por_torneo.txt'], files: { 'goles_por_torneo.txt': GOLES_TORNEO },
              expect: { type: 'file_contains', path: 'resumen_goles.txt',
                parts: ['Eliminatorias;3', 'CopaAmerica;4', 'Amistosos;2', 'Mundial;3'] } },
          ],
        },
      },

      // ── Bloque 2: manejo de errores ──
      {
        badge: 'Ejercicio 9',
        title: 'Clasificar camisetas',
        statement: `Escribí <code>clasificar_camisetas()</code> que pida números de camiseta e imprima <code>Titular</code> si está entre 1 y 11, o <code>Suplente</code> si no. Termina con <code>*</code>.
<p>Si el usuario escribe algo que no es un número, el programa <b>no se tiene que caer</b>: avisá y volvé a pedir.</p>
<pre>Número de camiseta (* para salir): 10
Titular
Número de camiseta (* para salir): hola
Error, tenés que ingresar un número.
Número de camiseta (* para salir): 14
Suplente
Número de camiseta (* para salir): *</pre>`,
        hint: '¿Qué excepción lanza <code>int(\'hola\')</code>?',        starter: 'def clasificar_camisetas():\n    pass',
        test: {
          funcName: 'clasificar_camisetas',
          cases: [
            { args: [], stdin: ['10', 'hola', '14', '*'],
              expect: { type: 'stdout_contains', parts: ['Titular', 'número', 'Suplente'] } },
            { args: [], stdin: ['1', '11', '*'],
              expect: { type: 'stdout_contains', parts: ['Titular'], absent: ['Suplente'] } },
          ],
        },
      },
      {
        badge: 'Ejercicio 10',
        title: 'Puntaje promedio de la prensa',
        statement: `<code>puntajes.txt</code> tiene un puntaje por línea, pero vienen sucios: hay comas en vez de puntos, texto y números mal escritos.
<pre>8.5
9
9,5
s/c
7.5
10
8..5
9
8
9.5
6.5
nd
7
9
9.5
-</pre>
<p>Escribí <code>puntaje_promedio(nombre_archivo)</code> que <b>devuelva una tupla</b> <code>(promedio, porcentaje_invalidos)</code> usando solo los valores válidos. El porcentaje es sobre el total de líneas.</p>
<p>Si el archivo no existe, imprimí <code>El archivo no existe</code> y devolvé <code>None</code>. Si no hay ningún valor válido, también <code>None</code>.</p>`,
        hint: 'Acá hay dos cosas distintas que pueden fallar. ¿Qué excepción es cada una?',        starter: 'def puntaje_promedio(nombre_archivo):\n    pass',
        test: {
          funcName: 'puntaje_promedio',
          cases: [
            { args: ['puntajes.txt'], files: { 'puntajes.txt': PUNTAJES },
              expect: { type: 'json', value: [8.5, 31.25] } },
            { args: ['no_existe.txt'],
              expect: { type: 'exact', value: 'null' } },
            { args: ['sucio.txt'], files: { 'sucio.txt': 's/c\nnada\n' },
              expect: { type: 'exact', value: 'null' } },
          ],
        },
      },
      {
        badge: 'Ejercicio 11',
        title: 'Reservar una entrada',
        statement: `El estadio es un diccionario de sectores, y cada sector es una lista de asientos: <code>'L'</code> libre, <code>'O'</code> ocupado.
<pre>estadio = {"Popular": ["L", "O", "L"], "Platea": ["L", "L"]}</pre>
<p>Escribí <code>reservar_entrada(estadio, sector, asiento)</code> que reserve el asiento (lo ponga en <code>'O'</code>) e imprima la confirmación. Si el sector no existe, imprimí <code>El sector indicado no existe</code>; si la ubicación no existe, <code>La ubicación indicada no existe</code>; si ya estaba ocupado, avisalo.</p>`,
        hint: '¿Dos <code>try</code> o uno solo? ¿Qué pasa si el asiento es <code>-1</code>? ¿Lo detecta el <code>except</code>?',        starter: 'def reservar_entrada(estadio, sector, asiento):\n    pass',
        test: {
          funcName: 'reservar_entrada',
          cases: [
            { args: [{ Popular: ['L', 'O', 'L'], Platea: ['L', 'L'] }, 'Popular', 0],
              expect: { type: 'stdout_contains', parts: ['Reservaste'] } },
            { args: [{ Popular: ['L', 'O', 'L'], Platea: ['L', 'L'] }, 'Popular', 1],
              expect: { type: 'stdout_contains', parts: ['ocupado'] } },
            { args: [{ Popular: ['L', 'O', 'L'], Platea: ['L', 'L'] }, 'Popular', 9],
              expect: { type: 'stdout_contains', parts: ['ubicación indicada no existe'] } },
            { args: [{ Popular: ['L', 'O', 'L'], Platea: ['L', 'L'] }, 'Popular', -1],
              expect: { type: 'stdout_contains', parts: ['ubicación indicada no existe'], absent: ['Reservaste'] } },
            { args: [{ Popular: ['L', 'O', 'L'], Platea: ['L', 'L'] }, 'Tribuna', 0],
              expect: { type: 'stdout_contains', parts: ['sector indicado no existe'] } },
          ],
        },
      },
      {
        badge: 'Ejercicio 12',
        title: 'Promedio de goles',
        statement: `Escribí <code>calcular_promedio_goles()</code> que pida goles convertidos y partidos jugados, y <b>devuelva</b> el promedio.
<p>Los dos ingresos tienen que aceptar solo enteros: si el usuario escribe cualquier otra cosa, avisá y volvé a pedir. Y si los partidos jugados son 0, imprimí <code>Los partidos jugados no pueden ser cero.</code> y devolvé <code>None</code>.</p>`,
        hint: 'El código para pedir un entero válido es idéntico dos veces. ¿Dónde va?',        starter: 'def calcular_promedio_goles():\n    pass',
        test: {
          funcName: 'calcular_promedio_goles',
          cases: [
            { args: [], stdin: ['30', '12'], expect: { type: 'numeric', value: 2.5 } },
            { args: [], stdin: ['x', '30', '0'],
              expect: { type: 'stdout_contains', parts: ['no pueden ser cero'] } },
            { args: [], stdin: ['x', '30', '0'], expect: { type: 'exact', value: 'null' } },
          ],
        },
      },
    ],
  },

  // ── Corrección de código (después de los ejercicios) ───────
  // Misma forma que `exercises`: ExerciseList la renderiza con editor y
  // "Verificar". Sin submitLabel, así que acá tampoco hay entrega ni galería.
  review: {
    eyebrow: 'Corrección de código',
    title: 'Ahora ponete los lentes de profesor',
    description: 'Dos alumnos entregaron estas funciones y no andan. Ponete en el lugar del docente: leé cada entrega, encontrá los errores y arreglala en el editor. El botón Verificar corre los tests sobre tu versión.',
    sheetPrefix: 'Archivos-Correccion-',
    items: [
      {
        badge: 'Entrega 1',
        title: 'Contar los convocados',
        statement: `Esta función tendría que devolver cuántos convocados tiene el archivo, pero está mal. Encontrá los errores y arreglala.
<pre>def contar_convocados(nombre_archivo):
    archivo = open(nombre_archivo, 'w')
    contenido = archivo.read()
    lineas = contenido.split("\\n")
    return len(lineas)</pre>`,        starter: 'def contar_convocados(nombre_archivo):\n    archivo = open(nombre_archivo, \'w\')\n    contenido = archivo.read()\n    lineas = contenido.split("\\n")\n    return len(lineas)',
        test: {
          funcName: 'contar_convocados',
          cases: [
            { args: ['convocados.txt'], files: CONVOCADOS_TXT, expect: { type: 'numeric', value: 7 } },
            { args: ['partidos.txt'], files: PARTIDOS_TXT, expect: { type: 'numeric', value: 12 } },
          ],
        },
      },
      {
        badge: 'Entrega 2',
        title: 'Guardar el plantel',
        statement: `Esta función tendría que guardar un jugador por línea, pero al final el archivo queda con <b>uno solo</b>. Encontrá los errores y arreglala.
<pre>def guardar(jugadores, nombre):
    for jugador in jugadores:
        archivo = open(nombre, 'w')
        archivo.write(jugador + '\\n')
        archivo.close()</pre>
<p>Uno de los problemas es el nombre: <code>guardar</code> y <code>nombre</code> no dicen nada. En el starter ya están renombrados a <code>guardar_plantel(lista_jugadores, nombre_archivo)</code>; te queda el resto.</p>`,        starter: 'def guardar_plantel(lista_jugadores, nombre_archivo):\n    for jugador in lista_jugadores:\n        archivo = open(nombre_archivo, \'w\')\n        archivo.write(jugador + \'\\n\')\n        archivo.close()',
        test: {
          funcName: 'guardar_plantel',
          cases: [
            { args: [['Dibu', 'Romero', 'Messi'], 'plantel.txt'],
              expect: { type: 'file_exact', path: 'plantel.txt', value: 'Dibu\nRomero\nMessi\n' } },
            { args: [['Messi'], 'plantel.txt'],
              expect: { type: 'file_exact', path: 'plantel.txt', value: 'Messi\n' } },
          ],
        },
      },
    ],
  },

  // ── Cierre ─────────────────────────────────────────────────
  feedback: {
    eyebrow: 'Cierre',
    title: 'Formulario de feedback',
    description: 'Último paso de la clase: contanos cómo nos fue. Son dos minutos y nos sirve muchísimo.',
    note: '¿Algún tema no se entendió? ¿Cómo podemos mejorar? ¿Hay algo que deberíamos seguir haciendo todas las clases? Escaneá el QR o abrí el link.',
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSeHXspjNmFyFKBorgadUxrksfIs-tbQVNRqAuX6sGUkbBeKAg/viewform',
  },
};
