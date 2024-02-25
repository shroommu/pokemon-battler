const prisma = require("@prisma/client");
const fs = require("fs");
const csv = require("csv");

async function update() {
  const client = new prisma.PrismaClient();

  fs.createReadStream("./_data/Gen1Moves.csv")
    .pipe(csv.parse({ from_line: 2 }))
    .on("data", async function (currentMove) {
      const moveType = await client.type.findFirst({
        select: { id: true },
        where: {
          name:
            currentMove[1].charAt(0).toUpperCase() + currentMove[1].slice(1),
        },
      });

      await Promise.all([moveType]).then(async () => {
        await client.move.update({
          where: { name: currentMove[0] },
          data: {
            type_id: moveType?.id,
          },
        });
        console.log(`updated record for ${currentMove[0]}`);
      });
    });
}

update();
