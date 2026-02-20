"use client";

import { useRef } from "react";

import ScatterPlot from "@/components/charts/ScatterPlot/ScatterPlot";
import Histogram from "@/components/charts/Histogram/Histogram";
import { useDimensions } from "@/hooks/useDimensions";

const SCATTER_PLOT_DUMMY_DATA = [
  {
    id: "bulbasaur",
    name: "Bulbasaur",
    values: {
      hp: 45,
      attack: 49,
      defense: 49,
      speed: 45,
    },
  },
  {
    id: "charmander",
    name: "Charmander",
    values: {
      hp: 39,
      attack: 52,
      defense: 43,
      speed: 65,
    },
  },
  {
    id: "squirtle",
    name: "Squirtle",
    values: {
      hp: 44,
      attack: 48,
      defense: 65,
      speed: 43,
    },
  },
  {
    id: "pikachu",
    name: "Pikachu",
    values: {
      hp: 35,
      attack: 55,
      defense: 40,
      speed: 90,
    },
  },
  {
    id: "jigglypuff",
    name: "Jigglypuff",
    values: {
      hp: 115,
      attack: 45,
      defense: 20,
      speed: 20,
    },
  },
];

export default function UIPlayground({}) {
  const scatterPlotRef = useRef();
  const scatterPlotDimensions = useDimensions(scatterPlotRef);

  return (
    <div className="space-y-8 p-4">
      <div className="h-[340px]">
        <ScatterPlot
          width={scatterPlotDimensions.width}
          height={scatterPlotDimensions.height}
          innerRef={scatterPlotRef}
          data={SCATTER_PLOT_DUMMY_DATA}
          axisOptions={["hp", "attack", "defense", "speed"]}
          initialXAxisKey="attack"
          initialYAxisKey="speed"
        />
      </div>
      <div>
        <Histogram />
      </div>
    </div>
  );
}
