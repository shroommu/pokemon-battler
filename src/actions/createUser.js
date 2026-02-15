"use server";

import { signIn } from "next-auth/next";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { SignUpSchema } from "@/schemas";

import { hashSync } from "bcryptjs";

export async function createUser(values) {
  const validatedFields = SignUpSchema.safeParse(values);
  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      message: "Invalid fields",
      errors: {
        usernameExists: false,
        emailExists: false,
        fieldErrors: {
          username: fieldErrors.username ?? [],
          email: fieldErrors.email ?? [],
          password: fieldErrors.password ?? [],
        },
      },
    };
  }

  try {
    const { username, email, password } = validatedFields.data;

    const user = await prisma.user.create({
      data: { username, email, password: hashSync(password, 10) },
    });

    if (user) {
      await signIn("credentials", {
        username,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      });
    }

    return { success: true, errors: {} };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        const targets = Array.isArray(e.meta?.target)
          ? e.meta.target
          : typeof e.meta?.target === "string"
            ? [e.meta.target]
            : [];

        return {
          message: e.message,
          errors: {
            usernameExists:
              targets.includes("username") ||
              e.message.includes("`username`"),
            emailExists:
              targets.includes("email") || e.message.includes("`email`"),
            fieldErrors: {
              username: [],
              email: [],
              password: [],
            },
          },
        };
      }
      return { message: e.message, errors: null };
    }

    return { message: "Unexpected error while creating user", errors: null };
  }
}
