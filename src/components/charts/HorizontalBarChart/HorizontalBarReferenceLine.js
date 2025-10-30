import { useSpring, animated } from "react-spring";

export default function HorizontalBarReferenceLine({
  testId,
  value,
  barHeight,
  barWidth,
  x,
  y,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  const springProps = useSpring({
    from: {
      value: 0,
      barWidth: 0,
      valueOpacity: 0,
    },
    to: {
      x,
      value: value,
      barWidth: barWidth,
      valueOpacity: 0.75,
    },
    config: {
      friction: 100,
    },
  });

  return (
    <g data-testid={testId}>
      <animated.rect
        x={springProps.x}
        y={y}
        width={8}
        height={barHeight + 8}
        fill={"#888888ff"}
        opacity={springProps.valueOpacity}
        rx={1}
        onMouseEnter={() => onMouseEnter()}
        onMouseLeave={() => onMouseLeave()}
        onClick={() => onClick()}
      />
    </g>
  );
}
