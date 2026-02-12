import * as d3 from "d3";
import { useMemo, useState } from "react";

import Tooltip from "../components/Tooltip";
import VerticalBarItem from "./VerticalBarItem";
import VerticalBarReferenceLine from "./VerticalBarReferenceLine";

const MARGIN = { top: 30, right: 30, bottom: 30, left: 30 };
const BAR_PADDING = 0.3;

export default function VerticalBarChart({
  width,
  height,
  data,
  showReferenceLine,
  barFillColor,
  referenceLineFillColor,
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
      <VerticalBarItem
        key={index}
        testId={`${d.name}-bar-item`}
        x={xScale(d.name)}
        y={boundsHeight - yScale(d.value)}
        barOrigin={boundsHeight}
        barWidth={xScale.bandwidth()}
        barHeight={yScale(d.value)}
        barColor={barFillColor}
        rx={1}
        name={d.name}
        value={d.value}
        onMouseEnter={() =>
          setInteractionData({
            xPos: x + xScale.bandwidth() / 2 + BAR_PADDING * 100,
            yPos: boundsHeight - yScale(d.value) + MARGIN.top,
            children: (
              <div>
                {d.tooltipText}
                {d.value}
              </div>
            ),
          })
        }
        onMouseLeave={() => setInteractionData(null)}
        onClick={() =>
          setInteractionData({
            xPos: x + xScale.bandwidth() / 2 + BAR_PADDING * 100,
            yPos: boundsHeight - yScale(d.value),
            children: (
              <div>
                {d.tooltipText}
                {d.value}
              </div>
            ),
          })
        }
      />
    );
  });

  const allReferenceLines = data.map((d, index) => {
    const x = xScale(d.name);
    if (x === undefined) {
      return null;
    }

    return (
      <VerticalBarReferenceLine
        key={index}
        testId={`${d.name}-reference-line`}
        x={xScale(d.name) - 4}
        y={boundsHeight - yScale(d.referenceLine) - 4}
        barOrigin={boundsHeight}
        barWidth={xScale.bandwidth() + 8}
        barHeight={8}
        color={referenceLineFillColor}
        rx={1}
        onMouseEnter={() =>
          setInteractionData({
            xPos: x + xScale.bandwidth() / 2 + BAR_PADDING * 100,
            yPos: MARGIN.bottom + yScale(d.referenceLine),
            children: (
              <div>
                {d.referenceLineTooltipText}
                {d.referenceLine}
              </div>
            ),
          })
        }
        onMouseLeave={() => setInteractionData(null)}
        onClick={() =>
          setInteractionData({
            xPos: x + xScale.bandwidth() / 2 + BAR_PADDING * 100,
            yPos: MARGIN.bottom + yScale(d.referenceLine),
            children: (
              <div>
                {d.referenceLineTooltipText}
                {d.referenceLine}
              </div>
            ),
          })
        }
      />
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
      data-testid="vertical-bar-chart-container"
    >
      <svg width={width} height={height}>
        {width > 0 && height > 0 && (
          <g
            width={boundsWidth}
            height={boundsHeight}
            transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
          >
            {grid}
            {allShapes}
            {showReferenceLine && allReferenceLines}
          </g>
        )}
      </svg>
      <div
        style={{
          position: "absolute",
          width,
          height,
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
        data-testid="tooltip-layer"
      >
        <Tooltip interactionData={interactionData} position={"top"} />
      </div>
    </div>
  );
}
