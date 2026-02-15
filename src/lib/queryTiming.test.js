describe("timedQuery", () => {
  const original = process.env.LOG_DB_TIMINGS;

  afterEach(() => {
    process.env.LOG_DB_TIMINGS = original;
    jest.resetModules();
    jest.restoreAllMocks();
  });

  it("returns query result without logging when disabled", async () => {
    process.env.LOG_DB_TIMINGS = "false";
    const { timedQuery } = await import("./queryTiming");
    const log = jest.spyOn(console, "log").mockImplementation(() => {});

    const result = await timedQuery("q", async () => "ok");

    expect(result).toBe("ok");
    expect(log).not.toHaveBeenCalled();
  });

  it("logs duration when enabled", async () => {
    process.env.LOG_DB_TIMINGS = "true";
    const { timedQuery } = await import("./queryTiming");
    const log = jest.spyOn(console, "log").mockImplementation(() => {});

    await timedQuery("queryName", async () => "ok");

    expect(log).toHaveBeenCalledTimes(1);
    expect(log.mock.calls[0][0]).toContain("[db-timing] queryName:");
  });
});
