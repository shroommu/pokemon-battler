import { useSpring, animated } from "react-spring";

export default function VerticalBarReferenceLine({
  testId,
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
      role="button"
      tabIndex={0}
      aria-label="Average reference line"
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
      onFocus={() => onMouseEnter()}
      onBlur={() => onMouseLeave()}
      onKeyDown={handleActivateByKeyboard}
      onClick={() => onClick()}
    >
      <animated.rect
        x={x}
        y={springProps.y}
        fill={color}
        rx={5}
        ry={5}
        className="w-[14px] h-[24px] sm:w-[22px] sm:h-[40px] -translate-y-[8px] sm:-translate-y-[16px] -translate-x-[10px] sm:-translate-x-[17px]"
      />
      <animated.rect
        x={x - 4}
        y={springProps.y}
        width={barWidth + 8}
        height={8}
        fill={color}
      />
      <animated.text
        x={-x}
        y={springProps.y?.to((y) => -y - 3)}
        fill={"#000000ff"}
        writingMode={"vertical-lr"}
        fontSize={10}
        textAnchor={"middle"}
        dominantBaseline={"central"}
        alignmentBaseline={"central"}
        pointerEvents={"none"}
        className="-translate-x-[4px] sm:-translate-x-[8px] rotate-180"
      >
        AVG
      </animated.text>
    </animated.g>
  );
}
