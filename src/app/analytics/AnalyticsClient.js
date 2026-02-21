"use client";

import { useMemo, useRef } from "react";
import { useDimensions } from "@/hooks/useDimensions";
import Link from "next/link";

import Image from "next/image";

import { getBoxplotData, getHistogramData, getScatterPlotData } from "@/utils";

import { TYPES } from "@/components/constants";

import HorizontalBoxPlot from "@/components/charts/BoxPlot/HorizontalBoxPlot";
import VerticalBoxPlot from "@/components/charts/BoxPlot/VerticalBoxPlot";
import Histogram from "@/components/charts/Histogram/Histogram";
import ScatterPlot from "@/components/charts/ScatterPlot/ScatterPlot";

const ANALYTICS_SECTIONS = [
  { value: "overview", label: "Overview" },
  { value: "distribution", label: "Distribution" },
  { value: "relationships", label: "Relationships" },
];

const getSectionHref = (section) => {
  if (section === "overview") {
    return "/analytics";
  }

  return `/analytics?section=${section}`;
};

export default function AnalyticsClient({
  pokemonData = [],
  selectedSection = "overview",
  testId = "analytics-client",
}) {
  const resolvedSection = ANALYTICS_SECTIONS.some(({ value }) => value === selectedSection)
    ? selectedSection
    : "overview";

  const horizontalBoxPlotRef = useRef();
  const horizontalBoxPlotDimensions = useDimensions(horizontalBoxPlotRef);
  const verticalBoxPlotRef = useRef();
  const verticalBoxPlotDimensions = useDimensions(verticalBoxPlotRef);
  const histogramRef = useRef();
  const histogramDimensions = useDimensions(histogramRef);
  const scatterPlotRef = useRef();
  const scatterPlotDimensions = useDimensions(scatterPlotRef);

  const dataWithTooltips = useMemo(() => {
    return pokemonData.map((d) => ({
      ...d,
      tooltip: (
        <div
          key={`${d.name}-tooltip`}
          className="flex flex-row items-center"
          data-testid={`${d.name}-tooltip`}
        >
          <Image
            src={
              d.sprite_party_filepath?.toLowerCase() ??
              "/images/pokemon/sprites/party/bulbasaur.png"
            }
            width={50}
            height={50}
            unoptimized
            alt={`${d.name} sprite`}
            className="aspect-square"
          />
          <div className="flex flex-col">
            <div>{d.name}</div>
            <div>{`Max Stats: ${d.max_stats}`}</div>
          </div>
        </div>
      ),
    }));
  }, [pokemonData]);

  const typeNames = useMemo(() => TYPES.map((type) => type.name), []);

  const pointsByType = useMemo(() => {
    const groupedPoints = typeNames.reduce((acc, typeName) => {
      acc[typeName] = [];
      return acc;
    }, {});

    dataWithTooltips.forEach((pokemon) => {
      const primaryTypeName = pokemon.primary_type?.name;
      const secondaryTypeName = pokemon.secondary_type?.name;

      if (primaryTypeName && groupedPoints[primaryTypeName]) {
        groupedPoints[primaryTypeName].push(pokemon);
      }

      if (
        secondaryTypeName &&
        secondaryTypeName !== primaryTypeName &&
        groupedPoints[secondaryTypeName]
      ) {
        groupedPoints[secondaryTypeName].push(pokemon);
      }
    });

    return groupedPoints;
  }, [dataWithTooltips, typeNames]);

  const dataFilteredByType = useMemo(() => {
    return TYPES.reduce(
      (acc, curr) => (
        (acc[curr.name] = {
          data: getBoxplotData(pointsByType[curr.name], "max_stats"),
          displayColor: curr.displayColor,
        }),
        acc
      ),
      {}
    );
  }, [pointsByType]);

  const histogramData = useMemo(() => {
    return getHistogramData(dataWithTooltips, "max_stats");
  }, [dataWithTooltips]);

  const scatterData = useMemo(() => {
    return getScatterPlotData(pokemonData);
  }, [pokemonData]);

  const overviewStats = useMemo(() => {
    if (!pokemonData.length) {
      return {
        pokemonCount: 0,
        representedTypeCount: 0,
        averageMaxStats: 0,
        topPokemonByMaxStats: "N/A",
      };
    }

    const representedTypeCount = Object.values(pointsByType).filter(
      (typeEntries) => typeEntries.length > 0,
    ).length;
    const averageMaxStats = Math.round(
      pokemonData.reduce((acc, pokemon) => acc + (pokemon.max_stats ?? 0), 0) /
        pokemonData.length,
    );

    const topPokemon = pokemonData.reduce((currentTop, pokemon) => {
      if (!currentTop || (pokemon.max_stats ?? 0) > (currentTop.max_stats ?? 0)) {
        return pokemon;
      }

      return currentTop;
    }, null);

    return {
      pokemonCount: pokemonData.length,
      representedTypeCount,
      averageMaxStats,
      topPokemonByMaxStats: topPokemon?.name ?? "N/A",
    };
  }, [pokemonData, pointsByType]);

  return (
    <div className="flex flex-col h-full gap-3 sm:gap-4" data-testid={testId}>
      <h1
        className="flex w-full text-xl sm:text-2xl justify-center text-center"
        data-testid="analytics-heading"
      >
        Pokemon Analytics
      </h1>
      <div
        className="flex flex-row flex-wrap justify-center gap-2"
        data-testid="analytics-section-nav"
      >
        {ANALYTICS_SECTIONS.map((section) => {
          const isSelected = resolvedSection === section.value;

          return (
            <Link
              key={section.value}
              href={getSectionHref(section.value)}
              className={`flex justify-center items-center p-2 rounded-md cursor-pointer ${
                isSelected ? "bg-gray-400" : "bg-gray-300"
              }`}
              data-testid={`analytics-section-${section.value}`}
            >
              {section.label}
            </Link>
          );
        })}
      </div>

      {resolvedSection === "overview" && (
        <div className="flex flex-col gap-3 sm:gap-4" data-testid="analytics-overview-section">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2"
            data-testid="analytics-overview-stats-grid"
          >
            <div className="bg-gray-200 rounded-md p-3" data-testid="analytics-stat-pokemon-count">
              <div className="text-xs sm:text-sm">Pokemon</div>
              <div className="text-lg sm:text-xl">{overviewStats.pokemonCount}</div>
            </div>
            <div className="bg-gray-200 rounded-md p-3" data-testid="analytics-stat-type-count">
              <div className="text-xs sm:text-sm">Types Represented</div>
              <div className="text-lg sm:text-xl">{overviewStats.representedTypeCount}</div>
            </div>
            <div className="bg-gray-200 rounded-md p-3" data-testid="analytics-stat-average-max-stats">
              <div className="text-xs sm:text-sm">Avg Max Stats</div>
              <div className="text-lg sm:text-xl">{overviewStats.averageMaxStats}</div>
            </div>
            <div className="bg-gray-200 rounded-md p-3" data-testid="analytics-stat-top-pokemon">
              <div className="text-xs sm:text-sm">Top Max Stats</div>
              <div className="text-lg sm:text-xl">{overviewStats.topPokemonByMaxStats}</div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            <section
              className="h-[21rem] sm:h-[24rem]"
              data-testid="analytics-overview-histogram-panel"
            >
              <h2 className="text-base sm:text-lg">Max Stats Histogram</h2>
              <p className="text-xs sm:text-sm mb-2">
                How max stats are distributed across all Pokemon.
              </p>
              <Histogram
                width={histogramDimensions.width}
                height={histogramDimensions.height}
                bins={histogramData}
                barFillColor="#616161ff"
                innerRef={histogramRef}
              />
            </section>
          </div>
        </div>
      )}

      {resolvedSection === "distribution" && (
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
      )}

      {resolvedSection === "relationships" && (
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
              initialXAxisKey="attack"
              initialYAxisKey="speed"
              innerRef={scatterPlotRef}
            />
          </section>
        </div>
      )}
      <div className="h-4" />
    </div>
  );
}
