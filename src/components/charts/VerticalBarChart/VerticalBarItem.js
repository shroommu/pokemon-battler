import { useSpring, animated } from "react-spring";

export default function VerticalBarItem({
  testId,
  name,
  value,
  barOrigin,
  barHeight,
  barWidth,
  barColor,
  x,
  y,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  const springProps = useSpring({
    from: {
      value: 0,
      barHeight: barOrigin,
      valueOpacity: 0,
    },
    to: {
      value: value,
      barHeight: barHeight,
      y,
    },
    config: {
      friction: 100,
    },
  });

  return (
    <g data-testid={testId}>
      <animated.rect
        x={x}
        y={springProps.y}
        width={barWidth}
        height={springProps.barHeight}
        fill={barColor || "#ffffffff"}
        rx={1}
        onMouseEnter={() => onMouseEnter()}
        onMouseLeave={() => onMouseLeave()}
        onClick={() => onClick()}
      />
      <animated.text
        x={x}
        y={y}
        textAnchor="middle"
        alignmentBaseline="central"
        fontSize={12}
        opacity={1}
        pointerEvents={"none"}
      >
        {springProps.value?.to((value) => value.toFixed(0))}
      </animated.text>
      <animated.text
        x={x + 7}
        y={y + barHeight / 2}
        textAnchor="start"
        alignmentBaseline="central"
        fontSize={12}
        pointerEvents={"none"}
      >
        {name}
      </animated.text>
    </g>
  );
}
