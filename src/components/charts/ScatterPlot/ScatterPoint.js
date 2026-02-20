export default function ScatterPoint({
  testId,
  cx,
  cy,
  radius = 5,
  fill = "#2563eb",
  stroke = "#ffffff",
  strokeWidth = 1,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  return (
    <circle
      data-testid={testId}
      cx={cx}
      cy={cy}
      r={radius}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      onMouseEnter={() => onMouseEnter?.()}
      onMouseLeave={() => onMouseLeave?.()}
      onClick={() => onClick?.()}
    />
  );
}
