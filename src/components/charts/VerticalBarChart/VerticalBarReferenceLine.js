import { useSpring, animated } from "react-spring";

export default function VerticalBarReferenceLine({
  testId,
  barHeight,
  barWidth,
  barOrigin,
  color,
  x,
  y,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  const springProps = useSpring({
    from: {
      y: barHeight,
      opacity: 0,
    },
    to: {
      opacity: 0.75,
      y,
    },
    config: {
      friction: 100,
    },
  });

  return (
    <animated.g
      data-testid={testId}
      opacity={springProps.opacity}
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => onClick()}
    >
      <animated.rect
        x={x - 10}
        y={springProps.y?.to((y) => y - 8)}
        width={14}
        height={24}
        fill={color}
        rx={5}
        ry={5}
      />
      <animated.rect
        x={x - 4}
        y={springProps.y}
        width={barWidth + 8}
        height={8}
        fill={color}
      />
      <animated.text
        x={-x + 4}
        y={springProps.y?.to((y) => -y - 3)}
        fill={"#000000ff"}
        writingMode={"vertical-lr"}
        fontSize={10}
        textAnchor={"middle"}
        dominant-baseline={"central"}
        alignmentBaseline={"central"}
        transform={"rotate(180)"}
        pointerEvents={"none"}
      >
        AVG
      </animated.text>
    </animated.g>
  );
}
