import { sql } from "@vercel/postgres";

const POKEMON_TYPES = [
  "Bug",
  "Dragon",
  "Electric",
  "Fighting",
  "Fire",
  "Flying",
  "Ghost",
  "Grass",
  "Ground",
  "Ice",
  "Normal",
  "Poison",
  "Psychic",
  "Rock",
  "Water",
];

export default async function handler(request, response) {
  try {
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}
