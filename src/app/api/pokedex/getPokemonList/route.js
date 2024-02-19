import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient({ log: ["query", "info"] });

export async function GET(request) {
  const result = await prisma.pokemon.findMany();

  return NextResponse.json({ result }, { status: 200 });
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
