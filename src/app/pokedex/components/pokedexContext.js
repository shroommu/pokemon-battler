"use client";
import { useState, useEffect } from "react";

import PokedexEntry from "./pokedexEntry";
import PokemonList from "./pokemonList";

export default function PokedexContext({ pokemons }) {
  console.log("rendering pokedex context");

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
    <section className="flex flex-row">
      <PokemonList pokemons={pokemons} onClick={setCurrentPokemonHandler} />
      <PokedexEntry currentPokemon={currentPokemon} />
    </section>
  );
}
