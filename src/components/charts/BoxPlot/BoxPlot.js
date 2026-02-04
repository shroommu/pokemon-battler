import BoxPlotItem from "./BoxPlotItem";

const SAMPLE_DATA = {
  dataPoints: [
    0.12, 0.14, 0.17, 0.23, 0.37, 0.47, 0.53, 0.67, 0.65, 0.75, 0.88,
  ],
  leftWhisker: 0.12,
  q1: 0.44,
  mean: 0.62,
  q3: 0.74,
  rightWhisker: 0.88,
  fillColor: "#b2e097",
};

export default function BoxPlot({
  width = 600,
  height = 400,
  data = SAMPLE_DATA,
}) {
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
