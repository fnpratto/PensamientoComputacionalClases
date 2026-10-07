import { runPython } from './pyodide.js';

export function formatValue(v) {
  if (v === null || v === undefined) return '(nada)';
  if (typeof v === 'string') return `"${v}"`;
  if (Array.isArray(v)) return `[${v.map(formatValue).join(', ')}]`;
  if (typeof v === 'object') return `{${Object.entries(v).map(([k, val]) => `${k}: ${formatValue(val)}`).join(', ')}}`;
  return String(v);
}

const lower = s => String(s ?? '').toLowerCase().trim();
const squash = s => String(s).toLowerCase().trim().replace(/\s+/g, ' ');

/**
 * Forma canónica para comparar diccionarios/listas de diccionarios: ordena las
 * claves (en Python el orden de las claves no cuenta para la igualdad) pero
 * respeta el orden de las listas, que sí es significativo.
 */
function canonical(v) {
  if (Array.isArray(v)) return `[${v.map(canonical).join(',')}]`;
  if (v && typeof v === 'object') {
    return `{${Object.keys(v).sort().map(k => `${JSON.stringify(k)}:${canonical(v[k])}`).join(',')}}`;
  }
  return JSON.stringify(v ?? null);
}

/**
 * Compara el valor obtenido con lo esperado por un caso de test.
 * Las tuplas/listas de Python llegan como arrays: String(array) las aplana
 * con comas, que es sobre lo que trabajan 'exact' y 'contains'. En 'exact',
 * un None de Python llega como null y se compara contra el texto 'null'.
 *
 * En los tipos 'file_*', `actual` es el contenido del archivo (ver
 * `actualFor`), así que reusan los mismos comparadores.
 */
export function evaluateCase(actual, expect) {
  switch (expect.type) {
    case 'numeric': {
      const num = typeof actual === 'number' ? actual : parseFloat(actual);
      return !Number.isNaN(num) && Math.abs(num - expect.value) < (expect.tolerance ?? 0.01);
    }
    case 'bool':
      return Boolean(actual) === Boolean(expect.value);
    case 'exact':
    case 'file_exact':
      return squash(actual) === squash(expect.value);
    case 'json':
      return canonical(actual) === canonical(expect.value);
    case 'contains':
    case 'stdout_contains':
    case 'file_contains': {
      const s = lower(actual);
      return expect.parts.every(p => s.includes(lower(p)))
        && (expect.absent ?? []).every(p => !s.includes(lower(p)));
    }
    default:
      return false;
  }
}

const FILE_TYPES = ['file_exact', 'file_contains'];

/** Qué parte del resultado mira cada tipo de expect: lo impreso, un archivo o lo devuelto. */
function actualFor(result, expect) {
  if (expect.type === 'stdout_contains') return result.stdout;
  if (FILE_TYPES.includes(expect.type)) return result.files?.[expect.path] ?? '';
  return result.return_value;
}

function describeResult(result, expect, pass) {
  if (FILE_TYPES.includes(expect.type)) {
    const content = result.files?.[expect.path];
    if (content === undefined) {
      const creados = Object.keys(result.files ?? {});
      return `No se creó el archivo ${expect.path}.`
        + (creados.length ? ` Quedaron: ${creados.join(', ')}.` : '');
    }
    const wanted = expect.type === 'file_exact' ? expect.value : expect.parts.join(', ');
    return pass
      ? `${expect.path} quedó con el contenido esperado.`
      : `En ${expect.path} se esperaba: ${wanted}.\nQuedó: ${content || '(vacío)'}`;
  }
  if (expect.type === 'stdout_contains') {
    return pass
      ? 'Imprimió el contenido esperado.'
      : `Se esperaba que imprimiera: ${expect.parts.join(', ')}.\nImprimió: ${result.stdout || '(nada)'}`;
  }
  const got = formatValue(result.return_value);
  if (pass) return `Devolvió ${got}, como se esperaba.`;
  const wanted = expect.value !== undefined ? formatValue(expect.value) : expect.parts.join(', ');
  return `Devolvió ${got} — se esperaba ${wanted}.`;
}

export async function runFunctionTests(code, spec, run = runPython) {
  const rows = [];
  for (const c of spec.cases) {
    const label = `${spec.funcName}(${c.args.map(formatValue).join(', ')})`;
    try {
      const result = await run(code, spec.funcName, c.args, c.stdin ?? [], c.files ?? {});
      if (!result.ok) {
        rows.push({ pass: false, label, detail: `Error al ejecutar: ${result.error}` });
        continue;
      }
      const pass = evaluateCase(actualFor(result, c.expect), c.expect);
      rows.push({ pass, label, detail: describeResult(result, c.expect, pass) });
    } catch (err) {
      rows.push({ pass: false, label, detail: `Error inesperado: ${err.message || err}` });
    }
  }
  return rows;
}
