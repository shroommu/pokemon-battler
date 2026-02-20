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
  }));
};
