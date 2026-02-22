import { getAllPokemon } from "@/services/getAllPokemon";
import { getUniquePokemonByName } from "@/services/getUniquePokemonByName";
import { slugifyPokemonName } from "@/app/utils";

function toStatValue(value) {
  return typeof value === "number" ? value : 0;
}

export function normalizeComparePokemon(pokemon) {
  if (!pokemon) {
    return null;
  }

  const hp = toStatValue(pokemon.hp);
  const attack = toStatValue(pokemon.attack);
  const defense = toStatValue(pokemon.defense);
  const special = toStatValue(pokemon.special);
  const speed = toStatValue(pokemon.speed);
  const total = hp + attack + defense + special + speed;

  return {
    id: pokemon.id,
    name: pokemon.name,
    pokedexNumber: pokemon.pokedex_number ?? null,
    sprite: pokemon.sprite_front_filepath?.toLowerCase() ?? null,
    types: [pokemon.primary_type?.name, pokemon.secondary_type?.name].filter(Boolean),
    stats: {
      hp,
      attack,
      defense,
      special,
      speed,
      total,
    },
  };
}

export async function getComparePokemonOptions() {
  const { data } = await getAllPokemon();

  return (data ?? []).map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    slug: slugifyPokemonName(pokemon.name),
    pokedexNumber: pokemon.pokedex_number ?? null,
  }));
}

export async function getComparePokemonByName(pokemonName) {
  if (!pokemonName) {
    return null;
  }

  const { data } = await getUniquePokemonByName(pokemonName);
  return normalizeComparePokemon(data);
}

export function getPokemonNameFromSlug(pokemonOptions, slug) {
  if (!slug) {
    return null;
  }

  const match = (pokemonOptions ?? []).find((pokemon) => pokemon.slug === slug);
  return match?.name ?? null;
}
