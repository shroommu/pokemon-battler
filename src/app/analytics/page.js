"use client";

import { useRef, useState, useEffect } from "react";
import { useDimensions } from "@/hooks/useDimensions";

import Image from "next/image";

import { getAllPokemonWithMaxStats } from "@/services/getAllPokemonWithMaxStats";

import { getBoxplotData } from "@/utils/getBoxplotData";

import { TYPES } from "@/components/constants";

import HorizontalBoxPlot from "@/components/charts/BoxPlot/HorizontalBoxPlot";
import VerticalBoxPlot from "@/components/charts/BoxPlot/VerticalBoxPlot";

export default function Analytics({}) {
  const [pokemonData, setPokemonData] = useState([]);

  const horizontalBoxPlotRef = useRef();
  const horizontalBoxPlotDimensions = useDimensions(horizontalBoxPlotRef);
  const verticalBoxPlotRef = useRef();
  const verticalBoxPlotDimensions = useDimensions(verticalBoxPlotRef);

  useEffect(() => {
    const getData = async () => {
      const { data } = await getAllPokemonWithMaxStats();
      setPokemonData(data);
    };
    getData();
  }, []);

  const dataWithTooltips = pokemonData?.map((d) => {
    return {
      ...d,
      tooltip: (
        <div key={`${d.name}-tooltip`} className="flex flex-row items-center">
          <Image
            src={d.sprite_party_filepath.toLowerCase()}
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
    <div className="flex flex-col h-full">
      <h1 className="flex w-full text-xl justify-center">
        Distribution of Max Stats Per Type
      </h1>
      <div className="hidden lg:flex lg:flex-col h-2/3">
        <HorizontalBoxPlot
          width={horizontalBoxPlotDimensions.width}
          height={horizontalBoxPlotDimensions.height}
          data={dataFilteredByType}
          fixedDomainMax={600}
          filterList={Object.keys(dataFilteredByType)}
          valueKey={"max_stats"}
          xLabel={"Max Stats"}
          multi
          innerRef={horizontalBoxPlotRef}
        />
      </div>
      <div className="flex flex-col lg:hidden h-2/3">
        <VerticalBoxPlot
          width={verticalBoxPlotDimensions.width}
          height={verticalBoxPlotDimensions.height}
          padding={15}
          data={dataFilteredByType}
          fixedDomainMax={600}
          filterList={Object.keys(dataFilteredByType)}
          valueKey={"max_stats"}
          xLabel={"Max Stats"}
          multi
          innerRef={verticalBoxPlotRef}
        />
      </div>
    </div>
  );
}
