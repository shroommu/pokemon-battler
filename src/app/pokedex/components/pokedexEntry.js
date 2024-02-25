import Image from "next/image";

const STAT_NAMES = ["HP", "Attack", "Defense", "Special", "Speed"];
const MOVE_TABLE_LABELS = ["Name", "Type", "Power", "Accuracy", "PP", "Effect"];

export default function PokedexEntry({ pokemon }) {
  if (!pokemon) {
    return (
      <section className="flex flex-col w-full m-4 ml-0 p-6 bg-gray-200 rounded-md items-center" />
    );
  }

  const renderTypes = () => {
    return pokemon.type_pokemon_secondary_typeTotype
      ? `${pokemon.primary_type.name} / ${pokemon.secondary_type.name}`
      : pokemon.primary_type.name;
  };

  const statList = [
    pokemon.hp,
    pokemon.attack,
    pokemon.defense,
    pokemon.special,
    pokemon.speed,
  ];

  return (
    <section className="flex flex-col w-full m-4 ml-0 p-6 bg-gray-200 rounded-md items-center overflow-y-scroll">
      <h1 className="text-4xl">{`#${String(pokemon.pokedex_number).padStart(
        3,
        "0"
      )} ${pokemon.name}`}</h1>
      <Image
        src={pokemon.sprite_front_filepath.toLowerCase()}
        width={0}
        height={0}
        style={{ width: "100%", height: "100%" }}
        className="max-w-64 max-h-64 mt-4 border-gray-600 border-4 rounded-md bg-white p-1"
        unoptimized
        alt={`${pokemon.name} front sprite`}
      />
      <p className="mt-2">{renderTypes()}</p>
      <h2 className="text-2xl mt-2">Stats</h2>
      <table className="border-2 border-black mt-2" testid="stats-table">
        <thead className="bg-gray-300">
          <tr>
            {STAT_NAMES.map((statName) => (
              <td key={statName} className="p-2 border-2 border-black">
                {statName}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            {statList.map((stat, index) => (
              <td
                key={`${pokemon.name}-${STAT_NAMES[index]}`}
                className="p-2 border-2 border-black text-center"
              >
                {stat}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <h2 className="text-2xl mt-2">Moves</h2>
      <table className="border-2 border-black mt-2" testid="move-table">
        <thead className="bg-gray-300">
          <tr>
            {MOVE_TABLE_LABELS.map((moveTableLabel) => (
              <td key={moveTableLabel} className="p-2 border-2 border-black">
                {moveTableLabel}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {pokemon.pokemon_moves
            .sort((a, b) =>
              a.move.name > b.move.name ? 1 : b.move.name > a.move.name ? -1 : 0
            )
            .map((moveData, index) => {
              return (
                <tr
                  key={`move-row-${index + 1}`}
                  testid={`move-row-${index + 1}`}
                  className="bg-white"
                >
                  <td className="p-2 border-2 border-black">
                    {moveData.move.name}
                  </td>
                  <td className="p-2 border-2 border-black">
                    {moveData.move.type.name}
                  </td>
                  <td className="p-2 border-2 border-black text-center">
                    {moveData.move.power ?? "--"}
                  </td>
                  <td className="p-2 border-2 border-black text-center">
                    {moveData.move.accuracy ?? "--"}
                  </td>
                  <td className="p-2 border-2 border-black text-center">
                    {moveData.move.pp ?? "--"}
                  </td>
                  <td className="p-2 border-2 border-black">
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
