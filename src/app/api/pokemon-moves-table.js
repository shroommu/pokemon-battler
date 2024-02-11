import { sql } from "@vercel/postgres";
import pokemonMovesData from "../data/fullMoveset_without_dupes.csv";

export default async function handler(request, response) {
  let result;
  //   result = await sql`CREATE TABLE Pokemon_Moves(
  //         Pokemon_id UUID REFERENCES Pokemon(id) ON UPDATE CASCADE ON DELETE CASCADE,
  //         Move_id UUID REFERENCES Moves(id) ON UPDATE CASCADE ON DELETE CASCADE,
  //         CONSTRAINT bill_product_pkey PRIMARY KEY (Pokemon_id, Move_id)
  //     )`;

  //   for (let i = 1; i < pokemonMovesData.length; i++) {
  //     try {
  //       const currentPokemonMovesLine = pokemonMovesData[i];
  //       console.log(
  //         `${currentPokemonMovesLine[0]} - ${currentPokemonMovesLine[1]}`
  //       );

  //       result = await sql`
  //               INSERT INTO Pokemon_Moves(pokemon_id, move_id)
  //               VALUES((SELECT id FROM Pokemon WHERE name = ${currentPokemonMovesLine[0]}), (SELECT id FROM Moves WHERE name = ${currentPokemonMovesLine[1]}))`;
  //     } catch (error) {
  //       return response.status(500).json({ error });
  //     }
  //   }
  return response.status(200).json({ result });
}
