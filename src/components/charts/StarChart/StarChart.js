import AnimatedStar from "./AnimatedStar";

const starPath = ({
  stroke = "transparent",
  fill = "transparent",
  scale = 1,
}) => {
  return (
    <path
      d="M 5 0 L 10 3 L 8 9 L 2 9 L 0 3 Z"
      stroke={stroke}
      fill={fill}
      strokeWidth={0.05 / scale}
      transform={`scale(${scale}) translate(${(1 - scale) * (5 * (1 / scale))}, ${(1 - scale) * (5 * (1 / scale))})`}
    />
  );
};

export default function StarChart({
  height,
  width,
  data,
  fillColor,
  innerRef,
}) {
  const grid = (
    <g opacity={0.25} data-testid="grid-group">
      <g>
        {starPath({ stroke: "black", scale: "0.25" })}
        {starPath({ stroke: "black", scale: "0.50" })}
        {starPath({ stroke: "black", scale: "0.75" })}
        {starPath({ stroke: "black", scale: "1" })}
      </g>
      <g>
        <line x1={5} y1={5} x2={5} y2={0} stroke="black" strokeWidth={0.05} />
        <line x1={5} y1={5} x2={10} y2={3} stroke="black" strokeWidth={0.05} />
        <line x1={5} y1={5} x2={8} y2={9} stroke="black" strokeWidth={0.05} />
        <line x1={5} y1={5} x2={2} y2={9} stroke="black" strokeWidth={0.05} />
        <line x1={5} y1={5} x2={0} y2={3} stroke="black" strokeWidth={0.05} />
      </g>
    </g>
  );

  const labels = ({ width, height }) => {
    return (
      <g data-testid="labels-group">
        <text textAnchor="middle" x={width * 0.5} y={height * 0.2}>
          HP
        </text>
        <text textAnchor="start" x={width * 0.75} y={height * 0.4}>
          Attack
        </text>
        <text textAnchor="start" x={width * 0.65} y={height * 0.9}>
          Defense
        </text>
        <text textAnchor="end" x={width * 0.35} y={height * 0.9}>
          Special
        </text>
        <text textAnchor="end" x={width * 0.25} y={height * 0.4}>
          Speed
        </text>
      </g>
    );
  };

  const statsStar = AnimatedStar({ dataPoints: data, fill: fillColor });

  return (
    <div
      className="h-full w-full relative"
      ref={innerRef}
      data-testid="star-chart-container"
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {width > 0 && height > 0 && (
          <g data-testid="star-chart-with-labels-group">
            <g
              transform={`translate(${width * 0.25}, ${height * 0.25}) scale(${height * 0.065})`}
              data-testid="stars-and-grid-group"
            >
              {starPath({ fill: "white" })}
              {statsStar}
              {grid}
            </g>
            {labels({ width, height })}
          </g>
        )}
      </svg>
    </div>
  );
}
