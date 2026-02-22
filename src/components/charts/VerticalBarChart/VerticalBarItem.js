import { useSpring, animated } from "react-spring";

export default function VerticalBarItem({
  testId,
  name,
  value,
  barOrigin,
  barHeight,
  barWidth,
  barFill,
  barColor,
  x,
  y,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  const handleActivateByKeyboard = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  const springProps = useSpring({
    from: {
      value: 0,
      barHeight: 0,
      valueOpacity: 0,
      y: barOrigin,
    },
    to: {
      value: value,
      barHeight: barHeight,
      valueOpacity: barHeight > 30 ? 1 : 0,
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
        fill={barFill || barColor || "#ffffffff"}
        rx={1}
        role="button"
        tabIndex={0}
        aria-label={`${name}: ${value}`}
        onMouseEnter={() => onMouseEnter()}
        onMouseLeave={() => onMouseLeave()}
        onFocus={() => onMouseEnter()}
        onBlur={() => onMouseLeave()}
        onKeyDown={handleActivateByKeyboard}
        onClick={() => onClick()}
      />
      <animated.text
        x={x + barWidth / 2}
        y={springProps.y?.to((y) => y + 14)}
        textAnchor="middle"
        alignmentBaseline="central"
        fontSize={12}
        opacity={springProps.valueOpacity}
        pointerEvents={"none"}
      >
        {springProps.value?.to((value) => value.toFixed(0))}
      </animated.text>
      <animated.text
        x={x + barWidth / 2}
        y={barOrigin + 7}
        textAnchor="middle"
        alignmentBaseline="central"
        fontSize={12}
        pointerEvents={"none"}
      >
        {name}
      </animated.text>
    </g>
  );
}
