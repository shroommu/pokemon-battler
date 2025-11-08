import { getAllPokemon } from "@/services/getAllPokemon";
import PokedexButton from "./components/pokedexButton";

export default async function PokedexHome() {
  const pokemons = await getAllPokemon();

  return (
    <div data-testid="container" className="flex flex-row h-full p-4 w-full">
      <div
        className="flex flex-col h-auto w-full"
        data-testid="home-page-container"
      >
        <section
          className="flex flex-col p-6 w-full bg-gray-200 rounded-md items-center h-full"
          data-testid="home-page"
        >
          <h1 className="text-2xl mb-4">Pokedex</h1>
          <p className="mb-4 text-center">
            Welcome to the Pokedex! Select a Pokemon from below to view its
            stats and information from the original Red, Blue, and Yellow
            Pokemon games.
          </p>
          <div>
            <ul className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {pokemons?.data.map((pokemon) => (
                <PokedexButton
                  key={pokemon.name}
                  pokemon={pokemon}
                  href={`/pokedex/${pokemon.name
                    .replace(" ", "-")
                    .toLowerCase()}`}
                />
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
