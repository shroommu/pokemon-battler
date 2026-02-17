"use client";

import * as d3 from "d3";
import { useMemo, useState } from "react";

import Tooltip from "../components/Tooltip";

const MARGIN = { top: 30, right: 30, bottom: 30, left: 30 };

export default function Histogram({
  width = 600,
  height = 400,
  bins = [],
  barPadding = 2,
  barFillColor,
  innerRef,
}) {
  const [interactionData, setInteractionData] = useState(null);

  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const xDomain = useMemo(() => {
    if (!bins.length) {
      return [0, 1];
    }

    return [
      d3.min(bins.map((bin) => bin.x0)),
      d3.max(bins.map((bin) => bin.x1)),
    ];
  }, [bins]);

  const yDomainMax = useMemo(() => {
    if (!bins.length) {
      return 1;
    }

    return d3.max(bins.map((bin) => bin.length)) || 1;
  }, [bins]);

  const xScale = useMemo(() => {
    return d3.scaleLinear().domain(xDomain).range([0, boundsWidth]);
  }, [xDomain, boundsWidth]);

  const yScale = useMemo(() => {
    return d3.scaleLinear().domain([0, yDomainMax]).range([0, boundsHeight]);
  }, [yDomainMax, boundsHeight]);

  const bars = bins.map((bin, index) => {
    const scaledX0 = xScale(bin.x0);
    const scaledX1 = xScale(bin.x1);
    const x = scaledX0;
    const binWidth = Math.abs(scaledX1 - scaledX0);
    const barWidth = Math.max(1, binWidth - barPadding);
    const barHeight = yScale(bin.length);
    const y = boundsHeight - barHeight;

    const showTooltip = () =>
      setInteractionData({
        xPos: MARGIN.left + x + barWidth / 2,
        yPos: MARGIN.top + y,
        children: (
          <div>
            {bin.x0} - {bin.x1}: {bin.length}
          </div>
        ),
      });

    return (
      <rect
        key={`${bin.x0}-${bin.x1}-${index}`}
        data-testid={`histogram-bin-${index}`}
        x={x}
        y={y}
        width={barWidth}
        height={barHeight}
        fill={barFillColor || "blue"}
        onMouseEnter={() => showTooltip()}
        onMouseLeave={() => setInteractionData(null)}
        onClick={() => showTooltip()}
      />
    );
  });

  const grid = yScale.ticks(5).map((value, index) => (
    <g key={`${value}-${index}`}>
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

  // X-axis
  const xAxisTicks = xScale.ticks(bins.length);
  const xAxis = (
    <g key="x-axis">
      {/* Axis line */}
      <line
        x1={0}
        x2={boundsWidth}
        y1={boundsHeight}
        y2={boundsHeight}
        stroke="#808080"
        strokeWidth={1}
      />
      {/* Tick marks and labels */}
      {xAxisTicks.map((tick, idx) => (
        <g key={`x-axis-tick-${tick}-${idx}`}> 
          <line
            x1={xScale(tick)}
            x2={xScale(tick)}
            y1={boundsHeight}
            y2={boundsHeight + 6}
            stroke="#808080"
          />
          <text
            x={xScale(tick)}
            y={boundsHeight + 20}
            textAnchor="middle"
            fontSize={12}
            fill="#808080"
          >
            {tick}
          </text>
        </g>
      ))}
    </g>
  );
  return (
    <div
      className="h-full w-full relative"
      ref={innerRef}
      data-testid="histogram-container"
    >
      <svg height={height} width={width}>
        {width > 0 && height > 0 && (
          <g
            width={boundsWidth}
            height={boundsHeight}
            transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
          >
            {grid}
            {bars}
            {xAxis}
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
