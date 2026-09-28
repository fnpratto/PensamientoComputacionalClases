import { describe, expect, it } from 'vitest';
import { evaluateCase, formatValue, runFunctionTests } from './testRunner.js';

describe('evaluateCase', () => {
  it('numeric acepta la tolerancia y strings numéricos', () => {
    expect(evaluateCase(21500, { type: 'numeric', value: 21500 })).toBe(true);
    expect(evaluateCase('21500.004', { type: 'numeric', value: 21500 })).toBe(true);
    expect(evaluateCase(21501, { type: 'numeric', value: 21500 })).toBe(false);
    expect(evaluateCase('hola', { type: 'numeric', value: 1 })).toBe(false);
  });

  it('bool compara por veracidad', () => {
    expect(evaluateCase(true, { type: 'bool', value: true })).toBe(true);
    expect(evaluateCase(0, { type: 'bool', value: false })).toBe(true);
    expect(evaluateCase(null, { type: 'bool', value: true })).toBe(false);
  });

  it('exact ignora mayúsculas y espacios repetidos, y aplana listas anidadas', () => {
    expect(evaluateCase('  BCD  efg ', { type: 'exact', value: 'bcd efg' })).toBe(true);
    expect(evaluateCase([['vichar', 'chamuyar'], ['pucho']], { type: 'exact', value: 'vichar,chamuyar,pucho' })).toBe(true);
    expect(evaluateCase([['pucho'], ['vichar']], { type: 'exact', value: 'vichar,pucho' })).toBe(false);
  });

  it('exact trata el None de Python (null) como "null"', () => {
    expect(evaluateCase(null, { type: 'exact', value: 'null' })).toBe(true);
  });

  it('contains exige todas las partes y ninguna de las ausentes', () => {
    const tupla = ['a.est1', ['Física', 'Temas de Economía']];
    expect(evaluateCase(tupla, { type: 'contains', parts: ['a.est1', 'física'] })).toBe(true);
    expect(evaluateCase(tupla, { type: 'contains', parts: ['a.est1'], absent: ['algoritmos'] })).toBe(true);
    expect(evaluateCase(tupla, { type: 'contains', parts: ['a.est1'], absent: ['economía'] })).toBe(false);
    expect(evaluateCase(null, { type: 'contains', parts: ['x'] })).toBe(false);
  });

  it('un tipo desconocido nunca pasa', () => {
    expect(evaluateCase(1, { type: 'otro' })).toBe(false);
  });
});

describe('formatValue', () => {
  it('muestra strings con comillas y listas anidadas', () => {
    expect(formatValue(['a', [1, 2]])).toBe('["a", [1, 2]]');
    expect(formatValue(null)).toBe('(nada)');
  });
});

describe('runFunctionTests', () => {
  const spec = {
    funcName: 'doblar',
    cases: [
      { args: [2], expect: { type: 'numeric', value: 4 } },
      { args: [3], expect: { type: 'numeric', value: 6 } },
      { args: ['x'], stdin: ['hola'], expect: { type: 'stdout_contains', parts: ['hola'] } },
    ],
  };

  it('arma una fila por caso con etiqueta y detalle', async () => {
    const calls = [];
    const fakeRun = async (code, fn, args, stdin) => {
      calls.push({ fn, args, stdin });
      if (args[0] === 'x') return { ok: true, return_value: null, stdout: 'hola mundo' };
      return { ok: true, return_value: args[0] === 2 ? 4 : 7, stdout: '' };
    };
    const rows = await runFunctionTests('code', spec, fakeRun);

    expect(rows.map(r => r.pass)).toEqual([true, false, true]);
    expect(rows[1].label).toBe('doblar(3)');
    expect(rows[1].detail).toBe('Devolvió 7 — se esperaba 6.');
    expect(calls[2].stdin).toEqual(['hola']);
  });

  it('reporta los errores de Python y las excepciones del runner', async () => {
    const rows = await runFunctionTests('code', { funcName: 'f', cases: spec.cases.slice(0, 2) }, async (c, f, args) => {
      if (args[0] === 2) return { ok: false, error: 'NameError: x' };
      throw new Error('se cayó');
    });
    expect(rows[0]).toMatchObject({ pass: false, detail: 'Error al ejecutar: NameError: x' });
    expect(rows[1]).toMatchObject({ pass: false, detail: 'Error inesperado: se cayó' });
  });
});
