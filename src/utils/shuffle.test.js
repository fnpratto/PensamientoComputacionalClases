import { describe, expect, it } from 'vitest';
import { shuffle } from './shuffle.js';

describe('shuffle', () => {
  it('devuelve los mismos elementos sin modificar el original', () => {
    const original = [1, 2, 3, 4, 5];
    const result = shuffle(original);
    expect([...result].sort()).toEqual(original);
    expect(original).toEqual([1, 2, 3, 4, 5]);
  });

  it('usa la fuente de aleatoriedad que se le pasa', () => {
    expect(shuffle(['a', 'b', 'c'], () => 0)).toEqual(['b', 'c', 'a']);
  });
});
