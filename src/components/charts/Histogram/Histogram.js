import { scaleBand, scaleLinear } from "d3";

const DATA = {
  bins: [
    { value: 1, count: 5 },
    { value: 2, count: 7 },
    { value: 3, count: 2 },
  ],
};

export default function Histogram({ width = 600, height = 400, data = DATA }) {
  const xScale = scaleBand()
    .domain(data.bins.map((d) => d.value))
    .range([0, width])
    .padding(0.05);

  const yScale = scaleLinear().domain([0, 10]).range([0, height]);

  const bars = data.bins.map((bin) => {
    return (
      <rect
        x={xScale(bin.value)}
        y={height - yScale(bin.count)}
        width={xScale.bandwidth()}
        height={yScale(bin.count)}
        fill="blue"
      />
    );
  });

  return (
    <div data-testid="histogram-container">
      <svg height={height} width={width}>
        <rect height={height} width={width} fill="white" />
        {bars}
      </svg>
    </div>
  );
}
