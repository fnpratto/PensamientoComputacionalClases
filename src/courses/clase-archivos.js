/* Clase 8 · Archivos y manejo de errores (Unidad 5), versión "La Scaloneta".
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
].map(l => `${l}\n`).join('');

const CRONICA1 = [
  'Messi recibe en tres cuartos y mira el arco.',
  'Messi pica al vacio y define de zurda.',
  'La hinchada canta de pie, el estadio vibra.',
  'Messi levanta los brazos y abraza a sus companeros.',
].map(l => `${l}\n`).join('');

const CRONICA2 = [
  'El equipo sale a presionar desde el inicio.',
  'Dibu ataja un penal sobre el final.',
  'Messi pide la pelota y cambia el ritmo.',
].map(l => `${l}\n`).join('');

const GOLES_TORNEO = [
  '#Eliminatorias',
  'Chile;23;Messi',
  'Peru;41;Alvarez',
  '#CopaAmerica',
  'Canada;49;Alvarez',
  'Colombia;112;Lautaro',
  'Brasil;78;Messi',
  '#Amistosos',
  'Francia;12;Messi',
].map(l => `${l}\n`).join('');

// 5 válidos (8.5, 9, 7.5, 10, 9) y 3 que no se pueden convertir.
const PUNTAJES = ['8.5', '9', '9,5', 's/c', '7.5', '10', '8..5', '9'].map(l => `${l}\n`).join('');

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
    subtitle: 'Quiz de nivelación + 14 ejercicios de la Scaloneta · Unidad 5',
    buttonLabel: 'Entrar a la cancha ⚽',
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
    exercises: '14 Ejercicios',
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
        prompt: `<code>partidos.txt</code> tiene 7 partidos. Ejecutás esto y nada más. ¿Cuántos partidos tiene el archivo ahora?<pre>archivo = open('partidos.txt', 'w')
archivo.close()</pre>`,
        answers: ["0, el modo 'w' borra el contenido anterior"],
        options: ['7', '8', "0, el modo 'w' borra el contenido anterior", 'Da error porque no escribimos nada'],
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
        prompt: 'Si <code>partidos.txt</code> tiene 7 líneas, ¿qué devuelve <code>len(archivo.readlines())</code>?',
        answers: ['7'],
        options: ['1', '7', 'Depende de cuántas palabras tenga', 'Da error: readlines no se puede usar con len'],
        hint: '¿Qué tipo de dato devuelve <code>readlines()</code>, y cuántos elementos tiene?',
        feedbackOk: 'Exacto. <code>readlines()</code> devuelve una <b>lista</b> con un string por línea, así que <code>len</code> da 7.',
        feedbackBad: 'Da 7. <code>readlines()</code> devuelve una lista con un elemento por línea, y <code>len</code> cuenta esos elementos. Desde ahí ya es un problema de listas.',
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
      html: `<p class="guide-lead">Todo lo que guardás en una variable vive en <b>memoria</b> y se pierde cuando el programa termina. Si querés que los datos sobrevivan, tienen que ir a un <b>archivo</b>.</p>
<p>Trabajar con un archivo son siempre tres pasos, en este orden:</p>
<pre>archivo = open('partidos.txt', 'r')   # 1. abrir (elegís el modo)
lineas = archivo.readlines()          # 2. trabajar
archivo.close()                       # 3. cerrar</pre>
<div class="guide-callout tip">La regla de oro: <b>abrir lo más tarde posible, cerrar lo antes posible</b>. Mientras el archivo está abierto ocupa recursos del sistema, y lo que escribiste puede no estar guardado de verdad hasta el <code>close()</code>.</div>
<p>Los archivos de datos de la clase los podés bajar para practicar en tu compu:
<a href="/datos/clase-archivos/partidos.txt">partidos.txt</a>,
<a href="/datos/clase-archivos/convocados.txt">convocados.txt</a>,
<a href="/datos/clase-archivos/cronica1.txt">cronica1.txt</a>,
<a href="/datos/clase-archivos/cronica2.txt">cronica2.txt</a>,
<a href="/datos/clase-archivos/goles_por_torneo.txt">goles_por_torneo.txt</a> y
<a href="/datos/clase-archivos/puntajes.txt">puntajes.txt</a>.
En los ejercicios de acá ya están cargados, no hace falta bajarlos.</p>`,
    },
    groups: [
      {
        label: 'Archivos',
        items: [
          {
            tag: 'Modos',
            title: 'Los tres modos que usamos',
            html: `<p>El modo lo elegís en el <code>open</code> y define qué podés hacer. Elegir mal no da un error prolijo: te borra el archivo.</p>
<pre>open('partidos.txt', 'r')   # leer. No podés escribir.
open('partidos.txt', 'w')   # escribir desde cero: VACIA el archivo al abrirlo
open('partidos.txt', 'a')   # append: escribe al final, conserva lo que había</pre>
<div class="guide-callout tip">Lo más importante de todo esto: <code>'w'</code> vacía el archivo <b>en el <code>open</code></b>, aunque después no escribas nada. Si lo que querés es agregar, el modo es <code>'a'</code>.</div>`,
          },
          {
            tag: 'Leer',
            title: 'readline() de a una, readlines() todo junto',
            html: `<p><code>readlines()</code> trae todo el archivo de una, como una <b>lista</b> con un string por línea (cada uno con su <code>'\\n'</code> al final). Es lo más cómodo cuando el archivo es chico:</p>
<pre>archivo = open('partidos.txt', 'r')
lineas = archivo.readlines()
archivo.close()                   # ya podemos cerrar: todo está en memoria

print(len(lineas))                # 7
for linea in lineas:
    print(linea.strip())          # strip() saca el '\\n'</pre>
<p><code>readline()</code> trae <b>una</b> línea y avanza. El archivo recuerda en qué línea quedó. Al llegar al final devuelve <code>''</code> (string vacío), y ese es el corte del <code>while</code>:</p>
<pre>archivo = open('partidos.txt', 'r')
linea = archivo.readline()
while linea != "":
    print(linea.strip())
    linea = archivo.readline()     # sin esta línea, bucle infinito
archivo.close()</pre>
<div class="guide-callout tip">Una línea en blanco <i>del medio</i> devuelve <code>'\\n'</code>, que no es <code>''</code>. Por eso el <code>while</code> no se corta en una línea vacía: solo se corta al final del archivo.</div>`,
          },
          {
            tag: 'Escribir',
            title: 'write() no agrega el salto de línea',
            html: `<p>A diferencia de <code>print</code>, <code>write</code> escribe exactamente el string que le pasás. El <code>'\\n'</code> lo tenés que poner vos:</p>
<pre>archivo = open('plantel.txt', 'w')
archivo.write('Dibu\\n')
archivo.write('Messi\\n')
archivo.close()</pre>
<p><code>writelines()</code> escribe una lista de strings de una, y tampoco agrega saltos:</p>
<pre>archivo = open('plantel.txt', 'a')
archivo.writelines(['Romero\\n', 'Lautaro\\n'])
archivo.close()</pre>
<div class="guide-callout tip">El <code>open</code> va <b>afuera</b> del <code>for</code>. Si lo abrís adentro con <code>'w'</code>, cada vuelta vacía el archivo y al final solo queda el último elemento.</div>`,
          },
          {
            tag: 'Reescribir',
            title: 'Modificar una línea del medio',
            html: `<p>No se puede editar una línea en el lugar. La receta es: leer todo a una lista, cambiar el elemento que querés y <b>reescribir el archivo completo</b> con <code>'w'</code>.</p>
<pre>lineas = leer_lineas('convocados.txt')   # readlines y close

if 0 &lt;= indice &lt; len(lineas):
    lineas[indice] = '[x]' + lineas[indice][3:]

archivo = open('convocados.txt', 'w')    # pisamos todo
archivo.writelines(lineas)
archivo.close()</pre>
<p>El chequeo <code>0 &lt;= indice &lt; len(lineas)</code> evita el <code>IndexError</code> cuando te piden una línea que no existe.</p>`,
          },
        ],
      },
      {
        label: 'Manejo de errores',
        items: [
          {
            tag: 'try / except',
            title: 'El try envuelve solo lo que puede fallar',
            html: `<p>Un <code>try</code> grande esconde bugs: si algo falla diez líneas más abajo por otro motivo, el <code>except</code> lo atrapa igual y nunca te enterás. Por eso el <code>try</code> va <b>ajustado</b> a la línea riesgosa, y el <code>except</code> <b>nombra</b> el error:</p>
<pre>try:
    archivo = open(nombre_archivo, 'r')
except FileNotFoundError:
    print("El archivo no existe")
    return None

lineas = archivo.readlines()      # afuera del try: esto no falla por el archivo
archivo.close()</pre>
<div class="guide-callout tip">Nunca un <code>except:</code> pelado. Atrapa absolutamente todo (incluso tus propios errores de tipeo) y los hace invisibles.</div>`,
          },
          {
            tag: 'Errores',
            title: 'Qué excepción lanza cada cosa',
            html: `<p>Para elegir el <code>except</code> hay que saber qué error esperar:</p>
<pre>int('diez')              # ValueError: el tipo está bien, el valor no sirve
float('9,5')             # ValueError: la coma no es un punto decimal
open('falta.txt', 'r')   # FileNotFoundError
estadio['Tribuna']       # KeyError: esa clave no está en el diccionario
asientos[99]             # IndexError: esa posición no existe en la lista
10 / 0                   # ZeroDivisionError
1 + 'uno'                # TypeError: los tipos no se pueden combinar</pre>
<div class="guide-callout tip">Ojo con los índices negativos: <code>asientos[-1]</code> <b>no</b> lanza <code>IndexError</code>, te devuelve el último elemento. Si un índice negativo no tiene sentido en tu problema, lo tenés que chequear a mano con un <code>if</code>.</div>`,
          },
          {
            tag: 'Validar',
            title: 'Pedir datos hasta que sean válidos',
            html: `<p>El patrón para validar un ingreso: el <code>try</code> alrededor de la conversión y, si falla, avisar y volver a pedir.</p>
<pre>def pedir_entero(mensaje):
    numero = None
    while numero is None:
        ingreso = input(mensaje)
        try:
            numero = int(ingreso)
        except ValueError:
            print("Tenés que ingresar un número entero.")
    return numero</pre>
<p>Cuando recorrés un archivo con datos sucios, el <code>continue</code> te deja saltear los que no sirven y seguir con el resto:</p>
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
      {
        label: 'Detective de código · tarea',
        items: [
          {
            tag: 'Código 3',
            title: 'leer_capitan: encontrá los 4 errores',
            html: `<p>Esta función tiene que devolver la primera línea del archivo. Antes de mirar la solución, buscá los errores:</p>
<pre>def leer_capitan(nombre_archivo):
    try:
        archivo = open(nombre_archivo, 'r')
        contenido = archivo.read()
        lineas = contenido.split("\\n")
        return lineas[0]
    except:
        print("Ocurrió un error")
        return None</pre>
<p><b>Los errores:</b></p>
<ol>
<li>El archivo <b>nunca se cierra</b>.</li>
<li>Hay demasiado código dentro del <code>try</code>: solo el <code>open</code> puede fallar por archivo inexistente.</li>
<li>El <code>except</code> es pelado: atrapa cualquier error, no solo el que esperamos.</li>
<li>Usar <code>read()</code> y partir todo el contenido para quedarse con una sola línea es un derroche: para eso está <code>readline()</code>.</li>
</ol>
<p><b>Corregida:</b></p>
<pre>def leer_capitan(nombre_archivo):
    try:
        archivo = open(nombre_archivo, 'r')
    except FileNotFoundError:
        print("El archivo no existe")
        return None
    primera_linea = archivo.readline().strip()
    archivo.close()
    return primera_linea</pre>`,
          },
          {
            tag: 'Código 4',
            title: 'encontrar_goles: el más roto de todos',
            html: `<p>Tiene que devolver la lista de números de línea donde aparece el jugador (la primera línea es la 1). Hay nueve cosas mal:</p>
<pre>def encontrar_goles(nombre_archivo, jugador):
    try:
        archivo = open(nombre_archivo, 'r')
        contenido = archivo.read()
        lineas = contenido.split("\\n")
        numero_linea = 1
        for linea in lineas:
            goles = []
            if linea in jugador:
                goles.append(jugador)
            else:
                jugador = None
        return lineas
    except:
        print("Ocurrió un error")
        return None</pre>
<p><b>Los errores:</b></p>
<ol>
<li>El archivo nunca se cierra.</li>
<li>Demasiado código dentro del <code>try</code>, y el <code>except</code> es pelado.</li>
<li><code>goles = []</code> está <b>dentro</b> del <code>for</code>: se reinicia en cada vuelta.</li>
<li>La condición está al revés: va <code>jugador in linea</code>, no <code>linea in jugador</code>.</li>
<li>Agrega el nombre del jugador en lugar del número de línea.</li>
<li><code>numero_linea</code> nunca se incrementa.</li>
<li>El <code>else</code> pisa <code>jugador</code> con <code>None</code> y rompe las vueltas siguientes.</li>
<li>Devuelve <code>lineas</code> en lugar de <code>goles</code>.</li>
<li>El <code>except</code> devuelve <code>None</code> en vez de una lista vacía, así que quien llama no puede recorrer el resultado.</li>
</ol>
<p><b>Corregida:</b></p>
<pre>def encontrar_goles(nombre_archivo, jugador):
    try:
        archivo = open(nombre_archivo, 'r')
    except FileNotFoundError:
        return []
    goles = []
    numero_linea = 1
    linea = archivo.readline()
    while linea != "":
        if jugador in linea:
            goles.append(numero_linea)
        numero_linea += 1
        linea = archivo.readline()
    archivo.close()
    return goles</pre>`,
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
<tr><td>Sacar el salto de línea</td><td><code>linea.strip()</code></td></tr>
<tr><td>Partir una línea con separador</td><td><code>linea.strip().split(';')</code></td></tr>
<tr><td>Contar palabras de una línea</td><td><code>len(linea.split())</code> (sin argumentos: ignora los espacios de más)</td></tr>
<tr><td>Escribir una línea</td><td><code>archivo.write(texto + '\\n')</code></td></tr>
<tr><td>Escribir una lista de líneas</td><td><code>archivo.writelines(lista)</code></td></tr>
<tr><td>Agregar al final</td><td><code>open(nombre, 'a')</code></td></tr>
<tr><td>Reescribir desde cero</td><td><code>open(nombre, 'w')</code></td></tr>
<tr><td>Archivo que puede no existir</td><td><code>try: open(...)</code> / <code>except FileNotFoundError:</code></td></tr>
<tr><td>Texto que puede no ser número</td><td><code>try: int(x)</code> / <code>except ValueError:</code></td></tr>
<tr><td>Clave que puede no estar</td><td><code>try: d[k]</code> / <code>except KeyError:</code></td></tr>
<tr><td>Posición que puede no existir</td><td><code>try: lista[i]</code> / <code>except IndexError:</code> + chequear <code>i &lt; 0</code></td></tr>
</tbody>
</table>`,
    },
  },

  // ── Ejercicios ─────────────────────────────────────────────
  exercises: {
    eyebrow: 'Ejercicios',
    title: '14 ejercicios de la Scaloneta',
    description: 'Los archivos de datos ya están cargados: podés abrirlos por nombre directamente. Cada ejercicio corre en su propia carpeta, así que lo que escribas no afecta a los demás.',
    sheetPrefix: 'Archivos-',
    submitLabel: 'Entregar',
    items: [
      // ── Bloque 1: archivos ──
      {
        badge: 'Ejercicio 1',
        tag: 'open · readlines · len',
        title: 'Contar los partidos',
        statement: `El archivo <code>partidos.txt</code> tiene un partido por línea. Escribí <code>contar_partidos(nombre_archivo)</code> que <b>devuelva</b> cuántos partidos tiene.
<pre>Argentina 2-0 Chile
Argentina 1-1 Brasil
Argentina 3-0 Peru
...</pre>
<b>Para pensar:</b> ¿con qué modo lo abrís? ¿en qué momento conviene cerrarlo?`,
        hint: 'Abrilo con <code>\'r\'</code>, traete todo con <code>readlines()</code>, cerralo y recién ahí contá con <code>len()</code>. No hace falta ningún <code>for</code>.',
        note: 'La función se tiene que llamar <code>contar_partidos(nombre_archivo)</code> y <b>devolver</b> el número (con <code>return</code>), no imprimirlo.',
        starter: 'def contar_partidos(nombre_archivo):\n    pass',
        test: {
          funcName: 'contar_partidos',
          cases: [
            { args: ['partidos.txt'], files: PARTIDOS_TXT, expect: { type: 'numeric', value: 7 } },
            { args: ['convocados.txt'], files: CONVOCADOS_TXT, expect: { type: 'numeric', value: 4 } },
          ],
        },
      },
      {
        badge: 'Ejercicio 2',
        tag: 'readlines · rebanadas',
        title: 'Los últimos partidos',
        statement: `Escribí <code>ultimos_partidos(nombre_archivo, n)</code> que <b>devuelva una lista</b> con los últimos <code>n</code> partidos del archivo (tal como vienen, con su salto de línea). Es el <code>tail</code> de la terminal.
<p>Si <code>n</code> es más grande que la cantidad de líneas, devolvé todas las que haya.</p>
<b>Para pensar:</b> ¿qué devuelve <code>lineas[-n:]</code> cuando <code>n</code> vale 0? Probalo mentalmente antes de escribir el código.`,
        hint: 'La rebanada <code>lineas[-n:]</code> te da los últimos <code>n</code>... salvo con <code>n = 0</code>, porque <code>-0</code> es <code>0</code> y <code>lineas[0:]</code> es <b>toda</b> la lista. Ese caso hay que atajarlo antes con un <code>if</code>.',
        note: 'Devolvé la lista de strings sin modificar: cada elemento conserva su <code>\'\\n\'</code> final.',
        starter: 'def ultimos_partidos(nombre_archivo, n):\n    pass',
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
        tag: 'in · strip · print',
        title: 'Buscar un rival',
        statement: `Escribí <code>buscar_rival(cadena, nombre_archivo)</code> que <b>imprima</b> los partidos que contienen esa cadena, sin el salto de línea. Es el <code>grep</code> de la terminal.
<pre>buscar_rival('Francia', 'partidos.txt')
Argentina 2-1 Francia</pre>
<b>Para pensar:</b> ¿cómo preguntás si un texto está dentro de otro?`,
        hint: 'El operador <code>in</code> también sirve para strings: <code>if cadena in linea</code>. Para imprimir sin la línea en blanco de más, usá <code>linea.strip()</code>.',
        note: 'Esta función <b>imprime</b>, no devuelve nada. Ojo con el orden de los parámetros: primero la cadena, después el nombre del archivo.',
        starter: 'def buscar_rival(cadena, nombre_archivo):\n    pass',
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
        tag: 'varios archivos · escritura',
        title: 'Reporte de crónicas',
        statement: `Escribí <code>procesar_cronicas(archivos, palabra)</code>, que recibe una <b>lista</b> de nombres de archivo y una palabra, y genera <code>reporte_cronicas.txt</code> con una línea por archivo:
<pre>archivo;palabras;apariciones
cronica1.txt;34;3
cronica2.txt;23;1</pre>
<p>La primera línea es el encabezado, tal cual. Después, por cada archivo: su nombre, cuántas palabras tiene en total y cuántas veces aparece la palabra buscada.</p>
<b>Para pensar:</b> ¿cuántas veces abrís el reporte, una por archivo procesado o una sola?`,
        hint: 'Conviene una función aparte <code>leer_lineas(nombre)</code> que haga open/readlines/close y devuelva la lista: la vas a reusar en varios ejercicios. Para contar palabras, <code>linea.split()</code> sin argumentos (así no cuenta de más en las líneas vacías). La comparación es exacta: <code>if p == palabra</code>.',
        note: 'El reporte se abre <b>una sola vez</b>, antes del <code>for</code>, y se cierra al final. La función no devuelve nada: deja el archivo escrito.',
        starter: 'def procesar_cronicas(archivos, palabra):\n    pass',
        test: {
          funcName: 'procesar_cronicas',
          cases: [
            { args: [['cronica1.txt', 'cronica2.txt'], 'Messi'], files: CRONICAS_TXT,
              expect: { type: 'file_contains', path: 'reporte_cronicas.txt',
                parts: ['archivo;palabras;apariciones', 'cronica1.txt;34;3', 'cronica2.txt;23;1'] } },
            { args: [['cronica2.txt'], 'Dibu'], files: CRONICAS_TXT,
              expect: { type: 'file_contains', path: 'reporte_cronicas.txt', parts: ['cronica2.txt;23;1'] } },
          ],
        },
      },
      {
        badge: 'Ejercicio 5',
        tag: 'tuplas · rebanadas de string',
        title: 'Leer el checklist',
        statement: `<code>convocados.txt</code> es el checklist del homenaje: cada línea arranca con <code>[ ]</code> si está pendiente o <code>[x]</code> si ya se hizo.
<pre>[ ] Armar la bandera gigante
[x] Imprimir las entradas
[ ] Comprar la camiseta con el 10
[x] Avisar en el grupo de WhatsApp</pre>
<p>Escribí <code>leer_checklist(nombre_archivo)</code> que <b>devuelva una tupla</b> <code>(pendientes, hechas)</code> con las descripciones, <b>sin</b> la marca del principio y sin el salto de línea.</p>
<b>Para pensar:</b> ¿cuántos caracteres hay que saltear para quedarte solo con la descripción?`,
        hint: 'Primero <code>linea.strip()</code>. La marca ocupa los 3 primeros caracteres y después hay un espacio, así que la descripción es <code>linea[4:]</code> y la marca es <code>linea[:3]</code>. Dos listas y <code>return pendientes, hechas</code>.',
        note: 'Devolvé primero las pendientes y después las hechas, respetando el orden en que aparecen en el archivo.',
        starter: 'def leer_checklist(nombre_archivo):\n    pass',
        test: {
          funcName: 'leer_checklist',
          cases: [
            { args: ['convocados.txt'], files: CONVOCADOS_TXT,
              expect: { type: 'json', value: [
                ['Armar la bandera gigante', 'Comprar la camiseta con el 10'],
                ['Imprimir las entradas', 'Avisar en el grupo de WhatsApp'],
              ] } },
            { args: ['todo.txt'], files: { 'todo.txt': '[x] Ya esta\n' },
              expect: { type: 'json', value: [[], ['Ya esta']] } },
          ],
        },
      },
      {
        badge: 'Ejercicio 6',
        tag: 'input · while · append',
        title: 'Agregar pendientes',
        statement: `Escribí <code>agregar_pendientes(nombre_archivo)</code> que pida tareas por teclado y las agregue <b>al final</b> del checklist con el formato <code>[ ] &lt;tarea&gt;</code>, una por línea. Termina cuando el usuario ingresa <code>X</code>.
<pre>Tarea para el homenaje (X para terminar): Pintar la cara
Tarea para el homenaje (X para terminar): Llevar bombo
Tarea para el homenaje (X para terminar): X</pre>
<b>Para pensar:</b> ¿abrís el archivo antes de pedir las tareas o después? ¿qué modo usás para no borrar lo que ya estaba?`,
        hint: 'Juntá las tareas en una lista mientras las pedís (con el <code>\'\\n\'</code> ya puesto), y recién al final abrí el archivo con <code>\'a\'</code>, hacé <code>writelines()</code> y cerrá. Así el archivo está abierto el menor tiempo posible.',
        note: 'La <code>X</code> es mayúscula y no se guarda. Si abrís con <code>\'w\'</code> en vez de <code>\'a\'</code> vas a borrar el checklist entero.',
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
        tag: 'reescribir · IndexError',
        title: 'Marcar una tarea como hecha',
        statement: `Escribí <code>marcar_hecha(nombre_archivo, numero_linea)</code> que cambie el <code>[ ]</code> por <code>[x]</code> en esa línea del checklist. La <b>primera línea es la 1</b>.
<p>Si el número de línea no existe, la función no tiene que romper: deja el archivo como estaba.</p>
<b>Para pensar:</b> ¿se puede editar una sola línea en el medio de un archivo, o hay que reescribirlo todo?`,
        hint: 'Leé todo a una lista, convertí el número a índice (<code>numero_linea - 1</code>), chequeá <code>0 &lt;= indice &lt; len(lineas)</code> y cambiá ese elemento con <code>\'[x]\' + linea[3:]</code>. Después abrí con <code>\'w\'</code> y <code>writelines()</code> toda la lista.',
        note: 'Cuidado con el orden: primero leé y cerrá, y recién después abrí con <code>\'w\'</code>. Si abrís con <code>\'w\'</code> antes de leer, el archivo ya está vacío.',
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
        tag: 'desafío · diccionarios · escritura',
        title: 'Goles por torneo',
        statement: `<code>goles_por_torneo.txt</code> agrupa los goles por torneo. Las líneas que empiezan con <code>#</code> abren un torneo; las de abajo son goles con el formato <code>rival;minuto;goleador</code>.
<pre>#Eliminatorias
Chile;23;Messi
Peru;41;Alvarez
#CopaAmerica
Canada;49;Alvarez
...</pre>
<p>Escribí <code>goles_por_torneo(nombre_archivo)</code> que <b>devuelva un diccionario</b> <code>{torneo: cantidad}</code> y además escriba <code>resumen_goles.txt</code> con una línea <code>torneo;cantidad</code> por torneo.</p>
<b>Para pensar:</b> mientras recorrés las líneas, ¿cómo te acordás de a qué torneo pertenece el gol que estás leyendo?`,
        hint: 'Necesitás una variable que guarde el torneo actual. Cuando la línea empieza con <code>#</code>, el nombre del torneo es <code>linea[1:]</code> y arrancás ese torneo en 0; si no, le sumás 1 al torneo actual. Saltéate las líneas vacías con <code>continue</code>.',
        note: 'Este es el desafío sin pistas de la clase: devolvé el diccionario <b>y</b> dejá escrito <code>resumen_goles.txt</code>.',
        starter: 'def goles_por_torneo(nombre_archivo):\n    pass',
        test: {
          funcName: 'goles_por_torneo',
          cases: [
            { args: ['goles_por_torneo.txt'], files: { 'goles_por_torneo.txt': GOLES_TORNEO },
              expect: { type: 'json', value: { Eliminatorias: 2, CopaAmerica: 3, Amistosos: 1 } } },
            { args: ['goles_por_torneo.txt'], files: { 'goles_por_torneo.txt': GOLES_TORNEO },
              expect: { type: 'file_contains', path: 'resumen_goles.txt',
                parts: ['Eliminatorias;2', 'CopaAmerica;3', 'Amistosos;1'] } },
          ],
        },
      },

      // ── Bloque 2: manejo de errores ──
      {
        badge: 'Ejercicio 9',
        tag: 'try · ValueError · continue',
        title: 'Clasificar camisetas',
        statement: `Escribí <code>clasificar_camisetas()</code> que pida números de camiseta e imprima <code>Titular</code> si está entre 1 y 11, o <code>Suplente</code> si no. Termina con <code>*</code>.
<p>Si el usuario escribe algo que no es un número, el programa <b>no se tiene que caer</b>: avisá y volvé a pedir.</p>
<pre>Número de camiseta (* para salir): 10
Titular
Número de camiseta (* para salir): hola
Error, tenés que ingresar un número.
Número de camiseta (* para salir): 14
Suplente
Número de camiseta (* para salir): *</pre>
<b>Para pensar:</b> ¿qué excepción lanza <code>int('hola')</code>?`,
        hint: 'El <code>try</code> envuelve <b>solo</b> el <code>int(ingreso)</code>. En el <code>except ValueError</code> avisás, volvés a pedir y usás <code>continue</code> para no clasificar un número que nunca se convirtió.',
        note: 'La función no recibe parámetros ni devuelve nada: solo imprime. El corte es el asterisco <code>*</code>.',
        starter: 'def clasificar_camisetas():\n    pass',
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
        tag: 'FileNotFoundError · datos sucios',
        title: 'Puntaje promedio de la prensa',
        statement: `<code>puntajes.txt</code> tiene un puntaje por línea, pero vienen sucios: hay comas en vez de puntos, texto y números mal escritos.
<pre>8.5
9
9,5
s/c
7.5
10
8..5
9</pre>
<p>Escribí <code>puntaje_promedio(nombre_archivo)</code> que <b>devuelva una tupla</b> <code>(promedio, porcentaje_invalidos)</code> usando solo los valores válidos. El porcentaje es sobre el total de líneas.</p>
<p>Si el archivo no existe, imprimí <code>El archivo no existe</code> y devolvé <code>None</code>. Si no hay ningún valor válido, también <code>None</code>.</p>
<b>Para pensar:</b> acá hay dos cosas distintas que pueden fallar. ¿Qué excepción es cada una?`,
        hint: 'Dos <code>try</code> separados y chiquitos: uno alrededor del <code>open</code> con <code>except FileNotFoundError</code>, y otro alrededor del <code>float(linea.strip())</code> con <code>except ValueError</code> y un <code>continue</code>. Antes de dividir, chequeá que haya al menos un válido.',
        note: 'Con el archivo de ejemplo tiene que dar <code>(8.8, 37.5)</code>: 5 válidos de 8 líneas.',
        starter: 'def puntaje_promedio(nombre_archivo):\n    pass',
        test: {
          funcName: 'puntaje_promedio',
          cases: [
            { args: ['puntajes.txt'], files: { 'puntajes.txt': PUNTAJES },
              expect: { type: 'json', value: [8.8, 37.5] } },
            { args: ['no_existe.txt'],
              expect: { type: 'exact', value: 'null' } },
            { args: ['sucio.txt'], files: { 'sucio.txt': 's/c\nnada\n' },
              expect: { type: 'exact', value: 'null' } },
          ],
        },
      },
      {
        badge: 'Ejercicio 11',
        tag: 'KeyError · IndexError',
        title: 'Reservar una entrada',
        statement: `El estadio es un diccionario de sectores, y cada sector es una lista de asientos: <code>'L'</code> libre, <code>'O'</code> ocupado.
<pre>estadio = {"Popular": ["L", "O", "L"], "Platea": ["L", "L"]}</pre>
<p>Escribí <code>reservar_entrada(estadio, sector, asiento)</code> que reserve el asiento (lo ponga en <code>'O'</code>) e imprima la confirmación. Si el sector no existe, imprimí <code>El sector indicado no existe</code>; si la ubicación no existe, <code>La ubicación indicada no existe</code>; si ya estaba ocupado, avisalo.</p>
<b>Para pensar:</b> ¿dos <code>try</code> o uno solo? ¿Qué pasa si el asiento es <code>-1</code>? ¿Lo detecta el <code>except</code>?`,
        hint: 'Un <code>try</code> para el <code>estadio[sector]</code> con <code>except KeyError</code> y otro para el <code>asientos[asiento]</code> con <code>except IndexError</code>. Pero cuidado: <code>asientos[-1]</code> <b>no</b> lanza <code>IndexError</code>, te devuelve el último asiento. Ese caso hay que chequearlo con un <code>if</code> antes.',
        note: 'La función no devuelve nada: imprime y modifica la lista del sector.',
        starter: 'def reservar_entrada(estadio, sector, asiento):\n    pass',
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
        tag: 'desafío · ZeroDivisionError',
        title: 'Promedio de goles',
        statement: `Escribí <code>calcular_promedio_goles()</code> que pida goles convertidos y partidos jugados, y <b>devuelva</b> el promedio.
<p>Los dos ingresos tienen que aceptar solo enteros: si el usuario escribe cualquier otra cosa, avisá y volvé a pedir. Y si los partidos jugados son 0, imprimí <code>Los partidos jugados no pueden ser cero.</code> y devolvé <code>None</code>.</p>
<b>Para pensar:</b> el código para pedir un entero válido es idéntico dos veces. ¿Dónde va?`,
        hint: 'Hacé una función aparte <code>pedir_entero(mensaje)</code> que repita hasta que el <code>int()</code> funcione, y usala dos veces. La división va en su propio <code>try</code> con <code>except ZeroDivisionError</code>: dejá que Python detecte el cero en vez de chequearlo con un <code>if</code>.',
        note: 'La función principal se tiene que llamar <code>calcular_promedio_goles()</code> y no recibe parámetros. Podés definir todas las funciones auxiliares que quieras.',
        starter: 'def calcular_promedio_goles():\n    pass',
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

      // ── Bloque 3: detective de código ──
      {
        badge: 'Ejercicio 13',
        tag: 'detective de código',
        title: 'Detective: contar los convocados',
        statement: `Esta función tendría que devolver cuántos convocados tiene el archivo, pero está mal. Encontrá los errores y arreglala.
<pre>def contar_convocados(nombre_archivo):
    archivo = open(nombre_archivo, 'w')
    contenido = archivo.read()
    lineas = contenido.split("\\n")
    return len(lineas)</pre>
<b>Para pensar:</b> son tres cosas. Una de ellas <b>destruye el archivo</b> antes de leer nada.`,
        hint: 'Mirá el modo del <code>open</code>: <code>\'w\'</code> vacía el archivo y encima no permite leer. Además nunca se cierra. Y si existe <code>readlines()</code>, hacer <code>read()</code> más <code>split()</code> es dar una vuelta de más (que encima cuenta mal si el archivo termina con salto de línea).',
        note: 'Dejá la función con el mismo nombre, <code>contar_convocados(nombre_archivo)</code>.',
        starter: 'def contar_convocados(nombre_archivo):\n    archivo = open(nombre_archivo, \'w\')\n    contenido = archivo.read()\n    lineas = contenido.split("\\n")\n    return len(lineas)',
        test: {
          funcName: 'contar_convocados',
          cases: [
            { args: ['convocados.txt'], files: CONVOCADOS_TXT, expect: { type: 'numeric', value: 4 } },
            { args: ['partidos.txt'], files: PARTIDOS_TXT, expect: { type: 'numeric', value: 7 } },
          ],
        },
      },
      {
        badge: 'Ejercicio 14',
        tag: 'detective de código',
        title: 'Detective: guardar el plantel',
        statement: `Esta función tendría que guardar un jugador por línea, pero al final el archivo queda con <b>uno solo</b>. Encontrá los errores y arreglala.
<pre>def guardar(jugadores, nombre):
    for jugador in jugadores:
        archivo = open(nombre, 'w')
        archivo.write(jugador + '\\n')
        archivo.close()</pre>
<p>Uno de los problemas es el nombre: <code>guardar</code> y <code>nombre</code> no dicen nada. En el starter ya están renombrados a <code>guardar_plantel(lista_jugadores, nombre_archivo)</code>; te queda el resto.</p>
<b>Para pensar:</b> ¿qué pasa en cada vuelta del <code>for</code> al abrir con <code>'w'</code>?`,
        hint: 'El <code>open</code> y el <code>close</code> tienen que estar <b>afuera</b> del <code>for</code>. Abriendo con <code>\'w\'</code> en cada vuelta, el archivo se vacía cada vez y solo sobrevive el último jugador. Además abrir y cerrar una vez por elemento es carísimo.',
        note: 'Con <code>[\'Dibu\', \'Romero\', \'Messi\']</code> el archivo tiene que quedar con las tres líneas, en ese orden.',
        starter: 'def guardar_plantel(lista_jugadores, nombre_archivo):\n    for jugador in lista_jugadores:\n        archivo = open(nombre_archivo, \'w\')\n        archivo.write(jugador + \'\\n\')\n        archivo.close()',
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
