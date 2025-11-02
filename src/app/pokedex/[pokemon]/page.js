import PokedexEntry from "./components/pokedexEntry";
import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";

export default async function PokedexEntryContainer({ params }) {
  function capitalizePokemonSlug(slug) {
    const words = slug.split("-");
    const capitalizedWords = words.map(
      (word) => String(word).charAt(0).toUpperCase() + String(word).slice(1)
    );
    return capitalizedWords.join(" ");
  }

  const pokemonNameCapitalized = capitalizePokemonSlug(params.pokemon);

  const pokemon = await getUniquePokemonByName(pokemonNameCapitalized);

  return <PokedexEntry pokemon={pokemon.data} />;
}

export const dynamic = "force-dynamic";
