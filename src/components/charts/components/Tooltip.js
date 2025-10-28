export default function Tooltip({ interactionData }) {
  if (!interactionData) {
    return null;
  }

  const { xPos, yPos, children } = interactionData;

  return (
    <div
      style={{
        left: xPos,
        top: yPos,
      }}
      className="absolute -translate-y-1/2"
      data-testid="tooltip-container"
    >
      <div
        className="relative p-2 ml-2 bg-white text-xs rounded-md"
        data-testid="tooltip-body"
      >
        {children}
        <div
          class="absolute top-1/2 -translate-y-1/2 right-full  h-0 w-0 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-white"
          data-testid="tooltip-arrow"
        />
      </div>
    </div>
  );
}
