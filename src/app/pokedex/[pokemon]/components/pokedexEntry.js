"use client";
import Image from "next/image";

import TypePill from "../../../../components/TypePill";

const STAT_NAMES = ["HP", "Attack", "Defense", "Special", "Speed"];
const MOVE_TABLE_LABELS = ["Name", "Type", "Power", "Accuracy", "PP", "Effect"];

export default function PokedexEntry({ pokemon }) {
  if (!pokemon) {
    return null;
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
    <section
      className="flex flex-col xl:flex-row w-full p-6 bg-gray-200 rounded-md items-center xl:items-start"
      data-testid={`${pokemon.name
        .replace(" ", "-")
        .toLowerCase()}-pokedex-entry`}
    >
      <section
        className="flex flex-col xl:flex-1 items-center"
        data-testid={`${pokemon.name
          .replace(" ", "-")
          .toLowerCase()}-pokemon-data`}
      >
        <h1
          className="text-2xl md:text-4xl"
          data-testid="pokemon-name"
        >{`#${String(pokemon.pokedex_number).padStart(3, "0")} ${
          pokemon.name
        }`}</h1>
        <Image
          src={pokemon.sprite_front_filepath.toLowerCase()}
          width={0}
          height={0}
          style={{ width: "100%", height: "100%" }}
          className="max-w-32 max-h-32 md:max-w-64 md:max-h-64 mt-4 border-gray-600 border-4 rounded-md bg-white p-1 [image-rendering:pixelated]"
          priority
          unoptimized
          alt={`${pokemon.name} front sprite`}
          data-testid="pokemon-image"
        />
        <div className="mt-2" data-testid="pokemon-type">
          {renderTypes()}
        </div>
        <p className="px-8 mt-2 text-center" data-testid="pokedex-blurb">
          {pokemon.pokedex_entry}
        </p>
        <h2 className="text-2xl mt-2">Stats</h2>
        <table className="border-2 border-black mt-2" data-testid="stats-table">
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
      </section>
      <section
        className="flex flex-col xl:flex-1 items-center"
        data-testid={`${pokemon.name
          .replace(" ", "-")
          .toLowerCase()}-pokemon-moves`}
      >
        <h2 className="text-2xl mt-2">Moves</h2>
        <div
          className="overflow-x-scroll md:overflow-auto max-w-xs md:max-w-none"
          data-testid="move-table-scroller"
        >
          <table
            className="border-2 border-black mt-2"
            data-testid="move-table"
          >
            <thead className="bg-gray-300">
              <tr>
                {MOVE_TABLE_LABELS.map((moveTableLabel) => (
                  <td
                    key={moveTableLabel}
                    className="p-2 border-2 border-black"
                  >
                    {moveTableLabel}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {pokemon.pokemon_moves
                .sort((a, b) =>
                  a.move.name > b.move.name
                    ? 1
                    : b.move.name > a.move.name
                    ? -1
                    : 0
                )
                .map((moveData, index) => {
                  return (
                    <tr
                      key={`move-row-${index + 1}`}
                      data-testid={`move-row-${index + 1}`}
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
        </div>
      </section>
    </section>
  );
}
