import { HIGHEST_STAT, TYPES } from "../constants";

describe("component constants", () => {
  it("exports known type definitions", () => {
    expect(Array.isArray(TYPES)).toBe(true);
    expect(TYPES.length).toBe(15);
    expect(TYPES[0]).toMatchObject({
      name: "Bug",
      displayColor: "#ab2",
    });
    expect(HIGHEST_STAT).toBe(155);
  });
});
