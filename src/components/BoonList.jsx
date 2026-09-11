import BoonCard from './BoonCard.jsx';

export default function BoonList({ boons, storagePrefix }) {
  return (
    <div className="boon-list">
      {boons.map((boon, i) => (
        <BoonCard key={i} boon={boon} index={i} storagePrefix={storagePrefix} />
      ))}
    </div>
  );
}
