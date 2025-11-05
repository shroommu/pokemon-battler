import { getAllPokemon } from "@/services/getAllPokemon";
import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";
import PokedexEntry from "./components";

export default async function PokedexEntryContainer({ params }) {
  function capitalizePokemonSlug(slug) {
    const words = slug.split("-");
    const capitalizedWords = words.map(
      (word) => String(word).charAt(0).toUpperCase() + String(word).slice(1)
    );
    return capitalizedWords.join(" ");
  }

  const pokemons = await getAllPokemon();
  const pokemon = await getUniquePokemonByName(
    capitalizePokemonSlug(params.pokemon)
  );

  return <PokedexEntry pokemon={pokemon.data} pokemons={pokemons.data} />;
}

export const dynamic = "force-dynamic";
