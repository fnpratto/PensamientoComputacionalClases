# Unidad 6 · Bibliotecas de Python — Detectives del Subte

Clase de **pandas + numpy + matplotlib** sobre **datos abiertos reales** del subte
porteño: el dataset *Subte: Viajes Molinetes* de SBASE (portal de datos abiertos del
GCBA), año 2024. Los datos crudos vienen por molinete cada 15 minutos; para la clase
los limpiamos y agregamos a dos vistas:

- `subte_diario_por_linea.csv` → columnas `fecha, linea, pasajeros` (total del día por línea).
- `subte_diario_por_estacion.csv` → columnas `fecha, linea, estacion, pasajeros`.

> Los dos archivos están en `public/datos/clase-subte/`. En Colab se cargan con
> `pd.read_csv('subte_diario_por_linea.csv')`.

Dato de color (y parte del caso): los **fines de semana y feriados** tienen muchísimos
menos pasajeros que un día de semana, y hay días que directamente **faltan** en los
datos (¡todo octubre de 2024!). Un detective de datos siempre desconfía primero de los datos.

Fuente: <https://data.buenosaires.gob.ar/dataset/subte-viajes-molinetes>

---

## Parte 1 · pandas

> Para estos ejercicios conviene usar Google Colab, con una celda por ejercicio.

Trabajá con `subte_diario_por_linea.csv` salvo que se indique lo contrario.

1. Leer el CSV y mostrar las primeras 5 filas, la forma (`shape`) y la info (`info()`).
2. **Pasajeros de un día.** Escribir `total_del_dia(archivo, fecha)` que devuelva el
   total de pasajeros de todo el subte en esa fecha (sumando todas las líneas).
3. **Pasajeros por línea.** Escribir `pasajeros_por_linea(archivo, fecha)` que devuelva
   un diccionario `{linea: pasajeros}` con lo de cada línea en esa fecha.
4. **La línea más usada.** Escribir `linea_mas_usada(archivo)` que devuelva la letra de
   la línea con más pasajeros sumando todos los días (`groupby` + `idxmax`).
5. **Top de estaciones.** Usando `subte_diario_por_estacion.csv`, escribir
   `top_estaciones(archivo, linea, fecha, n)` que devuelva una lista con los nombres de
   las `n` estaciones con más pasajeros de esa línea ese día, de mayor a menor.
6. **Días hábiles vs fin de semana.** Agregar una columna con el día de la semana
   (`pd.to_datetime(df['fecha']).dt.weekday`) y comparar el promedio de pasajeros de los
   días de semana contra el de los fines de semana.
7. **Guardar un recorte.** Guardar en `marzo.csv` solo las filas del mes de marzo.

## Parte 2 · numpy

8. **Promedio.** Escribir `promedio(valores)` que reciba una lista de números y devuelva
   el promedio redondeado a 2 decimales. Ejemplo: `promedio([10, 20, 30, 40, 50])` → `30.0`.
9. **El día más raro.** El día más raro es el que **más se aleja del promedio** (para
   arriba o para abajo). Escribir `dia_mas_raro(valores)` que devuelva la posición
   (índice) de ese día. Ejemplo:
   `dia_mas_raro([100, 102, 98, 101, 99, 250, 100])` → `5`
   (pista: `np.abs(a - a.mean()).argmax()`).
10. Tomar la serie de pasajeros diarios de la Línea B, pasarla a un array de numpy y
    calcular su promedio, su máximo, su mínimo, y qué día (posición) se aleja más del promedio.

## Parte 3 · matplotlib (en Colab)

11. **Barras por línea.** Graficar con `plt.bar` el total de pasajeros de 2024 por línea.
    ¿Cuál es la línea más usada? ¿Y la menos?
12. **Serie temporal con el día más raro.** Graficar con `plt.plot` el total diario de
    pasajeros de todo el subte a lo largo del año. Marcar con `plt.scatter` (en rojo) el
    día que más se aleja del promedio. ¿Qué patrón aparece? (pista: la grilla
    semana/fin de semana).
13. Elegir una línea y graficar su serie diaria. Marcar el feriado que más la afectó.

## Producto final · ¿Qué día fue el más raro del año y por qué?

Con el dataset completo `subte_diario_por_linea.csv`:

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('subte_diario_por_linea.csv')
diario = df.groupby('fecha')['pasajeros'].sum()   # total de todo el subte por día

media = diario.mean()
raro = (diario - media).abs().idxmax()             # el día que más se aleja del promedio
print('El día más raro fue', raro)

plt.plot(range(len(diario)), diario.values)
plt.title('Pasajeros por día — Subte 2024')
plt.show()
```

Escribir la conclusión respondiendo:

- ¿El día más raro es un pico hacia arriba o hacia abajo?
- ¿Es un feriado, un evento especial, un paro, o un problema de los datos?
- **Pista detectivesca:** comparar un domingo contra un martes no es justo. Si mirás
  **solo los días de semana** (lunes a viernes) y buscás los que más se alejan del
  promedio, van a aparecer los feriados: Año Nuevo, Navidad, Carnaval, 1º de mayo...
- Bonus: ¿por qué falta octubre entero? ¿Es que no viajó nadie, o es que no hay datos?

## Evaluación de código

Encontrá y corregí los errores.

**a.** Debería mostrar las líneas con más de 100000 pasajeros en un día:

```python
def lineas_llenas(archivo):
    df = pd.read_csv(archivo)
    llenas = df[df[2] > '100000']
    print(llenas)
```

**b.** Debería devolver el promedio de una lista de pasajeros, pero da error:

```python
def promedio(valores):
    array = np.array(valores)
    for v in array:
        suma += v
        cant += v
    return suma / cant
```
