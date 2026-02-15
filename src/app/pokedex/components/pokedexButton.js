import Image from "next/image";
import Link from "next/link";
import { tv } from "tailwind-variants";
import { slugifyPokemonName } from "@/app/utils";

const pokemonListButtonStyle = tv({
  base: "group py-2 px-4 mb-1 bg-gray-400 rounded-md hover:bg-gray-300 active:bg-gray-500 w-full border-2 border-gray-400",
  variants: {
    selected: { true: "bg-gray-200 hover:bg-gray-100 active:bg-gray-300" },
  },
});

export default function PokedexButton({ pokemon, href, selected }) {
  return (
    <Link
      prefetch={true}
      href={href}
      key={pokemon.name}
      data-testid={`${slugifyPokemonName(pokemon.name)}-link`}
      className="group"
    >
      <li
        className={pokemonListButtonStyle({
          selected: selected,
        })}
      >
        <button className="flex flex-row items-center w-full">
          <div className="mr-2">{`#${String(pokemon.pokedex_number).padStart(
            3,
            "0"
          )}`}</div>
          <div className="relative w-[50px] h-[50px] md:w-[75px] md:h-[75px] aspect-square group-hover:animate-party_bounce">
            <Image
              src={pokemon.sprite_party_filepath.toLowerCase()}
              fill
              alt={`${pokemon.name} party sprite`}
              unoptimized
              priority
            />
          </div>
          <div className="ml-auto">{pokemon.name}</div>
        </button>
      </li>
    </Link>
  );
}
