import { runPython } from './pyodide.js';

export function formatValue(v) {
  if (v === null || v === undefined) return '(nada)';
  if (typeof v === 'string') return `"${v}"`;
  if (Array.isArray(v)) return `[${v.map(formatValue).join(', ')}]`;
  return String(v);
}

const lower = s => String(s ?? '').toLowerCase().trim();
const squash = s => String(s).toLowerCase().trim().replace(/\s+/g, ' ');

/**
 * Compara el valor obtenido con lo esperado por un caso de test.
 * Las tuplas/listas de Python llegan como arrays: String(array) las aplana
 * con comas, que es sobre lo que trabajan 'exact' y 'contains'. En 'exact',
 * un None de Python llega como null y se compara contra el texto 'null'.
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
      return squash(actual) === squash(expect.value);
    case 'contains':
    case 'stdout_contains': {
      const s = lower(actual);
      return expect.parts.every(p => s.includes(lower(p)))
        && (expect.absent ?? []).every(p => !s.includes(lower(p)));
    }
    default:
      return false;
  }
}

function describeResult(result, expect, pass) {
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
      const result = await run(code, spec.funcName, c.args, c.stdin ?? []);
      if (!result.ok) {
        rows.push({ pass: false, label, detail: `Error al ejecutar: ${result.error}` });
        continue;
      }
      const actual = c.expect.type === 'stdout_contains' ? result.stdout : result.return_value;
      const pass = evaluateCase(actual, c.expect);
      rows.push({ pass, label, detail: describeResult(result, c.expect, pass) });
    } catch (err) {
      rows.push({ pass: false, label, detail: `Error inesperado: ${err.message || err}` });
    }
  }
  return rows;
}
