import { sql } from "@vercel/postgres";
import moveData from "../data/Gen1Moves.csv";

export default async function handler(request, response) {
  let result;

  //   result = await sql`CREATE TABLE Moves(
  //     id UUID,
  //     name varchar(255),
  //     type UUID,
  //     power integer,
  //     accuracy integer,
  //     pp integer,
  //     effect varchar(511),
  //     PRIMARY KEY(id),
  //     CONSTRAINT fk_type
  //         FOREIGN KEY(id)
  //             REFERENCES Type(id))`;

  //   result =
  //     await sql`ALTER TABLE Moves ADD CONSTRAINT fk_type Foreign key(type) references type(id)`;

  //   for (let i = 3; i < moveData.length; i++) {
  //     try {
  //       const currentMove = moveData[i];

  //       await sql`
  //                 INSERT INTO Moves(id, name, type, power, accuracy, pp, effect)
  //                 VALUES(gen_random_uuid(), ${
  //                   currentMove[0]
  //                 }, (SELECT id FROM Type WHERE name = ${currentMove[1]}), ${
  //         currentMove[3] === "None" ? null : currentMove[3]
  //       }, ${currentMove[4] === "None" ? null : currentMove[4]}, ${
  //         currentMove[5] === "None" ? null : currentMove[5]
  //       }, ${currentMove[6]})`;
  //     } catch (error) {
  //       return response.status(500).json({ error });
  //     }
  //   }
  return response.status(200).json({ result });
}
