"use client";

import { useState } from "react";
import Image from "next/image";

import HorizontalBarChart from "@/components/charts/HorizontalBarChart";
import VerticalBarChart from "@/components/charts/VerticalBarChart";
import Button from "@/components/Button";
import TypePill from "@/components/TypePill";

import PokemonList from "./pokemonList";
import PokemonListDropdown from "./pokemonListDropdown";

import { getUniquePokemonByName } from "@/actions/getUniquePokemonByName";
import { getAllPokemonAverageStats } from "@/actions/getAllPokemonAverageStats";
import { getPokemonTypeAverageStats } from "@/actions/getPokemonTypeAverageStats";

export default function Dashboard({ pokemons }) {
  const [selectedPokemon, setSelectedPokemon] = useState();
  const [selectedPokemonData, setSelectedPokemonData] = useState();
  const [referenceLineData, setReferenceLineData] = useState();
  const [showReferenceLine, setShowReferenceLine] = useState(false);

  async function getPokemonData(pokemonName) {
    const pokemonData = await getUniquePokemonByName(pokemonName);

    setSelectedPokemon(pokemonData?.data?.name);
    setSelectedPokemonData(pokemonData.data);
  }

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
    return selectedPokemonData.secondary_type ? (
      <div className="flex flex-row">
        <TypePill typeName={selectedPokemonData.primary_type.name}>
          {selectedPokemonData.primary_type.name}
        </TypePill>
        <div className="px-2">/</div>
        <TypePill typeName={selectedPokemonData.secondary_type.name}>
          {selectedPokemonData.secondary_type.name}
        </TypePill>
      </div>
    ) : (
      <TypePill typeName={selectedPokemonData.primary_type.name}>
        {selectedPokemonData.primary_type.name}
      </TypePill>
    );
  };

  return (
    <div data-testid="container" className="flex grow flex-row h-auto w-auto">
      <section className="flex flex-col lg:flex-row w-full">
        <div
          className="hidden flex-col lg:mr-0 m-4 flex-none lg:flex"
          data-testid="pokemon-list-container"
        >
          <PokemonList
            pokemons={pokemons}
            selectedPokemon={selectedPokemon}
            getPokemonData={getPokemonData}
            setShowReferenceLine={setShowReferenceLine}
          />
        </div>
        <div
          className="flex flex-col m-4 items-center lg:hidden"
          data-testid="pokemon-list-mobile-dropdown-container"
        >
          <PokemonListDropdown
            pokemons={pokemons}
            getPokemonData={getPokemonData}
            setShowReferenceLine={setShowReferenceLine}
          />
        </div>
        <div
          className="flex flex-col m-4 md:w-full items-center"
          data-testid="pokedex-dashboard-container"
        >
          <section
            className="flex flex-col p-6 w-full bg-gray-200 rounded-md items-center h-screen"
            data-testid="pokemon-analytics-dashboard"
          >
            {!selectedPokemonData ? (
              "Select a Pokemon from the list"
            ) : (
              <section className="flex flex-col xl:flex-1 items-center">
                <h1 className="text-2xl md:text-4xl" data-testid="pokemon-name">
                  {`#${String(selectedPokemonData?.pokedex_number).padStart(
                    3,
                    "0"
                  )} ${selectedPokemonData?.name}`}
                </h1>
                <Image
                  src={selectedPokemonData.sprite_front_filepath.toLowerCase()}
                  width={16}
                  height={16}
                  style={{ width: "100%", height: "100%" }}
                  className="max-w-16 max-h-16 w-16 h-16 md:max-w-32 md:max-h-32 mt-4 border-gray-600 border-4 rounded-md bg-white p-1 [image-rendering:pixelated]"
                  priority
                  unoptimized
                  alt={`${selectedPokemonData.name} front sprite`}
                  data-testid="pokemon-image"
                />
                <div className="mt-2" data-testid="pokemon-type">
                  {renderTypes()}
                </div>
                <h2
                  className="text-1xl md:text-3xl"
                  data-testid="stats-chart-title"
                >
                  Stats
                </h2>
                <div className="hidden lg:flex">
                  <HorizontalBarChart
                    data={[
                      {
                        name: "HP",
                        value: selectedPokemonData?.hp || 0,
                        referenceLine: referenceLineData?.hp,
                      },
                      {
                        name: "Attack",
                        value: selectedPokemonData?.attack || 0,
                        referenceLine: referenceLineData?.attack,
                      },
                      {
                        name: "Defense",
                        value: selectedPokemonData?.defense || 0,
                        referenceLine: referenceLineData?.defense,
                      },
                      {
                        name: "Special",
                        value: selectedPokemonData?.special || 0,
                        referenceLine: referenceLineData?.special,
                      },
                      {
                        name: "Speed",
                        value: selectedPokemonData?.speed || 0,
                        referenceLine: referenceLineData?.speed,
                      },
                    ]}
                    showReferenceLine={showReferenceLine}
                    width={700}
                    height={400}
                    fixedDomainMax={175}
                    barFillColor={
                      selectedPokemonData?.primary_type.display_color
                    }
                  />
                </div>
                <div className="lg:hidden">
                  <VerticalBarChart
                    data={[
                      {
                        name: "HP",
                        value: selectedPokemonData?.hp || 0,
                        referenceLine: referenceLineData?.hp,
                      },
                      {
                        name: "Attack",
                        value: selectedPokemonData?.attack || 0,
                        referenceLine: referenceLineData?.attack,
                      },
                      {
                        name: "Defense",
                        value: selectedPokemonData?.defense || 0,
                        referenceLine: referenceLineData?.defense,
                      },
                      {
                        name: "Special",
                        value: selectedPokemonData?.special || 0,
                        referenceLine: referenceLineData?.special,
                      },
                      {
                        name: "Speed",
                        value: selectedPokemonData?.speed || 0,
                        referenceLine: referenceLineData?.speed,
                      },
                    ]}
                    showReferenceLine={showReferenceLine}
                    width={300}
                    height={400}
                    barFillColor={
                      selectedPokemonData?.primary_type.display_color
                    }
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
                      getPokemonTypeAverageStatData(
                        selectedPokemonData?.primary_type?.name
                      )
                    }
                    type={"tertiary"}
                    extraClasses={"mr-4"}
                  >
                    Compare To All {selectedPokemonData?.primary_type?.name}{" "}
                    Types
                  </Button>
                  {selectedPokemonData?.secondary_type?.name && (
                    <Button
                      onClick={() =>
                        getPokemonTypeAverageStatData(
                          selectedPokemonData?.secondary_type?.name
                        )
                      }
                      type={"tertiary"}
                    >
                      Compare To All {selectedPokemonData?.secondary_type?.name}{" "}
                      Types
                    </Button>
                  )}
                </div>
              </section>
            )}
          </section>
        </div>
      </section>
    </div>
  );
}
