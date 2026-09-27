import { useState } from 'react';
import TwoToneTitle from './TwoToneTitle.jsx';

/**
 * Pide el nombre (y la contraseña de la clase, si tiene) antes de mostrar
 * el contenido.
 * @param {{gate: import('../courses/types.js').Course['gate'], onEnter: (name: string) => void}} props
 */
export default function Gate({ gate, onEnter }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return setError('Ingresá tu nombre para continuar.');
    if (gate.password && password.trim() !== gate.password) return setError('Contraseña incorrecta.');
    onEnter(trimmed);
  }

  return (
    <div className="gate">
      <form className="gate-card" onSubmit={handleSubmit} noValidate>
        <div className="gate-kicker">Pensamiento Computacional · FIUBA</div>
        <div className="gate-emoji" aria-hidden="true">{gate.emoji}</div>
        <TwoToneTitle as="h1" className="gate-title" parts={gate.title} />
        <p className="gate-subtitle">{gate.subtitle}</p>

        <label className="field-label" htmlFor="gate-name">Nombre completo</label>
        <input
          id="gate-name"
          className="field-input"
          type="text"
          placeholder="Escribí tu nombre..."
          autoComplete="off"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        {gate.password && (
          <>
            <label className="field-label" htmlFor="gate-password">Contraseña de la clase</label>
            <input
              id="gate-password"
              className="field-input"
              type="password"
              placeholder="La da el docente..."
              autoComplete="off"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </>
        )}

        <button type="submit" className="gate-submit">{gate.buttonLabel}</button>
        {error && <p className="gate-error" role="alert">{error}</p>}
      </form>
    </div>
  );
}
