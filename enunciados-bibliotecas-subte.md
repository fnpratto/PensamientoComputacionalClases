# Unidad 6 · Bibliotecas de Python — Detectives del Subte

Clase de **pandas + numpy + matplotlib** sobre **datos abiertos reales** del subte porteño:
el dataset *Subte: Viajes Molinetes* de SBASE (portal de datos abiertos del GCBA), año 2024.
Los datos crudos vienen por molinete cada 15 minutos; para la clase los limpiamos y agregamos
a dos vistas:

- `subte_diario_por_linea.csv` → columnas `fecha, linea, pasajeros` (total del día por línea).
- `subte_diario_por_estacion.csv` → columnas `fecha, linea, estacion, pasajeros`.

> Los dos archivos están en `public/datos/clase-subte/`. En Colab se cargan con
> `pd.read_csv('subte_diario_por_linea.csv')`.

Cada consigna está planteada en **estilo parcial**: un contexto y una función para escribir.
El hilo conductor es *Mateo*, que arranca como analista de datos en el subte.

Fuente: <https://data.buenosaires.gob.ar/dataset/subte-viajes-molinetes>

---

## Parte 1 · pandas

> Para estos ejercicios conviene usar Google Colab, con una celda por ejercicio.

1. **Pasajeros de un día.** El equipo de datos de SBASE le pasa a Mateo el archivo
   `subte_diario_por_linea.csv` (una fila por línea y por día). Para el informe diario, le piden
   que escriba `total_del_dia(archivo, fecha)` que devuelva el total de pasajeros de todo el subte
   en esa fecha (sumando todas las líneas).
2. **Pasajeros por línea.** Al jefe de Mateo no le alcanza con el total: quiere el desglose por
   línea de ese día. Le piden `pasajeros_por_linea(archivo, fecha)` que devuelva un diccionario
   `{linea: pasajeros}`.
3. **La línea más usada.** La gerencia quiere saber qué línea mueve más gente en todo el período
   para priorizar mantenimiento. Le piden `linea_mas_usada(archivo)` que devuelva la letra de la
   línea con más pasajeros sumando todos los días (`groupby` + `idxmax`).
4. **Top de estaciones.** Para reforzar molinetes, a Mateo le dan `subte_diario_por_estacion.csv`
   y le piden un ranking: `top_estaciones(archivo, linea, fecha, n)` que devuelva una lista con los
   nombres de las `n` estaciones con más pasajeros de esa línea ese día, de mayor a menor.

## Parte 2 · numpy

5. **Promedio.** Mateo tiene una lista con los pasajeros de cada día de una línea y necesita el
   valor típico para comparar. Le piden `promedio(valores)` que devuelva el promedio redondeado a
   2 decimales. Ejemplo: `promedio([10, 20, 30, 40, 50])` → `30.0`.
6. **El día más raro.** A Mateo le piden detectar el día que se despega del resto: el día más raro
   es el que **más se aleja del promedio**. `dia_mas_raro(valores)` devuelve la posición (índice)
   de ese día. Ejemplo: `dia_mas_raro([100, 102, 98, 101, 99, 250, 100])` → `5`
   (pista: `np.abs(a - a.mean()).argmax()`).

## Parte 3 · matplotlib (en Colab)

7. **Barras por línea.** Graficar con `plt.bar` el total de pasajeros de 2024 por línea.
   ¿Cuál es la línea más usada? ¿Y la menos?
8. **Serie temporal con el día más raro.** Graficar con `plt.plot` el total diario de pasajeros de
   todo el subte a lo largo del año. Marcar con `plt.scatter` (en rojo) el día que más se aleja del
   promedio. ¿Qué patrón aparece? (pista: la grilla semana/fin de semana).

## Integrador · estilo parcial

**Base:** archivos, pandas, numpy y matplotlib — armar un DataFrame desde un archivo y operar, o
guardar el resultado en un archivo. **Siempre graficar.**

**Inciso A.** Mateo mencionó que sabía algo de Python y trabaja en Amoba, por eso mismo le dan un
CSV con los pasajeros diarios del subte en 2024, `subte_diario_por_linea.csv`
(`fecha,linea,pasajeros`), y le piden que escriba `analizar_y_graficar_demanda(ruta_archivo)` que:

1. calcule el promedio de pasajeros por día de todo el subte (sumando las líneas de cada fecha);
2. calcule, para cada línea, su **porcentaje de participación** en la demanda total del año
   `participacion = (total_de_la_linea / total_general) * 100`;
3. grafique las líneas y su participación (gráfico de barras).

**Inciso B.** Como Mateo hizo un gran trabajo, ahora le piden que escriba
`exportar_dias_pico(ruta_archivo, linea, n)` que:

1. filtre solo las filas de la línea recibida por parámetro;
2. las ordene de mayor a menor según `pasajeros`;
3. exporte las `n` primeras filas (los `n` días de mayor demanda) a un CSV `dias_pico.csv`.

**Conclusión:** ¿qué línea concentra más demanda? ¿Los días pico son hábiles o fin de semana, y por
qué? Pista detectivesca: comparar un domingo contra un martes no es justo. Si mirás solo los días de
semana (lunes a viernes) y buscás los que más se alejan del promedio, van a aparecer los feriados:
Año Nuevo, Navidad, Carnaval, 1º de mayo... Bonus: ¿por qué falta octubre entero? ¿No viajó nadie,
o no hay datos?

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
