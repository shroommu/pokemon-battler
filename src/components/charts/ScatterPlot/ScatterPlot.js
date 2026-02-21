import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

import Tooltip from "../components/Tooltip";
import AxisSelectorControl from "./AxisSelectorControl";
import ScatterPoint from "./ScatterPoint";

const MARGIN = { top: 30, right: 30, bottom: 52, left: 52 };
const PASS_THROUGH_PULSE_DISTANCE = 20;
const TOOLTIP_REST_DELAY_MS = 35;

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
    return [0, 1];
  }

  const domainMin = 0;
  const domainMax = Math.max(0, max);

  if (domainMin === domainMax) {
    return [0, 1];
  }

  return [domainMin, domainMax];
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
  const containerRef = useRef(null);
  const tooltipRestTimerRef = useRef(null);
  const pendingTooltipDataRef = useRef(null);
  const activeTooltipPointRef = useRef(null);
  const tooltipPinnedRef = useRef(false);
  const pointsInPassThroughZoneRef = useRef(new Set());
  const pulseNonceRef = useRef(0);
  const [passThroughPulseByKey, setPassThroughPulseByKey] = useState({});

  useEffect(() => {
    return () => {
      if (tooltipRestTimerRef.current) {
        clearTimeout(tooltipRestTimerRef.current);
      }
    };
  }, []);

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

  const setContainerNode = (node) => {
    containerRef.current = node;

    if (typeof innerRef === "function") {
      innerRef(node);
      return;
    }

    if (innerRef && typeof innerRef === "object") {
      innerRef.current = node;
    }
  };

  const clearTooltipRestTimer = () => {
    if (tooltipRestTimerRef.current) {
      clearTimeout(tooltipRestTimerRef.current);
      tooltipRestTimerRef.current = null;
    }
  };

  const scheduleTooltipAfterRest = (tooltipData) => {
    pendingTooltipDataRef.current = tooltipData;
    clearTooltipRestTimer();

    tooltipRestTimerRef.current = setTimeout(() => {
      if (pendingTooltipDataRef.current) {
        setInteractionData(pendingTooltipDataRef.current);
      }
    }, TOOLTIP_REST_DELAY_MS);
  };

  const handlePointsLayerPointerMove = (event) => {
    if (!containerRef.current || !plottedData.length) {
      return;
    }

    const bounds = containerRef.current.getBoundingClientRect();
    const pointerX = event.clientX - bounds.left - MARGIN.left;
    const pointerY = event.clientY - bounds.top - MARGIN.top;
    const maxDistanceSquared = PASS_THROUGH_PULSE_DISTANCE ** 2;

    const pointsInRange = new Set();

    plottedData.forEach((datum, index) => {
      const cx = xScale(datum.xValue);
      const cy = yScale(datum.yValue);
      const dx = cx - pointerX;
      const dy = cy - pointerY;
      const distanceSquared = dx * dx + dy * dy;

      if (distanceSquared <= maxDistanceSquared) {
        pointsInRange.add(getPointKey(datum, index));
      }
    });

    if (!pointsInRange.size) {
      pointsInPassThroughZoneRef.current = new Set();
      return;
    }

    const newlyEnteredPointKeys = [];
    pointsInRange.forEach((pointKey) => {
      if (!pointsInPassThroughZoneRef.current.has(pointKey)) {
        newlyEnteredPointKeys.push(pointKey);
      }
    });

    pointsInPassThroughZoneRef.current = pointsInRange;

    if (!newlyEnteredPointKeys.length) {
      return;
    }

    setPassThroughPulseByKey((previous) => {
      const next = { ...previous };

      newlyEnteredPointKeys.forEach((pointKey) => {
        pulseNonceRef.current += 1;
        next[pointKey] = pulseNonceRef.current;
      });

      return next;
    });
  };

  const handlePointsLayerPointerLeave = () => {
    pointsInPassThroughZoneRef.current = new Set();
  };

  const handlePointsLayerPointerCancel = () => {
    pointsInPassThroughZoneRef.current = new Set();
  };

  const handlePointsLayerPointerOut = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) {
      return;
    }

    pointsInPassThroughZoneRef.current = new Set();
  };

  return (
    <div
      ref={setContainerNode}
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
                {currentXAxisKey && (
                  <text
                    x={boundsWidth / 2}
                    y={boundsHeight + 36}
                    textAnchor="middle"
                    fontSize={12}
                    opacity={0.9}
                    data-testid="scatter-plot-x-axis-label"
                  >
                    {currentXAxisKey}
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
                {currentYAxisKey && (
                  <text
                    transform={`translate(-36, ${boundsHeight / 2}) rotate(-90)`}
                    textAnchor="middle"
                    fontSize={12}
                    opacity={0.9}
                    data-testid="scatter-plot-y-axis-label"
                  >
                    {currentYAxisKey}
                  </text>
                )}
              </g>

              <g
                data-testid="scatter-plot-points-layer"
                onPointerMove={handlePointsLayerPointerMove}
                onPointerLeave={handlePointsLayerPointerLeave}
                onPointerCancel={handlePointsLayerPointerCancel}
                onPointerOut={handlePointsLayerPointerOut}
              >
                {plottedData.map((datum, index) => {
                  const pointKey = getPointKey(datum, index);
                  const cx = xScale(datum.xValue);
                  const cy = yScale(datum.yValue);

                  const tooltipChildren = datum.tooltip ? (
                    <div className="flex flex-col gap-1">
                      {datum.tooltip}
                      <div>{`${currentXAxisKey}: ${datum.xValue}`}</div>
                      <div>{`${currentYAxisKey}: ${datum.yValue}`}</div>
                    </div>
                  ) : (
                    <div>
                      <div>{datum.name || datum.label || `Point ${index + 1}`}</div>
                      <div>
                        {currentXAxisKey}: {datum.xValue}
                      </div>
                      <div>
                        {currentYAxisKey}: {datum.yValue}
                      </div>
                    </div>
                  );

                  const showTooltip = (event) => {
                    const isImmediate = event?.type === "click";

                    activeTooltipPointRef.current = pointKey;
                    const tooltipData = {
                      xPos: cx + MARGIN.left,
                      yPos: cy + MARGIN.top,
                      children: tooltipChildren,
                    };

                    if (isImmediate) {
                      tooltipPinnedRef.current = true;
                      clearTooltipRestTimer();
                      pendingTooltipDataRef.current = null;
                      setInteractionData(tooltipData);
                      return;
                    }

                    tooltipPinnedRef.current = false;
                    setInteractionData(null);
                    scheduleTooltipAfterRest(tooltipData);
                  };

                  const moveTooltip = (event) => {
                    const tooltipData = {
                      xPos: cx + MARGIN.left,
                      yPos: cy + MARGIN.top,
                      children: tooltipChildren,
                    };

                    if (
                      tooltipPinnedRef.current &&
                      activeTooltipPointRef.current === pointKey
                    ) {
                      return;
                    }

                    if (tooltipPinnedRef.current) {
                      tooltipPinnedRef.current = false;
                    }

                    setInteractionData(null);
                    scheduleTooltipAfterRest(tooltipData);

                    if (activeTooltipPointRef.current !== pointKey) {
                      activeTooltipPointRef.current = pointKey;
                    }
                  };

                  const hideTooltip = () => {
                    activeTooltipPointRef.current = null;
                    tooltipPinnedRef.current = false;
                    pendingTooltipDataRef.current = null;
                    clearTooltipRestTimer();
                    setInteractionData(null);
                  };

                  return (
                    <ScatterPoint
                      key={pointKey}
                      testId={`scatter-point-${index}`}
                      cx={cx}
                      cy={cy}
                      delay={index * 10}
                      pulseTrigger={passThroughPulseByKey[pointKey] || 0}
                      fill={datum.pointColor}
                      onMouseEnter={showTooltip}
                      onMouseMove={moveTooltip}
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
          <Tooltip interactionData={interactionData} position="top" />
        </div>
      </div>
      <div>
        <AxisSelectorControl
          axisOptions={availableAxisOptions}
          xAxisKey={currentXAxisKey}
          yAxisKey={currentYAxisKey}
          onXAxisChange={setXAxisKey}
          onYAxisChange={setYAxisKey}
        />
      </div>
    </div>
  );
}
