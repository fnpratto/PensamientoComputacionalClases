# Unidad 6 · Bibliotecas de Python — Sherlock Forense

Clase de **pandas + numpy + matplotlib** con una temática de caso policial. Los datos son
**ficticios**, pero están armados para que el análisis apunte a un culpable.

**El caso:** anoche robaron una obra de la *bóveda* del museo. El sistema de sensores dejó un
registro de cuántas **pisadas** dejó cada sospechoso en cada sala.

- `huellas.csv` → columnas `sospechoso, sala, pisadas`.
- `indicios.csv` → columnas `sospechoso, cabellos`.

> Los dos archivos están en `public/datos/clase-sherlock/`. En Colab: `pd.read_csv('huellas.csv')`.

Sospechosos: **Moran, Adler, Hudson, Lestrade**. Salas: **Hall, Galeria, Boveda** (la bóveda es la
escena del crimen). Cada consigna está en **estilo parcial**: Sherlock te pone al frente del
análisis y te pide algo.

---

## Parte 1 · pandas (seguir las huellas)

> Una celda por ejercicio en Colab.

1. **Pisadas en una sala.** Sherlock te pone al frente del análisis y te pasa `huellas.csv`. Te
   pide `total_pisadas_en_sala(archivo, sala)` que devuelva el total de pisadas registradas en esa
   sala (sumando a todos los sospechosos).
2. **¿Quién pisó la bóveda?** Para saber quién estuvo en el lugar del crimen, Sherlock te pide el
   desglose por sospechoso de una sala: `pisadas_por_sospechoso(archivo, sala)` que devuelva un
   diccionario `{sospechoso: pisadas}`.
3. **El más presente.** Sherlock sospecha de quien más se movió por toda la escena. Te pide
   `sospechoso_mas_presente(archivo)` que devuelva el sospechoso con más pisadas sumando todas las
   salas (`groupby` + `idxmax`).

## Parte 2 · numpy (las mediciones del perito)

El perito midió la **profundidad** (en mm) de varias pisadas halladas en la bóveda.

4. **Promedio.** Sherlock te pide el valor típico para comparar. `promedio(valores)` que devuelva
   el promedio redondeado a 2 decimales. Ejemplo: `promedio([10, 20, 30, 40, 50])` → `30.0`.
5. **La medición que no encaja.** La pisada del culpable es la que **más se aleja del promedio**.
   Sherlock te pide `medida_mas_rara(valores)` que devuelva la posición (índice) de esa medición.
   Ejemplo: `medida_mas_rara([22, 24, 21, 23, 25, 60, 22, 23])` → `5`
   (pista: `np.abs(a - a.mean()).argmax()`). Esa pisada de 60 mm es muchísimo más profunda que el
   resto: alguien pesado y apurado.

## Parte 3 · matplotlib (en Colab)

6. **Barras de sospechosos.** Graficar con `plt.bar` el total de pisadas por sospechoso. ¿Quién
   sobresale?
7. **La medición rara.** Marcar en un gráfico de las profundidades la medición más rara (con
   `plt.scatter` en rojo).

## Integrador · estilo parcial

**Base:** archivos, pandas, numpy y matplotlib. **Siempre graficar.** La escena del crimen es la
`Boveda`.

**Inciso A.** Escribí `analizar_y_graficar_sospechas(ruta_archivo)` que:

1. calcule con **NumPy** el promedio de pisadas por registro de todo el archivo;
2. calcule, para cada sospechoso, su **índice de concentración en la escena**
   `indice = (pisadas_en_la_Boveda / pisadas_totales_del_sospechoso) * 100`;
3. grafique un **gráfico de barras** con los sospechosos en el eje X y su índice (%) en el eje Y.
   El pico es el principal sospechoso.

**Inciso B.** Escribí `exportar_sospechosos_sala(ruta_archivo, sala)` que, con **Pandas**:

1. filtre solo las filas de esa sala;
2. las ordene de mayor a menor por `pisadas`;
3. exporte el resultado a un CSV `sospechosos_sala.csv`.

## Caso cerrado · ¿Quién fue?

Hora de acusar: Sherlock te pide el veredicto. Escribí `identificar_culpable(archivo, sala)` que
devuelva el nombre del sospechoso con **más pisadas en esa sala** (la escena es la `Boveda`).

```python
import pandas as pd

df = pd.read_csv('huellas.csv')
boveda = df[df['sala'] == 'Boveda']
culpable = boveda.sort_values('pisadas', ascending=False).iloc[0]['sospechoso']
print('El culpable es', culpable)
```

Escribir la acusación final: ¿quién fue, y qué evidencia lo delata? (su presencia en la bóveda, el
total de pisadas, la medición anómala de profundidad...).

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
