const prismaClientMock = jest.fn(() => ({ __client: true }));
const warnMock = jest.spyOn(console, "warn").mockImplementation(() => {});

jest.mock("@prisma/client", () => ({
  PrismaClient: prismaClientMock,
}));

describe("prisma singleton", () => {
  const originalNodeEnv = process.env.NODE_ENV;
  const originalDatabaseUrl = process.env.DATABASE_URL;
  const originalGlobalPrisma = global.prisma;

  beforeEach(() => {
    jest.resetModules();
    prismaClientMock.mockClear();
    warnMock.mockClear();
    delete global.prisma;
    delete process.env.DATABASE_URL;
  });

  afterAll(() => {
    process.env.NODE_ENV = originalNodeEnv;
    process.env.DATABASE_URL = originalDatabaseUrl;
    global.prisma = originalGlobalPrisma;
    warnMock.mockRestore();
  });

  it("creates a single global prisma client in non-production", async () => {
    process.env.NODE_ENV = "test";

    const first = (await import("./prisma")).default;
    const second = (await import("./prisma")).default;

    expect(prismaClientMock).toHaveBeenCalledTimes(1);
    expect(first).toBe(second);
    expect(global.prisma).toBe(first);
  });

  it("creates a new prisma client in production", async () => {
    process.env.NODE_ENV = "production";

    const prisma = (await import("./prisma")).default;

    expect(prismaClientMock).toHaveBeenCalledTimes(1);
    expect(prisma).toEqual({ __client: true });
  });

  it("warns in production when DATABASE_URL appears to be a direct supabase endpoint", async () => {
    process.env.NODE_ENV = "production";
    process.env.DATABASE_URL =
      "postgresql://user:pass@db.abcd.supabase.co:5432/postgres";

    await import("./prisma");

    expect(warnMock).toHaveBeenCalledTimes(1);
  });
});
