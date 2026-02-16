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

  it("redirects unauthenticated users from protected routes to login with callbackUrl", () => {
    const req = createRequest("/settings?tab=profile");
    const res = middleware(req);

    expect(res).toEqual({
      type: "redirect",
      url: "https://example.com/login?callbackUrl=%2Fsettings%3Ftab%3Dprofile",
    });
    expect(redirectMock).toHaveBeenCalledTimes(1);
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

  it("exposes middleware matcher config", () => {
    expect(config).toEqual({
      matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
    });
  });

  it("always authorizes in withAuth callback config", () => {
    expect(withAuthOptions.callbacks.authorized()).toBe(true);
  });
});
