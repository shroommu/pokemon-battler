"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { hashSync } from "bcryptjs";

export async function createUser(values) {
  try {
    const { username, password } = values;

    const user = await prisma.user.create({
      data: { ...values, password: hashSync(values.password, 10) },
    });

    console.log(user);
    console.log(username);

    if (user) {
      await signIn("credentials", {
        username,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      });
    }
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
