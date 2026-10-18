# Unidad 6 · Bibliotecas de Python — Sherlock Forense (RESUELTO)

Clase de **pandas + numpy + matplotlib** con temática de caso policial. Datos **ficticios**,
armados para que el análisis apunte a un culpable.

**El caso:** anoche robaron una obra de la *bóveda* del museo. Los sensores registraron cuántas
**pisadas** dejó cada sospechoso en cada sala.
- `huellas.csv` → `sospechoso, sala, pisadas`
- `indicios.csv` → `sospechoso, cabellos`

Sospechosos: **Moran, Adler, Hudson, Lestrade**. Salas: **Hall, Galeria, Boveda** (la escena).

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

df = pd.read_csv('huellas.csv')
df.head()
```

---

## Parte 1 · pandas (seguir las huellas)

**1.** Mostrá las primeras filas y el `info()` de `huellas.csv`.

```python
df = pd.read_csv('huellas.csv')
print(df.head())
print(df.shape)
df.info()
```

**2. Pisadas en una sala.** `total_pisadas_en_sala(archivo, sala)` → total de pisadas en esa sala.

```python
def total_pisadas_en_sala(archivo, sala):
    df = pd.read_csv(archivo)
    return int(df[df['sala'] == sala]['pisadas'].sum())

total_pisadas_en_sala('huellas.csv', 'Boveda')   # → 26
```

**3. ¿Quién pisó la bóveda?** `pisadas_por_sospechoso(archivo, sala)` → `{sospechoso: pisadas}`.

```python
def pisadas_por_sospechoso(archivo, sala):
    df = pd.read_csv(archivo)
    filtrado = df[df['sala'] == sala]
    return filtrado.groupby('sospechoso')['pisadas'].sum().to_dict()

pisadas_por_sospechoso('huellas.csv', 'Boveda')
# → {'Adler': 2, 'Hudson': 1, 'Lestrade': 3, 'Moran': 20}
```

**4. El más presente.** `sospechoso_mas_presente(archivo)` → sospechoso con más pisadas
sumando todas las salas (`groupby` + `idxmax`).

```python
def sospechoso_mas_presente(archivo):
    df = pd.read_csv(archivo)
    totales = df.groupby('sospechoso')['pisadas'].sum()
    return totales.idxmax()

sospechoso_mas_presente('huellas.csv')   # → 'Moran'
```

**5.** Mostrá los sospechosos que dejaron más de 10 pisadas en la bóveda.

```python
df = pd.read_csv('huellas.csv')
boveda = df[df['sala'] == 'Boveda']
print(boveda[boveda['pisadas'] > 10])
#   sospechoso    sala  pisadas
#        Moran  Boveda       20
```

---

## Parte 2 · numpy (las mediciones del perito)

El perito midió la **profundidad** (en mm) de varias pisadas halladas en la bóveda.

**6. Promedio.** `promedio(valores)` → el promedio redondeado a 2 decimales.

```python
def promedio(valores):
    a = np.array(valores)
    return round(a.mean(), 2)

promedio([10, 20, 30, 40, 50])   # → 30.0
```

**7. La medición que no encaja.** La pisada del culpable es la que **más se aleja del promedio**.
`medida_mas_rara(valores)` → la posición (índice) de esa medición.

```python
def medida_mas_rara(valores):
    a = np.array(valores)
    return int(np.abs(a - a.mean()).argmax())

medida_mas_rara([22, 24, 21, 23, 25, 60, 22, 23])   # → 5
```

---

## Parte 3 · matplotlib

**8. Barras de sospechosos.** Graficá con `plt.bar` el total de pisadas por sospechoso.

```python
df = pd.read_csv('huellas.csv')
totales = df.groupby('sospechoso')['pisadas'].sum()
plt.bar(totales.index, totales.values)
plt.title('Pisadas totales por sospechoso')
plt.ylabel('pisadas')
plt.show()
```

**9. La escena del crimen.** Graficá las pisadas en la bóveda por sospechoso. El pico es el principal sospechoso.

```python
df = pd.read_csv('huellas.csv')
boveda = df[df['sala'] == 'Boveda'].groupby('sospechoso')['pisadas'].sum()
plt.bar(boveda.index, boveda.values, color='firebrick')
plt.title('Pisadas en la bóveda (la escena)')
plt.ylabel('pisadas')
plt.show()
```

**10.** Marcá en un gráfico de las profundidades la medición más rara (`plt.scatter` en rojo).

```python
profundidades = [22, 24, 21, 23, 25, 60, 22, 23]
a = np.array(profundidades)
raro = np.abs(a - a.mean()).argmax()

plt.plot(a, marker='o')
plt.scatter(raro, a[raro], color='red', zorder=5, s=120)
plt.title('Profundidad de pisadas (mm) — la rara en rojo')
plt.show()
```

---

## Caso cerrado · ¿Quién fue?

`identificar_culpable(archivo, sala)` → sospechoso con más pisadas en esa sala (la escena es `Boveda`).

```python
def identificar_culpable(archivo, sala):
    df = pd.read_csv(archivo)
    filtrado = df[df['sala'] == sala]
    return filtrado.groupby('sospechoso')['pisadas'].sum().idxmax()

identificar_culpable('huellas.csv', 'Boveda')   # → 'Moran'
```

_Acusación final:_ **Moran** es el culpable. Dejó **20 pisadas en la bóveda** (contra 2, 1 y 3 del
resto) y es además el **más presente** en todo el museo (47 pisadas en total). Los indicios lo
confirman: aunque no es quien más cabellos dejó, su rastro en la escena del crimen es abrumador.

---

## Producto final · Informe pericial (estilo parcial)

> 📘 **Base del ejercicio:** Archivos, pandas, numpy y matplotlib. Armar un DataFrame desde un
> archivo y operar, o guardar el resultado en un archivo. **Siempre graficar.**

Trabajás con `huellas.csv` (`sospechoso,sala,pisadas`). La escena del crimen es la `Boveda`.

### Inciso A

Escribir `analizar_y_graficar_sospechas(ruta_archivo)` que:

1. Calcule, usando **NumPy**, el promedio de pisadas por registro de todo el archivo.
2. Calcule, para cada sospechoso, su **índice de concentración en la escena**:
   `indice = (pisadas_en_la_Boveda / pisadas_totales_del_sospechoso) * 100`.
3. Grafique un **gráfico de barras** con los sospechosos en el eje X y su índice (%) en el eje Y.
   El pico es el principal sospechoso.

### Inciso B

Escribir `exportar_sospechosos_sala(ruta_archivo, sala)` que, usando **Pandas**:

1. Filtre solo las filas de la sala recibida por parámetro.
2. Las ordene de mayor a menor según `pisadas`.
3. Exporte el resultado a un CSV llamado `sospechosos_sala.csv`.

### Posible Solución

```python
# Inciso A
import numpy as np
import matplotlib.pyplot as plt

def analizar_y_graficar_sospechas(ruta_archivo):
    archivo = open(ruta_archivo, "r", encoding="utf-8")
    lineas = archivo.readlines()
    archivo.close()

    pisadas_totales = {}    # {sospechoso: pisadas en todas las salas}
    pisadas_boveda = {}     # {sospechoso: pisadas en la Boveda}
    todas_las_pisadas = []  # para el promedio general

    for linea in lineas[1:]:    # salteo el encabezado
        linea = linea.strip()
        if not linea:
            continue
        sospechoso, sala, pisadas = linea.split(",")
        pisadas = int(pisadas)
        todas_las_pisadas.append(pisadas)
        pisadas_totales[sospechoso] = pisadas_totales.get(sospechoso, 0) + pisadas
        if sala == "Boveda":
            pisadas_boveda[sospechoso] = pisadas_boveda.get(sospechoso, 0) + pisadas

    arr = np.array(todas_las_pisadas)
    print(f"Promedio de pisadas por registro: {np.mean(arr):.2f}")

    nombres = list(pisadas_totales.keys())
    indices = []
    for s in nombres:
        indice = (pisadas_boveda.get(s, 0) / pisadas_totales[s]) * 100
        indices.append(indice)

    _, ax = plt.subplots()
    ax.bar(nombres, indices, color="firebrick")
    ax.set_title("Índice de concentración en la escena (Boveda)")
    ax.set_xlabel("Sospechoso")
    ax.set_ylabel("Concentración en la bóveda (%)")
    plt.show()


# Inciso B
import pandas as pd

def exportar_sospechosos_sala(ruta_archivo, sala):
    df = pd.read_csv(ruta_archivo)
    df_filtrado = df[df["sala"] == sala]
    df_ordenado = df_filtrado.sort_values(by="pisadas", ascending=False)
    df_ordenado.to_csv("sospechosos_sala.csv", index=False)
    return df_ordenado
```

Conclusión esperada: **Moran** tiene el mayor índice de concentración en la escena (**42,55%**:
20 de sus 47 pisadas fueron en la bóveda), muy por encima de Lestrade (13,64%), Adler (12,5%) y
Hudson (10%). El gráfico de barras lo señala con el pico más alto, y `sospechosos_sala.csv`
ordenado por pisadas lo deja primero. **El culpable es Moran.**

---

## Peritaje de código

Encontrá y corregí los errores.

**a.** Debería devolver la lista de sospechosos que dejaron más de 10 cabellos:

```python
# ANTES (con errores):
def sospechosos_con_cabellos(archivo):
    df = pd.read_csv(archivo)
    mayores = df[df['cabellos'] > '10']   # compara contra el string '10'
    print(mayores)                         # imprime el DataFrame en vez de devolver la lista

# DESPUÉS (corregido):
def sospechosos_con_cabellos(archivo):
    df = pd.read_csv(archivo)
    mayores = df[df['cabellos'] > 10]      # comparar contra el número 10
    return mayores['sospechoso'].tolist()  # devolver la lista de nombres

sospechosos_con_cabellos('indicios.csv')   # → ['Moran', 'Hudson']
```

**b.** Debería devolver el promedio de una lista de profundidades, pero da error:

```python
# ANTES (con errores):
def promedio_profundidad(valores):
    array = np.array(valores)
    for d in array:
        suma += d        # suma no estaba inicializada
        cant += d        # cant debería contar (+1), no sumar la profundidad
    return suma / cant

# DESPUÉS (corregido):
def promedio_profundidad(valores):
    array = np.array(valores)
    suma = 0
    cant = 0
    for d in array:
        suma += d
        cant += 1
    return suma / cant

# (o directamente:  return np.array(valores).mean())
promedio_profundidad([22, 24, 21, 23, 25])   # → 23.0
```
