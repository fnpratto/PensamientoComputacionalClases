/* ================= UTILS ================= */
function normalize(str){
  return str.toString().normalize('NFD').replace(/[̀-ͯ]/g,'')
    .toLowerCase().trim().replace(/\s+/g,' ');
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}

/* ================= INTÉRPRETE DE PYTHON EN EL NAVEGADOR (Pyodide) =================
   Se carga recién cuando alguien aprieta "Verificar" por primera vez, para no
   demorar la carga inicial de la página. Cada verificación corre en un namespace
   Python aislado, así una respuesta no contamina la siguiente. */
const PCC_HARNESS_PY = `
import sys, io, json, ast, builtins as _pcc_builtins

def _pcc_check_practices(code, required_names_json):
    required_names = json.loads(required_names_json) if required_names_json else []
    result = {"parse_ok": True, "error": None, "defined_functions": [], "missing_required": []}
    try:
        tree = ast.parse(code)
        names = [n.name for n in ast.walk(tree) if isinstance(n, (ast.FunctionDef, ast.AsyncFunctionDef))]
        result["defined_functions"] = names
        result["missing_required"] = [n for n in required_names if n not in names]
    except SyntaxError as e:
        result["parse_ok"] = False
        result["error"] = str(e)
    return json.dumps(result)

def _pcc_run(code, func_name, args_json, stdin_json):
    args_list = json.loads(args_json) if args_json else []
    stdin_list = json.loads(stdin_json) if stdin_json else []
    namespace = {}
    output = io.StringIO()
    old_stdout = sys.stdout
    old_input = _pcc_builtins.input
    inputs_iter = iter(stdin_list)
    def _mock_input(prompt=""):
        try:
            return next(inputs_iter)
        except StopIteration:
            return "1"
    _pcc_builtins.input = _mock_input
    sys.stdout = output
    result = {"ok": False, "error": None, "return_value": None, "stdout": ""}
    try:
        exec(code, namespace)
        if func_name:
            fn = namespace.get(func_name)
            if not callable(fn):
                raise NameError("No se encontro una funcion llamada '" + func_name + "'")
            result["return_value"] = fn(*args_list)
        result["ok"] = True
    except Exception as e:
        result["error"] = type(e).__name__ + ": " + str(e)
    finally:
        sys.stdout = old_stdout
        _pcc_builtins.input = old_input
        result["stdout"] = output.getvalue()
    try:
        return json.dumps(result)
    except TypeError:
        result["return_value"] = str(result["return_value"])
        return json.dumps(result)
`;

let pyodidePromise = null;
function getPyodide(){
  if(!pyodidePromise){
    pyodidePromise = new Promise((resolve, reject) => {
      const init = () => {
        loadPyodide().then(py => { py.runPython(PCC_HARNESS_PY); resolve(py); }).catch(reject);
      };
      if(window.loadPyodide){ init(); return; }
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
      script.onload = init;
      script.onerror = () => reject(new Error('No se pudo cargar el intérprete de Python (revisá tu conexión).'));
      document.head.appendChild(script);
    });
  }
  return pyodidePromise;
}

async function pccRun(code, funcName, args, stdinArr){
  const pyodide = await getPyodide();
  const runFn = pyodide.globals.get('_pcc_run');
  const jsonStr = runFn(code, funcName || null, JSON.stringify(args || []), JSON.stringify(stdinArr || []));
  return JSON.parse(jsonStr);
}

async function pccCheckPractices(code, requiredNames){
  const pyodide = await getPyodide();
  const checkFn = pyodide.globals.get('_pcc_check_practices');
  const jsonStr = checkFn(code, JSON.stringify(requiredNames || []));
  return JSON.parse(jsonStr);
}

/* ================= EVALUACIÓN DE CASOS DE PRUEBA ================= */
function fmtVal(v){
  if(v === null || v === undefined) return '(nada)';
  if(typeof v === 'string') return '"' + v + '"';
  return String(v);
}

function evalCase(actual, expect){
  switch(expect.type){
    case 'numeric': {
      const num = typeof actual === 'number' ? actual : parseFloat(actual);
      if(Number.isNaN(num)) return false;
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

async function runFunctionTests(code, spec){
  const rows = [];
  for(const c of spec.cases){
    const callLabel = spec.funcName + '(' + c.args.map(fmtVal).join(', ') + ')';
    try{
      const r = await pccRun(code, spec.funcName, c.args, []);
      if(!r.ok){
        rows.push({pass:false, label:callLabel, detail:'Error al ejecutar: ' + r.error});
      } else {
        const pass = evalCase(r.return_value, c.expect);
        const expectedDesc = c.expect.value !== undefined ? fmtVal(c.expect.value) : c.expect.parts.join(', ');
        rows.push({
          pass, label:callLabel,
          detail: pass
            ? 'Devolvió ' + fmtVal(r.return_value) + ', como se esperaba.'
            : 'Devolvió ' + fmtVal(r.return_value) + ' — se esperaba algo equivalente a ' + expectedDesc + '.'
        });
      }
    }catch(err){
      rows.push({pass:false, label:callLabel, detail:'Error inesperado: ' + (err.message || err)});
    }
  }
  return rows;
}

function renderPracticeNote(container, practice, requiredNames){
  container.hidden = false;
  if(!practice.parse_ok){
    container.className = 'practice-note warn';
    container.textContent = '⚠ Buenas prácticas: no pudimos analizar el código (' + practice.error + ').';
    return;
  }
  if(practice.defined_functions.length === 0){
    container.className = 'practice-note warn';
    container.textContent = '⚠ Buenas prácticas: tu solución no define ninguna función. En esta guía, toda la lógica va encapsulada en una función (def ...), no suelta al nivel del script.';
  } else if(practice.missing_required.length > 0){
    container.className = 'practice-note warn';
    const plural = practice.missing_required.length > 1;
    container.textContent = '⚠ Buenas prácticas: no encontramos ' + (plural ? 'las funciones' : 'la función') + ' ' + practice.missing_required.map(n => n + '()').join(', ') + ' definida' + (plural ? 's' : '') + ' con def.';
  } else {
    container.className = 'practice-note ok';
    container.textContent = '✓ Buenas prácticas: tu código encapsula la lógica en la(s) función(es) esperada(s).';
  }
}

function renderTestResults(container, rows){
  const passCount = rows.filter(r => r.pass).length;
  const summaryClass = passCount === rows.length ? 'all-pass' : 'some-fail';
  const summaryText = passCount === rows.length
    ? `Pasaron los ${rows.length} casos de prueba.`
    : `Pasaron ${passCount} de ${rows.length} casos — revisá los que fallaron.`;
  let html = `<div class="test-summary ${summaryClass}">${summaryText}</div><div class="test-list">`;
  rows.forEach(r => {
    html += `<div class="test-item ${r.pass ? 'pass' : 'fail'}"><div class="t-head"><span>${r.pass ? '✓ Pasó' : '✗ Falló'}</span><span>${escapeHtml(r.label)}</span></div><div class="t-detail">${escapeHtml(r.detail)}</div></div>`;
  });
  html += '</div>';
  container.hidden = false;
  container.innerHTML = html;
}

/* ================= EDITOR DE CÓDIGO (líneas + resaltado de sintaxis + tab) =================
   Mejora el <textarea> plano con CodeMirror: números de línea, colores para palabras clave
   de Python (def, if, return...) y funciones builtin (int, str, print...), y Tab que indenta
   en vez de sacar el foco — pensado para gente que nunca escribió código. Si la librería no
   llegó a cargar (por ejemplo sin conexión), cae de vuelta a un textarea con Tab manual, así
   la página nunca se rompe por esto. */
function fallbackTabIndent(textarea){
  const TAB = '    ';
  textarea.addEventListener('keydown', (e) => {
    if(e.key !== 'Tab') return;
    e.preventDefault();
    const {selectionStart:start, selectionEnd:end, value} = textarea;
    if(start === end && !e.shiftKey){
      textarea.value = value.slice(0, start) + TAB + value.slice(end);
      textarea.selectionStart = textarea.selectionEnd = start + TAB.length;
    }
  });
}

function initCodeEditor(textarea){
  if(window.CodeMirror){
    try{
      const cm = CodeMirror.fromTextArea(textarea, {
        mode:'python',
        theme:'underworld',
        lineNumbers:true,
        indentUnit:4,
        tabSize:4,
        indentWithTabs:false,
        smartIndent:true,
        matchBrackets:true,
        styleActiveLine:true,
        viewportMargin:Infinity,
        placeholder:textarea.placeholder,
        extraKeys:{
          Tab: cm => cm.somethingSelected() ? cm.execCommand('indentMore') : cm.replaceSelection('    ', 'end'),
          'Shift-Tab': cm => cm.execCommand('indentLess')
        }
      });
      return {
        getValue: () => cm.getValue(),
        onChange: fn => cm.on('change', fn)
      };
    }catch(err){
      console.warn('No se pudo iniciar el editor de código, uso textarea simple:', err);
    }
  }
  fallbackTabIndent(textarea);
  return {
    getValue: () => textarea.value,
    onChange: fn => textarea.addEventListener('input', fn)
  };
}

/* ================= BLOQUE "TU RESPUESTA" + BUENAS PRÁCTICAS + TESTS + SOLUCIÓN OPCIONAL ================= */
function buildVerifyBlock(idPrefix, noteText, solutionHtml){
  return `
    <div class="answer-box">
      <div class="notes-field">
        <label for="${idPrefix}-answer">Tu solución (código Python)</label>
        ${noteText ? `<span class="verify-note">${noteText}</span>` : ''}
        <textarea id="${idPrefix}-answer" placeholder="Escribí acá tu código..." spellcheck="false"></textarea>
      </div>
      <div class="verify-row">
        <button type="button" class="btn btn-primary" id="${idPrefix}-verify" disabled>Verificar mi respuesta</button>
        <span class="verify-note" id="${idPrefix}-loading" hidden></span>
      </div>
      <div class="practice-note" id="${idPrefix}-practice" hidden></div>
      <div class="test-results" id="${idPrefix}-results" hidden></div>
      <details class="solution" id="${idPrefix}-solution" hidden>
        <summary>Mostrar solución sugerida</summary>
        <div class="sol-body"><pre>${solutionHtml}</pre></div>
      </details>
    </div>`;
}

function attachVerify(root, idPrefix, testSpecs){
  const answerEl = root.querySelector('#' + idPrefix + '-answer');
  const verifyBtn = root.querySelector('#' + idPrefix + '-verify');
  const loadingEl = root.querySelector('#' + idPrefix + '-loading');
  const practiceEl = root.querySelector('#' + idPrefix + '-practice');
  const resultsEl = root.querySelector('#' + idPrefix + '-results');
  const solutionEl = root.querySelector('#' + idPrefix + '-solution');
  const requiredNames = testSpecs.map(s => s.funcName).filter(Boolean);
  const editor = initCodeEditor(answerEl);

  editor.onChange(() => {
    verifyBtn.disabled = editor.getValue().trim().length === 0;
  });

  verifyBtn.addEventListener('click', async () => {
    const code = editor.getValue();
    verifyBtn.disabled = true;
    practiceEl.hidden = true;
    resultsEl.hidden = true;
    loadingEl.hidden = false;
    loadingEl.textContent = 'Cargando intérprete de Python (puede tardar unos segundos la primera vez)…';
    try{
      await getPyodide();
      loadingEl.textContent = 'Ejecutando pruebas…';
      const practice = await pccCheckPractices(code, requiredNames);
      renderPracticeNote(practiceEl, practice, requiredNames);
      let rows = [];
      for(const spec of testSpecs){
        rows = rows.concat(await runFunctionTests(code, spec));
      }
      renderTestResults(resultsEl, rows);
    } catch(err){
      resultsEl.hidden = false;
      resultsEl.innerHTML = `<div class="test-summary some-fail">No se pudieron correr las pruebas: ${escapeHtml(err.message || String(err))}</div>`;
    } finally {
      loadingEl.hidden = true;
      verifyBtn.disabled = false;
      solutionEl.hidden = false;
    }
  });
}

/* ================= NAME GATE ================= */
let studentName = "";
const nombreInput = document.getElementById('nombre-input');
const startBtn = document.getElementById('start-btn');
nombreInput.addEventListener('input', () => {
  startBtn.disabled = nombreInput.value.trim().length === 0;
});
startBtn.addEventListener('click', () => {
  studentName = nombreInput.value.trim();
  document.getElementById('gate').hidden = true;
  document.getElementById('camara-1').scrollIntoView({behavior:'smooth'});
});

/* ================= QUIZ LOGIC ================= */
let current = 0, lives = 3, score = 0, answered = false;
const results = []; // {pregunta, respuesta, correcta, nota}

function renderLives(){
  const el = document.getElementById('lives');
  el.innerHTML = '';
  for(let i=0;i<3;i++){
    const f = document.createElement('div');
    f.className = 'flame' + (i >= lives ? ' spent' : '');
    el.appendChild(f);
  }
}

function shuffled(arr){
  const a = [...arr];
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderQuestion(){
  answered = false;
  const item = COURSE_CONFIG.questions[current];
  document.getElementById('q-section').textContent = item.section;
  document.getElementById('q-text').innerHTML = item.q;
  document.getElementById('q-num').textContent = current + 1;
  document.getElementById('q-score').textContent = score;
  document.getElementById('q-hint').innerHTML = item.hint;
  document.querySelectorAll('#camara-1 details.hint').forEach(d => d.open = false);

  const optionsEl = document.getElementById('q-options');
  optionsEl.innerHTML = '';
  shuffled(item.options).forEach(opt => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.addEventListener('click', () => checkAnswer(opt, btn));
    optionsEl.appendChild(btn);
  });

  document.getElementById('q-notes').value = '';
  document.getElementById('q-feedback').className = 'feedback';
  document.getElementById('q-next').disabled = true;

  const pct = (current / COURSE_CONFIG.questions.length) * 100;
  document.getElementById('river-fill').style.width = pct + '%';
  COURSE_CONFIG.sections.forEach((s, i) => {
    document.getElementById('lbl-' + (i+1)).classList.toggle('done', COURSE_CONFIG.sections.indexOf(item.section) >= i);
  });
}

function checkAnswer(given, chosenBtn){
  if(answered) return;
  answered = true;
  const item = COURSE_CONFIG.questions[current];
  const isCorrect = item.answers.some(a => normalize(a) === normalize(given));

  document.querySelectorAll('#q-options .option-btn').forEach(b => {
    b.disabled = true;
    if(item.answers.some(a => normalize(a) === normalize(b.textContent))){
      b.classList.add('correct');
    } else if(b === chosenBtn){
      b.classList.add('wrong');
    }
  });

  const fb = document.getElementById('q-feedback');
  if(isCorrect){
    score++;
    fb.textContent = 'Correcto. El paso queda marcado en el río.';
    fb.className = 'feedback show ok';
  } else {
    lives = Math.max(0, lives - 1);
    renderLives();
    fb.textContent = 'No era esa — se apaga una llama. Respuesta esperada: "' + item.answers[0] + '".';
    fb.className = 'feedback show bad';
  }

  results.push({
    pregunta: item.q.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim(),
    respuesta: given,
    correcta: isCorrect,
    nota: document.getElementById('q-notes').value.trim()
  });

  document.getElementById('q-score').textContent = score;
  document.getElementById('q-next').disabled = false;
}

function nextQuestion(){
  current++;
  if(current >= COURSE_CONFIG.questions.length){ finishQuiz(); } else { renderQuestion(); }
}
document.getElementById('q-next').addEventListener('click', nextQuestion);

function finishQuiz(){
  document.getElementById('river-fill').style.width = '100%';
  document.querySelector('#camara-1 .card').hidden = true;
  document.querySelector('#camara-1 .status-row').hidden = true;
  const summary = document.getElementById('quiz-summary');
  summary.hidden = false;
  document.getElementById('final-score').textContent = score + ' / ' + COURSE_CONFIG.questions.length;

  let msg = '';
  if(score === COURSE_CONFIG.questions.length) msg = 'Cruzaste sin perder una sola llama. Caronte asiente.';
  else if(lives === 0) msg = 'Las llamas se apagaron, pero el bote igual cruza. Nadie se queda del otro lado.';
  else msg = 'El río quedó atrás. Quedan ' + lives + ' llama(s) encendida(s).';
  document.getElementById('final-msg').textContent = msg;

  const table = document.getElementById('summary-table');
  let html = '<thead><tr><th>Pregunta</th><th>Tu respuesta</th><th>¿Correcta?</th><th>Nota</th></tr></thead><tbody>';
  results.forEach(r => {
    html += `<tr>
      <td data-label="Pregunta">${escapeHtml(r.pregunta)}</td>
      <td data-label="Tu respuesta">${escapeHtml(r.respuesta || '—')}</td>
      <td data-label="¿Correcta?" class="${r.correcta ? 'ok' : 'bad'}">${r.correcta ? 'Sí' : 'No'}</td>
      <td data-label="Nota">${escapeHtml(r.nota || '—')}</td>
    </tr>`;
  });
  html += '</tbody>';
  table.innerHTML = html;
}

/* ================= DESCARGA CSV ================= */
document.getElementById('download-btn').addEventListener('click', () => {
  let csv = 'Nombre,Pregunta,Respuesta,Correcta,Nota\n';
  results.forEach(r => {
    const row = [studentName, r.pregunta, r.respuesta, r.correcta ? 'Si' : 'No', r.nota]
      .map(v => '"' + (v || '').toString().replace(/"/g,'""') + '"').join(',');
    csv += row + '\n';
  });
  csv += `\n"${studentName}","PUNTAJE","${score}/${COURSE_CONFIG.questions.length}","VIDAS","${lives}"\n`;

  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `respuestas_${normalize(studentName).replace(/\s+/g,'_')}.csv`;
  a.click();
  URL.revokeObjectURL(url);
});

/* ================= ENVÍO A GOOGLE SHEETS ================= */
document.getElementById('send-btn').addEventListener('click', () => {
  const statusEl = document.getElementById('send-status');
  if(!COURSE_CONFIG.sheetWebhook){
    statusEl.textContent = 'Todavía no está configurada la planilla de destino (sheetWebhook vacío). Usá la descarga en CSV mientras tanto.';
    return;
  }
  const body = new URLSearchParams({
    nombre: studentName,
    puntaje: `${score}/${COURSE_CONFIG.questions.length}`,
    preguntas: JSON.stringify(results.map(r => r.pregunta)),
    respuestas: JSON.stringify(results.map(r => r.respuesta))
  });
  statusEl.textContent = 'Enviando...';
  fetch(COURSE_CONFIG.sheetWebhook, {method:'POST', mode:'no-cors', body})
    .then(() => { statusEl.textContent = 'Enviado. Ya debería estar en la planilla.'; })
    .catch(() => { statusEl.textContent = 'No se pudo enviar — descargá el CSV y mandalo por otro medio.'; });
});

/* ================= BOONS RENDER ================= */
function renderBoons(){
  const list = document.getElementById('boon-list');
  COURSE_CONFIG.boons.forEach((b, i) => {
    const idPrefix = 'boon-' + i;
    const card = document.createElement('div');
    card.className = 'boon';
    card.innerHTML = `
      <div class="boon-title">${b.title}</div>
      <div class="boon-flavor">"${b.flavor}"</div>
      <p class="statement">${b.statement}</p>
      ${b.code ? `<pre>${b.code}</pre>` : ''}
      <details class="hint"><summary>Ayuda de memoria de Hécate</summary><div class="hint-body">${b.hint}</div></details>
      ${buildVerifyBlock(idPrefix, b.note, b.sol)}
    `;
    list.appendChild(card);
    attachVerify(card, idPrefix, [b.test]);
  });
}

/* ================= POTION (CÁMARA III) ================= */
function renderPotionCard(){
  const p = COURSE_CONFIG.potion;
  const slot = document.getElementById('camara-3-slot');
  const reqs = p.requirementsList.map(r => `<li><code>${escapeHtml(r)}</code></li>`).join('');
  slot.innerHTML = `
    <div class="potion-card">
      <div class="boon-title">${escapeHtml(p.title)}</div>
      <p class="boon-flavor">${escapeHtml(p.flavor)}</p>
      <p class="statement">${p.statementHtml}</p>
      <div class="receipt">${p.receiptHtml}</div>
      <p>Implementar con al menos estas funciones (sin <code>input</code>/<code>print</code> adentro):</p>
      <ul class="reqs">${reqs}</ul>
      <details class="hint">
        <summary>Ayuda de memoria de Hécate</summary>
        <div class="hint-body">${escapeHtml(p.hintText)}</div>
      </details>
      <div id="potion-verify"></div>
    </div>
  `;
  document.getElementById('potion-verify').innerHTML = buildVerifyBlock('potion', p.note, p.solutionHtml);
  attachVerify(document.getElementById('camara-3'), 'potion', p.tests);
}

/* ================= INIT ================= */
(function init(){
  const m = COURSE_CONFIG.meta;
  document.title = m.title;
  document.getElementById('hero-eyebrow').textContent = m.eyebrow;
  document.getElementById('hero-title').innerHTML = m.heroTitleHtml;
  document.getElementById('hero-description').textContent = m.heroDescription;
  document.getElementById('page-footer').textContent = m.footerText;

  COURSE_CONFIG.sectionLabels.forEach((label, i) => {
    document.getElementById('lbl-' + (i+1)).textContent = label;
  });

  document.getElementById('q-total').textContent = COURSE_CONFIG.questions.length;
  document.getElementById('q-total-desc').textContent = COURSE_CONFIG.questions.length;

  renderLives();
  renderQuestion();
  renderBoons();
  renderPotionCard();
})();
