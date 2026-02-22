import HorizontalBoxPlot from "@/components/charts/BoxPlot/HorizontalBoxPlot";
import VerticalBoxPlot from "@/components/charts/BoxPlot/VerticalBoxPlot";
import ChartFrame from "@/components/charts/components/ChartFrame";

export default function DistributionSection({
  horizontalBoxPlotDimensions,
  verticalBoxPlotDimensions,
  dataFilteredByType,
  typeNames,
  horizontalBoxPlotRef,
  verticalBoxPlotRef,
}) {
  return (
    <div className="flex flex-col gap-2 h-full" data-testid="analytics-distribution-section">
      <div className="hidden lg:flex lg:flex-col h-[30rem]" data-testid="analytics-horizontal-chart">
        <ChartFrame
          title="Distribution of Pokemon Max Stats Per Type"
          subtitle="Compare max stat ranges and outliers across Pokemon types."
        >
          <HorizontalBoxPlot
            width={horizontalBoxPlotDimensions.width}
            height={horizontalBoxPlotDimensions.height}
            data={dataFilteredByType}
            fixedDomainMax={600}
            filterList={typeNames}
            valueKey={"max_stats"}
            xLabel={"Max Stats"}
            multi
            innerRef={horizontalBoxPlotRef}
          />
        </ChartFrame>
      </div>
      <div className="flex flex-col lg:hidden h-[30rem]" data-testid="analytics-vertical-chart">
        <ChartFrame
          title="Distribution of Pokemon Max Stats Per Type"
          subtitle="Compare max stat ranges and outliers across Pokemon types."
        >
          <VerticalBoxPlot
            width={verticalBoxPlotDimensions.width}
            height={verticalBoxPlotDimensions.height}
            padding={15}
            data={dataFilteredByType}
            fixedDomainMax={600}
            filterList={typeNames}
            valueKey={"max_stats"}
            xLabel={"Max Stats"}
            multi
            innerRef={verticalBoxPlotRef}
          />
        </ChartFrame>
      </div>
    </div>
  );
}
