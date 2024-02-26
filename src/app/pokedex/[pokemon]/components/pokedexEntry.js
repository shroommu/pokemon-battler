import Image from "next/image";

import TypePill from "@/components/TypePill";

const STAT_NAMES = ["HP", "Attack", "Defense", "Special", "Speed"];
const MOVE_TABLE_LABELS = ["Name", "Type", "Power", "Accuracy", "PP", "Effect"];

export default function PokedexEntry({ pokemon }) {
  if (!pokemon) {
    return (
      <section className="flex flex-col w-full m-4 ml-0 p-6 bg-gray-200 rounded-md items-center" />
    );
  }

  const renderTypes = () => {
    return pokemon.secondary_type ? (
      <div className="flex flex-row">
        <TypePill typeName={pokemon.primary_type.name}>
          {pokemon.primary_type.name}
        </TypePill>
        <div className="px-2">/</div>
        <TypePill typeName={pokemon.secondary_type.name}>
          {pokemon.secondary_type.name}
        </TypePill>
      </div>
    ) : (
      <TypePill typeName={pokemon.primary_type.name}>
        {pokemon.primary_type.name}
      </TypePill>
    );
  };

  const statList = [
    pokemon.hp,
    pokemon.attack,
    pokemon.defense,
    pokemon.special,
    pokemon.speed,
  ];

  return (
    <section className="flex flex-col p-6 bg-gray-200 rounded-md items-center">
      <h1 className="text-4xl">{`#${String(pokemon.pokedex_number).padStart(
        3,
        "0"
      )} ${pokemon.name}`}</h1>
      <Image
        src={pokemon.sprite_front_filepath.toLowerCase()}
        width={0}
        height={0}
        style={{ width: "100%", height: "100%" }}
        className="max-w-64 max-h-64 mt-4 border-gray-600 border-4 rounded-md bg-white p-1 [image-rendering:pixelated]"
        priority
        unoptimized
        alt={`${pokemon.name} front sprite`}
      />
      <div className="mt-2">{renderTypes()}</div>
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
                    <TypePill typeName={moveData.move.type.name}>
                      {moveData.move.type.name}
                    </TypePill>
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
