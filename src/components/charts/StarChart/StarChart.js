import * as d3 from "d3";

import { HIGHEST_STAT } from "@/components/constants";

const starPath = ({
  stroke = "transparent",
  fill = "transparent",
  scale = 1,
  dataPoints = [],
}) => {
  const starPoints = dataPoints.length
    ? getInterpolatedStarPoints(dataPoints)
    : "M 5 0 L 10 3 L 8 9 L 2 9 L 0 3 Z";

  return (
    <path
      d={starPoints}
      stroke={stroke}
      fill={fill}
      strokeWidth={0.1 / scale}
      transform={`scale(${scale}) translate(${(1 - scale) * (5 * (1 / scale))}, ${(1 - scale) * (5 * (1 / scale))})`}
    />
  );
};

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
      x: d3.interpolateNumber(5, sc.x)(statDistances[index]),
      y: d3.interpolateNumber(5, sc.y)(statDistances[index]),
    };
  });

  let pathString = "M";
  interpolatedStarCoordinates.forEach(
    (isc, index) =>
      (pathString += ` ${isc.x} ${isc.y} ${index < 4 ? "L" : "Z"}`),
  );

  return pathString;
};

export default function StarChart({
  height = 100,
  width = 100,
  data,
  fillColor,
}) {
  const grid = (
    <g opacity={0.5}>
      <g>
        {starPath({ stroke: "black", scale: "0.25" })}
        {starPath({ stroke: "black", scale: "0.50" })}
        {starPath({ stroke: "black", scale: "0.75" })}
        {starPath({ stroke: "black", scale: "1" })}
      </g>
      <g>
        <line x1={5} y1={5} x2={5} y2={0} stroke="black" strokeWidth={0.1} />
        <line x1={5} y1={5} x2={10} y2={3} stroke="black" strokeWidth={0.1} />
        <line x1={5} y1={5} x2={8} y2={9} stroke="black" strokeWidth={0.1} />
        <line x1={5} y1={5} x2={2} y2={9} stroke="black" strokeWidth={0.1} />
        <line x1={5} y1={5} x2={0} y2={3} stroke="black" strokeWidth={0.1} />
      </g>
    </g>
  );

  const statsStar = starPath({ dataPoints: data, fill: fillColor });

  return (
    <div className="h-full w-full relative" data-testid="star-chart-container">
      <svg width={width} height={height} viewBox="0 0 10 10">
        {width > 0 && height > 0 && (
          <g width={width} height={height}>
            {starPath({ fill: "white" })}
            {statsStar}
            {grid}
          </g>
        )}
      </svg>
    </div>
  );
}
