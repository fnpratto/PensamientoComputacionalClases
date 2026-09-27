import TwoToneTitle from './TwoToneTitle.jsx';

/** @param {{hero: import('../courses/types.js').Course['hero']}} props */
export default function Hero({ hero }) {
  return (
    <section id="hero" className="hero">
      <div className="hero-decoration" aria-hidden="true">{hero.decoration}</div>
      <div className="hero-badge">{hero.badge}</div>
      <TwoToneTitle as="h1" className="hero-title" parts={hero.title} />
      <p className="hero-sub">{hero.subtitle}</p>
      <div className="scroll-cue" aria-hidden="true">▼</div>
    </section>
  );
}
