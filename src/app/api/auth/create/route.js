import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

import { hashPassword } from "../utils";

export async function POST(req, res) {
  const data = await req.json();

  try {
    await prisma.user.create({
      data: { ...data, password: hashPassword(data.password) },
    });

    return new Response(
      JSON.stringify({ message: "user created successfully", errors: {} })
    );
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return new Response(
          JSON.stringify({
            message: e.message,
            errors: {
              usernameExists: e.message.includes(
                "Unique constraint failed on the fields: (`username`)"
              ),
              emailExists: e.message.includes(
                "Unique constraint failed on the fields: (`email`)"
              ),
            },
          })
        );
      }
      return new Response(JSON.stringify({ message: e.message }));
    }
  }
}
