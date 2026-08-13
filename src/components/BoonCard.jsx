import VerifyBlock from './VerifyBlock.jsx';

export default function BoonCard({ boon, index }) {
  const idPrefix = `boon-${index}`;
  return (
    <div className="boon">
      <div className="boon-title">{boon.title}</div>
      <div className="boon-flavor">"{boon.flavor}"</div>
      <p className="statement" dangerouslySetInnerHTML={{ __html: boon.statement }} />
      {boon.code && <pre>{boon.code}</pre>}
      <details className="hint">
        <summary>Ayuda de memoria de Hécate</summary>
        <div className="hint-body" dangerouslySetInnerHTML={{ __html: boon.hint }} />
      </details>
      <VerifyBlock
        idPrefix={idPrefix}
        noteText={boon.note}
        solutionHtml={boon.sol}
        testSpecs={[boon.test]}
      />
    </div>
  );
}
