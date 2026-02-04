export default function BoxPlot({ width = 600, height = 400 }) {
  const defaultBoxPlotItem = (
    <g data-testid="box-plot-item-group">
      <g data-testid="box-plot-left-whisker-group">
        <line x1={0} x2={0} y1={0} y2={10} stroke="black" stroke-width={2} />
        <line
          x1={0}
          x2={width / 4}
          y1={5}
          y2={5}
          stroke="black"
          stroke-width={2}
        />
      </g>
      <rect
        width={width / 2}
        height={10}
        x={width / 4}
        y={0}
        fill="white"
        stroke="black"
        strokeWidth={2}
        data-testid="quantile-box"
      />
      <line
        x1={width / 2}
        x2={width / 2}
        y1={0}
        y2={10}
        stroke="black"
        stroke-width={2}
        data-testid="mean-line"
      />
      <g data-testid="box-plot-left-whisker-group">
        <line
          x1={width}
          x2={width}
          y1={0}
          y2={10}
          stroke="black"
          stroke-width={2}
        />
        <line
          x1={width - width / 4}
          x2={width}
          y1={5}
          y2={5}
          stroke="black"
          stroke-width={2}
        />
      </g>
    </g>
  );

  return (
    <div data-testid="boxplot-container">
      <svg width={width} height={height}>
        <rect width="100%" height="100%" fill="white" />
        {defaultBoxPlotItem}
      </svg>
    </div>
  );
}
