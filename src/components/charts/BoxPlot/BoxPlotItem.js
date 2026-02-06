export default function BoxPlotItem({ data, width, height, yPos }) {
  return (
    <g data-testid="box-plot-item-group">
      <g data-testid="box-plot-left-whisker-group">
        <line
          x1={(width * data.min) / data.max}
          x2={(width * data.min) / data.max}
          y1={yPos - height / 2}
          y2={yPos + height / 2}
          stroke="black"
          strokeWidth={2}
        />
        <line
          x1={(width * data.min) / data.max}
          x2={(width * data.q1) / data.max}
          y1={yPos}
          y2={yPos}
          stroke="black"
          strokeWidth={2}
        />
      </g>
      <rect
        width={(width * data.q3) / data.max - (width * data.q1) / data.max}
        height={height}
        x={(width * data.q1) / data.max}
        y={yPos - height / 2}
        fill={"#ababab"}
        stroke="black"
        strokeWidth={2}
        data-testid="quantile-box"
      />
      <line
        x1={(width * data.mean) / data.max}
        x2={(width * data.mean) / data.max}
        y1={yPos - height / 2}
        y2={yPos + height / 2}
        stroke="black"
        strokeWidth={2}
        data-testid="mean-line"
      />
      <g data-testid="box-plot-left-whisker-group">
        <line
          x1={(width * data.max) / data.max}
          x2={(width * data.max) / data.max}
          y1={yPos - height / 2}
          y2={yPos + height / 2}
          stroke="black"
          strokeWidth={2}
        />
        <line
          x1={(width * data.q3) / data.max}
          x2={(width * data.max) / data.max}
          y1={yPos}
          y2={yPos}
          stroke="black"
          strokeWidth={2}
        />
      </g>
      <g data-testid="data-points-group">
        {data.dataPoints.map((dataPoint) => (
          <circle
            r={4}
            cx={(dataPoint.value * width) / data.max}
            cy={yPos}
            key={dataPoint.name}
            data-testid={dataPoint.name}
          />
        ))}
      </g>
    </g>
  );
}
