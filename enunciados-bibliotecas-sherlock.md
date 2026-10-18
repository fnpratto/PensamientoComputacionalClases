# Unidad 6 · Bibliotecas de Python — Sherlock Forense

Clase de **pandas + numpy + matplotlib** con una temática de caso policial. Los datos
son **ficticios**, pero están armados para que el análisis apunte a un culpable.

**El caso:** anoche robaron una obra de la *bóveda* del museo. El sistema de sensores
dejó un registro de cuántas **pisadas** dejó cada sospechoso en cada sala.

- `huellas.csv` → columnas `sospechoso, sala, pisadas`.
- `indicios.csv` → columnas `sospechoso, cabellos`.

> Los dos archivos están en `public/datos/clase-sherlock/`. En Colab:
> `pd.read_csv('huellas.csv')`.

Sospechosos: **Moran, Adler, Hudson, Lestrade**. Salas: **Hall, Galeria, Boveda** (la
bóveda es la escena del crimen).

---

## Parte 1 · pandas (seguir las huellas)

> Una celda por ejercicio en Colab.

1. Leer `huellas.csv` y mostrar las primeras filas y su `info()`.
2. **Pisadas en una sala.** Escribir `total_pisadas_en_sala(archivo, sala)` que devuelva
   el total de pisadas registradas en esa sala (sumando a todos los sospechosos).
3. **¿Quién pisó la bóveda?** Escribir `pisadas_por_sospechoso(archivo, sala)` que
   devuelva un diccionario `{sospechoso: pisadas}` con las pisadas de cada uno en esa sala.
4. **El más presente.** Escribir `sospechoso_mas_presente(archivo)` que devuelva el
   sospechoso con más pisadas sumando todas las salas (`groupby` + `idxmax`).
5. **Filtrar por sala y umbral.** Mostrar los sospechosos que dejaron más de 10 pisadas
   en la bóveda.

## Parte 2 · numpy (las mediciones del perito)

El perito midió la **profundidad** (en mm) de varias pisadas halladas en la bóveda.

6. **Promedio.** Escribir `promedio(valores)` que reciba una lista y devuelva el promedio
   redondeado a 2 decimales. Ejemplo: `promedio([10, 20, 30, 40, 50])` → `30.0`.
7. **La medición que no encaja.** La pisada del culpable es la que **más se aleja del
   promedio**. Escribir `medida_mas_rara(valores)` que devuelva la posición (índice) de
   esa medición.
   Ejemplo: `medida_mas_rara([22, 24, 21, 23, 25, 60, 22, 23])` → `5`
   (pista: `np.abs(a - a.mean()).argmax()`).
   Esa pisada de 60 mm es muchísimo más profunda que el resto: alguien pesado y apurado.

## Parte 3 · matplotlib (en Colab)

8. **Barras de sospechosos.** Graficar con `plt.bar` el total de pisadas por sospechoso.
   ¿Quién sobresale?
9. **La escena del crimen.** Graficar las pisadas en la bóveda por sospechoso. El pico
   es nuestro principal sospechoso.
10. Marcar en un gráfico de las profundidades la medición más rara (con `plt.scatter` en rojo).

## Caso cerrado · ¿Quién fue?

Escribir `identificar_culpable(archivo, sala)` que devuelva el nombre del sospechoso con
**más pisadas en esa sala**. Para la bóveda:

```python
import pandas as pd

df = pd.read_csv('huellas.csv')
boveda = df[df['sala'] == 'Boveda']
culpable = boveda.sort_values('pisadas', ascending=False).iloc[0]['sospechoso']
print('El culpable es', culpable)
```

Escribir la acusación final: ¿quién fue, y qué evidencia lo delata? (su presencia en la
bóveda, el total de pisadas, la medición anómala de profundidad...).

## Peritaje de código

Encontrá y corregí los errores.

**a.** Debería devolver la lista de sospechosos que dejaron más de 10 cabellos:

```python
def sospechosos_con_cabellos(archivo):
    df = pd.read_csv(archivo)
    mayores = df[df['cabellos'] > '10']
    print(mayores)
```

**b.** Debería devolver el promedio de una lista de profundidades, pero da error:

```python
def promedio_profundidad(valores):
    array = np.array(valores)
    for d in array:
        suma += d
        cant += d
    return suma / cant
```
