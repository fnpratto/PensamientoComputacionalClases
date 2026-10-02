/* Resaltador de Python minimalista para el código de las soluciones del paso a
   paso. Devuelve HTML con <span class="tok-..."> por token. Aparte del coloreo
   de sintaxis, marca "las cuatro cosas" con las mismas clases que el enunciado:
   los parámetros (recibe), return (devuelve), input() (pide) y print() (imprime).

   No pretende ser un parser completo: alcanza para el Python simple de la clase. */

const KEYWORDS = new Set([
  'def', 'while', 'for', 'in', 'if', 'elif', 'else', 'and', 'or', 'not', 'is',
  'None', 'True', 'False', 'import', 'from', 'as', 'pass', 'break', 'continue',
  'lambda', 'with', 'try', 'except', 'finally', 'raise', 'class',
]);

const BUILTINS = new Set([
  'len', 'int', 'str', 'float', 'bool', 'sum', 'sorted', 'map', 'filter', 'list',
  'tuple', 'dict', 'set', 'range', 'append', 'split', 'replace', 'lower', 'upper',
  'strip', 'get', 'items', 'keys', 'values', 'copy', 'pop', 'max', 'min', 'abs',
  'round', 'enumerate', 'zip', 'type', 'join', 'find', 'index', 'count',
]);

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function span(cls, text) {
  return `<span class="${cls}">${esc(text)}</span>`;
}

const TOKEN_RE = /(#[^\n]*)|([a-zA-Z]{0,2}"(?:[^"\\]|\\.)*"|[a-zA-Z]{0,2}'(?:[^'\\]|\\.)*')|(\d+\.?\d*)|([A-Za-z_]\w*)|(\s+)|([\s\S])/g;

export function highlightPython(code) {
  let out = '';
  let expectDefName = false; // el próximo identificador es el nombre de la función
  let afterDefName = false;  // ya vimos el nombre, esperamos el '(' de los parámetros
  let inParams = false;      // dentro de la firma: los identificadores son parámetros
  let depth = 0;

  let m;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(code)) !== null) {
    const [, comment, str, num, ident, ws, other] = m;

    if (comment !== undefined) { out += span('tok-com', comment); continue; }
    if (str !== undefined) { out += span('tok-str', str); continue; }
    if (num !== undefined) { out += span('tok-num', num); continue; }
    if (ws !== undefined) { out += esc(ws); continue; }

    if (ident !== undefined) {
      let cls;
      if (expectDefName) { cls = 'tok-def'; expectDefName = false; afterDefName = true; }
      else if (inParams) { cls = 'tok-recibe'; }
      else if (ident === 'def') { cls = 'tok-kw'; expectDefName = true; }
      else if (ident === 'return') { cls = 'tok-devuelve'; }
      else if (ident === 'input') { cls = 'tok-input'; }
      else if (ident === 'print') { cls = 'tok-imprime'; }
      else if (KEYWORDS.has(ident)) { cls = 'tok-kw'; }
      else if (BUILTINS.has(ident)) { cls = 'tok-builtin'; }
      else { cls = 'tok-var'; }
      out += span(cls, ident);
      continue;
    }

    // other: un carácter suelto (operador, paréntesis, dos puntos, etc.)
    if (afterDefName && other === '(') { inParams = true; depth = 1; afterDefName = false; }
    else if (inParams && other === '(') { depth++; }
    else if (inParams && other === ')') { depth--; if (depth === 0) inParams = false; }
    out += esc(other);
  }

  return out;
}
