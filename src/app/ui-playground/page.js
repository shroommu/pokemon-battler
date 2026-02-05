import { getAllPokemonWithMaxStats } from "@/services/getAllPokemonWithMaxStats";

import BoxPlot from "@/components/charts/BoxPlot/BoxPlot";

export default async function UIPlayground({}) {
  const { data: pokemons } = await getAllPokemonWithMaxStats();

  return (
    <div>
      <BoxPlot data={pokemons} />
    </div>
  );
}
