const COURSE_CONFIG = {

  meta: {
    title: "El Descenso — Guía 2",
    eyebrow: "Pensamiento Computacional — Guía 2",
    heroTitleHtml: "El <span>Descenso</span>",
    heroDescription: "Antes de cruzar, Caronte quiere saber quién sos. Después, tres cámaras: un río para completar de a un dato por vez, dones para practicar y una botica de cierre. Anotá lo que quieras recordar en el camino.",
    footerText: "El Descenso · Guía 2 — Tipos de Datos, Expresiones y Funciones",
  },

  sheetWebhook: "https://script.google.com/macros/s/AKfycbxixKO-IHvlg3OzajxcbINbx6UwP0Li_tTuhI8MLQiIqPrNnmq7XVW9Cm_15B-8c6Li/exec",

  // sections: valores usados en el campo `section` de cada pregunta
  // sectionLabels: etiquetas cortas que aparecen en la barra de progreso
  sections: ["Campos de Asfódelos", "Estigia", "Tártaro", "Campos Elíseos"],
  sectionLabels: ["Asfódelos", "Estigia", "Tártaro", "Elíseos"],

  questions: [
    {section:"Campos de Asfódelos", q:"¿Entraste al Discord de la materia?", answers:["Sí"], options:["Sí","No"], hint:"El link está en la pagina de la materia."},
    {section:"Campos de Asfódelos", q:"¿Qué tipo de dato resulta de la operación <code>5 / 2</code> en Python?", answers:["float"], options:["integer","float","string","booleano"], hint:"La barra simple <code>/</code> en Python siempre da un resultado con decimales (float), aunque la división sea exacta."},
    {section:"Campos de Asfódelos", q:"<code>True</code> y <code>False</code> son un dato de tipo ___.", answers:["booleano"], options:["integer","booleano","string","float"], hint:"True y False son los dos únicos valores posibles del tipo booleano (bool)."},
    {section:"Campos de Asfódelos", q:"¿Cuál de las siguientes expresiones devuelve el resto de la división entre dos números?", answers:["%"], options:["//","%","/","**"], hint:"% es el operador módulo: te da el resto de la división, no el cociente."},
    {section:"Campos de Asfódelos", q:"¿Qué tipo de dato es <code>\"hola\"</code>?", answers:["string"], options:["string","booleano","integer","float"], hint:"Todo lo que está entre comillas en Python es un string (texto)."},
    {section:"Campos de Asfódelos", q:"El resultado de <code>5 == 5</code> es de tipo ___.", answers:["bool"], options:["bool","int","str","None"], hint:"El operador <code>==</code> compara, y el resultado de una comparación siempre es verdadero o falso."},

    {section:"Estigia", q:"¿Qué imprime este código?<pre>def f(n):\n    n = n + 1\n    return n\n\nx = 5\nf(x)\nprint(x)</pre>", answers:["5"], options:["5","6","None","Error"], hint:"Los parámetros son variables propias de la función: modificarlos ADENTRO no cambia la variable de AFUERA."},
    {section:"Estigia", q:"Si queremos definir una función que reciba dos parámetros y devuelva su suma, ¿cuál es la forma correcta?", answers:["def sumar(a, b): return a + b"], options:["def sumar(a, b): return a + b","sumar(a, b): return a + b","def sumar a, b: return a + b","def sumar(a, b): print(a + b)"], hint:"Una función empieza con def, usa paréntesis para los parámetros, termina en : y necesita return para devolver el resultado (print no alcanza)."},

    {section:"Tártaro", q:"¿Cómo se llama la acción de convertir un dato de un tipo a otro?", answers:["Castear"], options:["Castear","Declarar","Instanciar","Formatear"], hint:"Castear = cambiarle el 'disfraz' (tipo) a un dato sin cambiar su valor real."},
    {section:"Tártaro", q:"¿Qué ocurre con este código si el usuario ingresa <code>20</code>?<pre>edad = input(\"Ingrese su edad: \")\nedad_siguiente = edad + 1\nprint(edad_siguiente)</pre>", answers:["Se producirá un error"], options:["Se imprimirá 21","Se imprimirá 201","Se producirá un error","Se imprimirá edad_siguiente"], hint:"input() siempre devuelve un string: sumarle un número sin castear antes rompe el programa (TypeError)."},
    {section:"Tártaro", q:"¿Qué instrucción convierte un string en entero para poder operar con él?", answers:["int()"], options:["int()","str()","float()","bool()"], hint:"int() convierte a entero; float() convierte a decimal; str() convierte a texto."},
    {section:"Tártaro", q:"¿Qué resultado produce la siguiente operación?<br><code>\"Hola\" + str(2)</code>", answers:["Hola2"], options:["Hola 2","Hola2","Error","Hola+2"], hint:"str(2) convierte el número en texto \"2\"; + concatena sin agregar espacios extra."},

    {section:"Campos Elíseos", q:"¿Qué devuelve <code>\"Hola\"[1:3]</code>?", answers:["ol"], options:["ol","Ho","ola","la"], hint:"En [inicio:fin], el índice de inicio SE incluye, pero el de fin NUNCA se incluye."},
    {section:"Campos Elíseos", q:"Corregí este nombre de función para que siga la convención de la materia: <code>EsPar</code>", answers:["es_par"], options:["es_par","EsPar","ES_PAR","esPar"], hint:"Las funciones se nombran como acciones: verbos, todo en minúscula, separado por guiones bajos (snake_case)."},
    {section:"Campos Elíseos", q:"Según la convención de nombres, ¿con qué tipo de palabra se nombra una variable?", answers:["Sustantivo"], options:["Sustantivo","Verbo","Adjetivo","Adverbio"], hint:"Las variables son 'cosas', por eso se nombran como sustantivos, no como acciones."},
    {section:"Campos Elíseos", q:"El siguiente código tiene un error de sintaxis. ¿Qué símbolo falta en la función?<pre>def calcular_area(radio)\n    return 3.14 * radio ** 2</pre>", answers:[":"], options:[":",";","{","->"], hint:"Toda firma de función en Python termina en un mismo símbolo antes de bajar de línea."},
    {section:"Campos Elíseos", q:"¿Qué mostrará en pantalla el siguiente código?<pre>x = \"Hola\"\nx += \" mundo\"\nprint(x)</pre>", answers:["Hola mundo"], options:["Hola","Hola mundo","mundo","x"], hint:"+= le agrega el texto de la derecha al final de lo que ya tenía x."},
    {section:"Campos Elíseos", q:"¿Qué mostrará el siguiente código?<pre>print(\"Hola\" * 3)</pre>", answers:["HolaHolaHola"], options:["Hola Hola Hola","HolaHolaHola","Hola*3","Error"], hint:"Multiplicar un string por un número lo repite esa cantidad de veces, todo junto, sin espacios."},
    {section:"Campos Elíseos", q:"<code>L = [\"S\", \"L\", \"I\", \"C\", \"E\", \"I\", \"T\"]</code><br>¿Cuál es el resultado de <code>L[2:5]</code>?", answers:["['I', 'C', 'E']"], options:["['L', 'I', 'C']","['L', 'I', 'C', 'E']","['I', 'C', 'E']","['L', 'I']"], hint:"El índice de inicio se incluye, el de fin no: [2:5] toma las posiciones 2, 3 y 4."},
  ],

  boons: [
    {
      title: "El Peaje de Caronte",
      flavor: "Todo el que cruza, paga.",
      statement: "Función que reciba el precio del pasaje y la cantidad de almas que cruzan, y devuelva cuánto paga cada una si se reparte el costo en partes iguales. Podés pedir los datos con <code>input()</code> y mostrar el resultado con <code>print()</code> por fuera de la función.",
      hint: "Toda buena práctica de Python pide separar el cálculo (la función) de la entrada/salida (input/print). Si el dato llega por input(), es texto: castealo a int o float antes de operar.",
      note: "Para poder verificarla, definí una función llamada <code>calcular_pago_por_alma(precio_pasaje, cantidad_almas)</code>.",
      sol: `def calcular_pago_por_alma(precio_pasaje, cantidad_almas):
    return precio_pasaje / cantidad_almas

precio_pasaje = float(input("Ingrese el precio del pasaje: "))
cantidad_almas = int(input("Ingrese la cantidad de almas: "))
print("Cada alma paga:", calcular_pago_por_alma(precio_pasaje, cantidad_almas))`,
      test: {type:'function', funcName:'calcular_pago_por_alma', cases:[
        {args:[100,4], expect:{type:'numeric', value:25}},
        {args:[90,3], expect:{type:'numeric', value:30}},
        {args:[7,2], expect:{type:'numeric', value:3.5}},
      ]},
    },
    {
      title: "El Favor de los Dioses",
      flavor: "No todo descuento se pide en voz alta.",
      statement: "Función que reciba el costo de un pase y un porcentaje de favor (descuento) otorgado por los dioses, y devuelva el costo final.",
      hint: "Un descuento es un porcentaje del total: primero calculá cuánto es esa porción, después restala.",
      note: "Para poder verificarla, definí una función llamada <code>calcular_costo_final(costo, porcentaje_favor)</code>.",
      sol: `def calcular_costo_final(costo, porcentaje_favor):
    descuento = costo * porcentaje_favor / 100
    return costo - descuento`,
      test: {type:'function', funcName:'calcular_costo_final', cases:[
        {args:[100,10], expect:{type:'numeric', value:90}},
        {args:[200,25], expect:{type:'numeric', value:150}},
        {args:[50,0], expect:{type:'numeric', value:50}},
      ]},
    },
    {
      title: "La Ofrenda Sagrada",
      flavor: "No todas las almas son iguales ante los dioses.",
      statement: "Función que reciba un número de alma y devuelva True si es una \"ofrenda sagrada\" (múltiplo de 5).",
      hint: "'Ser múltiplo de' se pregunta con el resto: %. Si el resto de dividir por 5 es 0, es múltiplo de 5.",
      note: "Para poder verificarla, definí una función llamada <code>es_ofrenda_sagrada(numero_alma)</code>.",
      sol: `def es_ofrenda_sagrada(numero_alma):
    return numero_alma % 5 == 0`,
      test: {type:'function', funcName:'es_ofrenda_sagrada', cases:[
        {args:[10], expect:{type:'bool', value:true}},
        {args:[7], expect:{type:'bool', value:false}},
        {args:[0], expect:{type:'bool', value:true}},
        {args:[-5], expect:{type:'bool', value:true}},
      ]},
    },
    {
      title: "El Sello del Héroe",
      flavor: "Un nombre grabado no necesita ser completo para ser reconocido.",
      statement: "Función que reciba el nombre de un héroe y devuelva sus primeras 3 letras en mayúscula, como sello grabado en su arma.",
      hint: "Para tomar solo una parte de un string usá slicing [inicio:fin]; para cambiar mayúsculas/minúsculas están .upper() / .lower().",
      note: "Para poder verificarla, definí una función llamada <code>generar_sello(nombre_heroe)</code>.",
      sol: `def generar_sello(nombre_heroe):
    return nombre_heroe[:3].upper()`,
      test: {type:'function', funcName:'generar_sello', cases:[
        {args:['hercules'], expect:{type:'exact', value:'HER'}},
        {args:['Aquiles'], expect:{type:'exact', value:'AQU'}},
        {args:['ab'], expect:{type:'exact', value:'AB'}},
      ]},
    },
    {
      title: "La Lápida",
      flavor: "Lo último que queda escrito, se escribe una sola vez.",
      statement: "Función que reciba nombre, apellido y edad, y devuelva el texto grabado en una lápida: \"Apellido, Nombre (edad años)\".",
      hint: "Un f-string te deja meter variables directo dentro del texto con {}, sin tener que concatenar con +.",
      note: "Para poder verificarla, definí una función llamada <code>grabar_lapida(nombre, apellido, edad)</code>.",
      sol: `def grabar_lapida(nombre, apellido, edad):
    return f"{apellido}, {nombre} ({edad} años)"`,
      test: {type:'function', funcName:'grabar_lapida', cases:[
        {args:['Juan','Perez',30], expect:{type:'contains', parts:['Perez','Juan','30']}},
        {args:['Ana','Gomez',5], expect:{type:'contains', parts:['Gomez','Ana','5']}},
      ]},
    },
    {
      title: "El Hechizo Roto",
      flavor: "Hécate dejó un hechizo a medio terminar. Para hacer en parejas.",
      statement: "El siguiente hechizo está roto. Encontrar y corregir los errores:",
      code: `def calcular_poder_hechizo(mana)
    factor = 3.14159
    poder = factor * mana ** 2
    print poder

resultado = calcular_poder_hechizo(5)
print("El poder es:", resultado)`,
      hint: "Repasá tres cosas: ¿la firma termina en :? ¿print se usa como función, con paréntesis? ¿la función tiene return o se queda con el resultado adentro?",
      note: "Mantené el nombre de la función, <code>calcular_poder_hechizo(mana)</code>, para que podamos verificarla.",
      sol: `def calcular_poder_hechizo(mana):
    factor = 3.14159
    poder = factor * mana ** 2
    return poder

resultado = calcular_poder_hechizo(5)
print("El poder es:", resultado)`,
      test: {type:'function', funcName:'calcular_poder_hechizo', cases:[
        {args:[5], expect:{type:'numeric', value:78.53975, tolerance:0.001}},
        {args:[0], expect:{type:'numeric', value:0}},
        {args:[2], expect:{type:'numeric', value:12.56636, tolerance:0.001}},
      ]},
    },
  ],

  potion: {
    title: "El Cobro de Pociones",
    flavor: '"Nada sube gratis del Inframundo." — Hécate',
    // statementHtml y receiptHtml pueden contener HTML
    statementHtml: 'Pedirle al usuario el nombre de la poción, su precio unitario y la cantidad comprada. Calcular el subtotal, aplicar un <b>10% de descuento</b> si se compran <b>5 o más</b> pociones, y devolver un recibo con este formato:',
    receiptHtml: `Poción: <span class="g">Elixir de Ceniza</span><br>
Cantidad: <span class="s">6</span><br>
Subtotal: <span class="s">$600.0</span><br>
Descuento aplicado: <span class="g">Sí</span><br>
Total: <span class="s">$540.0</span>`,
    requirementsList: [
      "calcular_subtotal(precio_unitario, cantidad)",
      "aplicar_descuento(subtotal, cantidad)",
      "generar_recibo(pocion, cantidad, subtotal, total)",
    ],
    hintText: "Pensalo como una cadena de funciones: cada una recibe lo que devolvió la anterior. Primero el subtotal, después el descuento sobre ese subtotal, y por último armar el texto con f-strings.",
    // note puede contener HTML (etiquetas <code>)
    note: "Definí las tres funciones pedidas (<code>calcular_subtotal</code>, <code>aplicar_descuento</code>, <code>generar_recibo</code>) para que podamos verificarlas — no hace falta que incluyas los <code>input()</code>/<code>print()</code> finales.",
    tests: [
      {type:'function', funcName:'calcular_subtotal', cases:[
        {args:[100,6], expect:{type:'numeric', value:600}},
        {args:[50,2], expect:{type:'numeric', value:100}},
      ]},
      {type:'function', funcName:'aplicar_descuento', cases:[
        {args:[600,6], expect:{type:'numeric', value:540}},
        {args:[100,3], expect:{type:'numeric', value:100}},
        {args:[200,5], expect:{type:'numeric', value:180}},
      ]},
      {type:'function', funcName:'generar_recibo', cases:[
        {args:['Elixir de Ceniza',6,600,540], expect:{type:'contains', parts:['Elixir de Ceniza','6','600','540']}},
        {args:['Tónico',2,100,100], expect:{type:'contains', parts:['Tónico','2','100']}},
      ]},
    ],
    // solutionHtml va dentro de <pre> en innerHTML: usar &lt; para < y \$ para $ en f-strings
    solutionHtml: `def calcular_subtotal(precio_unitario, cantidad):
    return precio_unitario * cantidad

def aplicar_descuento(subtotal, cantidad):
    if cantidad >= 5:
        return subtotal * 0.9
    return subtotal

def generar_recibo(pocion, cantidad, subtotal, total):
    descuento_aplicado = "Sí" if total &lt; subtotal else "No"
    return (f"Poción: {pocion}\\n"
            f"Cantidad: {cantidad}\\n"
            f"Subtotal: \${subtotal}\\n"
            f"Descuento aplicado: {descuento_aplicado}\\n"
            f"Total: \${total}")

pocion = input("Ingrese la poción: ")
precio_unitario = float(input("Ingrese el precio unitario: "))
cantidad = int(input("Ingrese la cantidad: "))

subtotal = calcular_subtotal(precio_unitario, cantidad)
total = aplicar_descuento(subtotal, cantidad)
print(generar_recibo(pocion, cantidad, subtotal, total))`,
  },

};
