import { useSpring, animated } from "react-spring";

export default function HorizontalBarItem({
  testId,
  name,
  value,
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
      barWidth: 0,
      valueOpacity: 0,
    },
    to: {
      value: value,
      barWidth: barWidth,
      valueOpacity: barWidth > 80 ? 1 : 0,
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
        y={y}
        width={springProps.barWidth}
        height={barHeight}
        fill={barColor || "#ffffffff"}
        rx={1}
        onMouseEnter={() => onMouseEnter()}
        onMouseLeave={() => onMouseLeave()}
        onClick={() => onClick()}
      />
      <animated.text
        x={springProps.barWidth?.to((width) => width - 7)}
        y={y + barHeight / 2}
        textAnchor="end"
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
