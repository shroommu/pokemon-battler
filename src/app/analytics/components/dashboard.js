"use client";

import { useState } from "react";

import PokemonList from "./pokemonList";
import PokemonListDropdown from "./pokemonListDropdown";
import HorizontalBarChart from "@/components/charts/HorizontalBarChart";
import Button from "@/components/Button";

import { getUniquePokemonByName } from "@/actions/getUniquePokemonByName";
import { getAllPokemonAverageStats } from "@/actions/getAllPokemonAverageStats";
import { getPokemonTypeAverageStats } from "@/actions/getPokemonTypeAverageStats";
import VerticalBarChart from "@/components/charts/VerticalBarChart";

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
            data-testid="pokedex-home-page"
          >
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
                barFillColor={selectedPokemonData?.primary_type.display_color}
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
                barFillColor={selectedPokemonData?.primary_type.display_color}
              />
            </div>
            <div className="flex flex-row">
              <Button
                onClick={() => getAllPokemonAverageStatData()}
                type={"tertiary"}
                extraClasses={"mr-4"}
              >
                Compare To All
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
                Compare To All {selectedPokemonData?.primary_type?.name} Types
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
        </div>
      </section>
    </div>
  );
}
