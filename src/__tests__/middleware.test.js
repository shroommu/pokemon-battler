const nextMock = jest.fn(() => ({ type: "next" }));
const redirectMock = jest.fn((url) => ({ type: "redirect", url: url.toString() }));
var withAuthOptions;

jest.mock("next/server", () => ({
  NextResponse: {
    next: () => nextMock(),
    redirect: (url) => redirectMock(url),
  },
}));

jest.mock("next-auth/middleware", () => ({
  withAuth: (handler, options) => {
    withAuthOptions = options;
    return handler;
  },
}));

import middleware, { config } from ".././middleware";

const createRequest = (path, { token = null } = {}) => {
  const nextUrl = new URL(`https://example.com${path}`);
  return {
    nextUrl,
    nextauth: { token },
  };
};

describe("middleware", () => {
  beforeEach(() => {
    nextMock.mockClear();
    redirectMock.mockClear();
  });

  it("allows public routes for unauthenticated users", () => {
    const req = createRequest("/pokedex");
    const res = middleware(req);

    expect(res).toEqual({ type: "next" });
    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("allows nested public routes for unauthenticated users", () => {
    const req = createRequest("/pokedex/pikachu/stats");
    const res = middleware(req);

    expect(res).toEqual({ type: "next" });
    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("redirects unauthenticated users from protected routes to login with callbackUrl", () => {
    const req = createRequest("/settings?tab=profile");
    const res = middleware(req);

    expect(res).toEqual({
      type: "redirect",
      url: "https://example.com/login?callbackUrl=%2Fsettings%3Ftab%3Dprofile",
    });
    expect(redirectMock).toHaveBeenCalledTimes(1);
  });

  it("redirects nested protected routes with full callback query preserved", () => {
    const req = createRequest("/settings/notifications?tab=email&from=home");
    const res = middleware(req);

    expect(res).toEqual({
      type: "redirect",
      url: "https://example.com/login?callbackUrl=%2Fsettings%2Fnotifications%3Ftab%3Demail%26from%3Dhome",
    });
  });

  it("redirects authenticated users away from auth routes", () => {
    const req = createRequest("/login", { token: { sub: "user-id" } });
    const res = middleware(req);

    expect(res).toEqual({
      type: "redirect",
      url: "https://example.com/settings",
    });
  });

  it("allows unauthenticated users to access auth routes", () => {
    const req = createRequest("/sign-up");
    const res = middleware(req);

    expect(res).toEqual({ type: "next" });
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  it("allows api auth routes to pass through", () => {
    const req = createRequest("/api/auth/session");
    const res = middleware(req);

    expect(res).toEqual({ type: "next" });
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  it("does not treat non-auth api prefixes as api auth routes", () => {
    const req = createRequest("/api/authentication");
    const res = middleware(req);

    expect(res).toEqual({
      type: "redirect",
      url: "https://example.com/login?callbackUrl=%2Fapi%2Fauthentication",
    });
  });

  it("exposes middleware matcher config", () => {
    expect(config).toEqual({
      matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)"],
    });
  });

  it("always authorizes in withAuth callback config", () => {
    expect(withAuthOptions.callbacks.authorized()).toBe(true);
  });
});
