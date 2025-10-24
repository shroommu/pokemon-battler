"use client";

import { useState } from "react";

import PokemonList from "./pokemonList";
import PokemonListDropdown from "./pokemonListDropdown";
import BarChart from "@/components/charts/BarChart";
import Button from "@/components/Button";

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

  async function getPokemonTypeAverageStatData() {
    const avgData = await getPokemonTypeAverageStats(selectedPokemonData?.primary_type.name);

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
          <PokemonList pokemons={pokemons} selectedPokemon={selectedPokemon} getPokemonData={getPokemonData} setShowReferenceLine={setShowReferenceLine} />
        </div>
        <div
          className="flex flex-col m-4 items-center lg:hidden"
          data-testid="pokemon-list-mobile-dropdown-container"
        >
          <PokemonListDropdown pokemons={pokemons} getPokemonData={getPokemonData} setShowReferenceLine={setShowReferenceLine} />
        </div>
        <div
          className="flex flex-col m-4 md:w-full items-center"
          data-testid="pokedex-dashboard-container"
        >
          <section
            className="flex flex-col p-6 w-full bg-gray-200 rounded-md items-center h-screen"
            data-testid="pokedex-home-page"
          >
            <BarChart
              data={
                [
                  {name: "HP", value: selectedPokemonData?.hp, referenceLine: referenceLineData?.hp},
                  {name: "Attack", value: selectedPokemonData?.attack, referenceLine: referenceLineData?.attack},
                  {name: "Defense", value: selectedPokemonData?.defense, referenceLine: referenceLineData?.defense},
                  {name: "Special", value: selectedPokemonData?.special, referenceLine: referenceLineData?.special},
                  {name: "Speed", value: selectedPokemonData?.speed, referenceLine: referenceLineData?.speed},
                ]
              }
              showReferenceLine={showReferenceLine}
              width={700}
              height={400}
              barFillColor={selectedPokemonData?.primary_type.display_color}
            />
            <div className="flex flex-row">
              <Button onClick={() => getAllPokemonAverageStatData()} type={"tertiary"} extraClasses={'mr-4'}>Compare To All</Button>
              <Button onClick={() => getPokemonTypeAverageStatData()} type={"tertiary"}>Compare To All {selectedPokemonData?.primary_type?.name} Types</Button>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}