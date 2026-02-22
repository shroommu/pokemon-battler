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
  const handleActivateByKeyboard = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  const springProps = useSpring({
    from: {
      value: 0,
      barWidth: 0,
      opacity: 0,
    },
    to: {
      x,
      value: value,
      barWidth: barWidth,
      opacity: 0.75,
    },
    config: {
      friction: 100,
    },
  });

  return (
    <animated.g
      data-testid={testId}
      opacity={springProps.opacity}
      role="button"
      tabIndex={0}
      aria-label={
        typeof value === "number"
          ? `Average reference line: ${value}`
          : "Average reference line"
      }
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
      onFocus={() => onMouseEnter()}
      onBlur={() => onMouseLeave()}
      onKeyDown={handleActivateByKeyboard}
      onClick={() => onClick()}
    >
      <animated.rect
        x={springProps.x}
        y={y}
        fill={color}
        rx={5}
        ry={5}
        className="h-[14px] w-[24px] sm:h-[22px] sm:w-[40px] -translate-x-[8px] sm:-translate-x-[16px] -translate-y-[10px] sm:-translate-y-[17px]"
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
        y={y}
        fill={"#000000ff"}
        rx={1}
        textAnchor={"middle"}
        alignmentBaseline={"central"}
        pointerEvents={"none"}
        className="-translate-y-[4px] sm:-translate-y-[8px]"
      >
        AVG
      </animated.text>
    </animated.g>
  );
}
