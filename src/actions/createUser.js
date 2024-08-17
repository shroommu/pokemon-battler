"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

import { hashSync } from "bcryptjs";

export async function createUser(values) {
  try {
    await prisma.user.create({
      data: { ...values, password: hashSync(values.password, 10) },
    });

    return { message: "user created successfully", errors: {} };
  } catch (e) {
    console.log(e);
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: e.message,
          errors: {
            usernameExists: e.message.includes(
              "Unique constraint failed on the fields: (`username`)"
            ),
            emailExists: e.message.includes(
              "Unique constraint failed on the fields: (`email`)"
            ),
          },
        };
      }
      return { message: e.message, errors: null };
    }
  }
}
