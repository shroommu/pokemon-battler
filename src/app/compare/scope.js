export const COMPARE_SCOPE = Object.freeze({
  mode: "one-vs-one",
  maxComparedPokemon: 2,
  requiredDisplayFields: [
    "name",
    "sprite",
    "types",
    "base_stats",
    "total_stats",
  ],
  requiredStats: ["hp", "attack", "defense", "special", "speed"],
  winnerRules: Object.freeze({
    compareBy: "higher-stat-wins",
    tieBehavior: "show-tie",
  }),
});

export function getStatWinner(aValue, bValue) {
  if (aValue === bValue) return "tie";
  return aValue > bValue ? "a" : "b";
}
