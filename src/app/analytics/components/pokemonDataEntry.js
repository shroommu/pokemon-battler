"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import TypePill from "@/components/TypePill";

import HorizontalBarChart from "@/components/charts/HorizontalBarChart";
import VerticalBarChart from "@/components/charts/VerticalBarChart";
import Button from "@/components/Button";

import { useDimensions } from "@/hooks/useDimensions";

import { getAllPokemonAverageStats } from "@/actions/getAllPokemonAverageStats";
import { getPokemonTypeAverageStats } from "@/actions/getPokemonTypeAverageStats";

export default function PokemonDataEntry({ pokemonData }) {
  const [referenceLineData, setReferenceLineData] = useState();
  const [showReferenceLine, setShowReferenceLine] = useState(false);

  useEffect(() => {
    setShowReferenceLine(false);
  }, [pokemonData]);

  async function getAllPokemonAverageStatData() {
    const avgData = await getAllPokemonAverageStats();

    setReferenceLineData(avgData.data);
    setShowReferenceLine(true);
  }

  async function getPokemonTypeAverageStatData(pokemonType) {
    const avgData = await getPokemonTypeAverageStats(pokemonType);

    setReferenceLineData(avgData.data);
    setShowReferenceLine(true);
  }

  const renderTypes = () => {
    return pokemonData.secondary_type ? (
      <div className="flex flex-row">
        <TypePill typeName={pokemonData.primary_type.name}>
          {pokemonData.primary_type.name}
        </TypePill>
        <div className="px-2">/</div>
        <TypePill typeName={pokemonData.secondary_type.name}>
          {pokemonData.secondary_type.name}
        </TypePill>
      </div>
    ) : (
      <TypePill typeName={pokemonData.primary_type.name}>
        {pokemonData.primary_type.name}
      </TypePill>
    );
  };

  const chart = useRef();
  const chartDimensions = useDimensions(chart);

  return (
    <section
      className="flex flex-col p-6 h-full w-full bg-gray-200 rounded-md items-center"
      data-testid="pokemon-analytics-dashboard"
    >
      <section className="flex flex-col xl:flex-1 h-full w-full items-center">
        <h1 className="text-3xl md:text-4xl" data-testid="pokemon-name">
          {`#${String(pokemonData?.pokedex_number).padStart(3, "0")} ${
            pokemonData?.name
          }`}
        </h1>
        <Image
          src={pokemonData?.sprite_front_filepath.toLowerCase()}
          width={32}
          height={32}
          style={{ width: "100%", height: "100%" }}
          className="max-w-32 max-h-32 w-32 h-32 md:max-w-64 md:max-h-64 mt-4 border-gray-600 border-4 rounded-md bg-white p-1 [image-rendering:pixelated]"
          priority
          unoptimized
          alt={`${pokemonData?.name} front sprite`}
          data-testid="pokemon-image"
        />
        <div className="mt-2" data-testid="pokemon-type">
          {pokemonData && renderTypes()}
        </div>
        <h2
          className="text-2xl md:text-3xl mt-4"
          data-testid="stats-chart-title"
        >
          Stats
        </h2>
        <div className="invisible lg:visible h-full w-full">
          <HorizontalBarChart
            data={[
              {
                name: "HP",
                value: pokemonData?.hp || 0,
                referenceLine: referenceLineData?.hp,
              },
              {
                name: "Attack",
                value: pokemonData?.attack || 0,
                referenceLine: referenceLineData?.attack,
              },
              {
                name: "Defense",
                value: pokemonData?.defense || 0,
                referenceLine: referenceLineData?.defense,
              },
              {
                name: "Special",
                value: pokemonData?.special || 0,
                referenceLine: referenceLineData?.special,
              },
              {
                name: "Speed",
                value: pokemonData?.speed || 0,
                referenceLine: referenceLineData?.speed,
              },
            ]}
            showReferenceLine={showReferenceLine}
            width={chartDimensions.width}
            height={chartDimensions.height}
            fixedDomainMax={175}
            barFillColor={pokemonData?.primary_type.display_color}
            innerRef={chart}
          />
        </div>
        <div className="lg:hidden">
          <VerticalBarChart
            data={[
              {
                name: "HP",
                value: pokemonData?.hp || 0,
                referenceLine: referenceLineData?.hp,
              },
              {
                name: "Attack",
                value: pokemonData?.attack || 0,
                referenceLine: referenceLineData?.attack,
              },
              {
                name: "Defense",
                value: pokemonData?.defense || 0,
                referenceLine: referenceLineData?.defense,
              },
              {
                name: "Special",
                value: pokemonData?.special || 0,
                referenceLine: referenceLineData?.special,
              },
              {
                name: "Speed",
                value: pokemonData?.speed || 0,
                referenceLine: referenceLineData?.speed,
              },
            ]}
            showReferenceLine={showReferenceLine}
            width={300}
            height={400}
            barFillColor={pokemonData?.primary_type.display_color}
          />
        </div>
        <div className="flex flex-row">
          <Button
            onClick={() => getAllPokemonAverageStatData()}
            type={"tertiary"}
            extraClasses={"mr-4"}
          >
            Compare To All Pokemon
          </Button>
          <Button
            onClick={() =>
              getPokemonTypeAverageStatData(pokemonData?.primary_type?.name)
            }
            type={"tertiary"}
            extraClasses={"mr-4"}
          >
            Compare To All {pokemonData?.primary_type?.name} Types
          </Button>
          {pokemonData?.secondary_type?.name && (
            <Button
              onClick={() =>
                getPokemonTypeAverageStatData(pokemonData?.secondary_type?.name)
              }
              type={"tertiary"}
            >
              Compare To All {pokemonData?.secondary_type?.name} Types
            </Button>
          )}
        </div>
      </section>
    </section>
  );
}
