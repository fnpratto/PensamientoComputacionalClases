## Repaso general

### Checklist

- [ ]  Print vs Return
- [ ]  Input vs Parámetro
- [ ]  Nombres de variables/funciones
- [ ]  Funciones que devuelven booleanos
- [ ]  Uso de condicionales
- [ ]  Operadores lógicos
- [ ]  Funciones auxiliares
- [ ]  Ciclos while: nunca usar while true
- [ ]  Ciclos while: actualizar siempre la condición
- [ ]  Cuando usar cada ciclo
- [ ]  Como usar el range

Estructura de clase

### Repaso general

#### Unidad 1

- Pasos para crear un algoritmo:
    1. Analizar el problema
    2. Primer borrador
    3. Dividir en partes
    4. Ensamblar

#### Unidad 2

- Tipos de datos, operaciones, casteos
- Funciones, parámetros
- Interacción con el usuario
- Funciones predefinidas
- Nombres de variables y funciones

#### Unidad 3

- Expresiones booleanas: comparaciones aritméticas y lógicas
- Funciones que devuelven booleanos
- Condicionales: if, if/else, if/elif/else
- Condicionales anidados
- Ciclo for, ciclo while: definición/actualización de condiciones
- Ciclos anidados
- continue/break/return
- Indentaciones

#### Unidad 4

- Rangos: inicio, fin, salto
- Cadenas: slicing, indexing, concatenación, format, funciones con cadenas
- Tuplas: slicing, in dexing, concatenación, desempaquetado
- Listas: creación, modificación: agregar, eliminar; indexing, slicing, concatenación, búsqueda de elementos, ordenamientos, funciones con listas

### Ejercicios de Parcial

1. Registro de costos de envío → repasar buena prácticas del while

Una empresa de envíos realiza cada día el armado de sus transporte en base a la capacidad máxima soportada por cada uno de ellos. Para cada camión le interesa saber cuál es la cantidad de pedidos transportados y el monto total a cobrar. 

El costo de cada envío se calcula mediante la siguiente fórmula: `precio_base + (precio_por_kilo * peso)` . 

Implementar una función que reciba capacidad máxima de un transporte, precio base de cada envío y precio por kilogramo transportado. La función deberá pedirle al usuario que ingrese el peso de cada pedido hasta alcanzar la capacidad máxima. Finalmente deberá devolver el monto total a cobrar en base a la fórmula mencionada.

Ejemplo de ejecución si se recibe: `20`, `2000`, `1000`

```python
Capacidad máxima: 20 kg
Precio base por envío: $2000
Peso por kilogramo: $1000

Ingrese el peso de un pedido: 4
Ingrese el peso de un pedido: 11
Ingrese el peso de un pedido: 0.5
Ingrese el peso de un pedido: 5
Con ese pedido se supera la capacidad máxima, no será incluído.
```

Y deberá devolver: `21500` 

- Solución propuesta
    
    ```python
    def planificar_envios(cap_max, precio_base, precio_x_kg):
    		total_envios = 0
    		peso_actual = 0
    		print(f"Capacidad máxima: {cap_max}")
    		print(f"Precio base por envío: {precio_base}")
    		print(f"Peso por kilogramo: {precio_x_kg}")
    		
    		peso = float(input("Ingrese el peso de un pedido: "))
    		while peso_actual + peso < cap_max:
    				costo_envio = precio_base + (precio_x_kg * peso)
    				total_envios += costo_envio
    				peso = float(input("Ingrese el peso de un pedido: "))
    				
    		print("El pedido sobrepasa la capacidad máxima, no será incluído.")
    		return total_envios
    ```
2. Premiar alumnos → repasar buena practica de devolver un booleano
Antes de un exámen difícil los docentes intentan motivar a sus estudiantes prometiendo que si la mayoría de los exámenes supera determinada nota mínima les darán un día libre para celebrar la aprobación. 

Implementar una función que dada una lista de notas de exámenes y una nota mínima a superar, devuelva un valor booleano que indique si los alumnos merecen el premio o no en base a la condición establecida previamente.

Por ejemplo para una nota mínima de `6`:

```bash
[4, 8, 2, 9, 6, 7] -> True
[4, 3, 10, 10, 5, 2] -> False
```

#### Solución propuesta

```python
def merecen_premio(notas, minimo):
		superan = 0
		for nota in notas:
				if nota >= minimo:
						superan += 1
		return superan >= (len(notas) // 2)
```

3. Manejo stock en el almacén  → importante: format en el input, split del ingreso + casteo, “actualizar tuplas” = crear una nueva tupla
Carlos maneja un almacén de barrio y quiere digitalizar el proceso de actualización del stock que realiza al finalizar cada día.

Actualmente, al finalizar la jornada:

1. Revisa la cantidad de unidades disponibles de cada producto.
2. Registra cuántas unidades se vendieron durante el día y actualiza el stock.
3. Consulta el precio de venta actual de cada producto y calcula la ganancia obtenida por las unidades vendidas.

Para facilitar esta tarea, implementar un programa que reciba una lista con los productos disponibles en el almacén y su stock actual. Para cada producto, el programa deberá solicitar al usuario la cantidad de unidades vendidas durante el día y el precio de venta por unidad, utilizando el siguiente formato: `<unidades_vendidas> - <precio_unitario>`

A partir de estos datos, el programa deberá:

- Actualizar el stock del producto restando las unidades vendidas al stock anterior.
- Calcular la ganancia obtenida por ese producto.
- Acumular las ganancias de todos los productos.

Al finalizar, deberá mostrar por pantalla la **ganancia bruta total** obtenida durante el día y devolver una lista con el stock actualizado de cada producto.

Por ejemplo, si se recibe la siguiente lista: `[("Leche", 5), ("Fideos", 12), ("Chocolatada", 10), ("Yogurt", 4)]` la ejecución podría ser:

```
Para cada producto ingrese: <unidades vendidas> - <precio unitario>

Leche 5 unidades: 3 - 1200
Fideos 12 unidades: 10 - 1500
Chocolatada 10 unidades: 0 - 4500
Yogurt 4 unidades: 4 - 3000

Ganancia bruta: $30600
```

En este caso, la función deberá devolver: `[("Leche", 2), ("Fideos", 2), ("Chocolatada", 10), ("Yogurt", 0)]` .

- Solución propuesta
    
    ```python
    def gestionar_stock(productos):
        stock_actualizado = []
        ganancias_totales = 0
    
        print("Para cada producto ingrese: <unidades vendidas> - <precio unitario>")
    
        for producto, stock_viejo in productos:
            ingreso = input(f"{producto} {stock_viejo} unidades: ")
            unidades, precio = ingreso.split(" - ")
    
            unidades = int(unidades)
            precio = float(precio)
    
            stock_actual = stock_viejo - unidades
            ganancias = unidades * precio
            ganancias_totales += ganancias
    
            stock_actualizado.append((producto, stock_actual))
    
        print(f"Ganancias brutas: ${ganancias_totales}")
        return stock_actualizado
    ```
4. Codificar números → uso del replace
    
    Formamos parte de un pequeño grupo de rebeldes conocidos como La Resistencia. Para poder compartir de forma segura mensajes numéricos hemos ideado un método para encriptarlos utilizando un sistema de sustitución basado en un código secreto. Donde cada mensaje numérico se transforma utilizando un código de 10 caracteres únicos que representan los dígitos del 0 al 9.
    
    Para poder enviar los mensajes rápidos, queremos realizar una función que genere el mensaje encriptado en base a un código dado. Para ello se debe crear una función que reciba un número (entero o decimal) y un código secreto, y debe devolver la versión encriptada del número.
    
    Cada dígito del número original debe ser sustituido por el carácter en la posición correspondiente del código. Si el código no cumple con el largo correspondiente se debe retornar `None` .
    
    Por ejemplo, para el número `1234567890.87` y el código `"abcdefghij"` , se forma el mensaje encriptado: `bcdefghija.ih` 
    
    - Posible Solución
        
        ```python
        ### sin ciclos
        
        def encriptar_numero(numero, codigo):
        		# numero int
        		# codigo es un string de 10 caracteres, cada uno representa el cambio
        		
        		if len(codigo) < 10 or len(codigo) == 0:
        				return None
        		
        		num_string = str(numero)
        		cambio_0 = num_string.replace('0', codigo[0])
        		cambio_1 = cambio_0.replace('1', codigo[1])
        		...
        		cambio_9 = cambio_8.replace('9', codigo[9])
        		
        		return cambio_9
        
        ### con ciclos
        
        def encriptar_numero(numero, codigo):
        		if len(codigo) < 10:
        				return None
        		
        		mensaje = str(numero)
        		for cambio in range(10):
        				mensaje = mensaje.replace(str(cambio), codigo[cambio])
        		
        		return mensaje
        		
        def encriptar_numero(numero, codigo):
        		# numero int
        		# codigo es un string de 10 caracteres, cada uno representa el cambio
        		
        		if len(codigo) < 10 or len(codigo) == 0:
        				return None
        		
        		mensaje = ""
        		
        		num_string = str(numero)
        		for digito in num_string:
        				if digito.isdigit():
        						mensaje += codigo[int(digito)]
        				else:
        						mensaje += digito # caso que es el "."
        						
        		return mensaje
        ```
        
5. Validar dominio → manejo de strings + condicionales, tuplas y listas
    
    Trabajamos en una empresa que disponibiliza páginas web para todo el mundo. Nuestra tarea es chequear que el sitio web que quieren crear es válido. Como es una tarea muy repetitiva y rudimentaria, vamos a crear una función que resuelva nuestra tarea (y así evitar errores humanos).
    
    Se debe hacer una función que reciba el string con página web, código del país que lo va a hostear (por ejemplo: `ar` en caso de ser Argentina) , y una tupla con todos los sitios web ya creados anteriormente.
    
    Se debe validar que:
    
    - La página web no esté actualmente en uso
    - La página web debe comenzar con `www.`
    - La página web debe finalizar con `.com.<código del país que lo hostea>`
    - La página web no debe ser un string vacío, ni debe superar los 63 caracteres de largo.
    
    La función debe devolver una tupla con la página web y un listado de todos los errores encontrados (sin importar el orden). En caso que no haya ningún error la lista debe estar vacia.
    
    Por ejemplo, `validar_sitio_web_valido("mi-sitio-web.com.ar", "br", ("www.google.com"))` devuelve `('mi-sitio-web.com.ar', ['El sitio no comienza con www.', 'El sitio no finaliza con .com.br'])` .
    
    - Posible Solución
        
        ```python
        def validar_sitio_web_valido(sitio, pais, sitios_usados):
        		errores = []
        		if sitio in sitios_usados:
        				errores.append("El sitio ya esta siendo utilizado")
        		if "www." != sitio[:4]:
        				errores.append("El sitio no comienza con www.")
        		
        		if (".com." + pais) != sitio[-(4 + len(pais)):]:
        				errores.append(f"El sitio no finaliza con .com.{pais}")
        			
        		if 0 == len(sitio) or len(sitio) > 63:
        				errores.append(f"El sitio no tiene un largo valido")
        
        		return (sitio, errores)
        ```
        
6. Promoción en el bazar → while con múltiples condiciones + remove en listas
    
    Un bazar hacen una vez por mes una promoción donde las personas pueden armar un paquete de varias cosas a precio fijo, eligiendo de un cajón de opciones. Como cada vez les va mejor con esta promoción, quieren expandir y darla como opción en su página web.
    
    Nos piden que les generemos un programa donde le permita al usuario armar su paquete a partir de una lista de opciones que pueden elegir (que representa el cajón de opciones en su local) y una cantidad de opciones que pueden elegir de la lista. El programa debe dejar elegir opciones al usuario mientras que no haya completado la cantidad de opciones que debe elegir y mientras que aún quedan opciones disponibles en el cajón. Antes de elegir, siempre se le mostrará las opciones que tiene disponibles. En caso de elegir una opción que no esté disponible en el cajón se le debe mostrar un mensaje descriptivo y volver a darle la opción de elegir. El programa debe retornar el paquete solicitado por el usuario.
    
    Un ejemplo de ejecución del programa para las opciones en el cajón de `['palangana', 'termo 1L', 'termo 1L', 'plato vidrio', 'taza cerámica', 'taza cerámica gres']` y una cantidad de `3` . El programa debe retornar además `['taza cerámica', 'termo 1L', 'plato vidrio']`
    
    ```python
    ¡Armemos el paquete! 
    Podés elegir entre: ['palangana', 'termo 1L', 'termo 1L', 'plato vidrio', 'taza cerámica', 'ensaladera'] 
    ¿Qué querés agregar?: **taza cerámica** 
    Podes elegir entre: ['palangana', 'termo 1L', 'termo 1L', 'plato vidrio', 'ensaladera'] 
    ¿Qué querés agregar?: **termo 1L** 
    Podés elegir entre: ['palangana', 'termo 1L', 'plato vidrio', 'ensaladera'] 
    ¿Qué querés agregar?: **plato** 
    Ese nombre no está disponible, elija otro 
    Podés elegir entre: ['palangana', 'termo 1L', 'plato vidrio', 'ensaladera'] 
    ¿Qué querés agregar?: **plato vidrio** 
    Tu paquete quedó formado por ['taza ceramica', 'termo 1L', 'plato vidrio']
    ```
    
    ### Posible Solución
    
    ```python
    def elegir_regalos(lista_opciones, cantidad):
    	paquete = []
    	opciones_disponibles = lista_opciones
    	print("Armemos el paquete!")			
    	
    	print(f"Podes elegir entre: {opciones_disponibles }")
    	elegido = input("Que queres agregar?")	
    	
    	while len(paquete) < cantidad and len(opciones_disponibles) > 0:
    			if elegido in opciones_disponibles:
    					paquete.append(elegido)
    					opciones_disponibles.remove(elegido)
    			else:
    					print("Ese nombre no esta disponible, elija otro")
    			
    			print(f"Podes elegir entre: {opciones_disponibles}")
    			elegido = input("Que queres agregar?")	
    					
    	print(f"El paquete quedo formado por {paquete}")
    	return paquete
    ```