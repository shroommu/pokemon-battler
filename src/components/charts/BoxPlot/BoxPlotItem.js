export default function BoxPlotItem({
  data,
  valueKey,
  width,
  height,
  yPos,
  fillColor,
  setInteractionData,
  tooltipOffset,
}) {
  const strokeColor = "#4a4a4a";

  return (
    <g data-testid="box-plot-item-group">
      <g data-testid="box-plot-left-whisker-group">
        <line
          x1={(width * data.min) / data.max}
          x2={(width * data.min) / data.max}
          y1={yPos - height / 2}
          y2={yPos + height / 2}
          stroke={strokeColor}
          strokeWidth={2}
        />
        <line
          x1={(width * data.min) / data.max}
          x2={(width * data.q1) / data.max}
          y1={yPos}
          y2={yPos}
          stroke={strokeColor}
          strokeWidth={2}
        />
      </g>
      <rect
        width={(width * data.q3) / data.max - (width * data.q1) / data.max}
        height={height}
        x={(width * data.q1) / data.max}
        y={yPos - height / 2}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={2}
        data-testid="quantile-box"
      />
      <line
        x1={(width * data.mean) / data.max}
        x2={(width * data.mean) / data.max}
        y1={yPos - height / 2}
        y2={yPos + height / 2}
        stroke={strokeColor}
        strokeWidth={2}
        data-testid="mean-line"
      />
      <g data-testid="box-plot-right-whisker-group">
        <line
          x1={(width * data.max) / data.max}
          x2={(width * data.max) / data.max}
          y1={yPos - height / 2}
          y2={yPos + height / 2}
          stroke={strokeColor}
          strokeWidth={2}
        />
        <line
          x1={(width * data.q3) / data.max}
          x2={(width * data.max) / data.max}
          y1={yPos}
          y2={yPos}
          stroke={strokeColor}
          strokeWidth={2}
        />
      </g>
      <g data-testid="data-points-group">
        {data.dataPoints.map((dataPoint) => {
          const showTooltip = () =>
            setInteractionData({
              xPos: (dataPoint[valueKey] * width) / data.max + tooltipOffset,
              yPos: yPos - tooltipOffset,
              children: dataPoint.tooltip,
            });
          return (
            <circle
              r={4}
              cx={(dataPoint[valueKey] * width) / data.max}
              cy={yPos}
              key={dataPoint.name}
              data-testid={dataPoint.name}
              opacity={0.75}
              className="[transform-box:fill-box] [transform-origin:center] hover:scale-150"
              onMouseEnter={() => showTooltip()}
              onMouseLeave={() => setInteractionData(null)}
              onClick={() => showTooltip()}
            />
          );
        })}
      </g>
    </g>
  );
}
