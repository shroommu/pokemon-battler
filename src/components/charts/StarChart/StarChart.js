import * as d3 from "d3";

const MARGIN = { top: 30, right: 30, bottom: 30, left: 30 };
const BAR_PADDING = 0.3;
const HIGHEST_STAT = 155;

const TEST_DATA = [
  {
    name: "HP",
    value: 50,
    tooltipText: `Max HP of MissingNo: `,
  },
  {
    name: "Attack",
    value: 45,
    tooltipText: `Max Attack of MissingNo: `,
  },
  {
    name: "Defense",
    value: 40,
    tooltipText: `Max Defense of MissingNo: `,
  },
  {
    name: "Special",
    value: 35,
    tooltipText: `Max Special of MissingNo: `,
  },
  {
    name: "Speed",
    value: 30,
    tooltipText: `Max Speed of MissingNo: `,
  },
];

export default function StarChart({
  height = 100,
  width = 100,
  data = TEST_DATA,
}) {
  const defaultStarPath = ({
    stroke = "",
    fill = "transparent",
    scale = 1,
  }) => (
    <path
      d="M 5 0 L 10 3 L 8 9 L 2 9 L 0 3 Z"
      stroke={stroke}
      fill={fill}
      strokeWidth={0.1 / scale}
      transform={`scale(${scale}) translate(${(1 - scale) * 5}, ${(1 - scale) * 5})`}
    />
  );

  data.map((d, index) => {
    console.log(d.value);
  });

  const grid = (
    <g>
      <g>{defaultStarPath({ stroke: "black", scale: "0.25" })}</g>
      <g>
        <line x1={5} y1={5} x2={5} y2={0} stroke="black" strokeWidth={0.1} />
        <line x1={5} y1={5} x2={10} y2={3} stroke="black" strokeWidth={0.1} />
        <line x1={5} y1={5} x2={8} y2={9} stroke="black" strokeWidth={0.1} />
        <line x1={5} y1={5} x2={2} y2={9} stroke="black" strokeWidth={0.1} />
        <line x1={5} y1={5} x2={0} y2={3} stroke="black" strokeWidth={0.1} />
      </g>
    </g>
  );

  return (
    <div
      className="h-full w-full relative"
      data-testid="horizontal-bar-chart-container"
    >
      <svg width={width} height={height} viewBox="0 0 10 10">
        {width > 0 && height > 0 && (
          <g
            width={width}
            height={height}
            // transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
          >
            {defaultStarPath({ fill: "white" })}
            {grid}
          </g>
        )}
      </svg>
    </div>
  );
}
