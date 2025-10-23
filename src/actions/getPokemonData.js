"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { hashSync } from "bcryptjs";

export async function getPokemonData() {
  return { message: "Hello!" };
}
