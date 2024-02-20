import Image from "next/image";

export default function PokemonList({ pokemons, onClick }) {
  return (
    <ul className="p-4 bg-gray-600">
      {pokemons?.map((pokemon) => {
        return (
          <li key={pokemon.name} className="py-2 px-4 mb-1 bg-gray-400 rounded-md hover:bg-gray-300 active:bg-gray-500">
            <button
              onClick={() => onClick(pokemon.pokedex_number)}
              className="flex flex-row items-center w-full"
            >
              <div className="mr-2">{pokemon.pokedex_number}</div>
              <Image
                src={pokemon.sprite_party_filepath}
                width={0}
                height={0}
                style={{ width: "100%", height: "100%" }}
                alt={`${pokemon.name} party sprite`}
                className="max-w-[75px]"
                unoptimized
              />
              <div className="ml-auto">{pokemon.name}</div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
