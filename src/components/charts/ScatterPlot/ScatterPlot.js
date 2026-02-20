import * as d3 from "d3";
import { useMemo, useState } from "react";

import Tooltip from "../components/Tooltip";
import AxisSelectorControl from "./AxisSelectorControl";
import ScatterPoint from "./ScatterPoint";

const MARGIN = { top: 30, right: 30, bottom: 40, left: 40 };

const getAxisKeysFromData = (data) => {
  if (!data.length) {
    return [];
  }

  const [firstDatum] = data;

  if (firstDatum.values && typeof firstDatum.values === "object") {
    return Object.keys(firstDatum.values);
  }

  if (firstDatum.stats && typeof firstDatum.stats === "object") {
    return Object.keys(firstDatum.stats);
  }

  return Object.keys(firstDatum).filter(
    (key) => typeof firstDatum[key] === "number",
  );
};

const getAxisValue = (datum, axisKey) => {
  if (datum.values && typeof datum.values[axisKey] === "number") {
    return datum.values[axisKey];
  }

  if (datum.stats && typeof datum.stats[axisKey] === "number") {
    return datum.stats[axisKey];
  }

  if (typeof datum[axisKey] === "number") {
    return datum[axisKey];
  }

  return 0;
};

const getDomainFromValues = (values) => {
  const [min, max] = d3.extent(values);

  if (min === undefined || max === undefined) {
    return [0, 1];
  }

  if (min === max) {
    return [min - 1, max + 1];
  }

  return [min, max];
};

export default function ScatterPlot({
  width,
  height,
  innerRef,
  data = [],
  axisOptions,
  initialXAxisKey,
  initialYAxisKey,
}) {
  const [interactionData, setInteractionData] = useState(null);

  const availableAxisOptions = useMemo(
    () => axisOptions || getAxisKeysFromData(data),
    [axisOptions, data],
  );

  const [xAxisKey, setXAxisKey] = useState(
    initialXAxisKey || availableAxisOptions[0],
  );
  const [yAxisKey, setYAxisKey] = useState(
    initialYAxisKey || availableAxisOptions[1] || availableAxisOptions[0],
  );

  const currentXAxisKey = availableAxisOptions.includes(xAxisKey)
    ? xAxisKey
    : availableAxisOptions[0];
  const currentYAxisKey = availableAxisOptions.includes(yAxisKey)
    ? yAxisKey
    : availableAxisOptions[1] || availableAxisOptions[0];

  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const plottedData = useMemo(() => {
    if (!currentXAxisKey || !currentYAxisKey) {
      return [];
    }

    return data.map((datum) => ({
      ...datum,
      xValue: getAxisValue(datum, currentXAxisKey),
      yValue: getAxisValue(datum, currentYAxisKey),
    }));
  }, [data, currentXAxisKey, currentYAxisKey]);

  const xScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain(getDomainFromValues(plottedData.map((d) => d.xValue)))
      .range([0, boundsWidth])
      .nice();
  }, [plottedData, boundsWidth]);

  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain(getDomainFromValues(plottedData.map((d) => d.yValue)))
      .range([boundsHeight, 0])
      .nice();
  }, [plottedData, boundsHeight]);

  const xTicks = xScale.ticks(5);
  const yTicks = yScale.ticks(5);

  return (
    <div
      ref={innerRef}
      className="h-full w-full relative flex flex-col"
      data-testid="scatter-plot-container"
    >
      <div className="px-2 pb-2">
        <AxisSelectorControl
          axisOptions={availableAxisOptions}
          xAxisKey={currentXAxisKey}
          yAxisKey={currentYAxisKey}
          onXAxisChange={setXAxisKey}
          onYAxisChange={setYAxisKey}
        />
      </div>
      <svg width={width} height={height}>
        {width > 0 && height > 0 && (
          <g transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}>
            <g data-testid="scatter-plot-x-axis">
              <line
                x1={0}
                x2={boundsWidth}
                y1={boundsHeight}
                y2={boundsHeight}
                stroke="#808080"
                opacity={0.6}
              />
              {xTicks.map((tick) => (
                <g key={`x-${tick}`} transform={`translate(${xScale(tick)}, 0)`}>
                  <line
                    y1={boundsHeight}
                    y2={boundsHeight + 6}
                    stroke="#808080"
                    opacity={0.6}
                  />
                  <text
                    y={boundsHeight + 18}
                    textAnchor="middle"
                    fontSize={10}
                    opacity={0.8}
                  >
                    {tick}
                  </text>
                </g>
              ))}
            </g>

            <g data-testid="scatter-plot-y-axis">
              <line x1={0} x2={0} y1={0} y2={boundsHeight} stroke="#808080" opacity={0.6} />
              {yTicks.map((tick) => (
                <g key={`y-${tick}`} transform={`translate(0, ${yScale(tick)})`}>
                  <line x1={-6} x2={0} y1={0} y2={0} stroke="#808080" opacity={0.6} />
                  <text x={-10} y={0} textAnchor="end" alignmentBaseline="middle" fontSize={10} opacity={0.8}>
                    {tick}
                  </text>
                </g>
              ))}
            </g>

            <g data-testid="scatter-plot-points-layer">
              {plottedData.map((datum, index) => {
                const cx = xScale(datum.xValue);
                const cy = yScale(datum.yValue);

                const showTooltip = () => {
                  setInteractionData({
                    xPos: cx + MARGIN.left,
                    yPos: cy + MARGIN.top,
                    children: (
                      <div>
                        <div>{datum.name || datum.label || `Point ${index + 1}`}</div>
                        <div>
                          {currentXAxisKey}: {datum.xValue}
                        </div>
                        <div>
                          {currentYAxisKey}: {datum.yValue}
                        </div>
                      </div>
                    ),
                  });
                };

                return (
                  <ScatterPoint
                    key={datum.id || `${datum.name || "point"}-${index}`}
                    testId={`scatter-point-${index}`}
                    cx={cx}
                    cy={cy}
                    onMouseEnter={showTooltip}
                    onMouseLeave={() => setInteractionData(null)}
                    onClick={showTooltip}
                  />
                );
              })}
            </g>
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
        <Tooltip interactionData={interactionData} position="top" />
      </div>
    </div>
  );
}
