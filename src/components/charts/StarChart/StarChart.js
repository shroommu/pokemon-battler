import * as d3 from "d3";

const MARGIN = { top: 30, right: 30, bottom: 30, left: 30 };
const BAR_PADDING = 0.3;
const HIGHEST_STAT = 155;

const TEST_DATA = [
  {
    name: "HP",
    value: 25,
    tooltipText: `Max HP of MissingNo: `,
  },
  {
    name: "Attack",
    value: 75,
    tooltipText: `Max Attack of MissingNo: `,
  },
  {
    name: "Defense",
    value: 50,
    tooltipText: `Max Defense of MissingNo: `,
  },
  {
    name: "Special",
    value: 75,
    tooltipText: `Max Special of MissingNo: `,
  },
  {
    name: "Speed",
    value: 155,
    tooltipText: `Max Speed of MissingNo: `,
  },
];

export default function StarChart({
  height = 100,
  width = 100,
  data = TEST_DATA,
}) {
  const starPath = ({
    stroke = "",
    fill = "transparent",
    scale = 1,
    dataPoints = [],
  }) => {
    const statDistances = dataPoints.map((d) => d.value / HIGHEST_STAT);
    const baseStarCoordinates = [
      { x: 5, y: 0 },
      { x: 10, y: 3 },
      { x: 8, y: 9 },
      { x: 2, y: 9 },
      { x: 0, y: 3 },
    ];

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
    const starPoints = statDistances.length
      ? pathString
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

  const statsStar = starPath({ dataPoints: data, fill: "blue" });

  return (
    <div
      className="h-full w-full relative"
      data-testid="horizontal-bar-chart-container"
    >
      <svg width={width} height={height} viewBox="0 0 10 10">
        {width > 0 && height > 0 && (
          <g width={width} height={height}>
            {starPath({ fill: "white" })}
            {grid}
            {statsStar}
          </g>
        )}
      </svg>
    </div>
  );
}
