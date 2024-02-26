import Image from "next/image";

export default function PokemonList({ pokemons, onClick }) {
  return (
      <ul className="m-4 grow basis-0 overflow-y-scroll">
        {pokemons?.map((pokemon) => {
          return (
            <li
              key={pokemon.name}
              className="group py-2 px-4 mb-1 bg-gray-400 rounded-md hover:bg-gray-300 active:bg-gray-500 w-full"
            >
              <button
                onClick={() => onClick(pokemon.pokedex_number)}
                className="flex flex-row items-center w-full group-hover:[&>img]:animate-party_bounce"
              >
                <div className="mr-2">{`#${String(pokemon.pokedex_number).padStart(3, "0")}`}</div>
                <Image
                  src={pokemon.sprite_party_filepath.toLowerCase()}
                  width={0}
                  height={0}
                  style={{ width: "100%", height: "100%" }}
                  alt={`${pokemon.name} party sprite`}
                  className="max-w-[75px]"
                  unoptimized
                  priority
                />
                <div className="ml-auto">{pokemon.name}</div>
              </button>
            </li>
          );
        })}
      </ul>
  );
}
