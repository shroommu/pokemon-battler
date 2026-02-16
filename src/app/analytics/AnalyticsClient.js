"use client";

import { useMemo, useRef } from "react";
import { useDimensions } from "@/hooks/useDimensions";

import Image from "next/image";

import { getBoxplotData } from "@/utils/getBoxplotData";

import { TYPES } from "@/components/constants";

import HorizontalBoxPlot from "@/components/charts/BoxPlot/HorizontalBoxPlot";
import VerticalBoxPlot from "@/components/charts/BoxPlot/VerticalBoxPlot";

export default function AnalyticsClient({ pokemonData = [] }) {
  const horizontalBoxPlotRef = useRef();
  const horizontalBoxPlotDimensions = useDimensions(horizontalBoxPlotRef);
  const verticalBoxPlotRef = useRef();
  const verticalBoxPlotDimensions = useDimensions(verticalBoxPlotRef);

  const dataWithTooltips = useMemo(() => {
    return pokemonData.map((d) => ({
      ...d,
      tooltip: (
        <div key={`${d.name}-tooltip`} className="flex flex-row items-center">
          <Image
            src={
              d.sprite_party_filepath?.toLowerCase() ??
              "/images/pokemon/sprites/party/bulbasaur.png"
            }
            width={50}
            height={50}
            unoptimized
            alt={`${d.name} sprite`}
            className="aspect-square"
          />
          <div className="flex flex-col">
            <div>{d.name}</div>
            <div>{`Max Stats: ${d.max_stats}`}</div>
          </div>
        </div>
      ),
    }));
  }, [pokemonData]);

  const typeNames = useMemo(() => TYPES.map((type) => type.name), []);

  const pointsByType = useMemo(() => {
    const groupedPoints = typeNames.reduce((acc, typeName) => {
      acc[typeName] = [];
      return acc;
    }, {});

    dataWithTooltips.forEach((pokemon) => {
      const primaryTypeName = pokemon.primary_type?.name;
      const secondaryTypeName = pokemon.secondary_type?.name;

      if (primaryTypeName && groupedPoints[primaryTypeName]) {
        groupedPoints[primaryTypeName].push(pokemon);
      }

      if (
        secondaryTypeName &&
        secondaryTypeName !== primaryTypeName &&
        groupedPoints[secondaryTypeName]
      ) {
        groupedPoints[secondaryTypeName].push(pokemon);
      }
    });

    return groupedPoints;
  }, [dataWithTooltips, typeNames]);

  const dataFilteredByType = useMemo(() => {
    return TYPES.reduce(
      (acc, curr) => (
        (acc[curr.name] = {
          data: getBoxplotData(pointsByType[curr.name], "max_stats"),
          displayColor: curr.displayColor,
        }),
        acc
      ),
      {}
    );
  }, [pointsByType]);

  return (
    <div className="flex flex-col h-full">
      <h1 className="flex w-full text-xl justify-center">
        Distribution of Pokemon Max Stats Per Type
      </h1>
      <div className="hidden lg:flex lg:flex-col h-2/3">
        <HorizontalBoxPlot
          width={horizontalBoxPlotDimensions.width}
          height={horizontalBoxPlotDimensions.height}
          data={dataFilteredByType}
          fixedDomainMax={600}
          filterList={typeNames}
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
          filterList={typeNames}
          valueKey={"max_stats"}
          xLabel={"Max Stats"}
          multi
          innerRef={verticalBoxPlotRef}
        />
      </div>
    </div>
  );
}
