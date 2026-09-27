/**
 * PEGAR ESTO EN EL EDITOR DE GOOGLE APPS SCRIPT (no se ejecuta desde el repo).
 *
 * Es la contraparte de lectura del webhook que ya usa `sendToSheet` en
 * repaso.html. Dos acciones:
 *   ?action=auth&pass=XXX          → valida la clave de la semana y devuelve el roster
 *   ?action=submissions&sheet=...  → entregas anónimas para la galería
 *
 * ─── PUESTA EN MARCHA (una sola vez) ────────────────────────────────────
 *
 * 1. Pegar este archivo en el editor de Apps Script.
 *
 * 2. Crear la clave de la semana en:
 *      Configuración del proyecto ⚙ → Propiedades del script → Agregar
 *      Propiedad: CLASS_PASSWORD     Valor: la clave que digas en clase
 *
 *    IMPORTANTE: la clave va acá y NO en este archivo, porque el archivo está
 *    versionado en el repo público. Para cambiarla cada semana se edita esta
 *    propiedad: no hace falta tocar el repo ni redeployar.
 *
 * 3. Crear en la planilla una hoja llamada `Alumnos`, con `nombre` en A1 y un
 *    alumno por fila debajo.
 *
 * 4. Deploy → Manage deployments → editar el deployment existente → New
 *    version → Save. (Si creás un deployment NUEVO en vez de versionar el
 *    existente cambia la URL /exec, y hay que actualizar SHEET_WEBHOOK en
 *    repaso.html.)
 *
 * ─── PROBAR A MANO ──────────────────────────────────────────────────────
 *
 *   .../exec?action=auth&pass=CLAVE_MAL&callback=foo
 *     → foo({"ok":false,"error":"bad_pass"})   y NINGÚN nombre adentro
 *   .../exec?action=auth&pass=CLAVE_BIEN&callback=foo
 *     → foo({"ok":true,"roster":["..."]})
 *   .../exec?action=submissions&sheet=Repaso-Quiz&callback=foo
 *     → foo({"ok":true,"items":[]})            vacío: solo Repaso-Parcial-N
 *
 * PRIVACIDAD: el nombre del alumno se sigue guardando en la planilla (lo
 * necesitás para corregir) pero nunca sale por `submissions`. No agregar
 * `nombre` a los items.
 */

/** Únicas hojas que `submissions` puede leer. */
var SHEETS_PUBLICOS = /^Repaso-Parcial-[1-7]$/;

function doGet(e) {
  var p        = e.parameter || {};
  var action   = (p.action || 'submissions').trim();
  var callback = (p.callback || '').trim();
  var out;

  try {
    if (action === 'auth') {
      out = auth_((p.pass || '').trim());
    } else {
      // Sin `action` se asume submissions, por compatibilidad con lo ya desplegado.
      out = { ok: true, items: readSubmissions_((p.sheet || '').trim()) };
    }
  } catch (err) {
    out = { ok: false, error: String(err) };
  }

  var body = JSON.stringify(out);

  // JSONP: el <script> tag del cliente esquiva CORS, que en Apps Script no es
  // confiable porque /exec redirige a googleusercontent.com.
  if (callback && /^[A-Za-z_$][\w$]*$/.test(callback)) {
    return ContentService
      .createTextOutput(callback + '(' + body + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(body)
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Valida la clave de la semana. El roster solo se devuelve si la clave es
 * correcta: es la única razón de ser de esta función.
 */
function auth_(pass) {
  var esperada = PropertiesService.getScriptProperties().getProperty('CLASS_PASSWORD');

  if (!esperada) return { ok: false, error: 'no_password_configured' };
  if (!pass || pass !== esperada) return { ok: false, error: 'bad_pass' };

  return { ok: true, roster: readRoster_() };
}

function readRoster_() {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Alumnos');
  if (!sh || sh.getLastRow() < 2) return [];

  var rows    = sh.getDataRange().getValues();
  var headers = rows[0].map(function (h) { return String(h).trim().toLowerCase(); });
  var iNombre = headers.indexOf('nombre');
  if (iNombre === -1) throw new Error('La hoja "Alumnos" no tiene una columna "nombre"');

  var nombres = [];
  for (var r = 1; r < rows.length; r++) {
    var n = String(rows[r][iNombre] || '').trim();
    if (n) nombres.push(n);
  }
  return nombres;
}

/**
 * doPost (en el mismo proyecto de Apps Script, no versionado acá) no escribe
 * columnas fijas "respuestas"/"correctas": arma los headers dinámicamente
 * como "P1: <texto del ejercicio>" y "P1 ¿Correcta?" en la fila que sigue al
 * podio (HEADER_ROW = 6 en doPost, filas 1–5 son el 🏆 TOP 3). Para las hojas
 * de Repaso-Parcial-N cada entrega tiene una sola pregunta, así que buscamos
 * la primera columna que empiece con "p1:" / "p1 ¿correcta" en vez de un
 * nombre fijo, y ubicamos la fila de headers buscando "timestamp" en vez de
 * asumir que está en la fila 1.
 */
function findHeaderRowIndex_(rows) {
  var limit = Math.min(rows.length, 20);
  for (var i = 0; i < limit; i++) {
    if (String(rows[i][0]).trim().toLowerCase() === 'timestamp') return i;
  }
  return 0;
}

function readSubmissions_(sheetName) {
  if (!sheetName) return [];

  // Allowlist. Sin esto, cualquiera podría pedir Repaso-Quiz o U4pt2-Quiz y
  // leer las respuestas del quiz de todos. Devolvemos [] en vez de un error
  // para no confirmar si la hoja pedida existe.
  if (!SHEETS_PUBLICOS.test(sheetName)) return [];

  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sh || sh.getLastRow() < 2) return [];

  var rows       = sh.getDataRange().getValues();
  var headerIdx  = findHeaderRowIndex_(rows);
  var headers    = rows[headerIdx].map(function (h) { return String(h).trim().toLowerCase(); });

  var iResp = -1, iCorr = -1;
  for (var h = 0; h < headers.length; h++) {
    if (iResp === -1 && /^p1:/.test(headers[h])) iResp = h;
    if (iCorr === -1 && /^p1\s*¿correcta/.test(headers[h])) iCorr = h;
  }
  if (iResp === -1) throw new Error('No se encontró la columna de respuestas ("P1: ...") en ' + sheetName);

  var items = [];
  var seen  = {};

  for (var r = headerIdx + 1; r < rows.length; r++) {
    var codigo = firstOf_(rows[r][iResp], '');
    if (typeof codigo !== 'string' || !codigo.trim()) continue;

    // Dedupe: la misma solución entregada dos veces aparece una sola vez.
    var key = codigo.replace(/\s+/g, ' ').trim();
    if (seen[key]) continue;
    seen[key] = true;

    items.push({
      codigo:   codigo,
      correcta: iCorr === -1 ? false : firstOf_(rows[r][iCorr], false) === true
    });
  }
  return items;
}

/** Las celdas guardan arrays JSON de un solo elemento; saca el primero. */
function firstOf_(cell, fallback) {
  if (cell === '' || cell === null || cell === undefined) return fallback;
  try {
    var parsed = JSON.parse(cell);
    if (Object.prototype.toString.call(parsed) === '[object Array]') {
      return parsed.length ? parsed[0] : fallback;
    }
    return parsed;
  } catch (err) {
    return cell; // no era JSON: devolver el valor crudo
  }
}
