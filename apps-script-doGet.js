/**
 * PEGAR ESTO EN EL EDITOR DE GOOGLE APPS SCRIPT (no se ejecuta desde el repo).
 *
 * Es la contraparte de lectura del webhook que ya usa `sendToSheet` en
 * repaso.html: devuelve las entregas de un ejercicio para la galería
 * "Ver otras soluciones".
 *
 * Después de pegarlo: Deploy → Manage deployments → editar el deployment
 * existente → New version → Save. (Si creás un deployment NUEVO en vez de
 * versionar el existente, cambia la URL /exec y hay que actualizar
 * SHEET_WEBHOOK en repaso.html e index.html.)
 *
 * Probar a mano en el navegador:
 *   https://script.google.com/macros/s/.../exec?sheet=Repaso-Parcial-1&callback=foo
 * Tiene que devolver  foo({"ok":true,"items":[...]})  y NINGÚN nombre adentro.
 *
 * PRIVACIDAD: el nombre se sigue guardando en la planilla (lo necesitás para
 * corregir) pero nunca sale por acá. No agregar `nombre` a los items.
 */

function doGet(e) {
  var sheetName = (e.parameter.sheet || '').trim();
  var callback  = (e.parameter.callback || '').trim();
  var out;

  try {https://script.google.com/home
    out = { ok: true, items: readSubmissions_(sheetName) };
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

function readSubmissions_(sheetName) {
  if (!sheetName) return [];

  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sh || sh.getLastRow() < 2) return [];

  var rows    = sh.getDataRange().getValues();
  var headers = rows[0].map(function (h) { return String(h).trim().toLowerCase(); });

  // Por nombre de encabezado, no por índice fijo: así no depende del orden
  // en que doPost escriba las columnas.
  var iResp = headers.indexOf('respuestas');
  var iCorr = headers.indexOf('correctas');
  if (iResp === -1) throw new Error('Falta la columna "respuestas" en ' + sheetName);

  var items = [];
  var seen  = {};

  for (var r = 1; r < rows.length; r++) {
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
