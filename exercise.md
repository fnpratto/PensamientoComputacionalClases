# 1. Pandas

Repaso:

- El uso de Google Colab
- Series y sus similitudes con Numpy o Python
- Dataframes:
    - Creación
    - Atributos y funciones básicas
    - Acceder a columnas
    - Acceder a filas
    - Métodos de modificación de dataframes (rename, insert, drop, etc)
    - Cómo filtrar un dataframe: condiciones y operadores lógicos (`and` es `&` y `or` es `|`)
    - `isnull` y `notnull`
    - Ordenar, contar y agrupar

## 2.1. Pandas Básico: Ejercicios a Resolver

<aside>
💡 Todos los ejercicios de la guía se encuentran resueltos en el siguiente documento:
https://colab.research.google.com/drive/1nwSi8ev5PnumY9PYNWbf7W4tqC_WwDOG

</aside>

### 6. Agregar la nueva columna al DataFrame con la información de la edad de los estudiantes para el año actual y mostrar el DataFrame resultante

```python
df["edad"] = 2024 - df["año_nac"]
df
```

### 8. Para los estudiantes que tienen edad mayor a 25, mostrar el promedio de edad.

```python
df[ df['edad'] > 25][['edad']].mean()
```

### 9. Mostrar a la persona que es más joven.

```python
df_ordenado = df.sort_values(by=['edad'])
df_ordenado.iloc[[0]]
```

### 12. Mostrar sólo los estudiantes que estudian Informática.

```python
df[ df['carrera'] == "Informática"]
```

### 14. Reemplazar `Informática` por `Informática o Sistemas` en la columna "carrera".

```python
df['carrera'] = df['carrera'].replace('Informática', 'Informática o Sistemas')
df
```

### 17. Para la primer estudiante, cambiar su carrera a "Electrónica".

```python
df.loc[0,'carrera'] = 'Electrónica'
df
```

### 19. Agregar una nueva columna 'tiene_mail', con un valor booleano que indique si la estudiante tiene mail en el sistema.

```python
df['tiene_mail'] = df['mail'].notnull()
df
```

### 21. Ordenar el dataFrame por carrera y apellido, en ese orden.

```python
df = df.sort_values(by=['carrera', 'apellido'])
df
```

### 22. Ordenar el dataFrame por carrera y edad. Carrera por forma ascendente, edad por forma descendente.

```python
df = df.sort_values(by=['carrera', 'apellido'], ascending=[True,False])
df
```

# 2. Pandas CSV:

### Ejercicio 1

> 
> 
> 
> Se tiene un archivo CSV llamado `futbol.csv` con información de jugadores de fútbol. El archivo tiene las columnas: nombre, equipo, posicion, goles, asistencias.
> 
> 1. Leer el archivo usando Pandas y mostrar las primeras 5 filas.
> 2. Mostrar la información del DataFrame (tipos de datos, cantidad de filas, etc.).
> 3. Guardar sólo los jugadores que tienen más de 10 goles en un nuevo archivo llamado `goleadores.csv`.

```jsx
import pandas as pd

# a. Leer y mostrar primeras 5 filas
df = pd.read_csv('futbol.csv')
df.head()

# b. Mostrar información del DataFrame
df.info()

# c. Guardar goleadores (más de 10 goles)
goleadores = df[df['goles'] > 10]
goleadores.to_csv('goleadores.csv', index=False)
```

### Ejercicio 2

> 
> 
> 
> Se tiene un archivo CSV llamado `compras_supermercado.csv`, donde se describen las compras realizadas por una empresa para el desayuno de sus empleados. El archivo tiene las columnas: fecha, producto, cantidad, precio_unitario.
> 
> 1. Leer el archivo y agregar una nueva columna `total` que indique el precio total que se tiene del producto, según la cantidad y el precio unitario.
> 2. Guardar el resultado en un nuevo archivo llamado `compras_con_total.csv`.
> 3. Calcular el gasto total de la compra e imprimirlo por pantalla.

```jsx
import pandas as pd

# a. Agregar columna total
df = pd.read_csv('compras_supermercado.csv')
df['total'] = df['cantidad'] * df['precio_unitario']

# b. Guardar con total
df.to_csv('compras_con_total.csv', index=False)

# c. Total por producto
total = df['total'].sum()
print(total)
```

### Ejercicio 5

> 
> 
> 
> Se tiene un archivo CSV con datos de temperaturas diarias de una ciudad. Las columnas son: fecha, temperatura_min, temperatura_max.
> 
> 1. Leer el archivo y agregar una columna con la temperatura promedio del día.
> 2. Encontrar el día con la temperatura máxima más alta y el día con la temperatura mínima más baja. Mostrar todos sus datos.
> 3. Guardar los días donde la temperatura promedio superó los 25 grados en un archivo llamado `dias_calurosos.csv`

```jsx
import pandas as pd

df = pd.read_csv('temperaturas.csv')

# a. Agregar temperatura promedio
df['temperatura_promedio'] = (df['temperatura_min'] + df['temperatura_max']) / 2

# b. Días extremos
dia_max_calor = df[df['temperatura_max'] == df['temperatura_max'].max()]
dia_max_frio = df[df['temperatura_min'] == df['temperatura_min'].min()]

# c. Guardar días calurosos
calurosos = df[df['temperatura_promedio'] > 25]
calurosos.to_csv('dias_calurosos.csv', index=False)
```

### Ejercicio 6

> 
> 
> 
> **Desafío** (obligatorio): Una empresa de cine quiere analizar sus datos de venta de entradas por película de un sábado por la noche. Se tiene un archivo `cine.csv` con las columnas: pelicula, sala, fecha, horario, entradas_vendidas, precio_entrada. Las películas no se repiten.
> 
> 1. Leer el archivo y calcular los ingresos totales. Mostrarlos en pantalla.
> 2. Obtener la película más taquillera (la que más ingresos generó).
> 3. Encontrar las 5 peliculas que tuvieron más entradas vendidas, y mostrar su nombre y su sala.
> 4. Guardar los datos “pelicula, fecha, horario” por cada película, en un archivo llamado `historial_proyecciones_peliculas.csv`.

```jsx
import pandas as pd

df = pd.read_csv('cine.csv')

# Calcular ingresos por fila
df['ingresos'] = df['entradas_vendidas'] * df['precio_entrada']

# a. Ingresos totales
ingresos_totales = df['ingresos'].sum()
print(ingresos_totales)

# b. Película más taquillera
peliculas_mas_taquilleras = df[ df['ingresos'] == df['ingresos'].max()]

# c. Promedio de entradas por sala
df.sort_values(by="entradas_vendidas", ascending=False)
df.head(5)[["pelicula", "sala"]]

# d. Guardar resumen
df_copia = df.copy()
resumen = df_copia[['pelicula', 'fecha', 'horario']]

resumen.to_csv('historial_proyecciones_peliculas.csv', index=False)
```

### Ejercicio 7

> 
> 
> 
> La empresa yerbatera “La Hoja Verde” realiza controles de calidad diarios en sus lotes de producción. Cada lote es analizado para medir el **porcentaje de palo** (ramas) que contiene, ya que un exceso afecta la calidad del producto. La información se guarda en un archivo CSV con las columnas: **lote**, **fecha**, **porcentaje_palo**, **humedad**.
> 
> Los tres tipos de calidad son:
> 
> - **Premium**: menor a 15% palo
> - **Estándar**: entre 15% y 30% palo
> - **Baja**: mayor a 30% palo
> 
> Se pide:
> 
> 1. Filtrar los lotes por cada tipo de calidad y agregar a cada grupo una columna `calidad` con el valor correspondiente.
> 2. Mostrar los 3 lotes con mayor porcentaje de palo.
> 3. Mostrar solo los lotes de calidad Premium.
> 
> Ejemplo de archivo `control_calidad_yerba.csv`:
> 
> ```
> lote,fecha,porcentaje_palo,humedad
> Lote A,2026-02-19,12.5,9.8
> Lote B,2026-02-19,28.3,11.2
> Lote C,2026-02-20,8.2,10.5
> Lote D,2026-02-20,32.7,8.9
> Lote E,2026-02-21,18.4,9.3
> Lote F,2026-02-21,35.8,10.1
> ```
> 

```jsx
import pandas as pd                                                          

df = pd.read_csv('control_calidad_yerba.csv')

# a. Filtrar y agregar columna calidad a cada grupo
premium = df[df['porcentaje_palo'] < 15]
premium['calidad'] = 'Premium'

estandar = df[(df['porcentaje_palo'] >= 15) & (df['porcentaje_palo'] <= 30)]
estandar['calidad'] = 'Estándar'

baja = df[df['porcentaje_palo'] > 30]
baja['calidad'] = 'Baja'

# Pausa para ver resultados
df

# b. Top 3 con mayor porcentaje de palo
print("\nTop 3 con mayor porcentaje de palo:")
top3 = df.sort_values('porcentaje_palo', ascending=False).head(3)
print(top3)

# c. Lotes Premium (ya lo tenemos filtrado)
print("\nLotes Premium:")
print(premium)
```

# 3. Numpy

- Cómo importar una biblioteca
- Para qué sirve Numpy
- Qué son los arrays
- Distintas formas de crear un array
- Cómo crear una matriz
- Atributos y Funciones de un array
- Operaciones con arrays

<aside>
💡

Para todos los ejercicios se puede mostrar si se quiere cómo se hubiese resuelto en Python sin Numpy, y cómo se resuelve ahora usando Numpy. En algunos ejercicios la diferencia va a ser poca, en otros va a ser notoria (pasando de 10 líneas a 1, por ejemplo).

</aside>

### 2.1. Ejercicio 5

> Repetir el ejercicio 4.2.2 de la Guía 4:
> 
> 
> Escribir una función que reciba:
> a. Una lista y devuelva True si su longitud es par y False si su longitud es impar.
> b. Una lista de números cualesquiera y devuelva el elemento máximo y el mínimo.
> c. Una lista de números y devuelva otra lista con los mismos números ordenados de menor a mayor. Por ejemplo, si recibe [5, 10, 7, 3] debe devolver [3, 5, 7, 10].
> 
- ¿Cómo hubiese sido resolver en Python?
    
    ```python
    def longitud_es_par(lista):
      return len(lista) % 2 == 0
    
    def obtener_maximo_minimo(lista):
      return max(lista), min(lista)
    
    def ordenar_lista(lista):
      return sorted(lista)
    ```
    
- Posible Solución
    
    ```python
    import numpy as np
    
    def longitud_es_par(array):
        return array.size % 2 == 0
    
    def obtener_maximo_minimo(array):
        return np.max(array), np.min(array)
    
    def ordenar_lista(array):
        return np.sort(array)
    
    # Ejemplo de uso, no es parte del ejercicio
    lista = np.array([5, 10, 7, 3])
    print("Longitud par:", longitud_es_par(lista))
    print("Máximo y mínimo de la lista:", obtener_maximo_minimo(lista))
    print("Lista ordenada de menor a mayor:", ordenar_numeros(lista))
    ```
    

### 2.2. Ejercicio 6

> Repetir el ejercicio 4.2.6. de la Guía 4:
> 
> 
> Escribir una función que reciba dos vectores y devuelva su producto escalar.
> Si los vectores no tienen las mismas dimensiones, la función debe devolver None.
> 
- ¿Cómo hubiese sido resolver en Python?
    
    ```python
    def calcular_producto_escalar(vector1, vector2):
      if len(vector1) != len(vector1):
          return None
    
      suma = 0
      for i in range(len(vector1)):
        suma += vector1[i] * vector2[i]
      return suma
    ```
    
- Posible Solución
    
    ```python
    def calcular_producto_escalar(m1, m2):
    	"""Esta función recibe dos valores del tipo array de numpy"""
    	if m1.size != m2.size:
    		return None
    	return np.dot(m1,m2)
    
    ```
    

### 2.3. Ejercicio 7

> Repetir el ejercicio 4.2.11 de la Guía 4:
> 
> 
> Escribir una función que reciba una matriz y una tupla (fila, columna), y devuelva el valor ubicado en esa posición de la matriz. Ejemplo: si se recibe la matriz [[1, 2], [3, 4]] y la tupla (0, 1), debe devolver 2.
> 
- ¿Cómo hubiese sido resolver en Python?
    
    ```python
    def obtener_valor(matriz, posicion):
      fila, columna = posicion
      return matriz[fila][columna]
    ```
    
- Posible Solución
    
    ```python
    def obtener_valor(matriz, posicion):
      fila, columna = posicion
    	return matriz[fila, columna] # ya no están en corchetes separados
    ```
    

### 2.4. Ejercicio 8

> Repetir el ejercicio 4.2.15 de la Guía 4:
Desafio (obligatorio): Escribir una función que reciba un tamaño y devuelva una matriz con 1 en la diagonal principal y 0 en el resto. Ejemplo: si recibe 4, debe devolver la matriz identidad de tamaño 4x4.
> 
- ¿Cómo hubiese sido resolver en Python?
    
    ```python
    def obtener_matriz_identidad(tamaño):
      matriz = []
      for i in range(tamaño):
          fila = []
          for j in range(tamaño):
              if i == j:
                  fila.append(1)
              else:
                  fila.append(0)
          matriz.append(fila)
      return matriz
    ```
    
- Posible Solución
    
    ```python
    def obtener_matriz_identidad(tamaño):
      return np.eye(tamaño)
    ```
    

### 2.5. Ejercicio 9

> Repetir el ejercicio 4.2.16 de la Guía 4
Desafio (obligatorio): Escribir una función que reciba una matriz y devuelva su transpuesta. Ejemplo: si recibe la matriz [[1, 2, 3], [4, 5, 6]], debe devolver [[1, 4], [2, 5], [3, 6]].
> 
- ¿Cómo hubiese sido resolver en Python?
    
    ```python
    def calcular_transpuesta(matriz):
      filas = len(matriz)
      columnas = len(matriz[0])
      transpuesta = []
      for j in range(columnas):
          fila_transpuesta = []
          for i in range(filas):
              fila_transpuesta.append(matriz[i][j])
          transpuesta.append(fila_transpuesta)
      return transpuesta
    ```
    
- Posible Solución
    
    ```python
    def transponer_matriz(matriz):
      return np.transpose(matriz)
    ```
    

# 4. Matplotlib

Repaso:

- Tipos de gráficos: ¿para qué se suele usar cada uno?
- Creando un gráfico a partir de una lista de valores
    - Graficar con cada tipo de gráfico
- Creando un gráfico a partir de un array de numpy
- Creando un gráfico a partir de una columna de Pandas
- Grillas
- Gráficos múltiples con Numpy

## 3.1. Ejercicios a Resolver

<aside>
💡 Todos los ejercicios de la guía se encuentran resueltos en el siguiente documento:
https://colab.research.google.com/drive/1ALk9YsajJyk1pvvkvoyk1m7bk_T-8ApQ?usp=sharing

</aside>

### 1. a y b
Graficar las funciones obtenidas en el ejercicio 3 de Numpy, usando los números del 1 al 100 del eje x.

```python
# Valores para eje x
x = np.linspace(1, 100, 1000)

# funciones
y1 = x**2
y2 = 3*x + 2
y3 = 1 / x
y4 = np.log10(x)

# Crear el gráfico
plt.figure()

# Graficar cada función
plt.plot(x, y1, label='y = x^2')
plt.plot(x, y2, label='y = 3x + 2')
plt.plot(x, y3, label='y = 1/(x+1)')
plt.plot(x, y4, label='y = log10(x)')

plt.title('Gráfico de funciones')
plt.xlabel('x')
plt.ylabel('y')
plt.legend()
plt.grid()

plt.show()
```

La función `1/x` no se ve, porque con valores de `x` mayores a `1`, la función decrece en vez de crecer, y se acerca al cero.

Esto significa que si los gráficos a mostrar no son de comportamientos similares, puede que no se grafiquen correctamente.

### 3. a
Graficar las ventas en función de los años usando gráfico de línea y gráfico de barras. ¿Cuál te parece que es mejor para este caso?

```python
# Gráfico de línea
fig, ax = plt.subplots()

ax.plot(años, ventas)
ax.set_title('Ventas en función de los años (Gráfico de línea)')
ax.set_xlabel('Años')
ax.set_ylabel('Ventas')
ax.set_xticks(años)
ax.grid()
plt.show()

# Acá se puede ver la diferencia entre usar 'subplots' (requiere trabajar sobre "ax") y 'figure' (trabajamos todo con "plt")

# Gráfico de barras horizontal
plt.figure()
plt.barh(años, ventas)
plt.title('Ventas en función de los años (Gráfico de barras)')
plt.xlabel('Años')
plt.ylabel('Ventas')
plt.grid()
plt.show()
```

### 4. a
Realiza un gráfico de barras horizontales que muestre la cantidad de habitantes por jurisdicción. Las provincias con mayor población, deben ubicarse en la parte superior.

```python
# Parte a

# Ordenar el DataFrame por población
df_sorted_population = df.sort_values(by='Población (hab)')

# Crear el gráfico de barras horizontales
fig, ax = plt.subplots()
plt.barh(df_sorted_population['Jurisdicción'], df_sorted_population['Población (hab)'])

ax.set_title('Cantidad de habitantes por jurisdicción')
ax.set_xlabel('Población (hab)')
ax.set_ylabel('Jurisdicción')

ax.grid()

plt.show()
```

### 5. 
Ejercicio de Energía potencial elástica

```python
import numpy as np
import matplotlib.pyplot as plt

x = np.arange(0,10,0.5)
k = 0.15 # Seteo un valor de k
Ep = k*(x**2)/2 # Energia potencial elástica 

fig, ax = plt.subplots()
ax.plot(x,Ep,label="k=0.15 [N/m]")

ax.set_title('Energía potencial elástica')
ax.set_xlabel('Longitud(m)')
ax.set_ylabel('Energía (J)')
ax.legend()
ax.grid()

plt.show()
```

# 5. Análisis de Código

### **Ejercicio 1: Comparación string vs int en Pandas**

**Código con errores:**

```python
import pandas as pd

def devolver_mayores_20(archivo):
    df = pd.read_csv(archivo)
    mayores = df[df[1] > '20']
    print(mayores)

```

**Errores identificados:**

1. Se accede a la columna con `df[1]` (índice numérico) en vez de `df['edad']` (nombre)
2. Se compara con el string `'20'` en vez del número `20`
3. Usa `print` en vez de `return`

**Código corregido:**

```python
import pandas as pd

def devolver_mayores_20(archivo):
    df = pd.read_csv(archivo)
    mayores = df[df['edad'] > 20]
    return mayores

```

---

### **Ejercicio 2: Uso ineficiente de NumPy**

**Código con errores:**

```python
import numpy as np

datos = [10, 20, 30, 40, 50]
array = np.array(datos)
for d in array:
    suma += d
    cant += d

return suma / cant

```

**Errores identificados:**

1. Falta la firma de la función
2. Las variables `suma` y `cant` no están inicializadas
3. `cant += d` debería ser `cant += 1`
4. No se aprovecha NumPy (tiene función `mean()`)
5. Usa `return` fuera de una función

**Código corregido:**

```python
import numpy as np

def calcular_promedio(datos):
    array = np.array(datos)
    return array.mean()

# O si se quiere hacer manualmente:
def calcular_promedio_manual(datos):
    array = np.array(datos)
    suma = 0
    cant = 0
    for d in array:
        suma += d
        cant += 1
    return suma / cant

```

---

### **Ejercicio 3: Error al agregar columna calculada**

**Código con errores:**

```python
import pandas as pd

data = {
    'producto': ['Manzana', 'Banana', 'Naranja'],
    'precio': [100, 80, 120],
    'cantidad': [5, 10, 3]
}
df = pd.DataFrame(data)

df = df[ df['precio'] * df['cantidad'] ]
print(df)

```

**Errores identificados:**

1. La sintaxis `df[ expresión ]` se usa para filtrar, no para agregar columnas
2. Para agregar una columna se usa `df['nueva_columna'] = expresión`

**Código corregido:**

```python
import pandas as pd

data = {
    'producto': ['Manzana', 'Banana', 'Naranja'],
    'precio': [100, 80, 120],
    'cantidad': [5, 10, 3]
}
df = pd.DataFrame(data)

df['total'] = df['precio'] * df['cantidad']
print(df)

```

### Ejercicio 4: Codigo con Errores

```python
import pandas as pd

    def analizar_control_calidad(archivo):
        df = pd.read_csv(archivo)
        
        yogures = df[df['producto'] == 'yogur']
        yogures_validos = yogures[yogures['volumen_ml'].notnull()]
        total_volumen = yogures_validos[ yogures_validos['volumen_ml'].sum()] # acá esta "filtrando" pero deberia solo obtener la suma. El par de corchetes externo no está bien
        
        # Acá sí debería estar filtrando, pero no lo hace.
        completos = df['volumen_ml'].notnull() & df['temperatura_c'].notnull()
        cant_completos = len(completos)
        
        aptos = df[df['estado'] == 'aprobado']
        cant_aptos = len(aptos)
        
        total = len(df)
        cant_incompletos = total - cant_completos
        porcentaje_incompletos_del_total = (cant_incompletos / cant_completos) * 100 # el calculo es erroneo: deberia ser incompletos / totales, no incompletos / completos
        
        lote_observado = porcentaje_incompletos_del_total >= 30
        
        resumen = {
            'concepto': [
                'Volumen total yogur',
                'Registros totales',
                'Registros completos',
                'Lotes aptos',
                'Porcentaje incompletos',
                'Lote observado'
            ],
            'valor': [
                total_volumen,
                total,
                cant_completos,
                cant_aptos,
                f"{porcentaje_incompletos_del_total:.0f}%",
                lote_observado
            ]
        }
        
        df_resumen = pd.DataFrame(resumen)
        df_resumen.to_csv('control_calidad.csv', index=False)
        print("Reporte generado exitosamente: control_calidad.csv")
```

### **Posible explicacion y enunciado**

**Control de Calidad en Línea de Envasado**

En una planta envasadora de lácteos, necesitan monitorear la calidad del proceso de llenado de yogur. Cada lote de producción genera un archivo CSV con los controles realizados durante el día. Algunas mediciones pueden faltar por errores en los sensores.

El archivo contiene las columnas: **producto**, **lote**, **volumen_ml**, **temperatura_c**, **estado**. Se pide implementar un programa que:

a. Calcule el volumen total envasado (solo de productos tipo "yogur").

b. Cuente los registros completos (aquellos donde `volumen_ml` y `temperatura_c` no están vacíos).

c. Cuente los lotes "aptos" (donde `estado` es "aprobado").

d. Calcule el porcentaje de registros incompletos.

e. Determine si el lote es "observado" (si el porcentaje de incompletos es mayor o igual a 30%).

f. Guarde un resumen en `control_calidad.csv`.

**Ejemplo de archivo `15-10-2024.csv`:**

text

```
producto,lote,volumen_ml,temperatura_c,estado
yogur,L123,200,4.5,aprobado
leche,L124,,4.2,aprobado
yogur,L125,200,,rechazado
yogur,L125,200,4.8,aprobado
leche,L126,1000,3.9,aprobado
yogur,L127,200,4.1,
```

**Ejemplo de salida `control_calidad.csv`:**

text

```
concepto,valor
Volumen total yogur,600
Registros totales,6
Registros completos,3
Lotes aptos,4
Porcentaje incompletos,50%
Lote observado,True
```


Ejercicios recomendados de la guia
Pandas Básico: 6, 8, 9, 12, 14, 17, 19, 21, 22
Pandas CSV: 1, 2, 5, 6, 7
Evaluación de Código: 1, 3

Numpy: 5, 6, 7, 8, 9
Evaluación de Código: 2, 4

Matplotlib: 1, 3, 4, 5

Guia unidad 6: 
Guía 6: Bibliotecas de Python
1. Pandas
Nota
Para estos ejercicios, recomendamos usar Google Colab (ver apunte) y tener una celda por ejercicio.

1.1. Operaciones Básicas con DataFrames
Nos contratan para hacer un nuevo sistema de FIUBA para almacenar información de sus estudiantes.

Usando el siguiente DataFrame:

import pandas as pd
data = {
    'nombre': ['Violeta', 'Carla', 'Manuela', 'Lucia', 'Emilia', 'Mariana', 'Aldo'],
    'apellido': ['Perez', 'Guanca', 'Gomez', 'Capon', 'Duzac', 'Szischik', 'Rastrelli'],
    'dni': [42000000, 42001001, 42002002, 37010020, 40001002, 38090080, 38111222],
    'año_nac': [1997, 1998, 1998, 1993, 2003, 1993, 1994],
    'mail': ['vp@fi.uba.ar', 'cg@fi.uba.ar', None, None, None, 'ms@fi.uba.ar', 'ar@fi.uba.ar'],
    'carrera': ['Informática', 'Mecánica', 'Química', 'Informática', 'Informática', 'Electrónica', 'Informática']
}

df = pd.DataFrame(data)
df

nombre	apellido	dni	año_nac	mail	carrera
0	Violeta	Perez	42000000	1997	vp@fi.uba.ar	Informática
1	Carla	Guanca	42001001	1998	cg@fi.uba.ar	Mecánica
2	Manuela	Gomez	42002002	1998	NaN	Química
3	Lucia	Capon	37010020	1993	NaN	Informática
4	Emilia	Duzac	40001002	2003	NaN	Informática
5	Mariana	Szischik	38090080	1993	ms@fi.uba.ar	Electrónica
6	Aldo	Rastrelli	38111222	1994	ar@fi.uba.ar	Informática
Mostrar el resumen de la información del DataFrame

Mostrar su forma

Mostrar la lista de los nombres de las columnas

Mostrar las primeras 3 filas

Mostrar las últimas 3 filas

Agregar la nueva columna al DataFrame con la información de la edad de los estudiantes para el año actual y mostrar el DataFrame resultante

Mostrar a los estudiantes que tienen edad mayor a 25.

Para los estudiantes que tienen edad mayor a 25, mostrar el promedio de edad.

Mostrar a la persona que es más joven.

Mostrar a la persona que se encuentra en la mitad de la tabla.

Mostrar sólo las columnas: “carrera” y “edad”.

Mostrar sólo los estudiantes que estudian Informática.

Mostrar sólo los estudiantes que estudian informática y tienen menos de 25 años.

Reemplazar Informática por Informática o Sistemas en la columna “carrera”.

Mostrar la cantidad de estudiantes por carrera.

Renombrar la columna “carrera” por “ingeniería”.

Para la primer estudiante, cambiar su carrera a “Electrónica”.

Agregar una nueva fila al DataFrame con tus datos.

Agregar una nueva columna ‘tiene_mail’, con un valor booleano que indique si la estudiante tiene mail en el sistema.

Agregar una nueva columna, con un valor booleano que indique si a la estudiante se le necesita pedir un mail (sólo se le tiene que pedir un mail si no tiene mail asignado). Asumir que todavía no se tiene la columna ‘tiene_mail’.

Ordenar el dataFrame por carrera y apellido, en ese orden.

Ordenar el dataFrame por carrera y edad. Carrera por forma ascendente, edad por forma descendente.

La profesora Llamell guarda las notas del parcial de Pensamiento Computacional en un dataFrame. Cada fila tiene la siguiente información: nombre, apellido, intento, nota.
Los intentos pueden ser 1 (si es la primera vez que rinde el parcial) o 2 (si está en el recuperatorio).

Obtener el promedio de las notas en la primera oportunidad de los alumnos.
Nota: Este ejercicio ya fue resuelto en la Guía 4 de Diccionarios, es el 4.3.11.
data = {
    'nombre': ['Violeta', 'Carla', 'Manuela'],
    'apellido': ['Perez', 'Guanca', 'Gomez'],
    'dni': [42000000, 42001001, 42002002],
    'carrera': ['Informática', 'Mecánica', 'Química'],
    'nota': [7, 4, 6],
    'intento': [1, 2, 1]
}

df_notas = pd.DataFrame(data)
df_notas

nombre	apellido	dni	carrera	nota	intento
0	Violeta	Perez	42000000	Informática	7	1
1	Carla	Guanca	42001001	Mecánica	4	2
2	Manuela	Gomez	42002002	Química	6	1
Rosita tiene un dataFrame donde guarda todas las películas que vió. La información para cada una es: el nombre de la película, año en que salió, y la puntuación que le puso del 1 al 10. Obtener sólo las películas que tienen puntaje mayor a 7. Nota: este ejercicio ya fue resuelto en la Guía 4 de Diccionarios, es el 4.3.10.
data = {
    'nombre': ['Harry Potter', 'El Señor de los Anillos', 'Barbie', 'Rapido y Furioso 18'],
    'año': [2001, 2003, 1972, 2040],
    'puntuacion': [8, 9, 8, 3]
}

df_pelis = pd.DataFrame(data)
df_pelis
1.2. Lectura y Escritura de Archivos CSV
Se tiene un archivo CSV llamado futbol.csv con información de jugadores de fútbol. El archivo tiene las columnas: nombre, equipo, posicion, goles, asistencias.

Leer el archivo usando Pandas y mostrar las primeras 5 filas.
Mostrar la información del DataFrame (tipos de datos, cantidad de filas, etc.).
Guardar sólo los jugadores que tienen más de 10 goles en un nuevo archivo llamado goleadores.csv.
Se tiene un archivo CSV llamado compras_supermercado.csv, donde se describen las compras realizadas por una empresa para el desayuno de sus empleados. El archivo tiene las columnas: fecha, producto, cantidad, precio_unitario.

Leer el archivo y agregar una nueva columna total que indique el precio total que se tiene del producto, según la cantidad y el precio unitario.
Guardar el resultado en un nuevo archivo llamado compras_con_total.csv.
Calcular el gasto total de la compra e imprimirlo por pantalla.
Se tiene un archivo CSV que contiene información sobre el stock de una librería. Un posible ejemplo de este archivo es el siguiente:

    lapiceras;34512;50;120
    cuadernos;41611;500;130
    sacapuntas;62812;30;210

Donde cada línea representa un prod y contiene el nombre del producto, el código de barras, la cantidad en stock y el precio unitario. Hacer una función que reciba la ruta del archivo y le solicite al usuario datos de un nuevo producto y lo agregue al final del archivo. Debe seguir pidiéndole al usuario datos de productos hasta que este ingrese como producto “X”. Hacer una función que reciba la ruta del archivo y realice lo pedido. Considerar que el archivo podría no existir. En ese caso, retornar.

Se tiene un archivo CSV llamado peliculas.csv con las columnas: titulo, año, genero, calificacion.

Leer el archivo y filtrar sólo las películas con calificación mayor a 7.
Calcular el promedio de calificación de todas las peliculas.
Guardar las películas de género “Acción” en un archivo llamado peliculas_accion.csv.
Se tiene un archivo CSV con datos de temperaturas diarias de una ciudad. Las columnas son: fecha, temperatura_min, temperatura_max.

Leer el archivo y agregar una columna con la temperatura promedio del día.
Encontrar el día con la temperatura máxima más alta y el día con la temperatura mínima más baja. Mostrar todos sus datos.
Guardar los días donde la temperatura promedio superó los 25 grados en un archivo llamado dias_calurosos.csv.
Desafío (obligatorio): Una empresa de cine quiere analizar sus datos de venta de entradas por película de un sábado por la noche. Se tiene un archivo cine.csv con las columnas: pelicula, sala, fecha, horario, entradas_vendidas, precio_entrada. Las películas no se repiten.

Leer el archivo y calcular los ingresos totales. Mostrarlos en pantalla.
Obtener la película más taquillera (la que más ingresos generó).
Encontrar las 5 peliculas que tuvieron más entradas vendidas, y mostrar su nombre y su sala.
Guardar los datos “pelicula, fecha, horario” por cada película, en un archivo llamado historial_proyecciones_peliculas.csv.
La empresa yerbatera “La Hoja Verde” realiza controles de calidad diarios en sus lotes de producción. Cada lote es analizado para medir el porcentaje de palo (ramas) que contiene, ya que un exceso afecta la calidad del producto. La información se guarda en un archivo CSV con las columnas: lote, fecha, porcentaje_palo, humedad.

Los tres tipos de calidad son:

Premium: menor a 15% palo
Estándar: entre 15% y 30% palo
Baja: mayor a 30% palo
Se pide:

Filtrar los lotes por cada tipo de calidad y agregar a cada grupo una columna calidad con el valor correspondiente.
Mostrar los 3 lotes con mayor porcentaje de palo.
Mostrar solo los lotes de calidad Premium.
Ejemplo de archivo control_calidad_yerba.csv:

lote,fecha,porcentaje_palo,humedad
Lote A,2026-02-19,12.5,9.8
Lote B,2026-02-19,28.3,11.2
Lote C,2026-02-20,8.2,10.5
Lote D,2026-02-20,32.7,8.9
Lote E,2026-02-21,18.4,9.3
Lote F,2026-02-21,35.8,10.1
La empresa de logística “Rapiflash” necesita analizar el cumplimiento de sus rutas de entrega. Cada vehículo tiene un archivo CSV con su registro de entregas, donde cada línea contiene: direccion, minutos_planificados, minutos_reales. Se considera un incumplimiento cuando un vehículo llega a una dirección con más de 5 minutos de diferencia respecto a lo planificado (ya sea adelantado o atrasado).

Se pide implementar un programa que:

Reciba una lista con las rutas de archivos de varios vehículos.
Para cada archivo, calcular la diferencia entre minutos reales y planificados, y contar los incumplimientos.
Si un archivo no existe, mostrar un mensaje de error y continuar con el siguiente.
Guardar en un archivo resumen_entregas.csv el nombre del archivo y la cantidad de incumplimientos.
Considerar que los archivos podrían no existir. En ese caso, imprimir un mensaje descriptivo y avanzar con el siguiente.

Ejemplo de archivo vehiculo_34.csv:

direccion,minutos_planificados,minutos_reales
Av. San Martín 123,156,158
Lavalle 456,206,198
Sarmiento 789,209,209
Belgrano 321,244,260
Ejemplo de uso:

archivos = ["vehiculo_34.csv", "vehiculo_12.csv", "vehiculo_78.csv"]

Ejemplo de salida resumen_entregas.csv:

archivo,incumplimientos
vehiculo_34.csv,2
vehiculo_12.csv,1
vehiculo_78.csv,0
(En el ejemplo, vehículo 34 tiene 2 incumplimientos: Lavalle con 8 min de diferencia y Belgrano con 16 min)

En una fábrica de alimentos detectaron que las planillas diarias de producción tienen datos faltantes, causando problemas con los envíos. La Ingeniera de planta decide analizar qué tan confiables son estos registros.

Cada día se genera una planilla CSV con las columnas: operacion, codigo, unidades, tiempo, observaciones. Algunas celdas pueden estar vacías (datos faltantes).

Se pide implementar un programa que:

Calcule el total de unidades producidas (solo operaciones de tipo “produccion”).
Cuente los registros válidos (aquellos donde unidades y tiempo no están vacíos).
Cuente las operaciones “ordenadas” (donde observaciones es “-”).
Calcule el porcentaje de registros inválidos.
Determine si los datos son “sucios” (si el porcentaje de inválidos es mayor o igual a 50%).
Guarde un resumen en reporte_produccion.csv.
Ejemplo de archivo 05-09-2024.csv:

operacion,codigo,unidades,tiempo,observaciones
produccion,JG30,50,20,-
envio,HP45,,15.05,-
produccion,FRE54,100,,revisión
envio,FRE54,100,105.70,-
produccion,Hy78,40,8,-
Ejemplo de salida reporte_produccion.csv:

concepto,valor
Total unidades producidas,190
Operaciones totales,5
Operaciones válidas,3
Operaciones ordenadas,4
Porcentaje inválidos,40%
Datos sucios,False
La organización “Bibliotecas Abiertas” lleva un registro mensual de voluntarios. Cada archivo CSV mensual contiene: nombre, apellido, dni, horas_donadas. El campo horas_donadas puede estar vacío si hubo errores de carga.

Se pide implementar una función que reciba una lista de archivos mensuales y:

Calcule la suma total de horas donadas (solo registros válidos).
Cuente la cantidad total de registros y la cantidad de registros válidos.
Calcule el porcentaje de registros sin errores.
Guarde en errores.csv los registros con datos faltantes para revisión manual.
Guarde las estadísticas en estadisticas_voluntarios.csv.
Considerar que algunos archivos podrían no existir. En ese caso, mostrar un mensaje de error y continuar con el siguiente.

Ejemplo de archivo 08_2025.csv:

nombre,apellido,dni,horas_donadas
Lucía,López,22334455,8.0
Marcos,Pérez,39800222,12.5
Ana,Gómez,18900222,
Laura,Sosa,41111222,10.0
Roberto,Medina,35000888,
Sofía,Luna,29999999,15.8
Ejemplo de salida estadisticas_voluntarios.csv:

concepto,valor
suma_horas,46.3
registros_totales,6
registros_validos,4
porcentaje_sin_errores,66.7%
Ejemplo de salida errores.csv:

nombre,apellido,dni,horas_donadas
Ana,Gómez,18900222,
Roberto,Medina,35000888,
2. Numpy
Crear un array de 20 números espaciados uniformemente entre 0 y 10. Luego, imprimir:

La dimensión
La forma
El tamaño
Crear un array llamado “arr” con números enteros del 0 al 9. Luego:

Cambiar su forma de manera tal que tenga 2 filas y 5 columnas
Insertar el valor 100 en la posición 3.
Para el array x = np.arange(10), calcular:

y = x^2
y = 3x + 2
y = 1/(x+1)
y = log10(x)
Usando el array y = 1/(x+1) del ejercicio anterior:

Calcular la media de y.
Calcular la diferencia entre y y su media
Repetir el ejercicio 4.2.2 de la Guía 4:

Escribir una función que reciba:
Una lista y devuelva True si su longitud es par y False si su longitud es impar.
Una lista de números cualesquiera y devuelva el elemento máximo y el mínimo.
Una lista de números y devuelva otra lista con los mismos números ordenados de menor a mayor. Por ejemplo, si recibe [5, 10, 7, 3] debe devolver [3, 5, 7, 10].
Repetir el ejercicio 4.2.6. de la Guía 4:

Escribir una función que reciba dos vectores y devuelva su prod_escalar. El prod_escalar se calcula como: Siendo 𝑣⁢1 =(𝑣⁢11,𝑣⁢12,...,𝑣⁢1𝑛) y 𝑣⁢2 =(𝑣⁢21,𝑣⁢22,...,𝑣⁢2𝑛), entonces
𝑣⁢1⋅𝑣⁢2=(𝑣⁢11⋅𝑣⁢21)+(𝑣⁢12⋅𝑣⁢22)+...+(𝑣⁢1𝑛⋅𝑣⁢2𝑛)
Si los vectores no tienen las mismas dimensiones, la función debe devolver None.

Repetir el ejercicio 4.2.11 de la Guía 4:

Escribir una función que reciba una matriz y una tupla (fila, columna), y devuelva el valor ubicado en esa posición de la matriz. Ejemplo: si se recibe la matriz [[1, 2], [3, 4]] y la tupla (0, 1), debe devolver 2.

Repetir el ejercicio 4.2.15 de la Guía 4:

Desafio (obligatorio): Escribir una función que reciba un tamaño y devuelva una matriz con 1 en la diagonal principal y 0 en el resto. Ejemplo: si recibe 4, debe devolver la matriz identidad de tamaño 4x4.
⎡
⎢
⎢
⎢
⎢
⎣
1	0	0	0
0	1	0	0
0	0	1	0
0	0	0	1
 
⎤
⎥
⎥
⎥
⎥
⎦

Repetir el ejercicio 4.2.16 de la Guía 4:

Desafio (obligatorio): Escribir una función que reciba una matriz y devuelva su transpuesta. Ejemplo: si recibe la matriz [[1, 2, 3], [4, 5, 6]], debe devolver [[1, 4], [2, 5], [3, 6]]. Si se recibe:
[ 
1	2	3
4	5	6
 ]

Se debe devolver:
⎡
⎢
⎢
⎣
1	4
2	5
3	6
 
⎤
⎥
⎥
⎦


Una persona quiere cercar el frente de su casa con alambre. Los postes se deben poner a 1 metro de distancia como mínimo entre sí. Hacer una función que reciba un número entero que sea la cantidad de metros a cubrir, y devuelva un array con la posición de los postes necesarios. Por ejemplo, si se reciben 5 metros, debe devolver: [0.   1.25   2.5   3.75   5.]

Se va a realizar un concierto gratis en el Jardín Japonés, para lo cual se habilitó la reserva de asientos por internet. Por un error, las reservas se hicieron en una lista de 50 asientos, guardando el número de reserva si está ocupado o 0 sino: [1,2,3,0,7,6,4,0,0,8,9, ...].
Los asientos en el Jardín Japonés se van a organizar en forma de matriz, teniendo 5 filas de 10 asientos cada uno. Se quiere transformar la lista de asientos en una matriz. Hacer una función que reciba la lista de asientos y devuelva la matriz de asientos organizada por filas.

Ejemplo: Si se recibe [1,2,3,0,7,6,4,0,0,8,9,10,0,13,11,12], se debe devolver: [[1,2,3,0,7,6,4,0,0,8],[9,10,0,13,11,12]].

Desafio (no obligatorio): Se tiene una matriz de 10x10 que representa un tablero de Batalla Naval. Cada celda contiene un 0 si está vacía, o un 1 si no. Se pide hacer una función que cree un tablero con 10 barcos ubicados aleatoriamente (usar la biblioteca random).

Luego, se debe hacer una función que reciba la matriz y permita al usuario intentar adivinar dónde están.
Pista: se puede extender/modificar el Super Desafio (no obligatorio) de Batalla Naval de la Guía 4.
3. Matplotlib
Graficar las funciones obtenidas en el ejercicio 3 de Numpy, usando los números del 1 al 100 del eje x. Hacerlo primero en distintos gráficos y luego las 4 en el mismo.

y = x^2
y = 3x + 2
y = 1/(x+1)
y = log10(x)
¿Hay alguna función que no se esté viendo correctamente en el gráfico? Tratar de entender por qué y graficarla en otro gráfico. Pista: mirar los valores que toma la función en el eje y.
Usando Numpy: Siendo x un conjunto de 1000 valores de 0 a 2 * pi separados de forma uniforme:

Graficar, con grilla, título y referencias apropiadas, la función seno de x (sin(x)).
Graficar, con grilla, título y referencias apropiadas, la función coseno de x (cos(x)).
Graficar, con grilla, título y referencias apropiadas, la función (seno de x) + x/2.
Se tienen los siguientes datos de ventas de un prod_en los últimos 10 años:

import matplotlib.pyplot as plt
import numpy as np

años = np.arange(2012, 2022)

ventas = [140, 60, 120, 250, 200, 180, 100, 300, 120, 160]
ganancias = [14000, 45000, 20400, 100000, 50000, 25000, 100000, 30000, 15000, 35000]
productos = ["prod_1", "prod_2", "prod_3", "prod_4", "prod_5", "prod_6", "prod_7", "prod_8", "prod_9", "prod_10"]
cant_ventas_productos_2024 = [180, 160, 190, 140, 100, 200, 120, 130, 150, 170]

En gráficos separados:

Graficar las ventas en función de los años usando gráfico de línea y gráfico de barras horizontal. ¿Cuál te parece que es mejor para este caso?
Graficar las ganancias en función de los años usando gráfico de línea y gráfico de barras. ¿Cuál te parece que es el mejor gráfico para este caso?
Graficar la cantidad de ventas en el año 2024 en función de los productos usando gráfico de barras y gráfico de torta. ¿Cuál te parece que es el mejor gráfico para este caso?
Usando el siguiente dataframe:

data = {
    'Jurisdicción': [
        'Ciudad Autónoma de Buenos Aires', 'Buenos Aires', 'Catamarca', 'Chaco', 'Chubut',
        'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja',
        'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis',
        'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego, Antártida e Islas del Atlántico Sur',
        'Tucumán'
    ],
    'Capital': [
        '', 'La Plata', 'San Fernando del Valle de Catamarca', 'Resistencia', 'Rawson',
        'Córdoba', 'Corrientes', 'Paraná', 'Formosa', 'San Salvador de Jujuy', 'Santa Rosa', 'La Rioja',
        'Mendoza', 'Posadas', 'Neuquén', 'Viedma', 'Salta', 'San Juan', 'San Luis',
        'Río Gallegos', 'Santa Fe', 'Santiago del Estero', 'Ushuaia', 'San Miguel de Tucumán'
    ],
    'Población (hab)': [
        3075646, 17541141, 415438, 1204541, 618994, 3760450, 1120801, 1385961,
        605193, 770881, 358428, 393531, 1990338, 1261294, 664057, 747610,
        1424397, 781217, 508328, 365698, 3536418, 978313, 173715, 1694656
    ],
    'Superficie (km2)': [
        205.9, 305907.4, 101486.1, 99763.3, 224302.3, 164707.8, 89123.3, 78383.7,
        75488.3, 53244.2, 143492.5, 91493.7, 149069.2, 29911.4, 94422, 202168.6,
        155340.5, 88296.2, 75347.1, 244457.5, 133249.1, 136934.3, 910324.4, 22592.1
    ],
    'PBI': [
        154863803.5, 292689868, 6150949.159, 9832642.672, 17747854.21, 69363739.19,
        7968012.982, 20743409.1, 3807057.419, 6484938.334, 6990262.458, 5590515.628,
        33431369.11, 9646825.835, 22564106.16, 10264584.42, 13438834.91, 8262308.568,
        11780849.36, 11663738.04, 81588690.27, 8387858.731, 7049276.383, 13856198.9
    ],
}

df = pd.DataFrame(data)
df.head()

Realizar un gráfico de barras horizontales que muestre la cantidad de habitantes por jurisdicción. Las provincias con mayor población, deben ubicarse en la parte superior.
Realizar un gráfico de torta que muestre el porcentaje de superficie de cada región del país.
Realizar un gráfico de barras verticales que muestre el PBI de cada jurisdicción. Las provincias con mayor PBI, deben ubicarse a la derecha.
Realizar un gráfico de puntos que muestre la relación entre la población y la superficie de cada jurisdicción. ¿Qué conclusión se puede tomar respecto al gráfico obtenido? ¿Hay alguna excepción? De ser así, analice cuál, incluyendo también un análisis de los gráficos anteriores.
Notadatos.gob.ar
¿Sabías que en Argentina hay un portal de datos abiertos?
Podés ingresar a datos.gob.ar y obtener información de diferentes áreas, como salud, educación, justicia, entre otras. ¡Es una excelente fuente de datos para hacer análisis!
Para usarlos, podés guardar el archivo csv en google drive e importarlo de la siguiente forma como un dataframe:

import pandas as pd

# Acá va el link público de tu archivo de google drive + '/export?format=csv'
url = "https://drive.google.com/drive/folders/ABC123XYZ456/export?format=csv"
df = pd.read_csv(url)

Para calcular la energía potencial elástica (Ep) almacenada en un material elástico, se utiliza la siguiente fórmula:

𝐸⁢𝑝=
1
2
 
∗𝑘∗𝑥2

donde k es la constante elástica (con unidad N/m) y x es la distancia que el resorte se estira o comprime (metros). La energía Ep resultante tiene como unidad el Joule (J).

Para un resorte con valor 𝑘 =0.15⁢𝑁/𝑚, graficar en línea continua la energía potencial elástica 𝐸⁢𝑝 en un rango de distancia 𝑥 de 0 a 10m con pasos de 0.5. Incluir título, grilla, nombres de ejes y label (leyenda) con el valor de 𝑘.

Para calcular la posición final de un móvil dada una posición inicial, velocidad inicial, tiempo y aceleración, se tiene la siguiente fórmula:

𝑥=𝑥0+𝑣0.𝑡+
1
2
 
.𝑎.𝑡2

Donde 𝑥0 es la posición inicial, 𝑣0 la velocidad inicial, 𝑡 el tiempo y 𝑎 la aceleración.

Se tiene la siguiente información de dos móviles:

movil 1:

Comienza a 0m
Arranca desde el reposo con velocidad 0 𝑚/𝑠
Su aceleración es 1 𝑚/𝑠2
movil 2:

Comienza a 500m
Arranca con velocidad 4 𝑚/𝑠
Su aceleración es 0.5 𝑚/𝑠2
Para 5000 valores del tiempo del 0 al 100, mostrar un único gráfico con la posición respecto del tiempo de ambos móviles. Incluir grilla, títulos y label (leyenda) indicando el valor de la posicion inicial, velocidad y aceleración.

Desafio (obligatorio): Teniendo la planilla de notas del primer parcial del 1C2024 de los alumnos de la materia “Pensamiento Computacional”, importar los datos como dataframe usando el siguiente código:

import pandas as pd

url_sheet = "https://docs.google.com/spreadsheets/d/17ei_NER5i_R-9QLnkeIjNprzTyoSqGowJ8yrT9tbi_8/export?format=csv"
df = pd.read_csv(url_sheet)
df.head()

Si la nota es “NaN”, significa que el o la estudiante no rindió el examen.
En gráficos diferentes:

Realizar un gráfico de torta que muestre el porcentaje entre la cantidad de alumnos que asistieron al parcial y los que no.
Realizar un gráfico de barras que muestre la cantidad de alumnos que aprobaron y desaprobaron el parcial, sin contar a los ausentes.
Realizar un gráfico de puntos que muestre la relación entre el curso y la nota obtenida en el parcial. ¿Diría que existe una relación?
Evaluación de Código
Nota
En estos ejercicios se presenta código con errores, malas prácticas de programación o problemas de eficiencia. El objetivo es identificar los errores, explicar por qué fallan y proponer una corrección. Podés probar el código en tu entorno y, opcionalmente, consultar con herramientas de IA para verificar tu análisis.

La siguiente función intenta leer un archivo CSV y mostrar los estudiantes mayores de 20 años. El archivo tiene columnas: nombre, edad, carrera. Identificá el problema y corregilo.

import pandas as pd

def devolver_mayores_20(archivo):
    df = pd.read_csv(archivo)

    mayores = df[df[1] > '20']
    print(mayores)


La siguiente función intenta crear un array de NumPy y mostrar en pantalla su promedio, pero produce un resultado incorrecto. Identificá el error y corregilo.

import numpy as np

datos = [10, 20, 30, 40, 50]
array = np.array(datos)
for d in array:
    suma += d
    cant += d

return suma / cant


El siguiente código intenta agregar una columna calculada a un DataFrame, pero produce un error. Identificá por qué falla y corregilo.

import pandas as pd

data = {
    'producto': ['Manzana', 'Banana', 'Naranja'],
    'precio': [100, 80, 120],
    'cantidad': [5, 10, 3]
}
df = pd.DataFrame(data)

df = df[ df['precio'] * df['cantidad'] ]
print(df)


Leer el siguiente código. Identificar y explicar qué es lo que hace. El código contiene tres errores; identificarlos y solucionarlos.

import pandas as pd

def analizar_control_calidad(archivo):
    df = pd.read_csv(archivo)

    yogures = df[df['producto'] == 'yogur']
    yogures_validos = yogures[yogures['volumen_ml'].notnull()]
    total_volumen = yogures_validos[ yogures_validos['volumen_ml'].sum() ]

    completos = df['volumen_ml'].notnull() & df['temperatura_c'].notnull()
    cant_completos = len(completos)

    aptos = df[df['estado'] == 'aprobado']
    cant_aptos = len(aptos)

    total = len(df)
    cant_incompletos = total - cant_completos
    porcentaje_incompletos_del_total = (cant_incompletos / cant_completos) * 100

    lote_observado = porcentaje_incompletos_del_total >= 30

    resumen = {
        'concepto': [
            'Volumen total yogur',
            'Registros totales',
            'Registros completos',
            'Lotes aptos',
            'Porcentaje incompletos',
            'Lote observado'
        ],
        'valor': [
            total_volumen,
            total,
            cant_completos,
            cant_aptos,
            f"{porcentaje_incompletos_del_total:.0f}%",
            lote_observado
        ]
    }

    df_resumen = pd.DataFrame(resumen)
    df_resumen.to_csv('control_calidad.csv', index=False)
    print("Reporte generado exitosamente: control_calidad.csv")