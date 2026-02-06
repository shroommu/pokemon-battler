import { useMemo } from "react";

import { scaleLinear } from "d3";

import BoxPlotItem from "./BoxPlotItem";

export default function BoxPlot({ width = 600, height = 400, data }) {
  const padding = 30;
  const boundsWidth = width - padding * 2;
  const boundsHeight = height - padding * 2;

  const xScale = useMemo(() => {
    return scaleLinear()
      .domain([0, Math.ceil(data.max / 100) * 100])
      .range([0, boundsWidth]);
  }, [data, boundsWidth]);

  const grid = xScale.ticks(7).map((value, i) => (
    <g key={i}>
      <line
        x1={xScale(value)}
        x2={xScale(value)}
        y1={0}
        y2={boundsHeight}
        stroke="#808080"
        opacity={0.2}
      />
      <text
        x={xScale(value)}
        y={boundsHeight + 10}
        textAnchor="middle"
        alignmentBaseline="central"
        fontSize={9}
        opacity={0.8}
      >
        {value}
      </text>
    </g>
  ));

  return (
    <div data-testid="boxplot-container">
      <svg width={width} height={height}>
        <rect width="100%" height="100%" fill="white" />
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[padding, padding].join(",")})`}
          data-testid="padding-group"
        >
          {grid}
          <BoxPlotItem
            data={data}
            width={xScale(data.max)}
            height={100}
            yPos={boundsHeight / 2}
          />
        </g>
        <line x1={width / 2} x2={width / 2} y1={0} y2={height} stroke="black" />
        <line
          x1={0}
          x2={width}
          y1={height / 2}
          y2={height / 2}
          stroke="black"
        />
      </svg>
    </div>
  );
}
