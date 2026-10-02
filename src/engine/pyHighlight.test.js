import { describe, expect, it } from 'vitest';
import { highlightPython } from './pyHighlight.js';

describe('highlightPython', () => {
  it('marca los parámetros de la firma como "recibe" y el nombre como def', () => {
    const html = highlightPython('def guardar_libros(peso_max, id_estante):');
    expect(html).toContain('<span class="tok-def">guardar_libros</span>');
    expect(html).toContain('<span class="tok-recibe">peso_max</span>');
    expect(html).toContain('<span class="tok-recibe">id_estante</span>');
  });

  it('marca return/input/print con las clases semánticas', () => {
    expect(highlightPython('return (a, b)')).toContain('<span class="tok-devuelve">return</span>');
    expect(highlightPython('x = input("hola")')).toContain('<span class="tok-input">input</span>');
    expect(highlightPython('print(total)')).toContain('<span class="tok-imprime">print</span>');
  });

  it('colorea keywords, strings, números y comentarios, y escapa el HTML', () => {
    const html = highlightPython('while i <= 4:  # tope\n    s = "hi"');
    expect(html).toContain('<span class="tok-kw">while</span>');
    expect(html).toContain('<span class="tok-num">4</span>');
    expect(html).toContain('<span class="tok-str">"hi"</span>');
    expect(html).toContain('<span class="tok-com"># tope</span>');
    expect(html).toContain('&lt;='); // el <= queda escapado, no rompe el HTML
  });

  it('fuera de la firma, los parámetros usados en el cuerpo no se marcan como recibe', () => {
    const html = highlightPython('def f(x):\n    return x');
    // la x del cuerpo es una variable común
    expect(html).toContain('<span class="tok-devuelve">return</span> <span class="tok-var">x</span>');
  });
});
