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

  it("capitalizes slugged pokemon names", () => {
    expect(capitalizePokemonSlug("mr-mime")).toBe("Mr Mime");
  });

  it("builds route path using a formatted pokemon name", () => {
    expect(buildPath("/pokedex/pikachu/stats", "Mr Mime")).toBe(
      "/pokedex/mr-mime/stats"
    );
  });

  it("generates deterministic seeded number in pokedex range for the same day", () => {
    const first = generateRandomPokedexNumberPerDay();
    const second = generateRandomPokedexNumberPerDay();

    expect(first).toBeGreaterThanOrEqual(1);
    expect(first).toBeLessThanOrEqual(151);
    expect(second).toBe(first);
  });
});
