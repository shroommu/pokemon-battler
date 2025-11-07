import { getAllPokemon } from "@/services/getAllPokemon";
import PokedexButton from "./components/pokedexButton";

export default async function PokedexHome() {
  const pokemons = await getAllPokemon();

  return (
    <div data-testid="container" className="flex flex-row h-full p-4 w-full">
      <div
        className="flex flex-col h-auto md:w-full"
        data-testid="home-page-container"
      >
        <section
          className="flex flex-col p-6 w-full bg-gray-200 rounded-md items-center h-full"
          data-testid="home-page"
        >
          <h1 className="text-xl mb-4">Pokedex</h1>
          <div>
            <ul className="grid gap-1 grid-cols-4">
              {pokemons?.data.map((pokemon) => (
                <PokedexButton
                  key={pokemon.name}
                  pokemon={pokemon}
                  href={`/pokedex/${pokemon.name}`}
                />
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
