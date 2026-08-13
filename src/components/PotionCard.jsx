import VerifyBlock from './VerifyBlock.jsx';

export default function PotionCard({ potion }) {
  return (
    <div className="potion-card">
      <div className="boon-title">{potion.title}</div>
      <p className="boon-flavor">{potion.flavor}</p>
      <p className="statement" dangerouslySetInnerHTML={{ __html: potion.statementHtml }} />
      <div className="receipt" dangerouslySetInnerHTML={{ __html: potion.receiptHtml }} />
      <p>Implementar con al menos estas funciones (sin <code>input</code>/<code>print</code> adentro):</p>
      <ul className="reqs">
        {potion.requirementsList.map((req, i) => (
          <li key={i}><code>{req}</code></li>
        ))}
      </ul>
      <details className="hint">
        <summary>Ayuda de memoria de Hécate</summary>
        <div className="hint-body">{potion.hintText}</div>
      </details>
      <VerifyBlock
        idPrefix="potion"
        noteText={potion.note}
        solutionHtml={potion.solutionHtml}
        testSpecs={potion.tests}
      />
    </div>
  );
}
