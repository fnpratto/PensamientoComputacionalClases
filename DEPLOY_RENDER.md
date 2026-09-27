# Deploy en Render

Esta app es un proyecto **Vite + React** que compila a archivos estáticos (`dist/`). En Render se despliega como **Static Site**.

## 0. Base path (ya resuelto)

`vite.config.js` usa `base: '/'` por default, que es lo que necesita tanto Render (la app vive en la raíz del dominio) como correr local con `npm run dev`/`npm run preview`. El subpath de GitHub Pages (`/PensamientoComputacionalClases/`) solo se activa pasando `GH_PAGES=true` al build — el workflow de `.github/workflows/deploy.yml` ya lo hace automáticamente. No hace falta tocar nada para deployar en Render.

## 1. Subir los cambios a GitHub

Render se conecta directo al repo, así que el repo tiene que estar en GitHub/GitLab con los últimos cambios pusheados (incluido el ajuste del paso 0).

## 2. Crear el Static Site en Render

1. Entrá a [render.com](https://render.com) y logueate (podés usar tu cuenta de GitHub).
2. Click en **New +** → **Static Site**.
3. Conectá el repositorio `PensamientoComputacionalClases`.
4. Completá la configuración:
   - **Name**: el nombre que quieras (define la URL `<name>.onrender.com`).
   - **Branch**: `main` (o la branch que quieras deployar).
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. Click en **Create Static Site**.

## 3. Configurar rutas (SPA)

**No agregar ninguna regla de rewrite `/* → /index.html`.** Esta app NO es una SPA: es un sitio multi-página (`index.html` en la raíz + una página estática por clase en `/archive/<clase>/`). Si se agrega esa regla, Render intercepta TODAS las rutas — incluidas `/archive/unidad-2/`, `/archive/clase-3/`, etc. — y siempre sirve el `index.html` de la raíz, rompiendo los links a las clases archivadas (síntoma típico: cualquier link del menú "redirecciona" siempre a la misma página).

Si ya la agregaste, andá al dashboard del sitio → **Redirects/Rewrites** y borrala.

## 4. Variables de entorno (si aplica)

Si el proyecto usa variables de entorno (`import.meta.env.VITE_*`), configurarlas en **Environment** dentro del dashboard del Static Site antes del build.

## 5. Deploy automático

Por default Render hace **auto-deploy** en cada push a la branch configurada. Se puede desactivar desde **Settings** → **Auto-Deploy** si se prefiere deployar manualmente con **Manual Deploy**.

## 6. Verificar

Una vez terminado el build (se ve el log en el dashboard), abrir la URL `https://<name>.onrender.com` y confirmar que:
- Carga el `index.html`.
- Los assets (JS/CSS) cargan bien (revisar la consola del navegador por 404s, síntoma típico de un `base` mal configurado).
- Si la app se comunica con el backend de Apps Script (`apps-script-doGet.js`), confirmar que los requests no estén bloqueados por CORS al cambiar de dominio.

## Nota sobre el backend (Google Apps Script)

Este repo incluye `apps-script-doGet.js`, que parece ser un backend separado corriendo en Google Apps Script (no en Render). Render solo va a servir el frontend estático — el Apps Script sigue desplegándose por su cuenta desde el editor de Apps Script, sin cambios.
