/** Título con la segunda parte resaltada en el color de acento. */
export default function TwoToneTitle({ as: Tag = 'h1', className, parts: [lead, accent] }) {
  return (
    <Tag className={className}>
      {lead} <span className="accent">{accent}</span>
    </Tag>
  );
}
