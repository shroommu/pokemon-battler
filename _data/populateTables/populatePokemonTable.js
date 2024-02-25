const prisma = require("@prisma/client");
const fs = require("fs");
const csv = require("csv");

async function populate() {
  const client = new prisma.PrismaClient();

  fs.createReadStream("./_data/FirstGenPokemon.csv")
    .pipe(csv.parse({ from_line: 2 }))
    .on("data", async function (currentPokemon) {
      const primaryType = await client.type.findFirst({
        select: { id: true },
        where: {
          name:
            currentPokemon[3].charAt(0).toUpperCase() +
            currentPokemon[3].slice(1),
        },
      });
      const secondaryType = await client.type.findFirst({
        select: { id: true },
        where: {
          name:
            currentPokemon[4].charAt(0).toUpperCase() +
            currentPokemon[4].slice(1),
        },
      });

      await Promise.all([primaryType, secondaryType]).then(async () => {
        await client.pokemon.create({
          data: {
            pokedex_number: parseInt(currentPokemon[0]),
            name: currentPokemon[1],
            primary_type_id: primaryType?.id,
            secondary_type_id: secondaryType?.id,
            hp: parseInt(currentPokemon[13]),
            attack: parseInt(currentPokemon[14]),
            defense: parseInt(currentPokemon[15]),
            special: parseInt(currentPokemon[16]),
            speed: parseInt(currentPokemon[17]),
          },
        });
        console.log(`created record for ${currentPokemon[1]}`);
      });
    });
}

populate();
