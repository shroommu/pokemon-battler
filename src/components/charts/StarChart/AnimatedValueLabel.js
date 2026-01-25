import { animated, useSpring } from "react-spring";

export default function AnimatedValueLabel({ centerX, centerY, x, y, value }) {
  const springProps = useSpring({
    from: { x: centerX, y: centerY, value: 0 },
    to: { x, y, value },
    config: {
      friction: 100,
    },
  });

  return (
    <animated.text
      x={springProps.x}
      y={springProps.y}
      textAnchor="middle"
      alignmentBaseline="central"
    >
      {springProps.value?.to((value) => value.toFixed(0))}
    </animated.text>
  );
}
