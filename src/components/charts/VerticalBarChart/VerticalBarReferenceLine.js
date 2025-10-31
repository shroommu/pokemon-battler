import { useSpring, animated } from "react-spring";

export default function VerticalBarReferenceLine({
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
      y: barHeight,
      valueOpacity: 0,
    },
    to: {
      valueOpacity: 0.75,
      y,
    },
    config: {
      friction: 100,
    },
  });

  return (
    <g data-testid={testId}>
      <animated.rect
        x={x - 4}
        y={springProps.y}
        width={barWidth + 8}
        height={8}
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
