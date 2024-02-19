import PokedexContext from "./components/pokedexContext";

export default async function Pokedex() {
  const { result: pokemons } = await fetch(
    process.env.URL + "/api/pokedex/getPokemonList/",
    { method: "GET" }
  ).then((res) => {
    try {
      return res.json();
    } catch (e) {
      console.error(e);
    }
  });

  return (
    <div testid="container" className="flex grow flex-row h-auto w-auto">
      <PokedexContext pokemons={pokemons} />
    </div>
  );
}
