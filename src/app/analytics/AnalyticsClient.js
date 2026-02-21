"use client";

import { useRef } from "react";
import { useDimensions } from "@/hooks/useDimensions";

import { resolveSection } from "./constants";
import { useAnalyticsData } from "./useAnalyticsData";
import AnalyticsSectionNav from "./components/AnalyticsSectionNav";
import OverviewSection from "./components/OverviewSection";
import DistributionSection from "./components/DistributionSection";
import RelationshipsSection from "./components/RelationshipsSection";

export default function AnalyticsClient({
  pokemonData = [],
  selectedSection = "overview",
  testId = "analytics-client",
}) {
  const resolvedSection = resolveSection(selectedSection);

  const horizontalBoxPlotRef = useRef();
  const horizontalBoxPlotDimensions = useDimensions(horizontalBoxPlotRef);
  const verticalBoxPlotRef = useRef();
  const verticalBoxPlotDimensions = useDimensions(verticalBoxPlotRef);
  const histogramRef = useRef();
  const histogramDimensions = useDimensions(histogramRef);
  const scatterPlotRef = useRef();
  const scatterPlotDimensions = useDimensions(scatterPlotRef);

  const { typeNames, dataFilteredByType, histogramData, scatterData, overviewStats } =
    useAnalyticsData(pokemonData);

  return (
    <div className="flex flex-col h-full gap-3 sm:gap-4" data-testid={testId}>
      <h1
        className="flex w-full text-xl sm:text-2xl justify-center text-center"
        data-testid="analytics-heading"
      >
        Pokemon Analytics
      </h1>
      <AnalyticsSectionNav resolvedSection={resolvedSection} />

      {resolvedSection === "overview" && (
        <OverviewSection
          overviewStats={overviewStats}
          histogramDimensions={histogramDimensions}
          histogramData={histogramData}
          histogramRef={histogramRef}
        />
      )}

      {resolvedSection === "distribution" && (
        <DistributionSection
          horizontalBoxPlotDimensions={horizontalBoxPlotDimensions}
          verticalBoxPlotDimensions={verticalBoxPlotDimensions}
          dataFilteredByType={dataFilteredByType}
          typeNames={typeNames}
          horizontalBoxPlotRef={horizontalBoxPlotRef}
          verticalBoxPlotRef={verticalBoxPlotRef}
        />
      )}

      {resolvedSection === "relationships" && (
        <RelationshipsSection
          scatterPlotDimensions={scatterPlotDimensions}
          scatterData={scatterData}
          scatterPlotRef={scatterPlotRef}
        />
      )}
      <div className="h-4" />
    </div>
  );
}
