import Image from "next/image";

export default function PokemonList({ pokemons, onClick }) {
  return (
    <ul className="p-2 bg-gray-400">
      {pokemons?.map((pokemon) => {
        return (
          <li key={pokemon.name}>
            <button
              onClick={() => onClick(pokemon.pokedex_number)}
              className="p-2"
            >
              <Image
                src={pokemon.sprite_party_filepath}
                width={0}
                height={0}
                style={{ width: "100%", height: "100%" }}
                alt={`${pokemon.name} party sprite`}
                className="max-w-[75px]"
                unoptimized
              />
              {pokemon.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
