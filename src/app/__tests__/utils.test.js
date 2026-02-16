import {
  buildPath,
  capitalizePokemonSlug,
  generateRandomPokedexNumberPerDay,
  slugifyPokemonName,
} from ".././utils";

describe("app utils", () => {
  it("slugifies pokemon names", () => {
    expect(slugifyPokemonName("  Mr Mime  ")).toBe("mr-mime");
  });

  it("slugifies names with repeated spaces", () => {
    expect(slugifyPokemonName("  Far   Fetchd  ")).toBe("far-fetchd");
  });

  it("capitalizes slugged pokemon names", () => {
    expect(capitalizePokemonSlug("mr-mime")).toBe("Mr Mime");
  });

  it("builds route path using a formatted pokemon name", () => {
    expect(buildPath("/pokedex/pikachu/stats", "Mr Mime")).toBe(
      "/pokedex/mr-mime/stats"
    );
  });

  it("builds route path for base pokedex entry route", () => {
    expect(buildPath("/pokedex/pikachu", "Mr Mime")).toBe("/pokedex/mr-mime");
  });

  it("generates deterministic seeded number in pokedex range for the same day", () => {
    const first = generateRandomPokedexNumberPerDay();
    const second = generateRandomPokedexNumberPerDay();

    expect(first).toBeGreaterThanOrEqual(1);
    expect(first).toBeLessThanOrEqual(151);
    expect(second).toBe(first);
  });

  it("generates deterministic number for an explicit date", () => {
    const date = new Date("2026-02-16T10:00:00.000Z");

    const first = generateRandomPokedexNumberPerDay(date);
    const second = generateRandomPokedexNumberPerDay(date);

    expect(first).toBe(second);
    expect(first).toBeGreaterThanOrEqual(1);
    expect(first).toBeLessThanOrEqual(151);
  });
});
