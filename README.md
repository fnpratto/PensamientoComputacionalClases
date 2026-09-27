# Pensamiento Computacional · Clases

Material de las clases de Pensamiento Computacional (FIUBA). Cada clase es una página HTML standalone. `index.html` en la raíz es el landing "Recap Clases", con acceso a todas.

## Correr local

Requiere [Node.js](https://nodejs.org/) 20+.

```bash
npm install
npm run dev
```

Esto levanta un servidor local (por default en `http://localhost:5173`) con hot reload.

### Otros comandos

```bash
npm run build     # genera el sitio estático en dist/
npm run preview   # sirve el build de dist/ localmente, para probar antes de deployar
```

## Estructura

- `index.html` — landing "Recap Clases": lista todas las clases, de la más reciente a la primera.
- `public/archive/<clase>/` — snapshot estático de cada clase (incluida la más reciente; se copian tal cual al build; ver [DEPLOY_RENDER.md](DEPLOY_RENDER.md) para más contexto sobre cómo se generan). Cada una tiene un link "← Todas las clases" para volver al landing.
- `src/` — app React (`El Descenso`), usada solo para archivar `unidad-2`; las clases posteriores son HTML standalone y no dependen de esto.
- `apps-script-doGet.js` — backend de Google Apps Script (autenticación por clave de clase + logging de ejercicios a un Google Sheet). Se despliega aparte, desde el editor de Apps Script — no corre localmente.

## Deploy

Ver [DEPLOY_RENDER.md](DEPLOY_RENDER.md) para los pasos de deploy en Render.
