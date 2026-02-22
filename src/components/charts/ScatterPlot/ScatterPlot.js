import * as d3 from "d3";
import { useMemo, useState } from "react";

import { roundUpToNearestTen } from "../axisUtils";
import Tooltip from "../components/Tooltip";
import AxisSelectorControl from "./AxisSelectorControl";
import ScatterPoint from "./ScatterPoint";

const MARGIN = { top: 30, right: 30, bottom: 52, left: 52 };

const getPointKey = (datum, index) => datum.id || `${datum.name || "point"}-${index}`;

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
  if (!axisKey || typeof axisKey !== "string") {
    return 0;
  }

  const getNumericValue = (container) => {
    if (!container || typeof container !== "object") {
      return undefined;
    }

    if (typeof container[axisKey] === "number") {
      return container[axisKey];
    }

    const normalizedAxisKey = axisKey.toLowerCase();
    const matchingKey = Object.keys(container).find(
      (key) => key.toLowerCase() === normalizedAxisKey,
    );

    if (matchingKey && typeof container[matchingKey] === "number") {
      return container[matchingKey];
    }

    return undefined;
  };

  return (
    getNumericValue(datum.values) ??
    getNumericValue(datum.stats) ??
    getNumericValue(datum) ??
    0
  );
};

const getDomainFromValues = (values) => {
  const [min, max] = d3.extent(values);

  if (min === undefined || max === undefined) {
    return [0, 10];
  }

  const domainMin = 0;
  const domainMax = roundUpToNearestTen(max);

  if (domainMin === domainMax) {
    return [0, 10];
  }

  return [domainMin, domainMax];
};

const buildTooltipChildren = ({
  datum,
  index,
  tooltipContent,
  usesTooltipRenderer,
  xAxisLabel,
  yAxisLabel,
}) => {
  if (tooltipContent) {
    if (usesTooltipRenderer) {
      return tooltipContent;
    }

    return (
      <div className="flex flex-col">
        {tooltipContent}
        <div className="text-xs">{`${xAxisLabel}: ${datum.xValue}`}</div>
        <div className="text-xs">{`${yAxisLabel}: ${datum.yValue}`}</div>
      </div>
    );
  }

  return (
    <div>
      <div>{datum.name || datum.label || `Point ${index + 1}`}</div>
      <div>
        {xAxisLabel}: {datum.xValue}
      </div>
      <div>
        {yAxisLabel}: {datum.yValue}
      </div>
    </div>
  );
};

export default function ScatterPlot({
  width,
  height,
  innerRef,
  data = [],
  axisOptions,
  initialXAxisKey,
  initialYAxisKey,
  axisLabelFormatter,
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
  const xAxisLabel =
    (typeof axisLabelFormatter === "function"
      ? axisLabelFormatter(currentXAxisKey, "x")
      : currentXAxisKey) || currentXAxisKey;
  const yAxisLabel =
    (typeof axisLabelFormatter === "function"
      ? axisLabelFormatter(currentYAxisKey, "y")
      : currentYAxisKey) || currentYAxisKey;

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
      className="relative flex flex-col h-full w-full"
      data-testid="scatter-plot-container"
    >
      <div data-testid="scatter-plot-inner-container" className="relative">
        <svg width={width} height={height} className="w-full h-full">
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
                {xAxisLabel && (
                  <text
                    x={boundsWidth / 2}
                    y={boundsHeight + 36}
                    textAnchor="middle"
                    fontSize={12}
                    opacity={0.9}
                    data-testid="scatter-plot-x-axis-label"
                  >
                    {xAxisLabel}
                  </text>
                )}
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
                {yAxisLabel && (
                  <text
                    transform={`translate(-36, ${boundsHeight / 2}) rotate(-90)`}
                    textAnchor="middle"
                    fontSize={12}
                    opacity={0.9}
                    data-testid="scatter-plot-y-axis-label"
                  >
                    {yAxisLabel}
                  </text>
                )}
              </g>

              <g
                data-testid="scatter-plot-points-layer"
              >
                {plottedData.map((datum, index) => {
                  const cx = xScale(datum.xValue);
                  const cy = yScale(datum.yValue);
                  const usesTooltipRenderer = typeof datum.tooltip === "function";

                  const tooltipContent = usesTooltipRenderer
                    ? datum.tooltip({
                        xAxisLabel,
                        yAxisLabel,
                        xValue: datum.xValue,
                        yValue: datum.yValue,
                        datum,
                        index,
                      })
                    : datum.tooltip;
                  const tooltipChildren = buildTooltipChildren({
                    datum,
                    index,
                    tooltipContent,
                    usesTooltipRenderer,
                    xAxisLabel,
                    yAxisLabel,
                  });

                  const showTooltip = () => {
                    setInteractionData({
                      xPos: cx + MARGIN.left,
                      yPos: cy + MARGIN.top,
                      chartWidth: width,
                      children: tooltipChildren,
                    });
                  };

                  const hideTooltip = () => {
                    setInteractionData(null);
                  };

                  return (
                    <ScatterPoint
                      key={getPointKey(datum, index)}
                      testId={`scatter-point-${index}`}
                      cx={cx}
                      cy={cy}
                      delay={index * 10}
                      fill={datum.pointColor}
                      onMouseEnter={showTooltip}
                      onMouseLeave={hideTooltip}
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
            top: 0,
            left: 0,
            pointerEvents: "none",
          }}
          data-testid="tooltip-layer"
          className="w-full h-full z-10"
        >
          <Tooltip interactionData={interactionData} position="horizontal-auto" />
        </div>
      </div>
      <div>
        <AxisSelectorControl
          axisOptions={availableAxisOptions}
          xAxisKey={currentXAxisKey}
          yAxisKey={currentYAxisKey}
          onXAxisChange={setXAxisKey}
          onYAxisChange={setYAxisKey}
          axisLabelFormatter={axisLabelFormatter}
        />
      </div>
    </div>
  );
}
