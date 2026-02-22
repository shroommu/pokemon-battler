import * as d3 from "d3";
import { useId, useMemo, useState } from "react";

import Tooltip from "../components/Tooltip";
import { roundUpToNearestTen } from "../axisUtils";
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
  barFillGradient,
  referenceLineFillColor,
  fixedDomainMax,
  innerRef,
  ariaLabel = "Vertical bar chart",
}) {
  const [interactionData, setInteractionData] = useState(null);
  const chartGradientId = useId().replace(/[:]/g, "");

  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const domainMax = fixedDomainMax || d3.max(data.map((d) => d.value));
  const domainMaxWithReferenceLine = fixedDomainMax
    ? fixedDomainMax
    : showReferenceLine
      ? d3.max(data.map((d) => d3.max([d.value, d.referenceLine])))
      : domainMax;
  const roundedDomainMax = roundUpToNearestTen(domainMaxWithReferenceLine);

  const groups = data.map((d) => d.name);

  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(groups)
      .range([0, boundsWidth])
      .padding(BAR_PADDING);
  }, [groups, boundsWidth]);

  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, roundedDomainMax])
      .range([0, boundsHeight]);
  }, [roundedDomainMax, boundsHeight]);

  const barGradientId = barFillGradient?.id || `${chartGradientId}-bar-fill-gradient`;
  const barFill = barFillGradient ? `url(#${barGradientId})` : barFillColor;

  const allShapes = data.map((d, index) => {
    const x = xScale(d.name);
    if (x === undefined) {
      return null;
    }

    const showTooltip = () =>
      setInteractionData({
        xPos: x + xScale.bandwidth() / 2 + BAR_PADDING * 100,
        yPos: boundsHeight - yScale(d.value) + MARGIN.top,
        children: (
          <div>
            {d.tooltipText}
            {d.value}
          </div>
        ),
      });

    return (
      <VerticalBarItem
        key={index}
        testId={`${d.name}-bar-item`}
        x={xScale(d.name)}
        y={boundsHeight - yScale(d.value)}
        barOrigin={boundsHeight}
        barWidth={xScale.bandwidth()}
        barHeight={yScale(d.value)}
        barFill={barFill}
        barColor={barFillColor}
        rx={1}
        name={d.name}
        value={d.value}
        onMouseEnter={() => showTooltip()}
        onMouseLeave={() => setInteractionData(null)}
        onClick={() => showTooltip()}
      />
    );
  });

  const allReferenceLines = data.map((d, index) => {
    const x = xScale(d.name);
    if (x === undefined) {
      return null;
    }

    const showTooltip = () =>
      setInteractionData({
        xPos: x + xScale.bandwidth() / 2 + BAR_PADDING * 100,
        yPos: boundsHeight - yScale(d.referenceLine) + MARGIN.top,
        children: (
          <div>
            {d.referenceLineTooltipText}
            {d.referenceLine}
          </div>
        ),
      });

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
        onMouseEnter={() => showTooltip()}
        onMouseLeave={() => setInteractionData(null)}
        onClick={() => showTooltip()}
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
      <svg width={width} height={height} role="img" aria-label={ariaLabel}>
        {barFillGradient && (
          <defs>
            <linearGradient
              id={barGradientId}
              x1={barFillGradient.x1 || "0%"}
              y1={barFillGradient.y1 || "0%"}
              x2={barFillGradient.x2 || "0%"}
              y2={barFillGradient.y2 || "100%"}
            >
              {(barFillGradient.stops || []).map((stop, index) => (
                <stop
                  key={index}
                  offset={stop.offset}
                  stopColor={stop.color}
                  stopOpacity={stop.opacity}
                />
              ))}
            </linearGradient>
          </defs>
        )}
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
