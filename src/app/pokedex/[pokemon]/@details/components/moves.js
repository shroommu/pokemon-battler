import TypePill from "@/components/TypePill";

const MOVE_TABLE_LABELS = ["Name", "Type", "Power", "Accuracy", "PP", "Effect"];

export default function Moves({ pokemon }) {
  return (
    <section
      className="flex flex-col items-center"
      data-testid={`${pokemon.name
        .replace(" ", "-")
        .toLowerCase()}-pokemon-moves`}
    >
      <h2 className="text-2xl md:text-3xl mt-4 xl:mt-0">Moves</h2>
      <table className="border-2 border-gray-400 mt-2" data-testid="move-table">
        <thead className="bg-gray-300">
          <tr>
            {MOVE_TABLE_LABELS.map((moveTableLabel) => (
              <td key={moveTableLabel} className="p-2 border-2 border-gray-500">
                {moveTableLabel}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {pokemon.pokemon_moves
            .sort(
              (a, b) =>
                (a.move.name > b.move.name) - (a.move.name < b.move.name)
            )
            .map((moveData, index) => {
              return (
                <tr
                  key={`move-row-${index + 1}`}
                  data-testid={`move-row-${index + 1}`}
                  className="bg-white"
                >
                  <td className="p-2 border-2 border-gray-400">
                    {moveData.move.name}
                  </td>
                  <td className="p-2 border-2 border-gray-400">
                    <TypePill typeName={moveData.move.type.name} size={"lg"} />
                  </td>
                  <td className="p-2 border-2 border-gray-400 text-center">
                    {moveData.move.power ?? "--"}
                  </td>
                  <td className="p-2 border-2 border-gray-400 text-center">
                    {moveData.move.accuracy ?? "--"}
                  </td>
                  <td className="p-2 border-2 border-gray-400 text-center">
                    {moveData.move.pp ?? "--"}
                  </td>
                  <td className="p-2 border-2 border-gray-400">
                    {moveData.move.effect}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
}
