import { getAllPokemonWithMaxStats } from "@/services/getAllPokemonWithMaxStats";

import { TYPES } from "@/components/constants";

import BoxPlot from "@/components/charts/BoxPlot/BoxPlot";

export default async function UIPlayground({}) {
  const { data } = await getAllPokemonWithMaxStats();

  const typesList = TYPES.map((type) => type.name);

  return (
    <div className="flex flex-row">
      <BoxPlot
        data={data}
        fixedDomainMax={600}
        filterList={typesList}
        filterBy={"primary_type_name"}
        valueKey={"max_stats"}
        multi
      />
    </div>
  );
}
