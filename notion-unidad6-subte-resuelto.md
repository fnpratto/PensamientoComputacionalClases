# Unidad 6 · Bibliotecas de Python — Detectives del Subte (RESUELTO)

Clase de **pandas + numpy + matplotlib** sobre **datos abiertos reales** del subte porteño:
el dataset *Subte: Viajes Molinetes* de SBASE (portal de datos abiertos del GCBA), año 2024.

Dos vistas ya limpias:
- `subte_diario_por_linea.csv` → `fecha, linea, pasajeros`
- `subte_diario_por_estacion.csv` → `fecha, linea, estacion, pasajeros`

Fuente: https://data.buenosaires.gob.ar/dataset/subte-viajes-molinetes

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

df = pd.read_csv('subte_diario_por_linea.csv')
df.head()
```

---

## Parte 1 · pandas

**1.** Mostrá las primeras 5 filas, la forma (`shape`) y la info (`info()`) del DataFrame.

```python
df = pd.read_csv('subte_diario_por_linea.csv')
print(df.head())
print(df.shape)
df.info()
```

**2. Pasajeros de un día.** `total_del_dia(archivo, fecha)` → total de pasajeros de todo el
subte en esa fecha (sumando todas las líneas).

```python
def total_del_dia(archivo, fecha):
    df = pd.read_csv(archivo)
    return int(df[df['fecha'] == fecha]['pasajeros'].sum())

total_del_dia('subte_diario_por_linea.csv', '2024-03-19')
```

**3. Pasajeros por línea.** `pasajeros_por_linea(archivo, fecha)` → diccionario `{linea: pasajeros}`.

```python
def pasajeros_por_linea(archivo, fecha):
    df = pd.read_csv(archivo)
    filtrado = df[df['fecha'] == fecha]
    return filtrado.groupby('linea')['pasajeros'].sum().to_dict()

pasajeros_por_linea('subte_diario_por_linea.csv', '2024-03-19')
# → {'A': ..., 'B': ..., 'C': ..., 'D': ..., 'E': ..., 'H': ...}
```

**4. La línea más usada.** `linea_mas_usada(archivo)` → letra de la línea con más pasajeros
sumando todos los días (`groupby` + `idxmax`).

```python
def linea_mas_usada(archivo):
    df = pd.read_csv(archivo)
    totales = df.groupby('linea')['pasajeros'].sum()
    return totales.idxmax()

linea_mas_usada('subte_diario_por_linea.csv')   # → 'B'
```

**5. Top de estaciones.** Usando `subte_diario_por_estacion.csv`,
`top_estaciones(archivo, linea, fecha, n)` → lista con los nombres de las `n` estaciones
con más pasajeros de esa línea ese día, de mayor a menor.

```python
def top_estaciones(archivo, linea, fecha, n):
    df = pd.read_csv(archivo)
    filtrado = df[(df['linea'] == linea) & (df['fecha'] == fecha)]
    ordenado = filtrado.sort_values('pasajeros', ascending=False)
    return ordenado['estacion'].head(n).tolist()

top_estaciones('subte_diario_por_estacion.csv', 'B', '2024-03-19', 3)
```

**6. Días hábiles vs fin de semana.** Agregá una columna con el día de la semana
(`pd.to_datetime(df['fecha']).dt.weekday`) y compará el promedio de pasajeros de los días de
semana (0–4) contra el de los fines de semana (5–6).

```python
df = pd.read_csv('subte_diario_por_linea.csv')
diario = df.groupby('fecha')['pasajeros'].sum().reset_index()
diario['dia'] = pd.to_datetime(diario['fecha']).dt.weekday

habiles = diario[diario['dia'] <= 4]['pasajeros'].mean()
finde   = diario[diario['dia'] >= 5]['pasajeros'].mean()

print('Promedio días de semana:', round(habiles))
print('Promedio fin de semana :', round(finde))
```

**7. Guardar un recorte.** Guardá en `marzo.csv` solo las filas del mes de marzo.

```python
df = pd.read_csv('subte_diario_por_linea.csv')
marzo = df[df['fecha'].str.startswith('2024-03')]
marzo.to_csv('marzo.csv', index=False)
print('Guardadas', len(marzo), 'filas en marzo.csv')
```

---

## Parte 2 · numpy

**8. Promedio.** `promedio(valores)` → el promedio redondeado a 2 decimales.
Ej: `promedio([10, 20, 30, 40, 50])` → `30.0`.

```python
def promedio(valores):
    a = np.array(valores)
    return round(a.mean(), 2)

promedio([10, 20, 30, 40, 50])   # → 30.0
```

**9. El día más raro.** El día más raro es el que **más se aleja del promedio**.
`dia_mas_raro(valores)` → la posición (índice) de ese día.
Ej: `dia_mas_raro([100, 102, 98, 101, 99, 250, 100])` → `5`.

```python
def dia_mas_raro(valores):
    a = np.array(valores)
    return int(np.abs(a - a.mean()).argmax())

dia_mas_raro([100, 102, 98, 101, 99, 250, 100])   # → 5
```

**10.** Tomá la serie de pasajeros diarios de la Línea B, pasala a un array de numpy y calculá
su promedio, su máximo, su mínimo, y qué día (posición) se aleja más del promedio.

```python
df = pd.read_csv('subte_diario_por_linea.csv')
serie_b = df[df['linea'] == 'B'].sort_values('fecha')['pasajeros']
a = np.array(serie_b)

print('Promedio:', round(a.mean(), 2))
print('Máximo  :', a.max())
print('Mínimo  :', a.min())
print('Día más raro (posición):', np.abs(a - a.mean()).argmax())
```

---

## Parte 3 · matplotlib

**11. Barras por línea.** Graficá con `plt.bar` el total de pasajeros de 2024 por línea.
¿Cuál es la más usada? ¿Y la menos?

```python
df = pd.read_csv('subte_diario_por_linea.csv')
totales = df.groupby('linea')['pasajeros'].sum()
plt.bar(totales.index, totales.values)
plt.title('Pasajeros por línea (2024)')
plt.ylabel('pasajeros')
plt.show()
# La más usada es la B; la menos usada, la E.
```

**12. Serie temporal con el día más raro.** Graficá con `plt.plot` el total diario de todo el
subte a lo largo del año y marcá con `plt.scatter` (en rojo) el día que más se aleja del promedio.

```python
df = pd.read_csv('subte_diario_por_linea.csv')
diario = df.groupby('fecha')['pasajeros'].sum()
a = np.array(diario)
raro = np.abs(a - a.mean()).argmax()

plt.plot(a)
plt.scatter(raro, a[raro], color='red', zorder=5, s=80)
plt.title('Total diario del subte — el día más raro en rojo')
plt.ylabel('pasajeros')
plt.show()
```

**13.** Elegí una línea y graficá su serie diaria. Marcá el feriado que más la afectó.

```python
df = pd.read_csv('subte_diario_por_linea.csv')
serie = df[df['linea'] == 'B'].sort_values('fecha')
a = np.array(serie['pasajeros'])
raro = np.abs(a - a.mean()).argmax()

plt.plot(a)
plt.scatter(raro, a[raro], color='red', zorder=5, s=80)
plt.title('Línea B — día de mayor desvío (probable feriado)')
plt.ylabel('pasajeros')
plt.show()
print('Fecha:', serie.iloc[raro]['fecha'])
```

---

## Producto final · Ejercicio integrador (estilo parcial)

> 📘 **Base del ejercicio:** Archivos, pandas, numpy y matplotlib.
> Armar un DataFrame desde un archivo y hacer operaciones. O, con el DataFrame creado, operar
> y guardar el resultado en un archivo. **Siempre graficar.**

Cada línea del archivo `subte_diario_por_linea.csv` representa un día de una línea, con el formato:

```
fecha,linea,pasajeros
2024-01-01,A,18945
2024-01-01,B,25538
2024-01-01,C,22401
2024-01-02,A,127202
...
```

### Inciso A

Mateo mencionó que sabía algo de Python y trabaja en Amoba, por eso mismo le dan un CSV con los
pasajeros diarios del subte en 2024, `subte_diario_por_linea.csv` (`fecha,linea,pasajeros`), y le
piden que escriba `analizar_y_graficar_demanda(ruta_archivo)` que:

1. Calcule el promedio de pasajeros por día de **todo el subte** (sumando las líneas de cada fecha).
2. Calcule, para cada línea, su **porcentaje de participación** en la demanda total del año:
   `participacion = (total_de_la_linea / total_general) * 100`
3. Grafique las líneas y su participación (gráfico de **barras**).

### Inciso B

Como Mateo hizo un gran trabajo, ahora le piden que escriba
`exportar_dias_pico(ruta_archivo, linea, n)` que:

1. Filtre solo las filas de la línea recibida por parámetro.
2. Las ordene de mayor a menor (descendente) según su cantidad de `pasajeros`.
3. Exporte las `n` primeras filas (los `n` días de mayor demanda) a un nuevo archivo CSV
   llamado `dias_pico.csv`.

## Posible Solución

```python
# Inciso A
import numpy as np
import matplotlib.pyplot as plt

def analizar_y_graficar_demanda(ruta_archivo):
    archivo = open(ruta_archivo, "r", encoding="utf-8")
    lineas = archivo.readlines()
    archivo.close()

    lineas_datos = lineas[1:]          # salteo el encabezado
    totales_por_linea = {}             # {linea: total de pasajeros del año}
    pasajeros_por_fecha = {}           # {fecha: total de ese día en todo el subte}

    for linea in lineas_datos:
        linea = linea.strip()
        if not linea:
            continue
        fecha, nombre_linea, pasajeros = linea.split(",")
        pasajeros = int(pasajeros)

        if nombre_linea in totales_por_linea:
            totales_por_linea[nombre_linea] += pasajeros
        else:
            totales_por_linea[nombre_linea] = pasajeros

        if fecha in pasajeros_por_fecha:
            pasajeros_por_fecha[fecha] += pasajeros
        else:
            pasajeros_por_fecha[fecha] = pasajeros

    # 1) Promedio diario de todo el subte con NumPy
    arr_diario = np.array(list(pasajeros_por_fecha.values()))
    promedio_diario = np.mean(arr_diario)
    print(f"Promedio de pasajeros por día (todo el subte): {promedio_diario:.2f}")

    # 2) Porcentaje de participación de cada línea
    nombres = list(totales_por_linea.keys())
    arr_totales = np.array(list(totales_por_linea.values()))
    total_general = arr_totales.sum()
    arr_participacion = (arr_totales / total_general) * 100

    # 3) Gráfico de barras
    _, ax = plt.subplots()
    ax.bar(nombres, arr_participacion, color="purple")
    ax.set_title("Participación de cada línea en la demanda 2024")
    ax.set_xlabel("Línea")
    ax.set_ylabel("Participación (%)")
    plt.show()


# Inciso B
import pandas as pd

def exportar_dias_pico(ruta_archivo, linea_buscada, n):
    df = pd.read_csv(ruta_archivo)

    df_filtrado = df[df["linea"] == linea_buscada]

    df_ordenado = df_filtrado.sort_values(by="pasajeros", ascending=False)

    df_pico = df_ordenado.head(n)
    df_pico.to_csv("dias_pico.csv", index=False)
    return df_pico


analizar_y_graficar_demanda("subte_diario_por_linea.csv")
exportar_dias_pico("subte_diario_por_linea.csv", "B", 5)
```

> 💡 **Nota:** En el Inciso A el archivo se lee "a mano" con `open`/`readlines` (tema *Archivos*)
> y las cuentas se hacen con **NumPy**; en el Inciso B se usa **Pandas** para filtrar, ordenar y
> exportar. La B más usada aparecerá con el mayor porcentaje de participación y, en `dias_pico.csv`,
> sus días de mayor demanda suelen ser días hábiles (los feriados y fines de semana quedan abajo).

---

## Evaluación de código

Encontrá y corregí los errores de estas dos funciones.

**a.** Debería mostrar las líneas con más de 100000 pasajeros en un día:

```python
# ANTES (con errores):
def lineas_llenas(archivo):
    df = pd.read_csv(archivo)
    llenas = df[df[2] > '100000']   # df[2] no es una columna; compara contra el string '100000'
    print(llenas)

# DESPUÉS (corregido):
def lineas_llenas(archivo):
    df = pd.read_csv(archivo)
    llenas = df[df['pasajeros'] > 100000]   # usar el nombre de columna y el número 100000
    print(llenas)

lineas_llenas('subte_diario_por_linea.csv')
```

**b.** Debería devolver el promedio de una lista de pasajeros, pero da error:

```python
# ANTES (con errores):
def promedio(valores):
    array = np.array(valores)
    for v in array:
        suma += v        # suma no estaba inicializada
        cant += v        # cant debería contar (+1), no sumar el valor
    return suma / cant

# DESPUÉS (corregido):
def promedio(valores):
    array = np.array(valores)
    suma = 0
    cant = 0
    for v in array:
        suma += v
        cant += 1
    return suma / cant

# (o directamente:  return np.array(valores).mean())
promedio([10, 20, 30, 40, 50])   # → 30.0
```
