import { getStatWinner } from "../scope";

const STAT_ROWS = [
  { key: "hp", label: "HP" },
  { key: "attack", label: "Attack" },
  { key: "defense", label: "Defense" },
  { key: "special", label: "Special" },
  { key: "speed", label: "Speed" },
  { key: "total", label: "Total" },
];

function winnerClass(side, winner) {
  if (winner === "tie") {
    return "bg-gray-100";
  }

  if (winner === side) {
    return "bg-green-100 font-semibold";
  }

  return "";
}

export default function StatsTable({ pokemonA, pokemonB }) {
  if (!pokemonA || !pokemonB) {
    return null;
  }

  return (
    <div className="overflow-x-auto" data-testid="compare-stats-table-container">
      <table className="w-full border-collapse" data-testid="compare-stats-table">
        <thead>
          <tr>
            <th className="text-left p-2 border-b border-gray-400">Stat</th>
            <th className="text-left p-2 border-b border-gray-400">{pokemonA.name}</th>
            <th className="text-left p-2 border-b border-gray-400">{pokemonB.name}</th>
            <th className="text-left p-2 border-b border-gray-400">Winner</th>
          </tr>
        </thead>
        <tbody>
          {STAT_ROWS.map((row) => {
            const aValue = pokemonA.stats[row.key];
            const bValue = pokemonB.stats[row.key];
            const winner = getStatWinner(aValue, bValue);
            const winnerLabel = winner === "tie" ? "Tie" : winner === "a" ? pokemonA.name : pokemonB.name;

            return (
              <tr key={row.key} data-testid={`compare-stat-row-${row.key}`}>
                <td className="p-2 border-b border-gray-300">{row.label}</td>
                <td className={`p-2 border-b border-gray-300 ${winnerClass("a", winner)}`}>{aValue}</td>
                <td className={`p-2 border-b border-gray-300 ${winnerClass("b", winner)}`}>{bValue}</td>
                <td className="p-2 border-b border-gray-300" data-testid={`compare-stat-winner-${row.key}`}>
                  {winnerLabel}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
