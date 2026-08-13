import { useState } from 'react';

export default function NameGate({ onStart }) {
  const [name, setName] = useState('');

  function handleStart() {
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
        onChange={e => setName(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && name.trim() && handleStart()}
      />
      <small>Esto queda guardado junto con tus respuestas al final del recorrido.</small>
      <div className="cta-row">
        <button
          className="btn btn-primary"
          disabled={!name.trim()}
          onClick={handleStart}
        >
          Comenzar la prueba
        </button>
      </div>
    </div>
  );
}
