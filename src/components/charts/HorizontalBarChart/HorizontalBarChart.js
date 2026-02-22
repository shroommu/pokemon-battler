import * as d3 from "d3";
import { useId, useMemo, useState } from "react";

import Tooltip from "../components/Tooltip";
import { roundUpToNearestTen } from "../axisUtils";
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
  barFillGradient,
  referenceLineFillColor,
  fixedDomainMax,
  innerRef,
  ariaLabel = "Horizontal bar chart",
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
      .domain([0, roundedDomainMax])
      .range([0, boundsWidth]);
  }, [roundedDomainMax, boundsWidth]);

  const barGradientId = barFillGradient?.id || `${chartGradientId}-bar-fill-gradient`;
  const barFill = barFillGradient ? `url(#${barGradientId})` : barFillColor;

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
        barFill={barFill}
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

    const showTooltip = () =>
      setInteractionData({
        xPos: MARGIN.left + xScale(d.referenceLine) + 4,
        yPos: y + yScale.bandwidth() / 2 + BAR_PADDING * 100,
        children: (
          <div>
            {d.referenceLineTooltipText}
            {d.referenceLine}
          </div>
        ),
      });

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
        onMouseEnter={() => showTooltip()}
        onMouseLeave={() => setInteractionData(null)}
        onClick={() => showTooltip()}
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
      <svg width={width} height={height} role="img" aria-label={ariaLabel}>
        {barFillGradient && (
          <defs>
            <linearGradient
              id={barGradientId}
              x1={barFillGradient.x1 || "0%"}
              y1={barFillGradient.y1 || "0%"}
              x2={barFillGradient.x2 || "100%"}
              y2={barFillGradient.y2 || "0%"}
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
