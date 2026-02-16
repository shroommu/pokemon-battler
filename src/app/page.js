import { getUniquePokemonByNumber } from "@/services/getUniquePokemonByNumber";
import { generateRandomPokedexNumberPerDay, slugifyPokemonName } from "./utils";

import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const pokemon = await getUniquePokemonByNumber(
    generateRandomPokedexNumberPerDay(),
  );
  const pokemonData = pokemon?.data;
  const pokemonName = pokemonData?.name ?? "Bulbasaur";
  const pokemonSlug = slugifyPokemonName(pokemonName);
  const pokemonSpritePath =
    pokemonData?.sprite_front_filepath?.toLowerCase() ??
    "/images/pokemon/sprites/front/bulbasaur.png";

  return (
    <div className="flex flex-col w-full items-center">
      <section
        data-testid="professor-oak-container"
        className="w-full xl:w-3/4"
      >
        <div
          className="relative"
          data-testid="professor-oak-speech-bubble-container"
        >
          <div
            data-testid="professor-oak-speech-bubble"
            className="bg-white rounded-xl p-4 drop-shadow-lg"
          >
            <h1 className="text-2xl mb-4 text-center">
              Welcome to the Wonderful World of Pokemon!
            </h1>
            <p className="mb-4 text-center">
              Pokemon are mysterious creatures who love to work and battle
              alongside humans.
            </p>
            <p className="mb-4 text-center">
              Over the years, I&apos;ve collected data about the many types of
              Pokemon into this Pokedex. We still have so much to learn about
              these extraordinary beings. However, I hope what I have collected
              so far will be useful to you.
            </p>
            <p className="text-center">
              Let&apos;s start by learning about today&apos;s Pokemon,{" "}
              <Link
                prefetch={true}
                href={`/pokedex/${pokemonSlug}`}
                className="underline"
                data-testid="pokemon-of-the-day-link"
              >
                {pokemonName}!
              </Link>
            </p>
          </div>
          <div
            className="absolute bottom-0 left-1/2 h-0 w-0 border-[32px] mb-[-32px] border-transparent border-b-0 border-r-0 border-t-white drop-shadow-lg"
            data-testid="speech-bubble-pointer"
          />
        </div>
        <div className="grid grid-cols-2 justify-center">
          <Link
            prefetch={true}
            href={`/pokedex/${pokemonSlug}`}
            className="relative mt-auto ml-auto w-full max-w-64 max-h-64 aspect-square"
            data-testid="pokemon-of-the-day-image-link"
          >
            <Image
              src={pokemonSpritePath}
              fill
              className="[image-rendering:pixelated]"
              priority
              alt={`${pokemonName} front sprite`}
              data-testid="pokemon-image"
            />
          </Link>
          <div className="relative max-w-64 aspect-[69/130]">
            <Image
              src={"/images/professorOak.png"}
              fill
              className="[image-rendering:pixelated]"
              priority
              alt={"Professor Oak Sprite"}
              data-testid="professor-oak-image"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export const revalidate = 21600;
