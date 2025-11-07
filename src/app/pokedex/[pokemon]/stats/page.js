import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";

import { capitalizePokemonSlug } from "@/app/utils";

import PokemonDataEntry from ".";

export default async function Stats({ params }) {
  const pokemon = await getUniquePokemonByName(
    capitalizePokemonSlug(params.pokemon)
  );

  return (
    <div className="flex flex-col w-full" data-testid="pokemon-entry-container">
      {pokemon ? (
        <PokemonDataEntry pokemon={pokemon.data} />
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

export const dynamic = "force-dynamic";
