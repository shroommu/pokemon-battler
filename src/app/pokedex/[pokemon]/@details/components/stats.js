"use client";

import { useRef, useState } from "react";
import tinycolor from "tinycolor2";

import HorizontalBarChart from "@/components/charts/HorizontalBarChart/HorizontalBarChart";
import VerticalBarChart from "@/components/charts/VerticalBarChart/VerticalBarChart";
import StarChart from "@/components/charts/StarChart/StarChart";
import Button from "@/components/Button";

import { useDimensions } from "@/hooks/useDimensions";

import { getAllPokemonAverageStats } from "@/services/getAllPokemonAverageStats";
import { getPokemonTypeAverageStats } from "@/services/getPokemonTypeAverageStats";
import { HIGHEST_STAT } from "@/components/constants";

export default function Stats({ pokemon }) {
  const [referenceLineData, setReferenceLineData] = useState();
  const [referenceLineType, setReferenceLineType] = useState();
  const [referenceLineColor, setReferenceLineColor] = useState();
  const [showReferenceLine, setShowReferenceLine] = useState(false);
  const [allPokemonAverageStats, setAllPokemonAverageStats] = useState(null);
  const [typeAverageStats, setTypeAverageStats] = useState({});

  async function getAllPokemonAverageStatData() {
    const data =
      allPokemonAverageStats ??
      (await getAllPokemonAverageStats()).data;

    if (!allPokemonAverageStats) {
      setAllPokemonAverageStats(data);
    }

    setReferenceLineData(data);
    setReferenceLineType("All");
    setReferenceLineColor("#616161ff");
    setShowReferenceLine(true);
  }

  async function getPokemonTypeAverageStatData(pokemonType) {
    const cachedTypeAverage = typeAverageStats[pokemonType.name];
    const data =
      cachedTypeAverage ??
      (await getPokemonTypeAverageStats(pokemonType.name)).data;

    if (!cachedTypeAverage) {
      setTypeAverageStats((curr) => ({
        ...curr,
        [pokemonType.name]: data,
      }));
    }

    setReferenceLineData(data);
    setReferenceLineType(`${pokemonType.name} Type`);
    setReferenceLineColor(pokemonType.display_color);
    setShowReferenceLine(true);
  }

  const horizontalStatsChartRef = useRef();
  const horizontalStatsChartDimensions = useDimensions(horizontalStatsChartRef);
  const verticalStatsChartRef = useRef();
  const verticalStatsChartDimensions = useDimensions(verticalStatsChartRef);
  const starChartRef = useRef();
  const starChartDimensions = useDimensions(starChartRef);

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

  const barFillGradient = pokemon.secondary_type
    ? {
        x1: "0%",
        y1: "0%",
        x2: "100%",
        y2: "100%",
        stops: [
          { offset: "0%", color: pokemon.primary_type.display_color },
          { offset: "47%", color: pokemon.primary_type.display_color },
          { offset: "53%", color: pokemon.secondary_type.display_color },
          { offset: "100%", color: pokemon.secondary_type.display_color },
        ],
      }
    : undefined;

  return (
    <div className="flex flex-col items-center">
      <h2
        className="text-2xl md:text-3xl mt-4 xl:mt-0"
        data-testid="stats-chart-title"
      >
        Max Stats
      </h2>
      <div className="flex flex-col lg:flex-row xl:flex-col h-full w-full">
        <section
          className="flex flex-col w-full lg:flex-3 xl:flex-auto h-64"
          data-testid="stats-bar-charts-container"
        >
          <div
            className="hidden xl:flex xl:h-64 h-full w-full"
            data-testid="horizontal-stats-bar-chart-container"
          >
            <HorizontalBarChart
              data={statsChartData}
              showReferenceLine={showReferenceLine}
              width={horizontalStatsChartDimensions.width}
              height={horizontalStatsChartDimensions.height}
              fixedDomainMax={HIGHEST_STAT}
              barFillColor={pokemon.primary_type.display_color}
              barFillGradient={barFillGradient}
              referenceLineFillColor={tinycolor(referenceLineColor).lighten(20)}
              innerRef={horizontalStatsChartRef}
            />
          </div>
          <div
            className="flex xl:hidden h-64 w-full"
            data-testid="vertical-stats-bar-chart-container"
          >
            <VerticalBarChart
              data={statsChartData}
              showReferenceLine={showReferenceLine}
              width={verticalStatsChartDimensions.width}
              height={verticalStatsChartDimensions.height}
              barFillColor={pokemon.primary_type.display_color}
              barFillGradient={barFillGradient}
              referenceLineFillColor={tinycolor(referenceLineColor).lighten(20)}
              innerRef={verticalStatsChartRef}
            />
          </div>
        </section>
        <section
          data-testid="star-chart-container"
          className="h-64 lg:flex-2 xl:flex-auto w-full"
        >
          <StarChart
            width={starChartDimensions.width}
            height={starChartDimensions.height}
            data={statsChartData}
            fillColor={pokemon.primary_type.display_color}
            innerRef={starChartRef}
            showReferenceStar={showReferenceLine}
            referenceStarFillColor={tinycolor(referenceLineColor).lighten(20)}
          />
        </section>
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
    </div>
  );
}
