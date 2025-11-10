import { getAllPokemon } from "@/services/getAllPokemon";
import PokedexButton from "./components/pokedexButton";

export default async function PokedexHome() {
  const pokemons = await getAllPokemon();

  return (
    <div
      className="flex flex-col h-auto w-full items-center"
      data-testid="pokedex-home-page-container"
    >
      <h1 className="text-2xl mb-4">Pokedex</h1>
      <p className="mb-4 text-center">
        Welcome to the Pokedex! Select a Pokemon from below to view its stats
        and information from the original Red, Blue, and Yellow Pokemon games.
      </p>
      <div>
        <ul className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {pokemons?.data.map((pokemon) => (
            <PokedexButton
              key={pokemon.name}
              pokemon={pokemon}
              href={`/pokedex/${pokemon.name.replace(" ", "-").toLowerCase()}`}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
