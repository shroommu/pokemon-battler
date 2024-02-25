const prisma = require("@prisma/client");
const fs = require("fs");
const csv = require("csv");

async function populate() {
  const client = new prisma.PrismaClient();

  fs.createReadStream("./_data/Gen1Moves.csv")
    .pipe(csv.parse({ from_line: 2 }))
    .on("data", async function (currentMove) {
      const moveType = client.type.findFirst({
        select: { id: true },
        where: {
          name:
            currentMove[1].charAt(0).toUpperCase() + currentMove[1].slice(1),
        },
      });

      await Promise.all([moveType]).then(async () => {
        await client.move.create({
          data: {
            name: currentMove[0],
            type_id: moveType?.id,
            power: parseInt(currentMove[3]),
            accuracy: parseInt(currentMove[4]),
            pp: parseInt(currentMove[5]),
            effect: currentMove[6],
          },
        });
        console.log(`created record for ${currentMove[0]}`);
      });
    });
}

populate();
