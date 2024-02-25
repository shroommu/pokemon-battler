const prisma = require("@prisma/client");
const fs = require("fs");
const csv = require("csv");

async function populate() {
  const client = new prisma.PrismaClient();

  const pokemons = await client.pokemon.findMany({
    select: { id: true, name: true },
  });
  const moves = await client.move.findMany({
    select: { id: true, name: true },
  });

  Promise.all([pokemons, moves]).then(async function () {
    fs.createReadStream("./_data/fullMoveset_without_dupes.csv")
      .pipe(csv.parse({ from_line: 2 }))
      .on("data", async function (currentPokemonMove) {
        await client.pokemon_move.create({
          data: {
            pokemon_id: pokemons.filter(
              (pokemon) => pokemon.name === currentPokemonMove[0]
            )[0]?.id,
            move_id: moves.filter(
              (move) => move.name === currentPokemonMove[1]
            )[0]?.id,
            name: `${currentPokemonMove[0]} - ${currentPokemonMove[1]}`,
          },
        });
        console.log(
          `created record for ${currentPokemonMove[0]} - ${currentPokemonMove[1]}`
        );
      });
  });
}

populate();
