import { useState } from 'react';

export default function NameGate({ onStart }) {
  const [name, setName] = useState('');
  const [touched, setTouched] = useState(false);

  const invalid = touched && !name.trim();

  function handleStart() {
    setTouched(true);
    const trimmed = name.trim();
    if (trimmed) onStart(trimmed);
  }

  return (
    <div className="gate">
      <label htmlFor="nombre-input">¿Quién cruza hoy?</label>
      <input
        type="text"
        id="nombre-input"
        placeholder="Nombre y apellido"
        value={name}
        onChange={e => { setName(e.target.value); setTouched(true); }}
        onKeyDown={e => e.key === 'Enter' && handleStart()}
        style={invalid ? { borderColor: 'var(--ember)' } : {}}
        autoFocus
      />
      {invalid && (
        <small style={{ color: 'var(--ember)', marginTop: '0.3rem', display: 'block' }}>
          Tenés que ingresar tu nombre para comenzar.
        </small>
      )}
      {!invalid && (
        <small>Esto queda guardado junto con tus respuestas al final del recorrido.</small>
      )}
      <div className="cta-row">
        <button
          className="btn btn-primary"
          onClick={handleStart}
        >
          Comenzar la prueba
        </button>
      </div>
    </div>
  );
}
