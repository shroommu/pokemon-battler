const prisma = require("@prisma/client");
const fs = require("fs");
const csv = require("csv");

async function update() {
  const client = new prisma.PrismaClient();

  fs.createReadStream("./_data/Gen1PokedexEntries.csv")
    .pipe(csv.parse({ from_line: 2 }))
    .on("data", async function (currentPokemon) {
      await client.pokemon.update({
        where: { name: currentPokemon[0] },
        data: {
          pokedex_entry: currentPokemon[1],
        },
      });
      console.log(`updated record for ${currentPokemon[0]}`);
    });
}

update();
