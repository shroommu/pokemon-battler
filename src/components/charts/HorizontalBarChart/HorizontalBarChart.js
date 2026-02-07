import * as d3 from "d3";
import { useMemo, useState } from "react";

import Tooltip from "../components/Tooltip";
import HorizontalBarItem from "./HorizontalBarItem";
import HorizontalBarReferenceLine from "./HorizontalBarReferenceLine";

const MARGIN = { top: 30, right: 30, bottom: 30, left: 30 };
const BAR_PADDING = 0.3;

export default function HorizontalBarChart({
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

  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(groups)
      .range([0, boundsHeight])
      .padding(BAR_PADDING);
  }, [groups, boundsHeight]);

  const xScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, domainMaxWithReferenceLine])
      .range([0, boundsWidth]);
  }, [domainMaxWithReferenceLine, boundsWidth]);

  const allShapes = data.map((d, index) => {
    const y = yScale(d.name);
    if (y === undefined) {
      return null;
    }

    return (
      <HorizontalBarItem
        key={index}
        testId={`${d.name}-bar-item`}
        x={xScale(0)}
        y={y}
        barWidth={xScale(d.value)}
        barHeight={yScale.bandwidth()}
        barColor={barFillColor || "#ffffffff"}
        name={d.name}
        value={d.value}
        onMouseEnter={() =>
          setInteractionData({
            xPos: MARGIN.left + xScale(d.value),
            yPos: y + yScale.bandwidth() / 2 + BAR_PADDING * 100,
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
            xPos: MARGIN.left + xScale(d.value),
            yPos: y + yScale.bandwidth() / 2 + BAR_PADDING * 100,
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
    const y = yScale(d.name);
    if (y === undefined) {
      return null;
    }

    return (
      <HorizontalBarReferenceLine
        key={index}
        testId={`${d.name}-reference-line`}
        x={xScale(d.referenceLine) - 4}
        y={yScale(d.name) - 4}
        barWidth={8}
        barHeight={yScale.bandwidth()}
        color={referenceLineFillColor}
        valueOpacity={0.75}
        rx={1}
        onMouseEnter={() =>
          setInteractionData({
            xPos: MARGIN.left + xScale(d.referenceLine) + 4,
            yPos: y + yScale.bandwidth() / 2 + BAR_PADDING * 100,
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
            xPos: MARGIN.left + xScale(d.referenceLine) + 4,
            yPos: y + yScale.bandwidth() / 2 + BAR_PADDING * 100,
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
        {width > 0 && height > 0 && (
          <g
            width={boundsWidth}
            height={boundsHeight}
            transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
            data-testid="padding-group"
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
        <Tooltip interactionData={interactionData} position={"right"} />
      </div>
    </div>
  );
}
