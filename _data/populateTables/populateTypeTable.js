const prisma = require("@prisma/client");

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

async function populate() {
  const client = new prisma.PrismaClient();
  POKEMON_TYPES.map(async (type) => {
    const result = await client.type.create({ data: { name: type } });
  });
}

populate();
