import { getAllPokemonWithMaxStats } from "@/services/getAllPokemonWithMaxStats";

import { getBoxplotData } from "@/utils/getBoxplotData";

import { TYPES } from "@/components/constants";

import BoxPlot from "@/components/charts/BoxPlot/BoxPlot";

export default async function UIPlayground({}) {
  const { data } = await getAllPokemonWithMaxStats();

  const dataFilteredByType = TYPES.reduce(
    (acc, curr) => (
      (acc[curr.name] = {
        data: getBoxplotData(
          data.filter(
            (d) =>
              d.primary_type.name == curr.name ||
              d.secondary_type?.name == curr.name,
          ),
          "max_stats",
        ),
        displayColor: curr.displayColor,
      }),
      acc
    ),
    {},
  );

  return (
    <div className="flex flex-row">
      <BoxPlot
        data={dataFilteredByType}
        fixedDomainMax={600}
        filterList={Object.keys(dataFilteredByType)}
        valueKey={"max_stats"}
        multi
      />
    </div>
  );
}
