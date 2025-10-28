export default function Tooltip({ interactionData }) {
  if (!interactionData) {
    return null;
  }

  const { xPos, yPos, text } = interactionData;

  return (
    <div
      style={{ left: xPos, top: yPos }}
      className="absolute"
      data-testid="tooltip"
    >
      {text}
    </div>
  );
}
