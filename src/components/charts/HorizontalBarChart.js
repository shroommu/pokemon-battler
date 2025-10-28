import * as d3 from "d3";
import { useMemo, useState } from "react";

import Tooltip from "./components/Tooltip";

const MARGIN = { top: 30, right: 30, bottom: 30, left: 30 };
const BAR_PADDING = 0.3;

export default function HorizontalBarChart({
  width,
  height,
  data,
  showReferenceLine,
  barFillColor,
  fixedDomainMax,
  innerRef,
}) {
  const [interactionData, setInteractionData] = useState(null);

  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const domainMax = fixedDomainMax || d3.max(data.map((d) => d.value));
  const domainMaxWithReferenceLine = fixedDomainMax
    ? fixedDomainMax
    : showReferenceLine
    ? d3.max(data.map((d) => d3.max([d.value, d.referenceLine])))
    : domainMax;

  const groups = data.map((d) => d.name);

  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(groups)
      .range([0, boundsHeight])
      .padding(BAR_PADDING);
  }, [data, height]);

  const xScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, domainMaxWithReferenceLine])
      .range([0, boundsWidth]);
  }, [data, width]);

  const allShapes = data.map((d, index) => {
    const y = yScale(d.name);
    if (y === undefined) {
      return null;
    }

    return (
      <g
        key={index}
        onMouseEnter={() =>
          setInteractionData({
            xPos: 0,
            yPos: y + yScale.bandwidth(),
            text: d.name,
          })
        }
        onMouseLeave={() => setInteractionData(null)}
      >
        <rect
          x={xScale(0)}
          y={y}
          width={xScale(d.value)}
          height={yScale.bandwidth()}
          fill={barFillColor || "#ffffffff"}
          rx={1}
        />
        <text
          x={xScale(d.value) - 7}
          y={y + yScale.bandwidth() / 2}
          textAnchor="end"
          alignmentBaseline="central"
          fontSize={12}
          opacity={xScale(d.value) > 90 ? 1 : 0} // hide label if bar is not wide enough
        >
          {d.value}
        </text>
        <text
          x={xScale(0) + 7}
          y={y + yScale.bandwidth() / 2}
          textAnchor="start"
          alignmentBaseline="central"
          fontSize={12}
        >
          {d.name}
        </text>
        {showReferenceLine && (
          <rect
            width={8}
            height={yScale.bandwidth() + 8}
            x={xScale(d.referenceLine) - 4}
            y={yScale(d.name) - 4}
            fill={"#888888ff"}
            opacity={0.75}
            rx={1}
          />
        )}
      </g>
    );
  });

  const grid = xScale.ticks(5).map((value, i) => (
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
    <div
      className="h-full w-full relative"
      ref={innerRef}
      data-testid="horizontal-bar-chart-container"
    >
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
      <div
        style={{
          position: "absolute",
          alignmentBaseline: "central",
          width,
          height,
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
        data-testid="tooltip-layer"
      >
        <Tooltip interactionData={interactionData} />
      </div>
    </div>
  );
}
