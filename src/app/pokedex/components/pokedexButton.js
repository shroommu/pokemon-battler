import Image from "next/image";
import Link from "next/link";
import { tv } from "tailwind-variants";

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
      data-testid={`${pokemon.name.replace(" ", "-").toLowerCase()}-link`}
    >
      <li
        className={pokemonListButtonStyle({
          selected: selected,
        })}
      >
        <button className="flex flex-row items-center w-full [&>img]:group-hover:animate-party_bounce">
          <div className="mr-2">{`#${String(pokemon.pokedex_number).padStart(
            3,
            "0"
          )}`}</div>
          <Image
            src={pokemon.sprite_party_filepath.toLowerCase()}
            width={0}
            height={0}
            style={{ width: "100%", height: "100%" }}
            alt={`${pokemon.name} party sprite`}
            className="max-w-[50px] md:max-w-[75px]"
            unoptimized
            priority
          />
          <div className="ml-auto">{pokemon.name}</div>
        </button>
      </li>
    </Link>
  );
}
