export default function BoxPlotItem({ data, width, height, yPos }) {
  return (
    <g data-testid="box-plot-item-group">
      <g data-testid="box-plot-left-whisker-group">
        <line
          x1={width * data.leftWhisker}
          x2={width * data.leftWhisker}
          y1={yPos - height / 2}
          y2={yPos + height / 2}
          stroke="black"
          strokeWidth={2}
        />
        <line
          x1={width * data.leftWhisker}
          x2={width * data.q1}
          y1={yPos}
          y2={yPos}
          stroke="black"
          strokeWidth={2}
        />
      </g>
      <rect
        width={width * data.q3 - width * data.q1}
        height={height}
        x={width * data.q1}
        y={yPos - height / 2}
        fill={data.fillColor}
        stroke="black"
        strokeWidth={2}
        data-testid="quantile-box"
      />
      <line
        x1={width * data.mean}
        x2={width * data.mean}
        y1={yPos - height / 2}
        y2={yPos + height / 2}
        stroke="black"
        strokeWidth={2}
        data-testid="mean-line"
      />
      <g data-testid="box-plot-left-whisker-group">
        <line
          x1={width * data.rightWhisker}
          x2={width * data.rightWhisker}
          y1={yPos - height / 2}
          y2={yPos + height / 2}
          stroke="black"
          strokeWidth={2}
        />
        <line
          x1={width * data.q3}
          x2={width * data.rightWhisker}
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
            cx={dataPoint.normalizedValue * width}
            cy={yPos}
            key={dataPoint.name}
            data-testid={dataPoint.name}
          />
        ))}
      </g>
    </g>
  );
}
