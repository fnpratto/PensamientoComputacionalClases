# Unidad 6 · Bibliotecas — Detectives del Subte

Clase de **pandas + numpy + matplotlib** con **datos abiertos reales** del subte porteño:
dataset *Subte: Viajes Molinetes* de SBASE (portal de datos abiertos del GCBA), 2024.
Limpiado y agregado a dos vistas:

- `subte_diario_por_linea.csv` → `fecha, linea, pasajeros`
- `subte_diario_por_estacion.csv` → `fecha, linea, estacion, pasajeros`

Fuente: https://data.buenosaires.gob.ar/dataset/subte-viajes-molinetes

> Nota de datos (parte del caso): los fines de semana y feriados tienen muchísimos menos
> pasajeros que un día de semana, y hay días que directamente **faltan** (¡todo octubre!).
> Un detective de datos siempre desconfía primero de los datos.

---

## Unidad 6 - numpy

*Recomendación de la cátedra: Numpy: 5, 6, 7, 8, 9
Evaluación de Código: 2, 4*

#### Checklist

- [ ]  Arrays: como crearlos, atributos, mutabilidad
- [ ]  Operaciones con arrays, ecuaciones

### Ejercicios

**1. Promedio de pasajeros.** Escribir `promedio(valores)` que reciba una lista de pasajeros
por día y devuelva el promedio redondeado a 2 decimales.

```python
promedio([10, 20, 30, 40, 50])   # -> 30.0
```

Resolución:

```python
import numpy as np

def promedio(valores):
    return round(np.array(valores).mean(), 2)
```

**2. El día más raro.** El día más raro es el que **más se aleja del promedio** (para arriba
o para abajo). Escribir `dia_mas_raro(valores)` que devuelva la posición (índice) de ese día.

```python
dia_mas_raro([100, 102, 98, 101, 99, 250, 100])   # -> 5
```

Resolución:

```python
import numpy as np

def dia_mas_raro(valores):
    a = np.array(valores)
    return int(np.abs(a - a.mean()).argmax())   # posición del más alejado del promedio
```

**Evaluación de código.** Debería devolver el promedio de una lista, pero da error.
Encontrá y corregí los errores.

```python
def promedio(valores):
    array = np.array(valores)
    for v in array:
        suma += v
        cant += v
    return suma / cant
```

Resolución (errores: `suma`/`cant` sin inicializar, `cant += v` debería contar de a 1, y numpy ya tiene `.mean()`):

```python
import numpy as np

def promedio(valores):
    return np.array(valores).mean()
```

#### Quiz (el que tomamos)

**¿Cómo creás un array de numpy a partir de `[10, 20, 30]`?**

- ✅ `np.array([10, 20, 30])`
- `np.list([10, 20, 30])`
- `numpy([10, 20, 30])`
- `np.new([10, 20, 30])`

---

## Unidad 6 - pandas

*Recomendación de la cátedra:
Pandas Básico: 6, 8, 9, 12, 14, 17, 19, 21, 22
Pandas CSV: 1, 2, 5, 6, 7
Evaluación de Código: 1, 3*

#### Checklist

- [ ]  Series: comparación con arrays
- [ ]  Dataframes desde csv o diccionarios
- [ ]  Atributos y métodos
- [ ]  Acceso a filas
- [ ]  Modificar filas y valores
- [ ]  Filtrado
- [ ]  Ordenamiento
- [ ]  Archivos csv

### Ejercicios

Trabajamos con `subte_diario_por_linea.csv` (`fecha, linea, pasajeros`) salvo que se indique.

**1. Pasajeros de un día.** Escribir `total_del_dia(archivo, fecha)` que devuelva el total de
pasajeros de todo el subte en esa fecha (sumando todas las líneas).

```python
total_del_dia('subte_diario_por_linea.csv', '2024-03-19')   # -> 929675
```

Resolución:

```python
import pandas as pd

def total_del_dia(archivo, fecha):
    df = pd.read_csv(archivo)
    return int(df[df['fecha'] == fecha]['pasajeros'].sum())
```

**2. Pasajeros por línea.** Escribir `pasajeros_por_linea(archivo, fecha)` que devuelva un
diccionario `{linea: pasajeros}` con lo de cada línea en esa fecha.

```python
pasajeros_por_linea('subte_diario_por_linea.csv', '2024-03-19')
# -> {'A': 186305, 'B': 217518, 'C': 142881, 'D': 176043, 'E': 96802, 'H': 110126}
```

Resolución:

```python
import pandas as pd

def pasajeros_por_linea(archivo, fecha):
    df = pd.read_csv(archivo)
    del_dia = df[df['fecha'] == fecha]
    return del_dia.groupby('linea')['pasajeros'].sum().to_dict()
```

**3. La línea más usada.** Escribir `linea_mas_usada(archivo)` que devuelva la letra de la
línea con más pasajeros sumando todos los días.

```python
linea_mas_usada('subte_diario_por_linea.csv')   # -> 'B'
```

Resolución:

```python
import pandas as pd

def linea_mas_usada(archivo):
    df = pd.read_csv(archivo)
    return df.groupby('linea')['pasajeros'].sum().idxmax()
```

**4. Top de estaciones.** Usando `subte_diario_por_estacion.csv`, escribir
`top_estaciones(archivo, n)` que devuelva una lista con los nombres de las `n` estaciones
con más pasajeros, de mayor a menor.

```python
top_estaciones('subte_diario_por_estacion.csv', 3)
# -> ['Rosas', 'Federico Lacroze', 'Leandro N. Alem']
```

Resolución:

```python
import pandas as pd

def top_estaciones(archivo, n):
    df = pd.read_csv(archivo)
    ordenado = df.sort_values('pasajeros', ascending=False)
    return ordenado.head(n)['estacion'].tolist()
```

**Evaluación de código.** Debería mostrar las líneas con más de 100000 pasajeros en un día.
Encontrá y corregí los errores.

```python
def lineas_llenas(archivo):
    df = pd.read_csv(archivo)
    llenas = df[df[2] > '100000']
    print(llenas)
```

Resolución (errores: columna por índice `df[2]` en vez de nombre `df['pasajeros']`,
comparación contra el string `'100000'` en vez del número, y conviene `return`):

```python
import pandas as pd

def lineas_llenas(archivo):
    df = pd.read_csv(archivo)
    return df[df['pasajeros'] > 100000]
```

#### Quiz (el que tomamos)

**Tenés `datos.csv` y lo querés cargar como DataFrame.**

- ✅ `df = pd.read_csv('datos.csv')`
- `df = pd.open('datos.csv')`
- `df = pd.DataFrame('datos.csv')`
- `df = csv.read('datos.csv')`

**¿Cómo accedés a la columna `pasajeros` de `df`?**

- ✅ `df['pasajeros']`
- `df.pasajeros()`
- `df[pasajeros]`
- `df->pasajeros`

**Quedarte solo con las filas donde `pasajeros` sea mayor a 1000:**

- ✅ `df[df['pasajeros'] > 1000]`
- `df(df['pasajeros'] > 1000)`
- `df['pasajeros'] > 1000`
- `df.filter(pasajeros > 1000)`

**Filas de la línea A **y** con más de 1000 pasajeros (combinar condiciones):**

- ✅ `df[(df['linea'] == 'A') & (df['pasajeros'] > 1000)]`
- `df[(df['linea'] == 'A') and (df['pasajeros'] > 1000)]`
- `df[df['linea'] == 'A' & df['pasajeros'] > 1000]`
- `df[df['linea'] == 'A', df['pasajeros'] > 1000]`

**Total de `pasajeros` sumado por cada `linea`:**

- ✅ `df.groupby('linea')['pasajeros'].sum()`
- `df.sum('linea')`
- `df['pasajeros'].sum('linea')`
- `df.group('linea').sum()`

**Ordenar el DataFrame por `pasajeros` de mayor a menor:**

- ✅ `df.sort_values('pasajeros', ascending=False)`
- `df.sort('pasajeros')`
- `df.order_by('pasajeros')`
- `df.sort_values('pasajeros', mayor=True)`

---

## Unidad 6 - matplotlib (para Colab)

#### Checklist

- [ ]  Tipos de gráfico: cuándo usar cada uno
- [ ]  Barras para comparar categorías (`plt.bar`)
- [ ]  Serie temporal con `plt.plot` y marcar un punto con `plt.scatter`
- [ ]  Título, ejes, grilla y leyenda

### Ejercicios

**1. Barras por línea.** Graficar el total de pasajeros de 2024 por línea.

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('subte_diario_por_linea.csv')
totales = df.groupby('linea')['pasajeros'].sum()

plt.bar(totales.index, totales.values)
plt.title('Pasajeros por línea — 2024')
plt.xlabel('Línea')
plt.ylabel('Pasajeros')
plt.show()
```

**2. Serie temporal con el día más raro.** Graficar el total diario de todo el subte y marcar
el día que más se aleja del promedio.

```python
diario = df.groupby('fecha')['pasajeros'].sum()
media = diario.mean()
raro = (diario - media).abs().idxmax()

plt.plot(range(len(diario)), diario.values)
plt.scatter([list(diario.index).index(raro)], [diario[raro]], color='red')
plt.title('Pasajeros por día — 2024')
plt.show()
```

---

## Unidad 6 - Producto final · Ejercicio integrador (estilo parcial)

> 📘 Base del ejercicio: Archivos, pandas, numpy y matplotlib. Armar un DataFrame desde un
> archivo y operar, o guardar el resultado en un archivo. **Siempre graficar.**

**Inciso A.** Mateo mencionó que sabía algo de Python y trabaja en Amoba, por eso mismo le dan
un CSV con los pasajeros diarios del subte en 2024, `subte_diario_por_linea.csv`
(`fecha,linea,pasajeros`), y le piden que escriba `analizar_y_graficar_demanda(ruta_archivo)` que:

1. Calcule el promedio de pasajeros por día de **todo el subte** (sumando las líneas de cada fecha).
2. Calcule, para cada línea, su **porcentaje de participación** en la demanda total del año:
   `participacion = (total_de_la_linea / total_general) * 100`.
3. Grafique las líneas y su participación (gráfico de **barras**).

**Inciso B.** Como Mateo hizo un gran trabajo, ahora le piden que escriba
`exportar_dias_pico(ruta_archivo, linea, n)` que:

1. Filtre solo las filas de la línea recibida por parámetro.
2. Las ordene de mayor a menor según `pasajeros`.
3. Exporte las `n` primeras filas (los `n` días de mayor demanda) a un CSV `dias_pico.csv`.

### Posible Solución

```python
# Inciso A
import numpy as np
import matplotlib.pyplot as plt

def analizar_y_graficar_demanda(ruta_archivo):
    archivo = open(ruta_archivo, "r", encoding="utf-8")
    lineas = archivo.readlines()
    archivo.close()

    totales_por_linea = {}      # {linea: total del año}
    pasajeros_por_fecha = {}    # {fecha: total de ese día en todo el subte}

    for linea in lineas[1:]:    # salteo el encabezado
        linea = linea.strip()
        if not linea:
            continue
        fecha, nombre_linea, pasajeros = linea.split(",")
        pasajeros = int(pasajeros)
        totales_por_linea[nombre_linea] = totales_por_linea.get(nombre_linea, 0) + pasajeros
        pasajeros_por_fecha[fecha] = pasajeros_por_fecha.get(fecha, 0) + pasajeros

    arr_diario = np.array(list(pasajeros_por_fecha.values()))
    print(f"Promedio de pasajeros por día (todo el subte): {np.mean(arr_diario):.2f}")

    nombres = list(totales_por_linea.keys())
    arr_totales = np.array(list(totales_por_linea.values()))
    arr_participacion = (arr_totales / arr_totales.sum()) * 100

    _, ax = plt.subplots()
    ax.bar(nombres, arr_participacion, color="purple")
    ax.set_title("Participación de cada línea en la demanda 2024")
    ax.set_xlabel("Línea")
    ax.set_ylabel("Participación (%)")
    plt.show()


# Inciso B
import pandas as pd

def exportar_dias_pico(ruta_archivo, linea, n):
    df = pd.read_csv(ruta_archivo)
    df_filtrado = df[df["linea"] == linea]
    df_ordenado = df_filtrado.sort_values(by="pasajeros", ascending=False)
    df_pico = df_ordenado.head(n)
    df_pico.to_csv("dias_pico.csv", index=False)
    return df_pico
```

Conclusión esperada: la línea **B** concentra la mayor participación (~24,8%), y en `dias_pico.csv`
los días de mayor demanda son **días hábiles** — los fines de semana y feriados quedan abajo.
Bonus del dataset real: octubre entero **falta** en los datos; un detective de datos desconfía
primero de los datos.
