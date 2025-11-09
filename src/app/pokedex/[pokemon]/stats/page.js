import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";

import { capitalizePokemonSlug } from "@/app/utils";

import PokemonDataEntry from ".";
import { getUniquePokemonByNumber } from "@/services/getUniquePokemonByNumber";

export default async function Stats({ params }) {
  const pokemon = await getUniquePokemonByName(
    capitalizePokemonSlug(params.pokemon)
  );

  const previousPokemon = await getUniquePokemonByName(
    capitalizePokemonSlug(params.pokemon)
  ).then(
    async (pokemon) =>
      await getUniquePokemonByNumber(pokemon.data.pokedex_number - 1)
  );

  const nextPokemon = await getUniquePokemonByName(
    capitalizePokemonSlug(params.pokemon)
  ).then(
    async (pokemon) =>
      await getUniquePokemonByNumber(pokemon.data.pokedex_number + 1)
  );

  return (
    <div className="flex flex-col w-full" data-testid="pokemon-entry-container">
      {pokemon ? (
        <PokemonDataEntry
          pokemon={pokemon.data}
          previousPokemon={previousPokemon?.data}
          nextPokemon={nextPokemon?.data}
        />
      ) : (
        <section
          className="flex flex-col p-4 h-full w-full bg-gray-200 rounded-md items-center"
          data-testid="loading-container"
        >
          loading...
        </section>
      )}
    </div>
  );
}
