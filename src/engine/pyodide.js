import HARNESS_PY from './harness.py?raw';

const PYODIDE_VERSION = '0.26.4';
const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

let pyodidePromise = null;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error('No se pudo descargar el intérprete de Python.'));
    document.head.appendChild(script);
  });
}

/** Carga Pyodide una sola vez; las llamadas siguientes reusan la misma instancia. */
export function getPyodide() {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      if (!window.loadPyodide) await loadScript(`${PYODIDE_BASE}pyodide.js`);
      const py = await window.loadPyodide({ indexURL: PYODIDE_BASE });
      py.runPython(HARNESS_PY);
      return py;
    })();
    pyodidePromise.catch(() => { pyodidePromise = null; });
  }
  return pyodidePromise;
}

/**
 * Corre el código del alumno. `files` siembra el directorio de trabajo (los
 * ejercicios de archivos necesitan sus .txt); el resultado trae en `files` los
 * archivos que quedaron, para poder verificar lo que el código escribió.
 */
export async function runPython(code, funcName, args = [], stdin = [], files = {}) {
  const py = await getPyodide();
  const json = py.globals.get('_pcc_run')(
    code, funcName || null, JSON.stringify(args), JSON.stringify(stdin), JSON.stringify(files),
  );
  return JSON.parse(json);
}

export async function checkPractices(code, requiredNames = []) {
  const py = await getPyodide();
  const json = py.globals.get('_pcc_check_practices')(code, JSON.stringify(requiredNames));
  return JSON.parse(json);
}
