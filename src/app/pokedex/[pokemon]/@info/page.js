import { slugifyPokemonName } from "@/app/utils";

import Image from "next/image";
import { notFound } from "next/navigation";

import TypePill from "@/components/TypePill";

import { getPokemonBySlug } from "../getPokemonBySlug";

export default async function Page({ params }) {
  const { pokemon: pokemonSlug } = await params;
  const pokemon = await getPokemonBySlug(pokemonSlug);

  if (!pokemon) {
    notFound();
  }

  const renderTypes = () => {
    return pokemon.secondary_type ? (
      <div className="flex flex-row">
        <TypePill typeName={pokemon.primary_type.name} size={"lg"} />
        <div className="px-2">/</div>
        <TypePill typeName={pokemon.secondary_type.name} size={"lg"} />
      </div>
    ) : (
      <TypePill typeName={pokemon.primary_type.name} size={"lg"} />
    );
  };

  return (
    <div
      className="flex flex-col xl:flex-row w-full xl:items-start xl:flex-1"
      data-testid="pokedex-entry-container"
    >
      <section
        className="flex flex-col items-center"
        data-testid={`${slugifyPokemonName(pokemon.name)}-pokemon-data`}
      >
        <div className="mt-4 relative w-full h-auto max-w-64 aspect-square">
          <Image
            src={pokemon.sprite_front_filepath.toLowerCase()}
            fill
            className="border-gray-600 border-4 rounded-md bg-white p-1 [image-rendering:pixelated]"
            priority
            unoptimized
            alt={`${pokemon.name} front sprite`}
            data-testid="pokemon-image"
          />
        </div>
        <div className="mt-2" data-testid="pokemon-type">
          {renderTypes()}
        </div>
        <p className="px-8 mt-2 text-center" data-testid="pokedex-blurb">
          {pokemon.pokedex_entry}
        </p>
      </section>
    </div>
  );
}
