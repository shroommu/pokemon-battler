import PokedexEntry from "./components/pokedexEntry";
import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";
import Tabs from "./components/Tabs";

export default async function PokedexEntryContainer({ params }) {
  function capitalizePokemonSlug(slug) {
    const words = slug.split("-");
    const capitalizedWords = words.map(
      (word) => String(word).charAt(0).toUpperCase() + String(word).slice(1)
    );
    return capitalizedWords.join(" ");
  }

  const pokemon = await getUniquePokemonByName(
    capitalizePokemonSlug(params.pokemon)
  );

  return (
    <div>
      <Tabs />
      <PokedexEntry pokemon={pokemon.data} />
    </div>
  );
}

export const dynamic = "force-dynamic";
