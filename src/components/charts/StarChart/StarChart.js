import { interpolateNumber } from "d3";
import { useId } from "react";

import { HIGHEST_STAT } from "@/components/constants";

import AnimatedStar from "./AnimatedStar";
import AnimatedValueLabel from "./AnimatedValueLabel";

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

const getInterpolatedStarPoints = (dataPoints) => {
  const baseStarCoordinates = [
    { x: 5, y: 0 },
    { x: 10, y: 3 },
    { x: 8, y: 9 },
    { x: 2, y: 9 },
    { x: 0, y: 3 },
  ];

  const statDistances = dataPoints.map((d) => d / HIGHEST_STAT);

  const interpolatedStarPoints = baseStarCoordinates.map((sc, index) => {
    return {
      x: interpolateNumber(5, sc.x)(statDistances[index]),
      y: interpolateNumber(5, sc.y)(statDistances[index]),
    };
  });

  return interpolatedStarPoints;
};

export default function StarChart({
  height,
  width,
  data,
  fillColor,
  fillGradient,
  innerRef,
  showReferenceStar,
  referenceStarFillColor,
}) {
  const chartGradientId = useId().replace(/[:]/g, "");
  const fillGradientId = fillGradient?.id || `${chartGradientId}-star-fill-gradient`;
  const fill = fillGradient ? `url(#${fillGradientId})` : fillColor;

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
        <text
          textAnchor="middle"
          x={height * 0.5 + width * 0.5 - height * 0.5}
          y={height * 0.1}
        >
          HP
        </text>
        <text
          textAnchor="start"
          x={height * 0.9 + width * 0.5 - height * 0.5}
          y={height * 0.35}
        >
          Attack
        </text>
        <text
          textAnchor="start"
          x={height * 0.75 + width * 0.5 - height * 0.5}
          y={height * 0.875}
        >
          Defense
        </text>
        <text
          textAnchor="end"
          x={height * 0.25 + width * 0.5 - height * 0.5}
          y={height * 0.875}
        >
          Special
        </text>
        <text
          textAnchor="end"
          x={height * 0.1 + width * 0.5 - height * 0.5}
          y={height * 0.35}
        >
          Speed
        </text>
      </g>
    );
  };

  const statsInterpolatedStarPoints = getInterpolatedStarPoints(
    data.map((d) => d.value),
  );
  const referenceInterpolatedStarPoints = getInterpolatedStarPoints(
    data.map((d) => d.referenceLine),
  );

  const statsStar = AnimatedStar({
    starPoints: statsInterpolatedStarPoints,
    fill,
  });

  return (
    <div
      className="h-full w-full relative"
      ref={innerRef}
      data-testid="star-chart-container"
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {fillGradient && (
          <defs>
            {fillGradient.type === "radial" ? (
              <radialGradient
                id={fillGradientId}
                cx={fillGradient.cx || "50%"}
                cy={fillGradient.cy || "50%"}
                r={fillGradient.r || "50%"}
                fx={fillGradient.fx}
                fy={fillGradient.fy}
              >
                {(fillGradient.stops || []).map((stop, index) => (
                  <stop
                    key={index}
                    offset={stop.offset}
                    stopColor={stop.color}
                    stopOpacity={stop.opacity}
                  />
                ))}
              </radialGradient>
            ) : (
              <linearGradient
                id={fillGradientId}
                x1={fillGradient.x1 || "0%"}
                y1={fillGradient.y1 || "0%"}
                x2={fillGradient.x2 || "100%"}
                y2={fillGradient.y2 || "100%"}
              >
                {(fillGradient.stops || []).map((stop, index) => (
                  <stop
                    key={index}
                    offset={stop.offset}
                    stopColor={stop.color}
                    stopOpacity={stop.opacity}
                  />
                ))}
              </linearGradient>
            )}
          </defs>
        )}
        {width > 0 && height > 0 && (
          <g data-testid="star-chart-with-labels-group">
            <g
              transform={`translate(${width * 0.5 - height * 0.75 * 0.5}, ${height * 0.5 - height * 0.75 * 0.5}) scale(${height * 0.075})`}
              data-testid="stars-and-grid-group"
            >
              {starPath({ fill: "white" })}
              {statsStar}
              <g opacity={0.5}>
                {showReferenceStar && (
                  <AnimatedStar
                    starPoints={referenceInterpolatedStarPoints}
                    fill={referenceStarFillColor}
                  />
                )}
              </g>
              {grid}
            </g>
            {statsInterpolatedStarPoints.map((d, index) => (
              <AnimatedValueLabel
                key={`${data[index].name}-value`}
                centerX={width * 0.5}
                centerY={height * 0.5}
                x={height * d.x * 0.1 + width * 0.5 - height * 0.5}
                y={height * d.y * 0.1}
                value={data[index].value}
              />
            ))}
            {labels({ width, height })}
          </g>
        )}
      </svg>
    </div>
  );
}
