import bcrypt from "bcryptjs";
import { getUserByUsername } from "@/data/user";
import { GET, POST, authOptions } from "./[...nextauth]";

jest.mock("next-auth", () => ({
  __esModule: true,
  default: jest.fn(() => jest.fn()),
}));

jest.mock("next-auth/providers/credentials", () =>
  jest.fn((providerConfig) => providerConfig)
);

jest.mock("@auth/prisma-adapter", () => ({
  PrismaAdapter: jest.fn(() => ({})),
}));

jest.mock("@/data/user", () => ({
  getUserByUsername: jest.fn(),
}));

jest.mock("bcryptjs", () => ({
  __esModule: true,
  default: {
    compare: jest.fn(),
  },
}));

describe("authOptions credentials authorize", () => {
  const authorize = authOptions.providers[0].authorize;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns null for invalid credentials payload", async () => {
    const result = await authorize({ username: "", password: "" });

    expect(result).toBeNull();
    expect(getUserByUsername).not.toHaveBeenCalled();
  });

  it("normalizes username and returns null when user does not exist", async () => {
    getUserByUsername.mockResolvedValueOnce(null);

    const result = await authorize({ username: "MISTY", password: "pw" });

    expect(getUserByUsername).toHaveBeenCalledWith("misty");
    expect(result).toBeNull();
    expect(bcrypt.compare).not.toHaveBeenCalled();
  });

  it("returns null when user has no password hash", async () => {
    getUserByUsername.mockResolvedValueOnce({ id: "1", username: "misty" });

    const result = await authorize({ username: "misty", password: "pw" });

    expect(result).toBeNull();
    expect(bcrypt.compare).not.toHaveBeenCalled();
  });

  it("returns null when password comparison fails", async () => {
    getUserByUsername.mockResolvedValueOnce({
      id: "1",
      username: "misty",
      password: "hashed",
    });
    bcrypt.compare.mockResolvedValueOnce(false);

    const result = await authorize({ username: "misty", password: "pw" });

    expect(bcrypt.compare).toHaveBeenCalledWith("pw", "hashed");
    expect(result).toBeNull();
  });

  it("returns user when password comparison succeeds", async () => {
    const user = { id: "1", username: "misty", password: "hashed" };
    getUserByUsername.mockResolvedValueOnce(user);
    bcrypt.compare.mockResolvedValueOnce(true);

    const result = await authorize({ username: "misty", password: "pw" });

    expect(result).toEqual(user);
  });
});

describe("authOptions callbacks", () => {
  it("adds token subject to session user id when available", async () => {
    const session = { user: {} };
    const token = { sub: "user-id" };

    const result = await authOptions.callbacks.session({ token, session });

    expect(result.user.id).toBe("user-id");
  });

  it("returns session unchanged when token sub or user is missing", async () => {
    const session = {};
    const token = {};

    const result = await authOptions.callbacks.session({ token, session });

    expect(result).toBe(session);
  });

  it("returns token unchanged from jwt callback for both sub states", async () => {
    const withoutSub = { name: "misty" };
    const withSub = { name: "misty", sub: "user-id" };

    await expect(authOptions.callbacks.jwt({ token: withoutSub })).resolves.toBe(
      withoutSub
    );
    await expect(authOptions.callbacks.jwt({ token: withSub })).resolves.toBe(
      withSub
    );
  });
});

describe("next auth route exports", () => {
  it("exports GET and POST handlers", () => {
    expect(typeof GET).toBe("function");
    expect(POST).toBe(GET);
  });
});
