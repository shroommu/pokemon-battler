import Dashboard from "./components/dashboard";
import { getAllPokemon } from "@/services/getAllPokemon";

export default async function AnalyticsPage() {
  const pokemons = await getAllPokemon();

  return <Dashboard pokemons={pokemons.data} />;
}
