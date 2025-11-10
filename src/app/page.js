import { getUniquePokemonByNumber } from "@/services/getUniquePokemonByNumber";
import { generateRandomPokedexNumberPerDay } from "./utils";

import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const pokemon = await getUniquePokemonByNumber(
    generateRandomPokedexNumberPerDay()
  );

  return (
    <div data-testid="container" className="flex flex-row h-full p-4 w-full">
      <div
        className="flex flex-col p-6 w-full bg-gray-200 rounded-md border-2 border-red-800 h-full shadow-[0_0_8px_0_rgba(0,0,0,0.5)_inset]"
        data-testid="home-page-container"
      >
        <div className="flex flex-col lg:flex-row items-center">
          <section data-testid="professor-oak-container">
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
                  Over the years, I&apos;ve collected data about the many types
                  of Pokemon into this Pokedex. We still have so much to learn
                  about these extraordinary beings. However, I hope what I have
                  collected so far will be useful to you.
                </p>
                <p className="text-center">
                  Let&apos;s start by learning about today&apos;s Pokemon,{" "}
                  {pokemon.data.name}!
                </p>
              </div>
              <div
                className="absolute bottom-0 left-1/2 h-0 w-0 border-[32px] mb-[-32px] border-transparent border-b-0 border-r-0 border-t-white drop-shadow-lg"
                data-testid="speech-bubble-pointer"
              />
            </div>
            <div className="flex flex-row justify-center">
              <Link
                prefetch={true}
                href={`/pokedex/${pokemon.data.name
                  .replace(" ", "-")
                  .toLowerCase()}`}
                className="mt-auto"
                data-testid="pokemon-of-the-day-link"
              >
                <Image
                  src={pokemon.data.sprite_front_filepath.toLowerCase()}
                  width={32}
                  height={32}
                  className="w-64 h-auto [image-rendering:pixelated]"
                  priority
                  unoptimized
                  alt={`${pokemon.data.name} front sprite`}
                  data-testid="pokemon-image"
                />
              </Link>
              <Image
                src={"/images/professorOak.png"}
                width={32}
                height={32}
                className="w-64 h-auto [image-rendering:pixelated]"
                priority
                unoptimized
                alt={"Professor Oak Sprite"}
                data-testid="professor-oak-image"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 43200;
