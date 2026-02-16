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

function formatDateToKey(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function hashString(value) {
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }

  return hash;
}

export function generateRandomPokedexNumberPerDay(date = new Date()) {
  const today = formatDateToKey(date);
  const hash = hashString(today);
  const pokedexCount = 151;
  return (hash % pokedexCount) + 1;
}
