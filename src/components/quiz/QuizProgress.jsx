/** Barra de avance con las secciones del quiz debajo. */
export default function QuizProgress({ sections, progress, activeSectionIndex }) {
  return (
    <div className="river-wrap">
      <div className="river-track">
        <div className="river-fill" style={{ width: `${progress * 100}%` }} />
      </div>
      <div className="river-labels">
        {sections.map((s, i) => (
          <span key={s.name} className={i <= activeSectionIndex ? 'done' : ''}>{s.label}</span>
        ))}
      </div>
    </div>
  );
}
