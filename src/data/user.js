import prisma from "@/lib/prisma";

export const getUserByUsername = async (username) => {
  try {
    const user = await prisma.user.findUnique({ where: { username } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};
