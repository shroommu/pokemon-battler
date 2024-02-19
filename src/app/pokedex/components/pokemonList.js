export default function PokemonList({ pokemons, onClick }) {
  return (
    <ul>
      {pokemons?.map((pokemon) => {
        return (
          <li key={pokemon.name}>
            <button onClick={() => onClick(pokemon.pokedex_number)}>
              {pokemon.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
