import { create, all } from "mathjs";

export function capitalizePokemonSlug(slug) {
  const words = slug.split("-");
  const capitalizedWords = words.map(
    (word) => String(word).charAt(0).toUpperCase() + String(word).slice(1)
  );
  return capitalizedWords.join(" ");
}

export function buildPath(pathname, pokemonName) {
  const splitPathname = pathname.split("/");
  const formattedName = pokemonName.replace(" ", "-").toLowerCase();

  splitPathname.splice(2, 1, formattedName);
  const newPathname = splitPathname.join("/");
  return newPathname;
}

export function generateRandomPokedexNumberPerDay() {
  const date = new Date();
  const today =
    date.getFullYear().toString() +
    date.getMonth().toString() +
    date.getDay().toString();

  const config = { randomSeed: today };
  const math = create(all, config);

  const pokedexNumberLow = 1;
  const pokedexNumberHigh = 151;

  const getRandomSeededInt = (min, max) => {
    min = math.ceil(min);
    max = math.floor(max);
    return math.floor(math.random() * (max - min + 1)) + min;
  };

  return getRandomSeededInt(pokedexNumberLow, pokedexNumberHigh);
}
