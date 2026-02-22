import { useSpring, useSprings, animated } from "react-spring";

export default function BoxPlotItem({
  data,
  valueKey,
  width,
  chartWidth,
  height,
  yPos,
  fillColor,
  setInteractionData,
  tooltipOffset,
}) {
  const strokeColor = "#4a4a4a";
  const minX = (width * data.min) / data.max;
  const q1X = (width * data.q1) / data.max;
  const meanX = (width * data.mean) / data.max;
  const q3X = (width * data.q3) / data.max;
  const maxX = width;

  const springProps = useSpring({
    from: {
      minX,
      q1X: minX,
      meanX: minX,
      q3X: minX,
      maxX: minX,
      boxWidth: 0,
    },
    to: {
      minX,
      q1X,
      meanX,
      q3X,
      maxX,
      boxWidth: q3X - q1X,
    },
    config: {
      friction: 80,
    },
  });

  const pointSprings = useSprings(
    data.dataPoints.length,
    data.dataPoints.map((dataPoint) => ({
      from: {
        cx: minX,
        opacity: 0,
      },
      to: {
        cx: (dataPoint[valueKey] * width) / data.max,
        opacity: 0.75,
      },
      config: {
        friction: 80,
      },
    })),
  );

  return (
    <g data-testid="box-plot-item-group">
      <g data-testid="box-plot-left-whisker-group">
        <animated.line
          x1={springProps.minX}
          x2={springProps.minX}
          y1={yPos - height / 2}
          y2={yPos + height / 2}
          stroke={strokeColor}
          strokeWidth={2}
        />
        <animated.line
          x1={springProps.minX}
          x2={springProps.q1X}
          y1={yPos}
          y2={yPos}
          stroke={strokeColor}
          strokeWidth={2}
        />
      </g>
      <animated.rect
        width={springProps.boxWidth}
        height={height}
        x={springProps.q1X}
        y={yPos - height / 2}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={2}
        data-testid="quantile-box"
      />
      <animated.line
        x1={springProps.meanX}
        x2={springProps.meanX}
        y1={yPos - height / 2}
        y2={yPos + height / 2}
        stroke={strokeColor}
        strokeWidth={2}
        data-testid="mean-line"
      />
      <g data-testid="box-plot-right-whisker-group">
        <animated.line
          x1={springProps.maxX}
          x2={springProps.maxX}
          y1={yPos - height / 2}
          y2={yPos + height / 2}
          stroke={strokeColor}
          strokeWidth={2}
        />
        <animated.line
          x1={springProps.q3X}
          x2={springProps.maxX}
          y1={yPos}
          y2={yPos}
          stroke={strokeColor}
          strokeWidth={2}
        />
      </g>
      <g data-testid="data-points-group">
        {data.dataPoints.map((dataPoint, index) => {
          const showTooltip = () =>
            setInteractionData({
              xPos: (dataPoint[valueKey] * width) / data.max + tooltipOffset,
              yPos: yPos + tooltipOffset,
              chartWidth,
              children: dataPoint.tooltip,
            });

          const hideTooltip = () => setInteractionData(null);
          const pointName = dataPoint.name || `Point ${index + 1}`;
          const pointValue = dataPoint[valueKey];
          const pointAriaLabel =
            typeof pointValue === "number"
              ? `${pointName}: ${pointValue}`
              : pointName;

          const onPointKeyDown = (event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              showTooltip();
            }
          };

          return (
            <animated.circle
              r={4}
              cx={pointSprings[index].cx}
              cy={yPos}
              key={dataPoint.name}
              data-testid={dataPoint.name}
              role="button"
              tabIndex={0}
              focusable="true"
              aria-label={pointAriaLabel}
              opacity={pointSprings[index].opacity}
              className="[transform-box:fill-box] [transform-origin:center] hover:scale-150"
              onMouseEnter={() => showTooltip()}
              onMouseLeave={hideTooltip}
              onFocus={() => showTooltip()}
              onBlur={hideTooltip}
              onKeyDown={onPointKeyDown}
              onClick={() => showTooltip()}
            />
          );
        })}
      </g>
    </g>
  );
}
