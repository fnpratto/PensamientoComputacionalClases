import { pccRun } from './pyodide.js';

export function normalize(str) {
  return str.toString().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().trim().replace(/\s+/g, ' ');
}

export function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, ch => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
  ));
}

export function fmtVal(v) {
  if (v === null || v === undefined) return '(nada)';
  if (typeof v === 'string') return '"' + v + '"';
  return String(v);
}

export function evalCase(actual, expect) {
  switch (expect.type) {
    case 'numeric': {
      const num = typeof actual === 'number' ? actual : parseFloat(actual);
      if (Number.isNaN(num)) return false;
      return Math.abs(num - expect.value) < (expect.tolerance ?? 0.001);
    }
    case 'bool':
      return Boolean(actual) === Boolean(expect.value);
    case 'exact':
      return normalize(String(actual)) === normalize(String(expect.value));
    case 'contains': {
      const s = normalize(String(actual ?? ''));
      return expect.parts.every(p => s.includes(normalize(p)));
    }
    default:
      return false;
  }
}

export async function runFunctionTests(code, spec) {
  const rows = [];
  for (const c of spec.cases) {
    const callLabel = spec.funcName + '(' + c.args.map(fmtVal).join(', ') + ')';
    try {
      const r = await pccRun(code, spec.funcName, c.args, []);
      if (!r.ok) {
        rows.push({ pass: false, label: callLabel, detail: 'Error al ejecutar: ' + r.error });
      } else {
        let pass, detail;
        if (c.expect.type === 'stdout_contains') {
          const s = normalize(r.stdout ?? '');
          pass = c.expect.parts.every(p => s.includes(normalize(p)));
          detail = pass
            ? 'Imprimió el contenido esperado.'
            : 'Se esperaba que imprimiera: ' + c.expect.parts.join(', ') + '.\nImprimió: ' + (r.stdout || '(nada)');
        } else {
          pass = evalCase(r.return_value, c.expect);
          const expectedDesc = c.expect.value !== undefined ? fmtVal(c.expect.value) : c.expect.parts.join(', ');
          detail = pass
            ? 'Devolvió ' + fmtVal(r.return_value) + ', como se esperaba.'
            : 'Devolvió ' + fmtVal(r.return_value) + ' — se esperaba algo equivalente a ' + expectedDesc + '.';
        }
        rows.push({ pass, label: callLabel, detail });
      }
    } catch (err) {
      rows.push({ pass: false, label: callLabel, detail: 'Error inesperado: ' + (err.message || err) });
    }
  }
  return rows;
}
