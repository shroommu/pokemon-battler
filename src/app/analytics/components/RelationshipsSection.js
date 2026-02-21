import ScatterPlot from "@/components/charts/ScatterPlot/ScatterPlot";

const ANALYTICS_AXIS_LABELS = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  special: "Special",
  speed: "Speed",
};
const ANALYTICS_AXIS_OPTIONS = Object.keys(ANALYTICS_AXIS_LABELS);

const formatAnalyticsAxisLabel = (axisKey) => {
  const normalizedKey = String(axisKey || "").toLowerCase();
  return ANALYTICS_AXIS_LABELS[normalizedKey] || axisKey;
};

export default function RelationshipsSection({ scatterPlotDimensions, scatterData, scatterPlotRef }) {
  return (
    <div className="flex flex-col gap-2 h-full" data-testid="analytics-relationships-section">
      <h2 className="text-base sm:text-lg text-center">Stat Relationships</h2>
      <p className="text-xs sm:text-sm text-center mb-2">
        Inspect how one stat changes relative to another across Pokemon.
      </p>
      <section className="h-[30rem] sm:h-[34rem]" data-testid="analytics-relationships-scatter-panel">
        <ScatterPlot
          width={scatterPlotDimensions.width}
          height={scatterPlotDimensions.height}
          data={scatterData}
          axisOptions={ANALYTICS_AXIS_OPTIONS}
          initialXAxisKey="attack"
          initialYAxisKey="speed"
          axisLabelFormatter={formatAnalyticsAxisLabel}
          innerRef={scatterPlotRef}
        />
      </section>
    </div>
  );
}
