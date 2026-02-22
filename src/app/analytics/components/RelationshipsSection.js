import ScatterPlot from "@/components/charts/ScatterPlot/ScatterPlot";
import ChartFrame from "@/components/charts/components/ChartFrame";

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
      <section className="h-[30rem] sm:h-[34rem]" data-testid="analytics-relationships-scatter-panel">
        <ChartFrame
          title="Stat Relationships"
          subtitle="Inspect how one stat changes relative to another across Pokemon."
        >
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
        </ChartFrame>
      </section>
    </div>
  );
}
