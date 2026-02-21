"use client";

import { useMemo } from "react";
import Image from "next/image";

import { getBoxplotData, getHistogramData, getScatterPlotData } from "@/utils";
import { TYPES } from "@/components/constants";

const getTooltip = (pokemon, { showMaxStats = true, detailRows = [] } = {}) => {
  return (
    <div
      key={`${pokemon.name}-tooltip`}
      className="flex flex-row items-center"
      data-testid={`${pokemon.name}-tooltip`}
    >
      <Image
        src={
          pokemon.sprite_party_filepath?.toLowerCase() ??
          "/images/pokemon/sprites/party/bulbasaur.png"
        }
        width={50}
        height={50}
        unoptimized
        alt={`${pokemon.name} sprite`}
        className="aspect-square"
      />
      <div className="flex flex-col">
        <div>{pokemon.name}</div>
        {showMaxStats ? <div className="text-xs">{`Max Stats: ${pokemon.max_stats}`}</div> : null}
        {detailRows.map((detailRow, index) => (
          <div key={`${pokemon.name}-detail-row-${index}`} className="text-xs">
            {detailRow}
          </div>
        ))}
      </div>
    </div>
  );
};

const getPointsByType = (pokemonDataWithTooltips, typeNames) => {
  const groupedPoints = typeNames.reduce((acc, typeName) => {
    acc[typeName] = [];
    return acc;
  }, {});

  pokemonDataWithTooltips.forEach((pokemon) => {
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
};

const getOverviewStats = (pokemonData, pointsByType) => {
  if (!pokemonData.length) {
    return {
      pokemonCount: 0,
      representedTypeCount: 0,
      averageMaxStats: 0,
      topPokemonByMaxStats: "N/A",
    };
  }

  const representedTypeCount = Object.values(pointsByType).filter(
    (typeEntries) => typeEntries.length > 0,
  ).length;
  const averageMaxStats = Math.round(
    pokemonData.reduce((acc, pokemon) => acc + (pokemon.max_stats ?? 0), 0) / pokemonData.length,
  );

  const topPokemon = pokemonData.reduce((currentTop, pokemon) => {
    if (!currentTop || (pokemon.max_stats ?? 0) > (currentTop.max_stats ?? 0)) {
      return pokemon;
    }

    return currentTop;
  }, null);

  return {
    pokemonCount: pokemonData.length,
    representedTypeCount,
    averageMaxStats,
    topPokemonByMaxStats: topPokemon?.name ?? "N/A",
  };
};

export const useAnalyticsData = (pokemonData = []) => {
  const dataWithTooltips = useMemo(() => {
    return pokemonData.map((pokemon) => ({
      ...pokemon,
      tooltip: getTooltip(pokemon),
      scatterTooltip: ({ xAxisLabel, yAxisLabel, xValue, yValue }) =>
        getTooltip(pokemon, {
          showMaxStats: false,
          detailRows: [`${xAxisLabel}: ${xValue}`, `${yAxisLabel}: ${yValue}`],
        }),
    }));
  }, [pokemonData]);

  const typeNames = useMemo(() => TYPES.map((type) => type.name), []);

  const pointsByType = useMemo(() => {
    return getPointsByType(dataWithTooltips, typeNames);
  }, [dataWithTooltips, typeNames]);

  const dataFilteredByType = useMemo(() => {
    return TYPES.reduce(
      (acc, typeEntry) => (
        (acc[typeEntry.name] = {
          data: getBoxplotData(pointsByType[typeEntry.name], "max_stats"),
          displayColor: typeEntry.displayColor,
        }),
        acc
      ),
      {},
    );
  }, [pointsByType]);

  const histogramData = useMemo(() => {
    return getHistogramData(dataWithTooltips, "max_stats");
  }, [dataWithTooltips]);

  const scatterData = useMemo(() => {
    return getScatterPlotData(dataWithTooltips);
  }, [dataWithTooltips]);

  const overviewStats = useMemo(() => {
    return getOverviewStats(pokemonData, pointsByType);
  }, [pokemonData, pointsByType]);

  return {
    typeNames,
    dataFilteredByType,
    histogramData,
    scatterData,
    overviewStats,
  };
};
