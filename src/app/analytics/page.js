import Dashboard from "../pokedex/[pokemon]/components/Stats";
import { getAllPokemon } from "@/services/getAllPokemon";

export default async function AnalyticsPage() {
  const pokemons = await getAllPokemon();

  return <Dashboard pokemons={pokemons.data} />;
}
