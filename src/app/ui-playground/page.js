import Image from "next/image";

import { getAllPokemonWithMaxStats } from "@/services/getAllPokemonWithMaxStats";

import { getBoxplotData } from "@/utils/getBoxplotData";

import { TYPES } from "@/components/constants";

import BoxPlot from "@/components/charts/BoxPlot/BoxPlot";

export default async function UIPlayground({}) {
  const { data } = await getAllPokemonWithMaxStats();

  const dataWithTooltips = data.map((d) => {
    return {
      ...d,
      tooltip: (
        <div key={`${d.name}-tooltip`} className="flex flex-row items-center">
          <Image
            src={d.sprite_party_filepath}
            width={50}
            height={50}
            priority
            alt={`${d.name} sprite`}
            className="aspect-square"
          />
          <div className="flex flex-col">
            <div>{d.name}</div>
            <div>{`Max Stats: ${d.max_stats}`}</div>
          </div>
        </div>
      ),
    };
  });

  const dataFilteredByType = TYPES.reduce(
    (acc, curr) => (
      (acc[curr.name] = {
        data: getBoxplotData(
          dataWithTooltips.filter(
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
