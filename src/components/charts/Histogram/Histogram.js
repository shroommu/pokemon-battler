import { scaleLinear, max } from "d3";

export default function Histogram({ width = 600, height = 400, bins, barPadding = 2, }) {

  const xScale = scaleLinear()
    .domain([bins[0].x0, bins[bins.length - 1].x1])
    .range([0, width]);

  const yScale = scaleLinear().domain([0, max(bins, (d) => d.length)]).range([0, height]);

  const bars = bins.map((bin) => {
    return (
      <rect
        x={xScale(bin.x0)}
        y={height - yScale(bin.length)}
        width={xScale(bin.x1) - xScale(bin.x0) - barPadding}
        height={yScale(bin.length)}
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
