import BoxPlotItem from "./BoxPlotItem";

export default function BoxPlot({ width = 600, height = 400, data }) {
  return (
    <div data-testid="boxplot-container">
      <svg width={width} height={height}>
        <rect width="100%" height="100%" fill="white" />
        <BoxPlotItem data={data} width={width} height={100} yPos={height / 2} />
        <line x1={width / 2} x2={width / 2} y1={0} y2={height} stroke="black" />
        <line
          x1={0}
          x2={width}
          y1={height / 2}
          y2={height / 2}
          stroke="black"
        />
      </svg>
    </div>
  );
}
