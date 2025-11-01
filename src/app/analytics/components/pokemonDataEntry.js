"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import tinycolor from "tinycolor2";

import TypePill from "@/components/TypePill";

import HorizontalBarChart from "@/components/charts/HorizontalBarChart/HorizontalBarChart";
import VerticalBarChart from "@/components/charts/VerticalBarChart/VerticalBarChart";
import Button from "@/components/Button";

import { useDimensions } from "@/hooks/useDimensions";

import { getAllPokemonAverageStats } from "@/services/getAllPokemonAverageStats";
import { getPokemonTypeAverageStats } from "@/services/getPokemonTypeAverageStats";
import TypeTable from "@/components/TypeTable";

export default function PokemonDataEntry({ pokemonData }) {
  const [referenceLineData, setReferenceLineData] = useState();
  const [referenceLineType, setReferenceLineType] = useState();
  const [referenceLineColor, setReferenceLineColor] = useState();
  const [showReferenceLine, setShowReferenceLine] = useState(false);

  useEffect(() => {
    setShowReferenceLine(false);
  }, [pokemonData]);

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

  const renderTypes = () => {
    return pokemonData.secondary_type ? (
      <div className="flex flex-row">
        <TypePill typeName={pokemonData.primary_type.name} size="lg" />
        <div className="px-2">/</div>
        <TypePill typeName={pokemonData.secondary_type.name} size="lg" />
      </div>
    ) : (
      <TypePill typeName={pokemonData.primary_type.name} size="lg" />
    );
  };

  const horizontalStatsChartRef = useRef();
  const horizontalStatsChartDimensions = useDimensions(horizontalStatsChartRef);
  const verticalStatsChartRef = useRef();
  const verticalStatsChartDimensions = useDimensions(verticalStatsChartRef);

  const statsChartData = [
    {
      name: "HP",
      value: pokemonData.hp || 0,
      tooltipText: `Max HP of ${pokemonData.name}: `,
      referenceLineTooltipText: `Average HP of ${referenceLineType} Pokemon: `,
      referenceLine: referenceLineData?.hp,
    },
    {
      name: "Attack",
      value: pokemonData.attack || 0,
      tooltipText: `Max Attack of ${pokemonData.name}: `,
      referenceLineTooltipText: `Average Attack of ${referenceLineType} Pokemon: `,
      referenceLine: referenceLineData?.attack,
    },
    {
      name: "Defense",
      value: pokemonData.defense || 0,
      tooltipText: `Max Defense of ${pokemonData.name}: `,
      referenceLineTooltipText: `Average Defense of ${referenceLineType} Pokemon: `,
      referenceLine: referenceLineData?.defense,
    },
    {
      name: "Special",
      value: pokemonData.special || 0,
      tooltipText: `Max Special of ${pokemonData.name}: `,
      referenceLineTooltipText: `Average Special of ${referenceLineType} Pokemon: `,
      referenceLine: referenceLineData?.special,
    },
    {
      name: "Speed",
      value: pokemonData.speed || 0,
      tooltipText: `Max Speed of ${pokemonData.name}: `,
      referenceLineTooltipText: `Average Speed of ${referenceLineType} Pokemon: `,
      referenceLine: referenceLineData?.speed,
    },
  ];

  return (
    <section
      className="flex flex-col md:flex-row p-6 h-full w-full bg-gray-200 rounded-md"
      data-testid="pokemon-entry"
    >
      <section
        className="flex flex-col h-auto md:h-full w-full items-center"
        data-testid="pokemon-basics-container"
      >
        <h1 className="text-3xl md:text-4xl" data-testid="pokemon-name">
          {`#${String(pokemonData.pokedex_number).padStart(3, "0")} ${
            pokemonData.name
          }`}
        </h1>
        <Image
          src={pokemonData.sprite_front_filepath.toLowerCase()}
          width={32}
          height={0}
          className="w-full h-auto max-w-64 mt-4 border-gray-600 border-4 rounded-md bg-white p-1 [image-rendering:pixelated]"
          priority
          unoptimized
          alt={`${pokemonData.name} front sprite`}
          data-testid="pokemon-image"
        />
        <div className="mt-2" data-testid="pokemon-type">
          {renderTypes()}
        </div>
        <TypeTable />
      </section>
      <section
        className="flex flex-col h-full w-full items-center"
        data-testid="stats-chart-and-controls-container"
      >
        <h2
          className="text-2xl md:text-3xl mt-4"
          data-testid="stats-chart-title"
        >
          Stats
        </h2>
        <div
          className="hidden md:flex h-full w-full"
          data-testid="horizontal-stats-bar-chart-container"
        >
          <HorizontalBarChart
            data={statsChartData}
            showReferenceLine={showReferenceLine}
            width={horizontalStatsChartDimensions.width}
            height={horizontalStatsChartDimensions.height}
            fixedDomainMax={175}
            barFillColor={pokemonData.primary_type.display_color}
            referenceLineFillColor={tinycolor(referenceLineColor).lighten(20)}
            innerRef={horizontalStatsChartRef}
          />
        </div>
        <div
          className="flex md:hidden h-full w-full"
          data-testid="vertical-stats-bar-chart-container"
        >
          <VerticalBarChart
            data={statsChartData}
            showReferenceLine={showReferenceLine}
            width={verticalStatsChartDimensions.width}
            height={verticalStatsChartDimensions.height}
            barFillColor={pokemonData.primary_type.display_color}
            referenceLineFillColor={tinycolor(referenceLineColor).lighten(20)}
            innerRef={verticalStatsChartRef}
          />
        </div>
        <div
          className="flex flex-row"
          data-testid="stats-chart-controls-container"
        >
          <Button
            onClick={() => getAllPokemonAverageStatData()}
            type={"tertiary"}
            extraClasses={"mr-4"}
            testId="compare-to-all-pokemon-button"
          >
            Compare To All Pokemon
          </Button>
          <Button
            onClick={() =>
              getPokemonTypeAverageStatData(pokemonData.primary_type)
            }
            type={"tertiary"}
            extraClasses={"mr-4"}
            testId="compare-to-primary-type-button"
          >
            Compare To All {pokemonData.primary_type.name} Types
          </Button>
          {pokemonData.secondary_type && (
            <Button
              onClick={() =>
                getPokemonTypeAverageStatData(pokemonData.secondary_type)
              }
              type={"tertiary"}
              testId="compare-to-secondary-type-button"
            >
              Compare To All {pokemonData.secondary_type.name} Types
            </Button>
          )}
        </div>
      </section>
    </section>
  );
}
