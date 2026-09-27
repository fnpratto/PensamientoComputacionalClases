/* Backend: Google Apps Script. doPost escribe las entregas en la planilla;
   doGet (apps-script-doGet.js, fuera de git) devuelve las de las hojas
   permitidas para la galería de soluciones. */
export const SHEET_WEBHOOK =
  'https://script.google.com/macros/s/AKfycbxixKO-IHvlg3OzajxcbINbx6UwP0Li_tTuhI8MLQiIqPrNnmq7XVW9Cm_15B-8c6Li/exec';

/**
 * @param {string} sheet
 * @param {string} studentName
 * @param {{pregunta: string, respuesta: string, correcta: boolean}[]} results
 * @param {number} score
 * @param {number} total
 */
export async function submitResults(sheet, studentName, results, score, total) {
  const body = new URLSearchParams({
    sheet,
    nombre: studentName,
    puntaje: `${score}/${total}`,
    preguntas: JSON.stringify(results.map(r => r.pregunta)),
    respuestas: JSON.stringify(results.map(r => r.respuesta)),
    correctas: JSON.stringify(results.map(r => r.correcta)),
    notas: JSON.stringify(results.map(() => '')),
  });
  // no-cors: la respuesta es opaca, solo sabemos si la red falló.
  await fetch(SHEET_WEBHOOK, { method: 'POST', mode: 'no-cors', body });
}

/* JSONP: Apps Script redirige a googleusercontent.com y sus headers CORS no
   son confiables; un <script> tag esquiva el problema entero. */
function jsonp(params, timeoutMs = 12000) {
  return new Promise((resolve, reject) => {
    const cb = `pccCb${Date.now()}${Math.floor(Math.random() * 1e6)}`;
    const script = document.createElement('script');
    const timer = setTimeout(() => { cleanup(); reject(new Error('timeout')); }, timeoutMs);
    function cleanup() { clearTimeout(timer); delete window[cb]; script.remove(); }
    window[cb] = data => { cleanup(); resolve(data); };
    script.onerror = () => { cleanup(); reject(new Error('network')); };
    const qs = new URLSearchParams({ ...params, callback: cb });
    script.src = `${SHEET_WEBHOOK}?${qs}`;
    document.body.appendChild(script);
  });
}

/** @returns {Promise<{codigo: string, correcta: boolean}[]>} */
export async function fetchSubmissions(sheet) {
  const data = await jsonp({ sheet });
  if (!data?.ok) throw new Error(data?.error || 'respuesta inválida');
  return data.items ?? [];
}
