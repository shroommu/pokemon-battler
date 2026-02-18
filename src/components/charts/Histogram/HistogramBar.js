
import { useSpring, animated } from "react-spring";

export default function HistogramBar({
  bin,
  index,
  x,
  y,
  barWidth,
  barHeight,
  barFillColor,
  showTooltip,
  setInteractionData,
}) {
  const springProps = useSpring({
    from: {
      barHeight: 0,
      y: y + barHeight,
      valueOpacity: 0,
    },
    to: {
      barHeight: barHeight,
      y: y,
      valueOpacity: barHeight > 30 ? 1 : 0,
    },
    config: {
      friction: 100,
    },
  });

  return (
    <g data-testid={`histogram-bin-${index}`}>
      <animated.rect
        x={x}
        y={springProps.y}
        width={barWidth}
        height={springProps.barHeight}
        fill={barFillColor || "blue"}
        rx={1}
        onMouseEnter={showTooltip}
        onMouseLeave={() => setInteractionData(null)}
        onClick={showTooltip}
      />
      <animated.text
        x={x + barWidth / 2}
        y={springProps.y?.to((yVal) => yVal + 14)}
        textAnchor="middle"
        alignmentBaseline="central"
        fontSize={12}
        opacity={springProps.valueOpacity}
        pointerEvents={"none"}
      >
        {bin.length}
      </animated.text>
    </g>
  );
}
