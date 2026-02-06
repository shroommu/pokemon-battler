import { getAllPokemonWithMaxStats } from "@/services/getAllPokemonWithMaxStats";
import { getBoxplotData } from "@/services/getBoxplotData";

import BoxPlot from "@/components/charts/BoxPlot/BoxPlot";

export default async function UIPlayground({}) {
  const { data } = await getAllPokemonWithMaxStats().then((res) =>
    getBoxplotData(res.data),
  );

  console.log(data);

  return (
    <div>
      <BoxPlot data={data} />
    </div>
  );
}
