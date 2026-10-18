/* Apunte compartido de bibliotecas (Unidad 6): pandas, numpy y matplotlib.
   Los conceptos son los mismos para las dos clases, así que las dos lo importan.
   matplotlib va como ejemplos resueltos (en la página no se puede renderizar ni
   autocorregir): se practica en Colab.

   Uso:  guide: { ...bibliotecasGuide, title: '...' }  */

export const bibliotecasGuide = {
  eyebrow: 'Apunte',
  title: 'pandas, numpy y matplotlib en una página',
  description: 'Lo mínimo para resolver los ejercicios. Abrí el tema que necesites. Los ejemplos de matplotlib son para correr en Colab.',
  placement: 'before-exercises',
  method: {
    title: 'La idea de fondo: dejar que la biblioteca haga el trabajo',
    html: `<p class="guide-lead">Hasta ahora recorrías listas con <code>for</code>. Con estas bibliotecas describís <b>qué</b> querés y la biblioteca lo hace sobre todos los datos de una:</p>
<pre>import pandas as pd      # tablas (filas y columnas), como un Excel
import numpy as np       # arrays de números y cuentas vectorizadas
import matplotlib.pyplot as plt   # gráficos</pre>
<p><b>pandas</b> para leer y filtrar tablas, <b>numpy</b> para las cuentas (promedios, máximos, mínimos) y <b>matplotlib</b> para graficar. Casi nunca necesitás un <code>for</code>.</p>`,
  },
  groups: [
    {
      label: 'pandas',
      items: [
        {
          tag: 'Leer',
          title: 'Leer un CSV y mirarlo',
          html: `<pre>df = pd.read_csv('datos.csv')   # lo carga como DataFrame
df.head()        # primeras 5 filas
df.info()        # columnas, tipos y cuántas filas
df.shape         # (filas, columnas)
df.columns       # nombres de las columnas
df['pasajeros']  # una columna (una Serie)</pre>`,
        },
        {
          tag: 'Filtrar',
          title: 'Quedarse con algunas filas',
          html: `<p>Una condición sobre una columna da una Serie de <code>True/False</code>; metida entre corchetes, filtra:</p>
<pre>df[df['pasajeros'] &gt; 1000]              # filas con más de 1000
df[df['linea'] == 'B']                   # solo la línea B</pre>
<p>Para combinar condiciones, en pandas el <b>y</b> es <code>&amp;</code> y el <b>o</b> es <code>|</code>, con cada una entre paréntesis:</p>
<pre>df[(df['linea'] == 'B') &amp; (df['pasajeros'] &gt; 1000)]</pre>
<p><code>df['col'].isnull()</code> / <code>.notnull()</code> sirven para encontrar (o descartar) datos faltantes.</p>`,
        },
        {
          tag: 'Columnas',
          title: 'Agregar una columna calculada',
          html: `<p>Se opera columna con columna y el resultado se guarda en una columna nueva (nada de <code>for</code>):</p>
<pre>df['total'] = df['cantidad'] * df['precio']</pre>
<p>Ojo: <code>df[ ... ]</code> con corchetes <b>filtra</b>; para <b>crear</b> una columna va <code>df['nueva'] = ...</code>.</p>`,
        },
        {
          tag: 'Agrupar',
          title: 'Agrupar, sumar, contar y ordenar',
          html: `<pre>df.groupby('linea')['pasajeros'].sum()     # total por línea
df.groupby('linea')['pasajeros'].mean()    # promedio por línea
df['linea'].value_counts()                 # cuántas filas por línea

df.sort_values('pasajeros', ascending=False)   # de mayor a menor
df.sort_values('pasajeros', ascending=False).head(3)   # top 3</pre>
<p><code>.idxmax()</code> sobre el resultado de un <code>groupby</code> te da directamente la categoría con el valor más alto.</p>`,
        },
        {
          tag: 'Guardar',
          title: 'Escribir un CSV',
          html: `<pre>resultado.to_csv('salida.csv', index=False)</pre>
<p><code>index=False</code> evita que te guarde la columna del índice (0,1,2,...) que casi nunca querés.</p>`,
        },
      ],
    },
    {
      label: 'numpy',
      items: [
        {
          tag: 'Arrays',
          title: 'Crear arrays y hacer cuentas',
          html: `<pre>a = np.array([10, 20, 30, 40, 50])
a + 1          # suma 1 a todos: [11 21 31 41 51]
a * 2          # [20 40 60 80 100]
a[a &gt; 25]      # filtra igual que en pandas: [30 40 50]</pre>
<p>Una columna de pandas también es "casi" un array: <code>np.array(df['pasajeros'])</code> o directamente <code>df['pasajeros'].values</code>.</p>`,
        },
        {
          tag: 'Resúmenes',
          title: 'Promedio, máximo y mínimo',
          html: `<pre>a.mean()     # promedio   (o np.mean(a))
a.max()      # el valor más alto
a.min()      # el más bajo
a.sum()      # la suma de todos</pre>
<p>Con una línea sacás el número que resume a todo el array, sin recorrerlo con un <code>for</code>.</p>`,
        },
        {
          tag: 'El más raro',
          title: 'El valor que se sale de lo normal',
          html: `<p>¿Cuál es el valor más "raro"? El que <b>más se aleja del promedio</b>. Lo medimos con la distancia al promedio (<code>np.abs</code> para que sirva tanto hacia arriba como hacia abajo):</p>
<pre>media = a.mean()
distancias = np.abs(a - media)   # qué tan lejos está cada uno del promedio
pos = distancias.argmax()        # la posición del más alejado
print('El más raro está en la posición', pos, 'y vale', a[pos])</pre>
<p><code>argmax()</code> devuelve la <b>posición</b> del valor más grande (acá, la distancia más grande).</p>`,
        },
        {
          tag: 'Matrices',
          title: 'Matrices y utilidades',
          html: `<pre>m = np.array([[1, 2], [3, 4]])
m[0, 1]            # fila 0, columna 1 -&gt; 2
np.transpose(m)    # transpuesta
np.eye(4)          # identidad 4x4
np.dot(v1, v2)     # producto escalar</pre>`,
        },
      ],
    },
    {
      label: 'matplotlib (para Colab)',
      items: [
        {
          tag: 'Barras',
          title: 'Comparar categorías con barras',
          html: `<p>Ideal para comparar una cantidad entre pocas categorías (por ejemplo, el total por línea):</p>
<pre>totales = df.groupby('linea')['pasajeros'].sum()

plt.bar(totales.index, totales.values)
plt.title('Pasajeros por línea')
plt.xlabel('Línea')
plt.ylabel('Pasajeros')
plt.show()</pre>
<p>Se vería como una barra por línea; la más alta es la línea más usada.</p>`,
        },
        {
          tag: 'Serie temporal',
          title: 'Evolución en el tiempo con línea',
          html: `<p>Para ver cómo cambia algo día a día va el gráfico de línea, y el día más extremo se puede marcar aparte:</p>
<pre>diario = df.groupby('fecha')['pasajeros'].sum()

plt.plot(diario.index, diario.values)        # la serie día a día
raro = diario.idxmax()                        # el día de mayor pico
plt.scatter([raro], [diario[raro]], color='red')   # lo marca
plt.title('Pasajeros por día')
plt.show()</pre>
<p>La línea muestra la tendencia; el punto rojo resalta el día que sobresale.</p>`,
        },
        {
          tag: 'Varios',
          title: 'Grilla, leyenda y varios gráficos',
          html: `<pre>plt.plot(x, y1, label='2023')
plt.plot(x, y2, label='2024')
plt.legend()     # muestra las referencias
plt.grid()       # agrega la grilla
plt.show()</pre>`,
        },
      ],
    },
  ],
  closing: {
    title: 'Machete de referencia',
    html: `<table class="guide-table">
<thead><tr><th>Lo que necesitás</th><th>Cómo se escribe</th></tr></thead>
<tbody>
<tr><td>Leer un CSV</td><td><code>df = pd.read_csv('datos.csv')</code></td></tr>
<tr><td>Filtrar filas</td><td><code>df[df['col'] &gt; valor]</code> · combinar con <code>&amp;</code> / <code>|</code></td></tr>
<tr><td>Columna nueva</td><td><code>df['nueva'] = df['a'] * df['b']</code></td></tr>
<tr><td>Sumar/promediar por grupo</td><td><code>df.groupby('col')['x'].sum()</code> / <code>.mean()</code></td></tr>
<tr><td>Ordenar y top N</td><td><code>df.sort_values('x', ascending=False).head(N)</code></td></tr>
<tr><td>Promedio, máximo, mínimo</td><td><code>a.mean()</code> · <code>a.max()</code> · <code>a.min()</code></td></tr>
<tr><td>El más alejado del promedio</td><td><code>np.abs(a - a.mean()).argmax()</code></td></tr>
<tr><td>Guardar un CSV</td><td><code>df.to_csv('salida.csv', index=False)</code></td></tr>
<tr><td>Graficar (en Colab)</td><td><code>plt.bar(...)</code> / <code>plt.plot(...)</code> + <code>plt.show()</code></td></tr>
</tbody>
</table>`,
  },
};
