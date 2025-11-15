"use client";

import { useEffect, useRef, useState } from "react";
import tinycolor from "tinycolor2";

import HorizontalBarChart from "@/components/charts/HorizontalBarChart/HorizontalBarChart";
import VerticalBarChart from "@/components/charts/VerticalBarChart/VerticalBarChart";
import Button from "@/components/Button";

import { useDimensions } from "@/hooks/useDimensions";

import { getAllPokemonAverageStats } from "@/services/getAllPokemonAverageStats";
import { getPokemonTypeAverageStats } from "@/services/getPokemonTypeAverageStats";

export default function PokemonDataEntry({ pokemon }) {
  const [referenceLineData, setReferenceLineData] = useState();
  const [referenceLineType, setReferenceLineType] = useState();
  const [referenceLineColor, setReferenceLineColor] = useState();
  const [showReferenceLine, setShowReferenceLine] = useState(false);

  useEffect(() => {
    setShowReferenceLine(false);
  }, [pokemon]);

  async function getAllPokemonAverageStatData() {
    const avgData = await getAllPokemonAverageStats();

    setReferenceLineData(avgData.data);
    setReferenceLineType("All");
    setReferenceLineColor("#616161ff");
    setShowReferenceLine(true);
  }

  async function getPokemonTypeAverageStatData(pokemonType) {
    const avgData = await getPokemonTypeAverageStats(pokemonType.name);

    setReferenceLineData(avgData.data);
    setReferenceLineType(`${pokemonType.name} Type`);
    setReferenceLineColor(pokemonType.display_color);
    setShowReferenceLine(true);
  }

  const horizontalStatsChartRef = useRef();
  const horizontalStatsChartDimensions = useDimensions(horizontalStatsChartRef);
  const verticalStatsChartRef = useRef();
  const verticalStatsChartDimensions = useDimensions(verticalStatsChartRef);

  const statsChartData = [
    {
      name: "HP",
      value: pokemon.hp || 0,
      tooltipText: `Max HP of ${pokemon.name}: `,
      referenceLineTooltipText: `Average HP of ${referenceLineType} Pokemon: `,
      referenceLine: referenceLineData?.hp,
    },
    {
      name: "Attack",
      value: pokemon.attack || 0,
      tooltipText: `Max Attack of ${pokemon.name}: `,
      referenceLineTooltipText: `Average Attack of ${referenceLineType} Pokemon: `,
      referenceLine: referenceLineData?.attack,
    },
    {
      name: "Defense",
      value: pokemon.defense || 0,
      tooltipText: `Max Defense of ${pokemon.name}: `,
      referenceLineTooltipText: `Average Defense of ${referenceLineType} Pokemon: `,
      referenceLine: referenceLineData?.defense,
    },
    {
      name: "Special",
      value: pokemon.special || 0,
      tooltipText: `Max Special of ${pokemon.name}: `,
      referenceLineTooltipText: `Average Special of ${referenceLineType} Pokemon: `,
      referenceLine: referenceLineData?.special,
    },
    {
      name: "Speed",
      value: pokemon.speed || 0,
      tooltipText: `Max Speed of ${pokemon.name}: `,
      referenceLineTooltipText: `Average Speed of ${referenceLineType} Pokemon: `,
      referenceLine: referenceLineData?.speed,
    },
  ];

  return (
    <section
      className="flex flex-col min-h-72 h-full w-full xl:flex-1 items-center"
      data-testid="stats-chart-and-controls-container"
    >
      <h2
        className="text-2xl md:text-3xl mt-4 xl:mt-0"
        data-testid="stats-chart-title"
      >
        Stats
      </h2>
      <div
        className="hidden xl:flex h-full w-full"
        data-testid="horizontal-stats-bar-chart-container"
      >
        <HorizontalBarChart
          data={statsChartData}
          showReferenceLine={showReferenceLine}
          width={horizontalStatsChartDimensions.width}
          height={horizontalStatsChartDimensions.height}
          fixedDomainMax={175}
          barFillColor={pokemon.primary_type.display_color}
          referenceLineFillColor={tinycolor(referenceLineColor).lighten(20)}
          innerRef={horizontalStatsChartRef}
        />
      </div>
      <div
        className="flex xl:hidden h-full w-full"
        data-testid="vertical-stats-bar-chart-container"
      >
        <VerticalBarChart
          data={statsChartData}
          showReferenceLine={showReferenceLine}
          width={verticalStatsChartDimensions.width}
          height={verticalStatsChartDimensions.height}
          barFillColor={pokemon.primary_type.display_color}
          referenceLineFillColor={tinycolor(referenceLineColor).lighten(20)}
          innerRef={verticalStatsChartRef}
        />
      </div>
      <div
        className="flex flex-row justify-center"
        data-testid="stats-chart-controls-container"
      >
        <h2 className="flex items-center mr-4">Compare To:</h2>
        <Button
          onClick={() => getAllPokemonAverageStatData()}
          type={"tertiary"}
          extraClasses={"mr-4"}
          testId="compare-to-all-pokemon-button"
        >
          All Pokemon
        </Button>
        <Button
          onClick={() => getPokemonTypeAverageStatData(pokemon.primary_type)}
          type={"tertiary"}
          extraClasses={"mr-4"}
          testId="compare-to-primary-type-button"
        >
          All {pokemon.primary_type.name} Types
        </Button>
        {pokemon.secondary_type && (
          <Button
            onClick={() =>
              getPokemonTypeAverageStatData(pokemon.secondary_type)
            }
            type={"tertiary"}
            testId="compare-to-secondary-type-button"
          >
            All {pokemon.secondary_type.name} Types
          </Button>
        )}
      </div>
    </section>
  );
}
