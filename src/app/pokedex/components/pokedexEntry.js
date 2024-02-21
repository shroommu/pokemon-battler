import Image from "next/image";

const STAT_NAMES = ["HP", "Attack", "Defense", "Special", "Speed"];

export default function PokedexEntry({ pokemon }) {

  if (!pokemon) {
    return (
      <section className="flex flex-col w-full m-4 ml-0 p-6 bg-gray-200 rounded-md items-center" />
    );
  }

  const renderTypes = () => {
    return pokemon.type_pokemon_secondary_typeTotype
      ? `${pokemon.type_pokemon_primary_typeTotype.name} / ${pokemon.type_pokemon_secondary_typeTotype.name}`
      : pokemon.type_pokemon_primary_typeTotype.name;
  };

  const statList = [
    pokemon.hp,
    pokemon.attack,
    pokemon.defense,
    pokemon.special,
    pokemon.speed,
  ];

  return (
    <section className="flex flex-col w-full m-4 ml-0 p-6 bg-gray-200 rounded-md items-center">
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
      <table className="border-2 border-black mt-2" testid="stat-table">
        <thead className="bg-gray-300">
          {STAT_NAMES.map((statName) => (
            <td key={statName} className="p-2 border-2 border-black">
              {statName}
            </td>
          ))}
        </thead>
        <tbody>
          <tr className="bg-white">
            {statList.map((stat, index) => (
              <td key={`${pokemon.name}-${STAT_NAMES[index]}`} className="p-2 border-2 border-black text-center">
                {stat}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </section>
  );
}
