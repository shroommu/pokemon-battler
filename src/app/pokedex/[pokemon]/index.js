"use client";

import Image from "next/image";

import TypePill from "@/components/TypePill";
import MobilePokedexNav from "./components/PokedexNav";

const MOVE_TABLE_LABELS = ["Name", "Type", "Power", "Accuracy", "PP", "Effect"];

export default function Info({ pokemon, previousPokemon, nextPokemon }) {
  if (!pokemon) {
    return null;
  }

  const renderTypes = () => {
    return pokemon.secondary_type ? (
      <div className="flex flex-row">
        <TypePill typeName={pokemon.primary_type.name} size={"lg"} />
        <div className="px-2">/</div>
        <TypePill typeName={pokemon.secondary_type.name} size={"lg"} />
      </div>
    ) : (
      <TypePill typeName={pokemon.primary_type.name} size={"lg"} />
    );
  };

  return (
    <div
      className="flex flex-col pb-6 lg:pb-0"
      data-testid="pokedex-nav-container"
    >
      <MobilePokedexNav
        pokemon={pokemon}
        previousPokemon={previousPokemon}
        nextPokemon={nextPokemon}
      />
      <div
        className="flex flex-col xl:flex-row w-full xl:items-start"
        data-testid="pokedex-entry-container"
      >
        <section
          className="flex flex-col xl:flex-1 items-center"
          data-testid={`${pokemon.name
            .replace(" ", "-")
            .toLowerCase()}-pokemon-data`}
        >
          <Image
            src={pokemon.sprite_front_filepath.toLowerCase()}
            width={32}
            height={32}
            className="w-full h-auto max-w-64 mt-4 border-gray-600 border-4 rounded-md bg-white p-1 [image-rendering:pixelated]"
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
        </section>
        <section
          className="flex flex-col xl:flex-1 items-center"
          data-testid={`${pokemon.name
            .replace(" ", "-")
            .toLowerCase()}-pokemon-moves`}
        >
          <h2 className="text-2xl md:text-3xl mt-4 xl:mt-0">Moves</h2>
          <div
            className="overflow-x-scroll md:overflow-auto md:max-w-none"
            data-testid="move-table-scroller"
          >
            <table
              className="border-2 border-gray-400 mt-2"
              data-testid="move-table"
            >
              <thead className="bg-gray-300">
                <tr>
                  {MOVE_TABLE_LABELS.map((moveTableLabel) => (
                    <td
                      key={moveTableLabel}
                      className="p-2 border-2 border-gray-500"
                    >
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
                          <TypePill
                            typeName={moveData.move.type.name}
                            size={"lg"}
                          />
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
          </div>
        </section>
      </div>
    </div>
  );
}
