"use client";

import { useMemo, useState, useRef } from "react";
import { scaleBand, scaleLinear } from "d3";

import Tooltip from "../components/Tooltip";
import BoxPlotItem from "./BoxPlotItem";
import MultiBoxControl from "./MultiBoxControl";
import { useDimensions } from "@/hooks/useDimensions";

export default function VerticalBoxPlot({
  width,
  height,
  padding = 30,
  innerRef,
  fixedDomainMax,
  multi = false,
  filterList = [],
  xLabel = "X Axis",
  valueKey,
  data,
}) {
  const xLabelHeight = 24;

  const controlsRef = useRef();
  const controlsDimensions = useDimensions(controlsRef);

  const boundsWidth = width - padding * 2;
  const boundsHeight = multi
    ? height - padding * 2 - xLabelHeight - controlsDimensions.height
    : height - padding * 2 - xLabelHeight;

  const [interactionData, setInteractionData] = useState(null);

  const [activeFilters, setActiveFilters] = useState(() => {
    const activeFiltersObject = filterList.reduce(
      (acc, curr) => ((acc[curr] = false), acc),
      {},
    );
    if (Object.keys(activeFiltersObject).length > 0) {
      activeFiltersObject["All"] = false;
      activeFiltersObject[filterList[0]] = true;
    }
    return activeFiltersObject;
  });

  const activeFilterList = Object.entries(activeFilters)
    .filter(([_, value]) => {
      return value === true;
    })
    .map(([key, _]) => key);

  const xScale = useMemo(() => {
    return scaleLinear().domain([0, fixedDomainMax]).range([0, boundsWidth]);
  }, [fixedDomainMax, boundsWidth]);

  const yScale = useMemo(() => {
    return scaleBand()
      .domain(activeFilterList)
      .range([
        (boundsHeight - padding) / activeFilterList.length / 2,
        boundsHeight,
      ])
      .padding(0.1);
  }, [activeFilterList, boundsHeight, padding]);

  const grid = xScale.ticks(13).map((value, i) => (
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

  const plotLabels = (
    <g data-testid="plot-label-group">
      {Object.entries(data)
        .filter(([key, _]) => activeFilters[key] === true)
        .map(([key, value]) => {
          return value.data.dataPoints.length ? (
            <text
              key={key}
              x={xScale(value.data.min) - 8}
              y={yScale(key)}
              textAnchor="end"
              alignmentBaseline="middle"
            >
              {key}
            </text>
          ) : null;
        })}
    </g>
  );

  return (
    <div
      data-testid="boxplot-and-controls-container"
      className="relative flex flex-col h-full w-full"
      ref={innerRef}
    >
      <div data-testid="boxplot-container">
        <svg
          height={height - controlsDimensions.height}
          className="w-full h-full"
        >
          {width > 0 && height > 0 && (
            <g
              transform={`translate(${[padding, padding].join(",")})`}
              data-testid="padding-group"
            >
              {grid}
              {plotLabels}
              {Object.entries(data)
                .filter(([key, _]) => activeFilters[key] === true)
                .map(([key, value]) => {
                  return value.data.dataPoints.length ? (
                    <BoxPlotItem
                      key={key}
                      data={value.data}
                      width={xScale(value.data.max)}
                      height={yScale.bandwidth()}
                      yPos={yScale(key)}
                      valueKey={valueKey}
                      fillColor={value.displayColor}
                      setInteractionData={setInteractionData}
                      tooltipOffset={padding}
                    />
                  ) : null;
                })}
            </g>
          )}
        </svg>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
          }}
          data-testid="tooltip-layer"
          className="w-full h-full"
        >
          <Tooltip interactionData={interactionData} position={"top"} />
        </div>
      </div>
      <div className="w-full flex justify-center p-4 pt-0">{xLabel}</div>
      <div>
        {multi && (
          <MultiBoxControl
            filterList={filterList}
            activeFilters={activeFilters}
            onChange={setActiveFilters}
            innerRef={controlsRef}
          />
        )}
      </div>
    </div>
  );
}
