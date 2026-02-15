import { login } from "./login";
import { signIn } from "next-auth/next";
import { AuthError } from "next-auth";

jest.mock("next-auth/next", () => ({
  signIn: jest.fn(),
}));

jest.mock("next-auth", () => ({
  AuthError: class MockAuthError extends Error {
    constructor(type) {
      super(type);
      this.type = type;
    }
  },
}));

describe("login action", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns validation error and does not call signIn for invalid fields", async () => {
    const result = await login({ username: "", password: "" });

    expect(result).toEqual({ error: "Invalid fields!" });
    expect(signIn).not.toHaveBeenCalled();
  });

  it("calls signIn with credentials and redirect on valid input", async () => {
    signIn.mockResolvedValueOnce(undefined);

    const result = await login({ username: "misty", password: "password123" });

    expect(result).toBeUndefined();
    expect(signIn).toHaveBeenCalledWith("credentials", {
      username: "misty",
      password: "password123",
      redirectTo: "/settings",
    });
  });

  it("uses callbackUrl redirect when callback is an internal path", async () => {
    signIn.mockResolvedValueOnce(undefined);

    await login(
      { username: "misty", password: "password123" },
      "/pokedex/pikachu"
    );

    expect(signIn).toHaveBeenCalledWith("credentials", {
      username: "misty",
      password: "password123",
      redirectTo: "/pokedex/pikachu",
    });
  });

  it("falls back to default redirect when callback is unsafe", async () => {
    signIn.mockResolvedValueOnce(undefined);

    await login(
      { username: "misty", password: "password123" },
      "https://evil.example"
    );

    expect(signIn).toHaveBeenCalledWith("credentials", {
      username: "misty",
      password: "password123",
      redirectTo: "/settings",
    });
  });

  it("maps CredentialsSignin auth error to invalid credentials message", async () => {
    signIn.mockRejectedValueOnce(new AuthError("CredentialsSignin"));

    const result = await login({ username: "misty", password: "wrongpass" });

    expect(result).toEqual({ error: "Invalid credentials" });
  });

  it("maps unknown auth errors to generic message", async () => {
    signIn.mockRejectedValueOnce(new AuthError("CallbackRouteError"));

    const result = await login({ username: "misty", password: "password123" });

    expect(result).toEqual({ error: "Something went wrong" });
  });
});
