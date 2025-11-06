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
