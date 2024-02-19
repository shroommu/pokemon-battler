export default function PokedexEntry({ currentPokemon }) {
  if (!currentPokemon) {
    return null;
  }
  return <div>{currentPokemon.name}</div>;
}
