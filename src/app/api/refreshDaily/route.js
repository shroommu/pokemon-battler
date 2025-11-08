export function GET() {
  const pokedexNumberLow = 1;
  const pokedexNumberHigh = 151;

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return new Response(getRandomInt(pokedexNumberLow, pokedexNumberHigh));
}
