import BoonCard from './BoonCard.jsx';

export default function BoonList({ boons }) {
  return (
    <div className="boon-list">
      {boons.map((boon, i) => (
        <BoonCard key={i} boon={boon} index={i} />
      ))}
    </div>
  );
}
