import { getAllPokemonWithMaxStats } from "@/services/getAllPokemonWithMaxStats";

import { getBoxplotData } from "@/components/charts/BoxPlot/getBoxplotData";

import { TYPES } from "@/components/constants";

import BoxPlot from "@/components/charts/BoxPlot/BoxPlot";

export default async function UIPlayground({}) {
  const { data } = await getAllPokemonWithMaxStats();

  const typesList = TYPES.map((type) => type.name);

  const dataFilteredByType = typesList.reduce(
    (acc, curr) => (
      (acc[curr] = getBoxplotData(
        data.filter(
          (d) => d.primary_type.name == curr || d.secondary_type?.name == curr,
        ),
        "max_stats",
      )),
      acc
    ),
    {},
  );

  return (
    <div className="flex flex-row">
      <BoxPlot
        data={dataFilteredByType}
        fixedDomainMax={600}
        filterList={typesList}
        valueKey={"max_stats"}
        multi
      />
    </div>
  );
}
