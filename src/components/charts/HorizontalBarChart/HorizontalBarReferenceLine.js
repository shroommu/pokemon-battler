import { useSpring, animated } from "react-spring";

export default function HorizontalBarReferenceLine({
  testId,
  value,
  barHeight,
  barWidth,
  color,
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
      valueOpacity: 1,
    },
    config: {
      friction: 100,
    },
  });

  return (
    <animated.g
      data-testid={testId}
      opacity={springProps.valueOpacity}
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => onClick()}
    >
      <animated.rect
        x={springProps.x?.to((x) => x - 8)}
        y={y - 10}
        width={24}
        height={14}
        fill={color}
        rx={5}
        ry={5}
      />
      <animated.rect
        x={springProps.x}
        y={y}
        width={8}
        height={barHeight + 8}
        fill={color}
      />
      <animated.text
        x={springProps.x?.to((x) => x + 4)}
        y={y - 4}
        fill={"#000000ff"}
        rx={1}
        fontSize={10}
        textAnchor={"middle"}
        alignmentBaseline={"central"}
        pointerEvents={"none"}
      >
        AVG
      </animated.text>
    </animated.g>
  );
}
