"use client";

import Dropdown from "@/components/Dropdown";

export default function PokemonListDropdown({ pokemons, setSelectedPokemon }) {

  return (
    <Dropdown
      buttonText={"Select a Pokemon"}
      buttonType={"tertiary"}
      className="rounded-md p-2"
      data-testid="pokemon-list-dropdown"
    >
      {pokemons?.map((pokemon) => {
        return (
          <div key={pokemon.name} className="p-2" onClick={() => setSelectedPokemon(pokemon.name)}>
              {`#${String(pokemon.pokedex_number).padStart(3, "0")} ${
                pokemon.name
              }`}
          </div>
        );
      })}
    </Dropdown>
  );
}
