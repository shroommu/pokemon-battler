import * as d3 from "d3";
import { useMemo } from "react";

const MARGIN = { top: 30, right: 30, bottom: 30, left: 30 };
const BAR_PADDING = 0.3;

export default function VerticalBarChart({
  width,
  height,
  data,
  showReferenceLine,
  barFillColor,
  fixedDomainMax,
}) {
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const domainMax = fixedDomainMax || d3.max(data.map((d) => d.value));
  const domainMaxWithReferenceLine = fixedDomainMax
    ? fixedDomainMax
    : showReferenceLine
    ? d3.max(data.map((d) => d3.max([d.value, d.referenceLine])))
    : domainMax;

  const groups = data.map((d) => d.name);

  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(groups)
      .range([0, boundsWidth])
      .padding(BAR_PADDING);
  }, [data, width]);

  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, domainMaxWithReferenceLine])
      .range([0, boundsHeight]);
  }, [data, height]);

  const allShapes = data.map((d, index) => {
    const x = xScale(d.name);
    if (x === undefined) {
      return null;
    }

    return (
      <g key={index}>
        <rect
          x={xScale(d.name)}
          y={boundsHeight - yScale(d.value)}
          width={xScale.bandwidth()}
          height={yScale(d.value)}
          fill={barFillColor || "#ffffffff"}
          rx={1}
        />
        <text
          x={x + xScale.bandwidth() / 2}
          y={boundsHeight - yScale(d.value) + 14}
          textAnchor="middle"
          alignmentBaseline="central"
          fontSize={12}
          opacity={yScale(d.value) > 90 ? 1 : 0} // hide label if bar is not tall enough
        >
          {d.value}
        </text>
        <text
          x={x + xScale.bandwidth() / 2}
          y={boundsHeight + 7}
          textAnchor="middle"
          alignmentBaseline="central"
          fontSize={12}
        >
          {d.name}
        </text>
        {showReferenceLine && (
          <rect
            width={xScale.bandwidth() + 8}
            height={8}
            x={xScale(d.name) - 4}
            y={boundsHeight - yScale(d.referenceLine) - 4}
            fill={"#888888ff"}
            opacity={0.75}
            rx={1}
          />
        )}
      </g>
    );
  });

  const grid = yScale.ticks(5).map((value, i) => (
    <g key={i}>
      <line
        x1={0}
        x2={boundsWidth}
        y1={boundsHeight - yScale(value)}
        y2={boundsHeight - yScale(value)}
        stroke="#808080"
        opacity={0.2}
      />
      <text
        x={boundsWidth + 10}
        y={boundsHeight - yScale(value)}
        textAnchor="middle"
        alignmentBaseline="central"
        fontSize={9}
        stroke="#808080"
        opacity={0.8}
      >
        {value}
      </text>
    </g>
  ));

  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          {grid}
          {allShapes}
        </g>
      </svg>
    </div>
  );
}
