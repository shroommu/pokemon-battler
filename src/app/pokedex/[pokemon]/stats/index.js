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
import MobilePokedexNav from "../components/PokedexNav";

export default function PokemonDataEntry({
  pokemon,
  previousPokemon,
  nextPokemon,
}) {
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

  const renderTypes = () => {
    return pokemon.secondary_type ? (
      <div className="flex flex-row">
        <TypePill typeName={pokemon.primary_type.name} size="lg" />
        <div className="px-2">/</div>
        <TypePill typeName={pokemon.secondary_type.name} size="lg" />
      </div>
    ) : (
      <TypePill typeName={pokemon.primary_type.name} size="lg" />
    );
  };

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
    <div
      className="flex flex-col h-full w-full pb-6 lg:pb-0"
      data-testid="pokedex-nav-container"
    >
      <MobilePokedexNav
        pokemon={pokemon}
        previousPokemon={previousPokemon}
        nextPokemon={nextPokemon}
      />
      <div
        className="flex flex-col xl:flex-row h-full w-full xl:items-start"
        data-testid="pokedex-entry-container"
      >
        <section
          className="flex flex-col w-full xl:flex-1 items-center"
          data-testid="pokemon-basics-container"
        >
          <Image
            src={pokemon.sprite_front_filepath.toLowerCase()}
            width={32}
            height={32}
            className="w-full h-auto max-w-64 mt-4 border-gray-600 border-4 rounded-md bg-white p-1 [image-rendering:pixelated]"
            priority
            unoptimized
            alt={`${pokemon.name} front sprite`}
            data-testid="pokemon-image"
          />
          <div className="mt-2" data-testid="pokemon-type">
            {renderTypes()}
          </div>
        </section>
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
                getPokemonTypeAverageStatData(pokemon.primary_type)
              }
              type={"tertiary"}
              extraClasses={"mr-4"}
              testId="compare-to-primary-type-button"
            >
              Compare To All {pokemon.primary_type.name} Types
            </Button>
            {pokemon.secondary_type && (
              <Button
                onClick={() =>
                  getPokemonTypeAverageStatData(pokemon.secondary_type)
                }
                type={"tertiary"}
                testId="compare-to-secondary-type-button"
              >
                Compare To All {pokemon.secondary_type.name} Types
              </Button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
