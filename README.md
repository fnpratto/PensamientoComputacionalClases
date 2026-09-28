# Pensamiento Computacional · Clases

Material de las clases de Pensamiento Computacional (FIUBA). `index.html` en la raíz es el landing "Recap Clases", con acceso a todas.

## Correr local

Requiere [Node.js](https://nodejs.org/) 20+.

```bash
npm install
npm run dev        # servidor local con hot reload (http://localhost:5173)
```

### Otros comandos

```bash
npm test           # tests (motor de tests + validación de los datos de cada clase)
npm run lint       # ESLint
npm run build      # genera el sitio estático en dist/
npm run preview    # sirve el build de dist/ para probarlo antes de deployar
```

## Estructura

Hay dos tipos de clase:

- **Clases React** (`clase-repaso`, `clase-post-parcial`): una página por clase, armada con componentes compartidos a partir de un archivo de datos.
- **Clases archivadas** (`public/archive/<clase>/`): HTML sueltos de clases anteriores. Se copian tal cual al build.

```
index.html                         landing
archive/<clase>/index.html         página de cada clase React (solo el <head> y el tema)
public/archive/<clase>/            clases archivadas (HTML suelto)
src/
  pages/<clase>.jsx                punto de entrada de cada página
  courses/<clase>.js               datos de la clase: quiz, ejercicios, tests, textos
  courses/catalog.js               clases del menú "Todas las clases"
  courses/types.js                 forma de los datos (JSDoc)
  components/                      UI compartida (gate, quiz, ejercicios, galería, nav)
  engine/                          Pyodide (Python en el navegador) + evaluación de tests
  services/sheets.js               envío de entregas y lectura de la galería (Apps Script)
  styles/class-page.css            estilos; los temas se eligen con <html data-theme>
```

## Agregar una clase nueva

1. Copiar `src/courses/clase-post-parcial.js` a `src/courses/<clase>.js` y cambiar los datos.
2. Crear `src/pages/<clase>.jsx` (tres líneas, igual que las otras).
3. Crear `archive/<clase>/index.html` copiando uno existente: cambiar `<title>`, favicon, `data-theme` y la ruta del script.
4. Sumarla a `src/courses/catalog.js` (con `hidden: true` si todavía no se anuncia) y al landing `index.html`.
5. Si tiene galería de soluciones, agregar sus hojas al allowlist `SHEETS_PUBLICOS` del doGet en Apps Script.

`npm test` valida que la clase tenga página, datos y entrada en el catálogo, y que cada pregunta y ejercicio estén bien armados.

La contraseña opcional de una clase (`gate.password`) queda visible en el bundle: sirve para que nadie entre antes de tiempo, no para proteger contenido.

## Backend (Google Apps Script)

`apps-script-doGet.js` (local, fuera de git; ver `.gitignore`) es la lectura de entregas para la galería. Vive en el editor de Apps Script; el archivo local es solo referencia. `doPost` (el que guarda las entregas) está solo en Apps Script.
