import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["query", "info"] });

export async function GET(request) {
  const pokemonList = await prisma.pokemon.findMany();

  pokemonList.map(async (pokemon) => {
    await prisma.pokemon.updateMany({
      where: { name: pokemon.name },
      data: {
        sprite_front_filepath: `/images/pokemon/sprites/front/${pokemon.name}.png`,
        sprite_back_filepath: `/images/pokemon/sprites/back/${pokemon.name}.png`,
        sprite_party_filepath: `/images/pokemon/sprites/party/${pokemon.name}.png`,
      },
    });
  });
}

GET()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
