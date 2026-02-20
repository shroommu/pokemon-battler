import { TYPES } from "@/components/constants";

const DEFAULT_POINT_COLOR = "#2563eb";

const typeColorMap = TYPES.reduce((accumulator, type) => {
  accumulator[type.name.toLowerCase()] = type.displayColor;
  return accumulator;
}, {});

const getPrimaryTypeColor = (pokemon) => {
  const primaryType = pokemon.primary_type;

  if (!primaryType || typeof primaryType !== "object") {
    return DEFAULT_POINT_COLOR;
  }

  if (primaryType.display_color) {
    return primaryType.display_color;
  }

  const normalizedTypeName = primaryType.name?.toLowerCase();

  if (normalizedTypeName && typeColorMap[normalizedTypeName]) {
    return typeColorMap[normalizedTypeName];
  }

  return DEFAULT_POINT_COLOR;
};

export const getScatterPlotData = (pokemonData = []) => {
  return pokemonData.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    hp: pokemon.hp ?? 0,
    attack: pokemon.attack ?? 0,
    defense: pokemon.defense ?? 0,
    special: pokemon.special ?? 0,
    speed: pokemon.speed ?? 0,
    max_stats: pokemon.max_stats ?? 0,
    pointColor: getPrimaryTypeColor(pokemon),
  }));
};
