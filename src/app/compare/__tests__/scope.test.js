import { COMPARE_SCOPE, getStatWinner } from "../scope";

describe("compare scope", () => {
  it("locks one-vs-one compare mode", () => {
    expect(COMPARE_SCOPE.mode).toBe("one-vs-one");
    expect(COMPARE_SCOPE.maxComparedPokemon).toBe(2);
  });

  it("defines required display fields", () => {
    expect(COMPARE_SCOPE.requiredDisplayFields).toEqual([
      "name",
      "sprite",
      "types",
      "base_stats",
      "total_stats",
    ]);
  });

  it("supports winner and tie outcomes", () => {
    expect(getStatWinner(100, 80)).toBe("a");
    expect(getStatWinner(80, 100)).toBe("b");
    expect(getStatWinner(90, 90)).toBe("tie");
  });
});
