import { useState } from 'react';

/*
  AnimacionArchivos — demo interactiva para la clase de Archivos y Errores.
  Tres pestañas: leer, modos de apertura y try/except. Sin dependencias.

  Los estilos van inline y scopeados en `.aa`, pero las variables de color
  salen de los tokens del tema de la página (--accent, --surface, ...) con un
  fallback claro, así la demo sigue funcionando suelta y acá toma el tema.
*/

const PARTIDOS = [
  'Argentina 2-0 Chile\n',
  'Argentina 1-1 Brasil\n',
  'Argentina 3-0 Peru\n',
  'Argentina 2-1 Francia\n',
];

const estilos = `
.aa { --celeste:var(--accent, #4f8fc9); --celeste-claro:var(--bg-muted, #dcebf8);
  --ok:#4cc38a; --mal:#ff7b7b; --sol:var(--secondary, #f2b705);
  --fondo:var(--bg-soft, #ffffff); --texto:var(--text, #1c2733); --suave:var(--text-dim, #5b6b7b);
  --borde:var(--border, #c9d6e2); --panel:var(--surface, #f4f8fc);
  font-family: Inter, system-ui, -apple-system, "Segoe UI", sans-serif; color:var(--texto);
  background:var(--fondo); border:1px solid var(--borde); border-radius:14px; padding:16px; max-width:860px; margin:0 auto; }
.aa * { box-sizing:border-box; }
.aa .tabs { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:14px; }
.aa .tab { border:1px solid var(--borde); background:var(--panel); color:var(--texto); border-radius:999px; padding:7px 14px; cursor:pointer; font-size:14px; }
.aa .tab[aria-pressed="true"] { background:var(--celeste); color:#06121c; border-color:var(--celeste); font-weight:600; }
.aa .grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
@media (max-width:640px) { .aa .grid { grid-template-columns:1fr; } }
.aa .panel { background:var(--panel); border:1px solid var(--borde); border-radius:10px; padding:10px 12px; }
.aa .panel h3 { margin:0 0 8px; font-size:13px; text-transform:uppercase; letter-spacing:.04em; color:var(--suave); }
.aa pre, .aa .linea { font-family: "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace; font-size:14px; margin:0; }
.aa .fila { display:flex; align-items:center; gap:8px; padding:4px 6px; border-radius:6px; border:1px solid transparent; }
.aa .fila .n { width:18px; color:var(--suave); text-align:right; font-size:12px; }
.aa .fila.actual { background:var(--celeste-claro); border-color:var(--celeste); }
.aa .fila.leida { opacity:.55; }
.aa .flecha { color:var(--celeste); font-weight:700; width:16px; }
.aa .btns { display:flex; gap:8px; flex-wrap:wrap; margin-top:10px; }
.aa .btn { border:1px solid var(--celeste); background:var(--celeste); color:#06121c; border-radius:8px; padding:8px 14px; cursor:pointer; font-size:14px; font-weight:600; }
.aa .btn.sec { background:transparent; color:var(--celeste); font-weight:400; }
.aa .btn:disabled { opacity:.4; cursor:not-allowed; }
.aa .var { display:flex; justify-content:space-between; gap:8px; padding:6px 8px; border-radius:6px; background:var(--fondo); border:1px solid var(--borde); margin-bottom:6px; }
.aa .ok { color:var(--ok); } .aa .mal { color:var(--mal); }
.aa .msg { margin-top:10px; padding:8px 10px; border-radius:8px; font-size:14px; border:1px solid var(--borde); background:var(--fondo); }
.aa .codigo .fila.actual { background:var(--celeste-claro); }
.aa .vacio { color:var(--suave); font-style:italic; font-size:13px; padding:4px 6px; }
.aa .nota { margin:8px 0 0; color:var(--suave); font-size:14px; }
.aa code { font-family: "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace; }
`;

/** Muestra un string como lo mostraría Python: 'texto\n' */
function mostrar(s) {
  return "'" + s.replace(/\n/g, '\\n') + "'";
}

/* ---------- Demo 1: readline vs readlines ---------- */
function DemoLectura() {
  const [modo, setModo] = useState('readline');
  const [pos, setPos] = useState(0); // próxima línea a leer
  const [ultima, setUltima] = useState(null);
  const [lista, setLista] = useState(null);

  const reiniciar = nuevoModo => {
    setModo(nuevoModo);
    setPos(0);
    setUltima(null);
    setLista(null);
  };

  const leerUna = () => {
    if (pos < PARTIDOS.length) {
      setUltima(PARTIDOS[pos]);
      setPos(pos + 1);
    } else {
      setUltima('');
    }
  };

  const leerTodas = () => {
    setLista([...PARTIDOS]);
    setPos(PARTIDOS.length);
  };

  const finDeArchivo = ultima === '';
  const alFinal = pos >= PARTIDOS.length && modo === 'readline';

  return (
    <div>
      <div className="tabs">
        <button className="tab" aria-pressed={modo === 'readline'} onClick={() => reiniciar('readline')}>readline()</button>
        <button className="tab" aria-pressed={modo === 'readlines'} onClick={() => reiniciar('readlines')}>readlines()</button>
      </div>
      <div className="grid">
        <div className="panel">
          <h3>partidos.txt</h3>
          {PARTIDOS.map((p, i) => {
            const esSiguiente = i === pos && modo === 'readline';
            const leida = i < pos;
            return (
              <div key={i} className={'fila' + (esSiguiente ? ' actual' : '') + (leida ? ' leida' : '')}>
                <span className="flecha">{esSiguiente ? '▶' : ''}</span>
                <span className="n">{i}</span>
                <span className="linea">{p.replace('\n', '')}<span style={{ color: 'var(--suave)' }}>\n</span></span>
              </div>
            );
          })}
          <div className={'fila' + (alFinal ? ' actual' : '')}>
            <span className="flecha">{alFinal ? '▶' : ''}</span>
            <span className="n"></span>
            <span className="linea" style={{ color: 'var(--suave)' }}>(fin del archivo)</span>
          </div>
        </div>
        <div className="panel">
          <h3>Lo que ve tu programa</h3>
          {modo === 'readline' ? (
            <>
              <div className="var"><code>archivo.readline()</code><code>{ultima === null ? '—' : mostrar(ultima)}</code></div>
              <div className="var">
                <code>{'linea != ""'}</code>
                <code className={ultima === null ? '' : finDeArchivo ? 'mal' : 'ok'}>{ultima === null ? '—' : String(!finDeArchivo)}</code>
              </div>
              <div className="msg">
                {ultima === null && 'El archivo recuerda en qué línea quedó. Cada readline() lee la siguiente y avanza.'}
                {ultima !== null && !finDeArchivo && 'Devolvió una línea (con su \\n al final) y avanzó una posición.'}
                {finDeArchivo && "No quedan líneas: devuelve '' (vacío). Ahí corta el while."}
              </div>
            </>
          ) : (
            <>
              <div className="var"><code>lineas = archivo.readlines()</code></div>
              {lista === null ? (
                <div className="vacio">Todavía no se leyó nada.</div>
              ) : (
                <pre>{'[\n' + lista.map(l => '  ' + mostrar(l)).join(',\n') + '\n]'}</pre>
              )}
              <div className="msg">
                {lista === null
                  ? 'readlines() lee todo de una y devuelve una lista: un elemento por línea.'
                  : 'Ya tenemos todo en memoria como lista, así que ya podemos cerrar el archivo. Desde acá es un problema de listas.'}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="btns">
        {modo === 'readline' ? (
          <button className="btn" onClick={leerUna}>archivo.readline()</button>
        ) : (
          <button className="btn" onClick={leerTodas} disabled={lista !== null}>archivo.readlines()</button>
        )}
        <button className="btn sec" onClick={() => reiniciar(modo)}>Reiniciar</button>
      </div>
    </div>
  );
}

/* ---------- Demo 2: modos de apertura ---------- */
const ANTES = ['Argentina 2-0 Chile', 'Argentina 1-1 Brasil', 'Argentina 3-0 Peru'];
const NUEVA = 'Argentina 5-0 Bolivia';

function resultadoModo(modo) {
  if (modo === 'r') {
    return { error: 'io.UnsupportedOperation: not writable', despues: ANTES, nota: "'r' solo permite leer. Perfecto para no romper nada." };
  }
  if (modo === 'w') {
    return { error: null, despues: [NUEVA], nota: "Al abrir con 'w' el contenido anterior se borró. Solo queda lo nuevo." };
  }
  return { error: null, despues: [...ANTES, NUEVA], nota: "'a' conserva lo que había y agrega al final." };
}

function DemoModos() {
  const [modo, setModo] = useState('r');
  const [corrido, setCorrido] = useState(false);
  const res = resultadoModo(modo);

  return (
    <div>
      <div className="tabs">
        {['r', 'w', 'a'].map(m => (
          <button key={m} className="tab" aria-pressed={modo === m} onClick={() => { setModo(m); setCorrido(false); }}>
            {`modo '${m}'`}
          </button>
        ))}
      </div>
      <div className="panel codigo" style={{ marginBottom: 12 }}>
        <h3>Código</h3>
        <pre>{`archivo = open('partidos.txt', '${modo}')\narchivo.write('${NUEVA}\\n')\narchivo.close()`}</pre>
      </div>
      <div className="grid">
        <div className="panel">
          <h3>Antes</h3>
          {ANTES.map((l, i) => <div key={i} className="fila"><span className="n">{i}</span><span className="linea">{l}</span></div>)}
        </div>
        <div className="panel">
          <h3>Después</h3>
          {!corrido
            ? <div className="vacio">Corré el código para ver qué pasa.</div>
            : res.despues.map((l, i) => <div key={i} className="fila"><span className="n">{i}</span><span className="linea">{l}</span></div>)}
        </div>
      </div>
      {corrido && (
        <div className="msg">
          {res.error && <div className="mal"><code>{res.error}</code></div>}
          <div>{res.nota}</div>
        </div>
      )}
      <div className="btns">
        <button className="btn" onClick={() => setCorrido(true)}>Correr el código</button>
        <button className="btn sec" onClick={() => setCorrido(false)}>Reiniciar</button>
      </div>
    </div>
  );
}

/* ---------- Demo 3: try / except ---------- */
const CODIGO = [
  'def leer_capitan(nombre_archivo):',
  '    try:',
  "        archivo = open(nombre_archivo, 'r')",
  '    except FileNotFoundError:',
  "        print('El archivo no existe')",
  '        return None',
  '    capitan = archivo.readline().strip()',
  '    archivo.close()',
  '    return capitan',
];

function DemoErrores() {
  const [existe, setExiste] = useState(true);
  const [paso, setPaso] = useState(-1);

  const camino = existe ? [0, 1, 2, 6, 7, 8] : [0, 1, 2, 3, 4, 5];
  const lineaActual = paso >= 0 && paso < camino.length ? camino[paso] : -1;
  const termino = paso >= camino.length - 1;

  const textoPaso = () => {
    if (paso < 0) return 'Elegí un caso y avanzá paso a paso.';
    const l = camino[paso];
    if (l === 2 && !existe) return 'open() falla: Python crea una excepción FileNotFoundError.';
    if (l === 3) return 'Como el error es del tipo esperado, el programa salta al except en vez de cortarse.';
    if (l === 4) return 'Manejamos el error con un mensaje claro.';
    if (l === 5) return 'Devolvemos None: quien llamó a la función sabe que no hubo capitán.';
    if (l === 6) return 'El archivo existía: seguimos con el código normal, fuera del try.';
    if (l === 8) return 'Devolvemos el capitán. Nunca se ejecutó el except.';
    return '';
  };

  return (
    <div>
      <div className="tabs">
        <button className="tab" aria-pressed={existe} onClick={() => { setExiste(true); setPaso(-1); }}>El archivo existe</button>
        <button className="tab" aria-pressed={!existe} onClick={() => { setExiste(false); setPaso(-1); }}>El archivo NO existe</button>
      </div>
      <div className="panel codigo">
        <h3>{"leer_capitan('capitan.txt')"}</h3>
        {CODIGO.map((c, i) => (
          <div key={i} className={'fila' + (i === lineaActual ? ' actual' : '')}>
            <span className="flecha">{i === lineaActual ? '▶' : ''}</span>
            <span className="linea" style={{ whiteSpace: 'pre' }}>{c}</span>
          </div>
        ))}
      </div>
      <div className="msg">{textoPaso()}</div>
      <p className="nota">
        Fijate que el <code>try</code> solo envuelve el <code>open</code>, que es lo único que puede fallar por archivo inexistente.
      </p>
      <div className="btns">
        <button className="btn" onClick={() => setPaso(paso + 1)} disabled={termino}>Siguiente paso</button>
        <button className="btn sec" onClick={() => setPaso(-1)}>Reiniciar</button>
      </div>
    </div>
  );
}

/* ---------- Componente principal ---------- */
export default function AnimacionArchivos() {
  const [vista, setVista] = useState('lectura');
  return (
    <div className="aa">
      <style>{estilos}</style>
      <div className="tabs">
        <button className="tab" aria-pressed={vista === 'lectura'} onClick={() => setVista('lectura')}>1. Leer</button>
        <button className="tab" aria-pressed={vista === 'modos'} onClick={() => setVista('modos')}>2. Modos de apertura</button>
        <button className="tab" aria-pressed={vista === 'errores'} onClick={() => setVista('errores')}>3. try / except</button>
      </div>
      {vista === 'lectura' && <DemoLectura />}
      {vista === 'modos' && <DemoModos />}
      {vista === 'errores' && <DemoErrores />}
    </div>
  );
}
