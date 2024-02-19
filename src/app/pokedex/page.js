import PokedexContext from "./components/pokedexContext";

export default async function Pokedex() {
  const { result: pokemons } = await fetch(
    process.env.URL + "/api/pokedex/getPokemonList/",
    { method: "GET" }
  ).then((res) => {
    console.log(res);
    try {
      const parsedResult = JSON.parse(res);

      if (parsedResult && typeof parsedResult === "object") {
        return parsedResult;
      }
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <div testid="container" className="flex grow flex-row h-auto w-auto">
      <PokedexContext pokemons={pokemons} />
    </div>
  );
}
