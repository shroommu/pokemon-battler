"use client";

import { useMemo, useRef } from "react";

import ScatterPlot from "@/components/charts/ScatterPlot/ScatterPlot";
import Histogram from "@/components/charts/Histogram/Histogram";
import ChartFrame from "@/components/charts/components/ChartFrame";
import { useDimensions } from "@/hooks/useDimensions";
import { getHistogramData, getScatterPlotData } from "@/utils";

const SCATTER_PLOT_AXIS_OPTIONS = ["HP", "Attack", "Defense", "Special", "Speed"];

export default function UIPlaygroundClient({ pokemonData = [] }) {
  const scatterPlotRef = useRef();
  const scatterPlotDimensions = useDimensions(scatterPlotRef);

  const scatterPlotData = useMemo(() => {
    return getScatterPlotData(pokemonData);
  }, [pokemonData]);

  const histogramBins = useMemo(() => {
    return getHistogramData(scatterPlotData, "max_stats");
  }, [scatterPlotData]);

  return (
    <div className="space-y-8 p-4">
      <div className="h-2/3">
        <ChartFrame
          title="Pokemon Stat Distribution"
          subtitle="Compare two selected stats across Pokemon"
        >
          <ScatterPlot
            width={scatterPlotDimensions.width}
            height={scatterPlotDimensions.height}
            innerRef={scatterPlotRef}
            data={scatterPlotData}
            axisOptions={SCATTER_PLOT_AXIS_OPTIONS}
            initialXAxisKey="attack"
            initialYAxisKey="speed"
          />
        </ChartFrame>
      </div>
      <div>
        <ChartFrame
          title="Max Stats Histogram"
          subtitle="Distribution of max stat totals in the current dataset"
        >
          <Histogram bins={histogramBins} />
        </ChartFrame>
      </div>
    </div>
  );
}
