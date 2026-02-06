import { getAllPokemonWithMaxStats } from "@/services/getAllPokemonWithMaxStats";
import { getBoxplotData } from "@/services/getBoxplotData";

import { TYPES } from "@/components/constants";

import BoxPlot from "@/components/charts/BoxPlot/BoxPlot";

export default async function UIPlayground({}) {
  const { data } = await getAllPokemonWithMaxStats().then((res) =>
    getBoxplotData(res.data),
  );

  const typesList = TYPES.map((type) => type.name);

  return (
    <div className="flex flex-row">
      <BoxPlot data={data} filterList={typesList} multi />
    </div>
  );
}
