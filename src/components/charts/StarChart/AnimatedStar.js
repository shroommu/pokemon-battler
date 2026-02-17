import { animated, useSpring } from "react-spring";

const getPathString = (starPoints) => {
  let pathString = "M";
  starPoints.forEach(
    (isc, index) =>
      (pathString += ` ${isc.x} ${isc.y} ${index < 4 ? "L" : "Z"}`),
  );

  return pathString;
};

export default function AnimatedStar({ fill, starPoints, testId = "animated-star" }) {
  const springProps = useSpring({
    from: { d: "M 5 5 L 5 5 L 5 5 L 5 5 L 5 5 Z" },
    to: { d: getPathString(starPoints) },
    config: {
      friction: 100,
    },
  });

  return <animated.path d={springProps.d} fill={fill} data-testid={testId} />;
}
