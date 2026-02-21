import HorizontalBoxPlot from "@/components/charts/BoxPlot/HorizontalBoxPlot";
import VerticalBoxPlot from "@/components/charts/BoxPlot/VerticalBoxPlot";

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
      <h2 className="text-base sm:text-lg text-center">Distribution of Pokemon Max Stats Per Type</h2>
      <p className="text-xs sm:text-sm text-center mb-2">
        Compare max stat ranges and outliers across Pokemon types.
      </p>
      <div className="hidden lg:flex lg:flex-col h-[30rem]" data-testid="analytics-horizontal-chart">
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
      </div>
      <div className="flex flex-col lg:hidden h-[30rem]" data-testid="analytics-vertical-chart">
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
      </div>
    </div>
  );
}
