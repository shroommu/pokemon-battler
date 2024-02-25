"use client";
import { useState, useEffect } from "react";

import PokedexEntry from "./pokedexEntry";
import PokemonList from "./pokemonList";

export default function PokedexContext({ pokemons }) {
  const [currentPokemon, setCurrentPokemon] = useState(null);

  const setCurrentPokemonHandler = (pokedexNumber) => {
    setCurrentPokemon(
      pokemons.filter((pokemon) => pokemon.pokedex_number == pokedexNumber)[0]
    );
  };

  useEffect(() => {
    setCurrentPokemon(pokemons[0]);
  }, [pokemons, setCurrentPokemon]);

  return (
    <section className="flex flex-row w-full">
      <div className="flex flex-col flex-none">
        <PokemonList pokemons={pokemons} onClick={setCurrentPokemonHandler} />
      </div>
      <div className="flex flex-col w-full m-4 ml-0">
        <PokedexEntry pokemon={currentPokemon} />
      </div>
    </section>
  );
}
