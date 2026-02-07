"use client";

import { useMemo, useState } from "react";
import { filter, scaleLinear } from "d3";

import { getBoxplotData } from "./getBoxplotData";

import BoxPlotItem from "./BoxPlotItem";
import MultiBoxControl from "./MultiBoxControl";

export default function BoxPlot({
  width = 600,
  height = 400,
  multi = false,
  filterList = [],
  filterBy,
  valueKey,
  data,
}) {
  const padding = 30;
  const boundsWidth = width - padding * 2;
  const boundsHeight = height - padding * 2;

  const [activeFilters, setActiveFilters] = useState(() => {
    const activeFiltersObject = filterList.reduce(
      (acc, curr) => ((acc[curr] = false), acc),
      {},
    );
    if (Object.keys(activeFiltersObject)) {
      activeFiltersObject["All"] = false;
      activeFiltersObject[filterList[0]] = true;
    }
    return activeFiltersObject;
  });

  const filteredData = filterList.reduce(
    (acc, curr) => (
      (acc[curr] = getBoxplotData(
        data.filter((d) => d[filterBy] == curr),
        valueKey,
      )),
      acc
    ),
    {},
  );

  console.log(filteredData);

  const xScale = useMemo(() => {
    return (
      scaleLinear()
        //.domain([0, Math.ceil(data.max / 100) * 100])
        .domain([0, 600])
        .range([0, boundsWidth])
    );
  }, [data, boundsWidth]);

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

  return (
    <div data-testid="boxplot-and-controls-container" className="flex flex-row">
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
            {Object.entries(filteredData)
              .filter(([key, _]) => activeFilters[key] == true)
              .map(([key, data]) => {
                return data.dataPoints.length ? (
                  <BoxPlotItem
                    key={key}
                    data={data}
                    width={xScale(data.max)}
                    height={50}
                    yPos={boundsHeight / 2}
                    valueKey={valueKey}
                  />
                ) : null;
              })}
          </g>
          <line
            x1={width / 2}
            x2={width / 2}
            y1={0}
            y2={height}
            stroke="black"
          />
          <line
            x1={0}
            x2={width}
            y1={height / 2}
            y2={height / 2}
            stroke="black"
          />
        </svg>
      </div>
      <div className="h-full">
        {multi && (
          <MultiBoxControl
            filterList={filterList}
            activeFilters={activeFilters}
            onChange={setActiveFilters}
          />
        )}
      </div>
    </div>
  );
}
