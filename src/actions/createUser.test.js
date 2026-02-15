import { createUser } from "./createUser";
import prisma from "@/lib/prisma";
import { signIn } from "next-auth/next";
import { Prisma } from "@prisma/client";

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    user: {
      create: jest.fn(),
    },
  },
}));

jest.mock("next-auth/next", () => ({
  signIn: jest.fn(),
}));

jest.mock("@prisma/client", () => ({
  Prisma: {
    PrismaClientKnownRequestError: class PrismaClientKnownRequestError extends Error {
      constructor(message, code, meta) {
        super(message);
        this.code = code;
        this.meta = meta;
      }
    },
  },
}));

describe("createUser action", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns field validation errors and does not call prisma/signIn for invalid input", async () => {
    const result = await createUser({
      username: "ab",
      email: "not-an-email",
      password: "short",
    });

    expect(result.message).toBe("Invalid fields");
    expect(result.errors.usernameExists).toBe(false);
    expect(result.errors.emailExists).toBe(false);
    expect(result.errors.fieldErrors.username.length).toBeGreaterThan(0);
    expect(result.errors.fieldErrors.email.length).toBeGreaterThan(0);
    expect(result.errors.fieldErrors.password.length).toBeGreaterThan(0);
    expect(prisma.user.create).not.toHaveBeenCalled();
    expect(signIn).not.toHaveBeenCalled();
  });

  it("creates a user, signs in, and returns success for valid input", async () => {
    prisma.user.create.mockResolvedValueOnce({ id: "user-id" });
    signIn.mockResolvedValueOnce(undefined);

    const result = await createUser({
      username: "misty",
      email: "misty@test.com",
      password: "password123",
    });

    expect(prisma.user.create).toHaveBeenCalledTimes(1);
    expect(prisma.user.create.mock.calls[0][0].data.username).toBe("misty");
    expect(prisma.user.create.mock.calls[0][0].data.email).toBe("misty@test.com");
    expect(prisma.user.create.mock.calls[0][0].data.password).not.toBe(
      "password123"
    );
    expect(signIn).toHaveBeenCalledWith("credentials", {
      username: "misty",
      password: "password123",
      redirectTo: "/settings",
    });
    expect(result).toEqual({ success: true, errors: {} });
  });

  it("maps P2002 duplicate error targets to username/email exists flags", async () => {
    prisma.user.create.mockRejectedValueOnce(
      new Prisma.PrismaClientKnownRequestError("duplicate", "P2002", {
        target: ["username", "email"],
      })
    );

    const result = await createUser({
      username: "misty",
      email: "misty@test.com",
      password: "password123",
    });

    expect(result.errors).toEqual({
      usernameExists: true,
      emailExists: true,
      fieldErrors: {
        username: [],
        email: [],
        password: [],
      },
    });
  });

  it("returns prisma known non-unique errors with null error details", async () => {
    prisma.user.create.mockRejectedValueOnce(
      new Prisma.PrismaClientKnownRequestError("other prisma error", "P2000")
    );

    const result = await createUser({
      username: "misty",
      email: "misty@test.com",
      password: "password123",
    });

    expect(result).toEqual({
      message: "other prisma error",
      errors: null,
    });
  });

  it("returns a generic message for unexpected errors", async () => {
    prisma.user.create.mockRejectedValueOnce(new Error("boom"));

    const result = await createUser({
      username: "misty",
      email: "misty@test.com",
      password: "password123",
    });

    expect(result).toEqual({
      message: "Unexpected error while creating user",
      errors: null,
    });
  });
});
