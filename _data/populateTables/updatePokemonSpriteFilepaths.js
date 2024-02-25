const prisma =  require("@prisma/client");

async function populate() {
  const client = new prisma.PrismaClient();
  const pokemonList = await client.pokemon.findMany();

  pokemonList.map(async (pokemon) => {
    await client.pokemon.updateMany({
      where: { name: pokemon.name },
      data: {
        sprite_front_filepath: `/images/pokemon/sprites/front/${pokemon.name.replace(' ', '-')}.png`,
        sprite_back_filepath: `/images/pokemon/sprites/back/${pokemon.name.replace(' ', '-')}.png`,
        sprite_party_filepath: `/images/pokemon/sprites/party/${pokemon.name.replace(' ', '-')}.png`,
      },
    });
  });
}

populate();
