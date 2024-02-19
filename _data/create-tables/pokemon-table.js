import { sql } from "@vercel/postgres";
import pokemonData from "../data/FirstGenPokemon.csv";

export default async function handler(request, response) {
  let result;
  for (let i = 1; i < pokemonData.length; i++) {
    try {
      const currentPokemon = pokemonData[i];

      // result = await sql`
      //       INSERT INTO Pokemon(id, pokedex_number, name, primary_type, secondary_type, hp, attack, defense, special, speed)
      //       VALUES(gen_random_uuid(), ${currentPokemon[0]}, ${currentPokemon[1]}, (SELECT id FROM Type WHERE LOWER(name) = ${currentPokemon[3]}), (SELECT id FROM Type WHERE LOWER(name) = ${currentPokemon[4]}), ${currentPokemon[13]}, ${currentPokemon[14]}, ${currentPokemon[15]}, ${currentPokemon[16]}, ${currentPokemon[17]})`;
    } catch (error) {
      return response.status(500).json({ error });
    }
  }
  return response.status(200).json({ result });
}
