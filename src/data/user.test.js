jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

import prisma from "@/lib/prisma";
import { getUserById, getUserByUsername } from "./user";

describe("user data access", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("gets user by username and returns null on failure", async () => {
    prisma.user.findUnique.mockResolvedValueOnce({ id: "1" });
    await expect(getUserByUsername("misty")).resolves.toEqual({ id: "1" });
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { username: "misty" },
    });

    prisma.user.findUnique.mockRejectedValueOnce(new Error("db"));
    await expect(getUserByUsername("misty")).resolves.toBeNull();
  });

  it("gets user by id and returns null on failure", async () => {
    prisma.user.findUnique.mockResolvedValueOnce({ id: "2" });
    await expect(getUserById("2")).resolves.toEqual({ id: "2" });
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: "2" },
    });

    prisma.user.findUnique.mockRejectedValueOnce(new Error("db"));
    await expect(getUserById("2")).resolves.toBeNull();
  });
});
