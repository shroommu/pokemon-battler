import { interpolateNumber } from "d3";
import { animated, useSpring } from "react-spring";

import { HIGHEST_STAT } from "@/components/constants";

const getInterpolatedStarPoints = (dataPoints) => {
  const baseStarCoordinates = [
    { x: 5, y: 0 },
    { x: 10, y: 3 },
    { x: 8, y: 9 },
    { x: 2, y: 9 },
    { x: 0, y: 3 },
  ];

  const statDistances = dataPoints.map((d) => d.value / HIGHEST_STAT);

  const interpolatedStarCoordinates = baseStarCoordinates.map((sc, index) => {
    return {
      x: interpolateNumber(5, sc.x)(statDistances[index]),
      y: interpolateNumber(5, sc.y)(statDistances[index]),
    };
  });

  let pathString = "M";
  interpolatedStarCoordinates.forEach(
    (isc, index) =>
      (pathString += ` ${isc.x} ${isc.y} ${index < 4 ? "L" : "Z"}`),
  );

  return pathString;
};

export default function AnimatedStar({ fill, dataPoints = [] }) {
  const springProps = useSpring({
    from: { d: "M 5 5 L 5 5 L 5 5 L 5 5 L 5 5 Z" },
    to: { d: getInterpolatedStarPoints(dataPoints) },
    config: {
      friction: 100,
    },
  });

  return <animated.path d={springProps.d} fill={fill} />;
}
