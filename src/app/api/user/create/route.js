import { SHA256 as sha256 } from "crypto-js";
import prisma from "../../../../../lib/prisma";
import { Prisma } from "@prisma/client";

export const hashPassword = (string) => {
  return sha256(string).toString();
};

export async function POST(req, res) {
  const data = await req.json();

  try {
    const user = await prisma.user.create({
      data: { ...data, password: hashPassword(data.password) },
    });

    return new Response(JSON.stringify({ user }));
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return new Response(JSON.stringify({ message: e.message }));
      }
      return new Response(JSON.stringify({ message: e.message }));
    }
  }
}
