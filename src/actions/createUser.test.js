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

  it("fills missing validation field arrays with empty lists", async () => {
    const result = await createUser({
      username: "ab",
      email: "misty@test.com",
      password: "password123",
    });

    expect(result.message).toBe("Invalid fields");
    expect(result.errors.fieldErrors.username.length).toBeGreaterThan(0);
    expect(result.errors.fieldErrors.email).toEqual([]);
    expect(result.errors.fieldErrors.password).toEqual([]);
  });

  it("fills username errors with empty list when only email is invalid", async () => {
    const result = await createUser({
      username: "misty",
      email: "not-an-email",
      password: "password123",
    });

    expect(result.message).toBe("Invalid fields");
    expect(result.errors.fieldErrors.username).toEqual([]);
    expect(result.errors.fieldErrors.email.length).toBeGreaterThan(0);
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

  it("returns success without signing in when create returns a falsey user", async () => {
    prisma.user.create.mockResolvedValueOnce(null);

    const result = await createUser({
      username: "misty",
      email: "misty@test.com",
      password: "password123",
    });

    expect(signIn).not.toHaveBeenCalled();
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

  it("maps string meta.target for unique errors", async () => {
    prisma.user.create.mockRejectedValueOnce(
      new Prisma.PrismaClientKnownRequestError("duplicate", "P2002", {
        target: "username",
      })
    );

    const result = await createUser({
      username: "misty",
      email: "misty@test.com",
      password: "password123",
    });

    expect(result.errors).toEqual({
      usernameExists: true,
      emailExists: false,
      fieldErrors: {
        username: [],
        email: [],
        password: [],
      },
    });
  });

  it("falls back to parsing duplicate fields from error message when meta target is missing", async () => {
    prisma.user.create.mockRejectedValueOnce(
      new Prisma.PrismaClientKnownRequestError(
        "Unique constraint failed on the fields: (`username`, `email`)",
        "P2002"
      )
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
