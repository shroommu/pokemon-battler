import { create, all } from "mathjs";

export function slugifyPokemonName(pokemonName) {
  return pokemonName.toLowerCase().trim().replace(/\s+/g, "-");
}

export function capitalizePokemonSlug(slug) {
  const words = slug.split("-");
  const capitalizedWords = words.map(
    (word) => String(word).charAt(0).toUpperCase() + String(word).slice(1)
  );
  return capitalizedWords.join(" ");
}

export function buildPath(pathname, pokemonName) {
  const splitPathname = pathname.split("/");
  const formattedName = slugifyPokemonName(pokemonName);

  splitPathname.splice(2, 1, formattedName);
  const newPathname = splitPathname.join("/");
  return newPathname;
}

export function generateRandomPokedexNumberPerDay() {
  const date = new Date();
  const today = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");

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
